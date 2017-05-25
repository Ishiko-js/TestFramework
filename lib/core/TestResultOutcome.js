'use strict'

/**
  The possible outcomes of a test.
  @readonly
  @enum {number}
*/
var TestResultOutcome = {
    /**
      The result of the test is unknown.
      This is used as the initial value before
      the test has been run.
    */
    eUnknown: 0,
    /** The test passed. */
    ePassed: 1,
    /** The test failed. */
    eFailed: 3
}

module.exports = TestResultOutcome