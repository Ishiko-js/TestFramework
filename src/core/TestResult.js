'use strict'

import { TestResultOutcome } from "./TestResultOutcome.js"

/** 
  Represents the result of a test.

  @property {TestResultOutcome} this.outcome - An enum indicating the outcome of the test
*/
class TestResult {

    /**
      Creates a new TestResult instance. The outcome is
      set to TestResultOutcome.eUnknown.
    */
    constructor() {
        this.outcome = TestResultOutcome.eUnknown
    }

    /**
      Checks whether the test passed.

      @returns True if this.outcome is TestResultOutcome.ePassed,
        False in all other cases.
    */
    passed() {
        return (this.outcome == TestResultOutcome.ePassed)
    }

}

export { TestResult }
