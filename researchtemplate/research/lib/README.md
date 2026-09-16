# Shared machinery

Everything a result depends on lives here, and everything here has a unit test in `../tests/`.

The rule that makes this directory matter: a function whose only exercise is the claim suite has not been
tested — the suite checks the claim, not the function. When a number turns out to be wrong, the question
is always "which of the three places that compute this was right", and the answer should be that there is
one place and it has tests.

Conventions:

- Pure functions where possible; no I/O, no global state, no printing.
- Every function that computes something a document will quote gets: a docstring saying what it computes
  and in which normalisation, a unit test against a brute-force or independent computation, and — if it
  involves a truncation, a tail or an approximation — an explicit statement of the error it makes.
- Constants are defined once, here, with their source. A constant that appears in two files will
  eventually disagree with itself.
- Expensive functions take the scale as an argument and state their cost in the docstring.

`check.py` holds the two-routes helper, because the rule "every constant by two independent routes" is
easier to keep when there is a function for it.
