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
    eFailed: 3,
    /** 
      The test couldn't be executed correctly. 
      This indicates an error with the way was written
      rather than a problem with the code that is being
      tested.
    */
    eExecutionError: 4,
    /**
      The test execution timed out.
    */
    eExecutionTimeout: 5
}

export { TestResultOutcome } 