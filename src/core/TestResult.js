'use strict'

import { TestResultOutcome } from "./TestResultOutcome.js"
import { TestSequence } from "./TestSequence.js"

/** 
  Represents the result of a test.

  @property {TestResultOutcome} this.outcome - An enum indicating the outcome of the test
*/
class TestResult {

    /**
      Creates a new TestResult instance. The outcome is
      set to TestResultOutcome.eUnknown.
    */
    constructor(test) {
        this.test = test
        this.outcome = TestResultOutcome.eUnknown
        this.exception = null
    }

    /**
      Checks whether the test passed.

      @returns True if this.outcome is TestResultOutcome.ePassed,
        False in all other cases.
    */
    passed() {
        return (this.outcome == TestResultOutcome.ePassed)
    }

    getPassRate() {
        let passed = 0
        let failed = 0
        let total = 0
        if (this.test instanceof TestSequence) {
            for (let test of this.test.tests) {
                let localPassRate = test.result.getPassRate()
                passed += localPassRate.passed
                failed += localPassRate.failed
                total += localPassRate.total
            }
        } else {
            switch (this.outcome) {
                case TestResultOutcome.ePassed:
                    passed = 1
                    break

                case TestResultOutcome.eFailed:
                    failed = 1
                    break
            }
            total = 1
        }
        return { "passed": passed, "failed": failed, "total": total }
    }
}

export { TestResult }
