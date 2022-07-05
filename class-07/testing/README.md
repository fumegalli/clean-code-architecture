## End-to-end
Whole application (eg. back & front).

## Integration
More than one layer (eg. service + database).

## Unit
One layer (eg. Class).

## FIRST
**F** - Fast
* Should be fast.

**I** - Independent
* Should pass by itself.

**R** - Repeatable
* Should repeat the result every single time (eg. random numbers, dates).

**S** - Self-validate
* Should assert correctly (eg. not a console log).

## Three Laws of TDD
1. Write production code only to pass a failing unit test.
2. Write no more of a unit test than sufficient to fail (compilation failures are failures).
3. Write no more production code than necessary to pass the one failing unit test.

## Test Patterns
* Dummy
    *  Useless object to use as required and irrelevant argument (Value Pattern).
* Stub
    * Return pre-defined values.
* Spy
    * Analize how methods are called (params, times).
* Mock
    * The object has its on verification.
* Fake
    * Fake implementation.
