#!/usr/bin/env python3
"""Mechanical hygiene checks on the governance files.

    python3 scripts/audit.py            # report
    python3 scripts/audit.py --quiet    # only findings

Checks what a machine can check: that the files exist, that the numbering is consistent, that errata say
whether they were applied, that the report is not older than the code that produces it, that every
document has a status page, that archived readings carry a revision.

It cannot check whether anything is true, whether a proof is sound, whether a citation is used within its
hypotheses, or whether the work is worth doing. Passing this script means nothing except that the
bookkeeping is intact. Do not report it as verification.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESEARCH = ROOT / "research"

FAIL, WARN, OK, INFO = "FAIL", "WARN", "OK", "INFO"
findings: list[tuple[str, str]] = []


def add(level: str, msg: str) -> None:
    findings.append((level, msg))


def read(p: Path) -> str:
    return p.read_text(errors="replace") if p.is_file() else ""


def placeholders(text: str) -> int:
    return len(re.findall(r"\{\{[^}]*\}\}", text))


def check_files() -> bool:
    required = ["AGENTS.md", "METHOD.md", "PROJECT-BRIEF.md", "README.md",
                "research/KNOWLEDGE.md", "research/ERRATA.md", "research/RULES-INHERITED.md",
                "research/LITERATURE.md", "research/RESEARCH-USES.md",
                "research/experiments/claims.py", "research/experiments/run.py"]
    missing = [f for f in required if not (ROOT / f).is_file()]
    for f in missing:
        add(FAIL, f"missing: {f}")
    if not missing:
        add(OK, f"all {len(required)} governance files present")
    return not missing


def check_initialized() -> bool:
    k = read(RESEARCH / "KNOWLEDGE.md")
    n = placeholders(k)
    if n > 5:
        add(INFO, f"KNOWLEDGE.md still has {n} placeholders — the programme is not initialized; "
                  f"run prompts/00-initialize.md. Remaining checks are advisory.")
        return False
    if n:
        add(WARN, f"KNOWLEDGE.md has {n} placeholders left")
    return True


def check_knowledge(initialized: bool) -> None:
    k = read(RESEARCH / "KNOWLEDGE.md")
    for sec in ["## 0.", "## 0b.", "## 1.", "## 2.", "## 3.", "## 6."]:
        if sec not in k:
            add(FAIL, f"KNOWLEDGE.md: section {sec} is gone — keep the numbering, people learn where to look")

    fs = [int(m) for m in re.findall(r"^\s*>?\s*\**F(\d+)\.", k, re.M)]
    if len(fs) != len(set(fs)):
        dup = sorted({n for n in fs if fs.count(n) > 1})
        add(FAIL, f"KNOWLEDGE.md §3: duplicate fallacy numbers {dup}")
    if fs:
        gaps = sorted(set(range(1, max(fs) + 1)) - set(fs))
        if gaps:
            add(WARN, f"KNOWLEDGE.md §3: missing fallacy numbers {gaps} — entries are never deleted")
        add(OK, f"{len(set(fs))} fallacies recorded (F1–F{max(fs)})")
    elif initialized:
        add(WARN, "KNOWLEDGE.md §3 is empty. Either nothing has gone wrong yet, or errors are not being "
                  "written down. After a few days, the second is likelier than the first.")

    m = re.search(r"##\s*0b\..*?(?=\n##\s)", k, re.S)
    block = m.group(0) if m else ""
    if "DO NOT" not in block.upper():
        add(WARN, "KNOWLEDGE.md §0b has no do-not-claim list")
    elif initialized and placeholders(block.split("DO NOT", 1)[1][:600]) > 0:
        add(WARN, "KNOWLEDGE.md §0b: the do-not-claim list is still a placeholder")
    if "STOPPING" not in block.upper() and "stopping criterion" not in block:
        add(WARN, "KNOWLEDGE.md §0b has no stopping criterion — write it before you need it")


def check_errata() -> None:
    e = read(RESEARCH / "ERRATA.md")
    items = re.findall(r"^\s*>?\s*\*\*(\d+)\.(.*)$", e, re.M)
    nums = [int(n) for n, _ in items]
    if len(nums) != len(set(nums)):
        add(FAIL, f"ERRATA.md: duplicate item numbers "
                  f"{sorted({n for n in nums if nums.count(n) > 1})}")
    unapplied = [n for n, rest in items if "{{" not in rest and "not applied" in rest.lower()]
    if unapplied:
        add(WARN, f"ERRATA.md: items {unapplied} recorded as not applied — the same-day rule (METHOD.md) "
                  f"says apply them or mark the document 'do not circulate'")
    if nums:
        add(OK, f"{len(set(nums))} errata items recorded")


def check_claims(initialized: bool) -> None:
    sys.path.insert(0, str(RESEARCH / "experiments"))
    try:
        import claims  # type: ignore
    except Exception as exc:
        add(FAIL, f"research/experiments/claims.py does not import: {exc}")
        return
    keys = [k for k in claims.CLAIMS if k != "T0"]
    if not keys and initialized:
        add(WARN, "no claims registered besides the harness self-test T0 — the thesis is not being tested")
    for k, c in claims.CLAIMS.items():
        if len(c.refuted_if) < 15:
            add(FAIL, f"claim {k}: refuted_if is too thin to be a refutation condition")
        if placeholders(c.statement) or placeholders(c.refuted_if):
            add(WARN, f"claim {k}: still a placeholder")
    if keys:
        add(OK, f"{len(keys)} claims registered, each with a refutation condition")


def check_report_freshness() -> None:
    rep = RESEARCH / "experiments" / "REPORT.md"
    if not rep.is_file():
        add(WARN, "no research/experiments/REPORT.md — run `python3 research/experiments/run.py`")
        return
    sources = [RESEARCH / "experiments" / "claims.py", *(RESEARCH / "lib").glob("*.py")]
    newer = [p.name for p in sources if p.is_file() and p.stat().st_mtime > rep.stat().st_mtime]
    if newer:
        add(WARN, f"REPORT.md is older than {', '.join(newer)} — the numbers in the documents may no "
                  f"longer be what the code produces. Re-run the suite and diff.")
    else:
        add(OK, "REPORT.md is at least as new as the code that produces it")


def check_documents() -> None:
    docs = sorted(p for p in RESEARCH.glob("*") if p.is_dir() and (p / "main.tex").is_file())
    if not docs:
        add(INFO, "no document with a main.tex yet")
        return
    for d in docs:
        tex = read(d / "main.tex")
        if not (d / "STATUS.md").is_file():
            add(FAIL, f"{d.name}: no STATUS.md")
        if not any((d / "scripts").glob("*.py")) and not any((d / "scripts").glob("*.ts")) \
                and placeholders(tex) < 5:
            add(WARN, f"{d.name}: no scripts/ — every number in a document comes from one")
        if "Disclosure" not in tex and "disclosure" not in tex:
            add(WARN, f"{d.name}: no disclosure section")
        n_todo = len(re.findall(r"\\todo\{", tex))
        if n_todo:
            add(INFO, f"{d.name}: {n_todo} \\todo markers")


def check_reviews() -> None:
    files = [p for p in (RESEARCH / "reviews").glob("*") if p.is_file() and p.name != "README.md"]
    if not files:
        add(WARN, "research/reviews/ is empty — nobody outside the sessions has read this work. "
                  "Nothing here may be called verified (AGENTS.md rule 12).")
        return
    bad = [p.name for p in files
           if not re.match(r"^\d{4}-\d{2}-\d{2}-.+-[0-9a-f]{7,40}\.", p.name)]
    for b in bad:
        add(WARN, f"reviews/{b}: filename carries no date and revision hash — "
                  f"use YYYY-MM-DD-<what>-<hash>.<ext>")
    add(OK, f"{len(files)} archived reading(s)")


def check_literature() -> None:
    lit = read(RESEARCH / "LITERATURE.md")
    n_unverified = len(re.findall(r"unverified", lit, re.I))
    if n_unverified > 1:  # one occurrence is the legend
        add(INFO, f"LITERATURE.md: {n_unverified - 1} source(s) marked unverified — they may not be cited")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--quiet", action="store_true", help="only findings")
    args = ap.parse_args()

    if check_files():
        initialized = check_initialized()
        check_knowledge(initialized)
        check_errata()
        check_claims(initialized)
        check_report_freshness()
        check_documents()
        check_reviews()
        check_literature()

    order = {FAIL: 0, WARN: 1, INFO: 2, OK: 3}
    for level, msg in sorted(findings, key=lambda f: order[f[0]]):
        if args.quiet and level == OK:
            continue
        print(f"{level:4}  {msg}")

    n_fail = sum(1 for lvl, _ in findings if lvl == FAIL)
    n_warn = sum(1 for lvl, _ in findings if lvl == WARN)
    print(f"\n{n_fail} failing, {n_warn} warnings.")
    print("This script checks bookkeeping only. It says nothing about whether anything here is true.")
    return 1 if n_fail else 0


if __name__ == "__main__":
    raise SystemExit(main())
