# Interview questionnaire for the case study (asked 14 September 2026)

Answers go below each question, verbatim; they are the source for Appendix A and for the "origin" column of the
guardrail table in §4. Say "skip" to leave a question out. Numbers you are unsure about: give a range.

## Q1 — Background
Role, training, level of mathematics before 8 September (last formal course; what you could and could not read in
a number-theory paper), prior LLM experience in engineering work, and what triggered the project.

**Answer (14 Sep, verbatim):** Im a Freelance Software Engineer / Entrepreneur and Trader, running multiple projects. I have a
bachelor degree in Software Engineering and the hardes mathematical course i had to pass was Stochastics. What i can read in
number theory papers is the human language explanations and the importance of asymptotic proves. i can understand concects as
the Bateman-Horn C(f) quite clearly, know how to conceptually compare polynoms, during studies i could do fourier
transformations and markov chains fluently, during work i needed to implement specialized algorithms to find all cycles in a
bidirectional weighted graph up to N vertices etc. i have a curiosity for number theory since a long time and the prime-richer
diagonals on the ulam spiral were my visual intuition where to start a study.

## Q2 — Tools and cost
Sessions per day, hours per day, approximate token/money cost, other tools (ChatGPT for the assessment; anything
else), anything done outside the agent (reading, hand computation, talking to people).

**Answer (14 Sep, verbatim):** i worked about 8 hours per day and the tools are Linux terminal, Claude with Fable 5.1 and sometimes for simpler things Opus. i spend in total about 150$ for computation. I have been an early adopter of LLms and worked with GPT3 closed beta already, so i have a vast experience in working with AI output. I reviewed the output with different ais, openAI GPT and Gemini mostly. Ive used chatGPT, Gemini, Google, Mathexchange, ArXiv for research, a lot of my knowledge also comes from watching numberphile videos.

## Q3 — The turn from tool to papers
When and why did you decide the surviving lead was worth a paper, then four? What did you expect, and what did the
model tell you to expect?

**Answer (14 Sep, verbatim):** i did a short literature question like who did research on this and found not a lot, but the problem was not super hard to solve with AI from my viewpoint - doing testdriven i thought lets try to dig deeper where bateman-horn stopped. as soon as i found something of interest i started to instruct to build a Paper, and possible a research programme, if the findings turn more interesting. the model told me to not expect anything, but that experiments can be valueable in this field.

## Q4 — Guardrails
For each row of the table in §4 (knowledge base, fallacy list, errata, numbers-from-scripts, two routes, fresh
adversarial readers, archived assessments, disclosure, "correct or leave open", stopping criterion, do-not-claim
list): your idea, the model's, or forced by an event? Which is the single most important? Which came too late?

**Answer (14 Sep, verbatim):** i would say the first prompt where i defined that we do a "research programm" and work test driven, enumerating methods/paths and having a Knowledge.md where we collect our findings, was the important part. This usually foces LLMs direct context to compacted notes about the work it did and increases in my view the quality a lot. this also is one reason why complex "agent" systems like openClaw are so successfull with basicaly prompt masqueradeing, in my view. these contextual-guardrails/notes/chronologies and known fallancies help to recover important high-class context - so a new session does not have to pickup everything. its similiar to how human notes work and i think this is key to having quality AI output. This and test-driven. Have a computational check for everything rigorosly and a proper documentation of the way-of-thought.

## Q5 — First prompts (8 Sep)
How did you describe the tool and the thesis? Did you ask for the tests or did the model propose them? What did you
do when the tests refuted three of your four claims?

**Answer (14 Sep, verbatim):** is answered already i think. [see Q3, Q4]

## Q6 — The research register (9–10 Sep)
What did you ask for that produced "reviewer rounds", "rigorous passes", "literature rounds (verified)"? Prompts you
stopped using because they produced confident nonsense? When did you start saying "be exact", and what changed?

**Answer (14 Sep, verbatim):** when i did really understand nothing, i asked AI to simplyfy so i can still make decicions - for example about which deeper paths to follow, and if we need more literature, because the Agent was vague. I imagined the Agent as an absolute pro mathematician who does never buldge to my requests but patiently works with me trough the problems and explains them to me in a way that i as software engineer can do a research framework idealy around it, or tell it when i think we should hold, do more tests, a review.

## Q7 — Deciding without checking the mathematics
How did you choose between the repair routes for paper IV? What did you rely on: the data, the model's account,
the structure of the argument, the external assessment?

**Answer (14 Sep, verbatim):** i discussed with Claude directly, had external Ais review the papers and discussed with them - asked them to take a hostile position and find errors, then compressed them and gave them with a context annotation back to the original agent. very similiar to like real peer review works, actually.

## Q8 — Knowing when to stop
Why did you ask "are we over-rigoring"? What in the model's behaviour made you suspect open-ended polishing?

**Answer (14 Sep, verbatim):** i was pressing Fable at some times more than it wanted to, asserting that when it says "this are 2 weeks work at least" that its actually 1-2-3 hours for an AI and demanding it tries. this worked and was particular important i think in paper 4.

## Q9 — Worst moment
Which error did you feel most (the sharp conjecture retracted? the paper IV orbit error? the "submitted" that was
not?), and what did you change afterwards?

**Answer (14 Sep, verbatim):** worst moment i did not really have - out of context, having burned 10$ and needing to start again. i think it was about wanting too much rigorosity accross by now 4 papers. One should keep context somewhat human, not absolute superhuman.

## Q10 — Your own verification
What did you personally verify, and how? What could you not verify, and how did you decide to trust it anyway? Did
you ever refuse a claim the model insisted on, or insist on one it resisted?

**Answer (14 Sep, verbatim):** i looked at the code of some of the test it implemented and was impressed about the mathematical complexity. i let it run the test often and "reflect" about them and check for logic fallancies and flawed results. i did not refuse on something, but i asked for excellency and simplicity, a kind of humbleness. this worked a bit against me even, as the model demanded more human input at times than was needed.

## Q11 — Authorship and disclosure
Why single authorship with a disclosure paragraph (ERRATA 8)? How do you want the model's role described?

**Answer (14 Sep, verbatim):** authorship - i did at first want it as co-author even. The problem is that no journal will accept this. I think since its also not a persona, its a bit weird. i dont fully know how to credit this, but i decided to be absolutely open and transparent about everything including the flow of work. this paper here shall serve as rolemodel how to work scientifically in very complex domains while maintaining scientific rigor.

## Q12 — This case study
What is its claim in your words? Who is the audience (engineers, mathematicians, AI researchers, publishers)? Target
venue or format (arXiv cs.DL / math.HO, a blog, a workshop)? May the second outside reader's assessment of the limits
of model reading be quoted verbatim?

**Answer (14 Sep, verbatim):** The audience is anybody working in science with AI or wanting to or even rejecting to. I got a lost of hostility when presenting my work - nobody at first seriously checked it, assuming AI slop. i can understand this - ive read the aiandmats text which is signed by almost all fields medal winners and agree with it - this project shall demonstrate a possible workable way, a toolkid, how to embedd AI such that the quality of its output rises and becomes more easily falsifyable - borrowing the proven concept of test-driven development from softwareengineering and to enumerate/rate the toolsets are key concepts.


## Still open (asked 14 Sep, second round)
- Q9: "out of context, having burned 10$ and needing to start again" — one episode or several? Which day, which paper?
- Q12: target venue/format; permission to quote the second outside reader's assessment verbatim; the exact title/URL
  of the "AI and mathematics" statement signed by Fields medallists that you refer to (so it can be cited correctly).
- Q4: which guardrail came too late (the stopping criterion? the archived external review?).
