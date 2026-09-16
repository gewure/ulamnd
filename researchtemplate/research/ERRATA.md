# Errata

Project-wide, dated, append-only. Every correction to any document in this repository is recorded here,
including corrections to corrections. **Nothing is ever deleted or shortened**: this file is the record of
what was wrong, not of what is currently true.

## Rules

1. **Same day.** An erratum to a statement in an abstract, theorem, conjecture or headline claim is applied
   to the document the same day it is recorded — or the document gets a *do not circulate* line at the top
   until it is. (The source programme lost a day to an erratum recorded as "worth a line next time", while
   its own notes wrongly said the paper had been submitted.)
2. **What each item contains:** the date, the document and location, the text that was wrong *quoted
   verbatim*, why it is wrong, the replacement text, how it was found, and whether the fix has been
   applied.
3. **Findings that were rejected go in too**, with the reason. A record that contains only accepted
   findings tells you nothing about the filter.
4. **If it could recur, it is also a rule** in `KNOWLEDGE.md` §3, with a general phrasing.
5. **If it changes a label** on the status board (`KNOWLEDGE.md` §2), change the label in the same commit.

## Format

> **{{n}}. {{Document, location}}** ({{date}}, found by {{internal / fresh reader / outside assessment,
> which}}). "{{the wrong text, quoted}}" is wrong: {{why}}.
> **Replacement:** "{{the corrected text}}".
> **Applied:** {{date, commit}} / **Not applied:** {{why, and the do-not-circulate marker that is now on
> the document}}.
> **Consequences:** {{other statements, numbers or documents that this touches}}.

---

*(no errata yet — the programme has not been initialized, or nothing has been found wrong. The second
possibility is less likely than it looks.)*
