'use strict'

import { Test } from "./Test.js"
import { TestResultOutcome } from "./TestResultOutcome.js"

/**
  Represents a sequence of tests.
  @extends Test
*/
export class TestSequence extends Test {

    /** 
      Creates a new TestSequence instance.
      @param {string} name - The name of the test sequence.
    */
    constructor(name) {
        super(name)
        this.tests = [ ]
    }

    /**
      Executes the test.
      @returns {Promise} a Promise that will provide the outcome of the
        test.
    */
    doRun(configuration, observer) {
        let self = this
        let testOutcomePromise = new Promise(function(resolve, reject) {

            // Start all tests in the sequence
            let testPromises = [ ];
            for (let i = 0; i < self.tests.length; i++) {
                let test = self.tests[i]
                let testPromise = Promise.resolve(test.run({ observer: observer }))
                testPromises.push(testPromise)
            }

            // Wait for all tests to complete and update the
            // test sequence result
            Promise.all(testPromises).then(function() {
                let result = TestResultOutcome.eUnknown

                for (let i = 0; i < self.tests.length; i++) {
                    let test = self.tests[i]
                    let outcome = test.result.outcome
                    if (i == 0) {
                        // The first test determines the initial value of the result
                        result = outcome
                    } else if (result == TestResultOutcome.eUnknown) {
                        // If the current sequence outcome is unknown it can only get worse and be set
                        // to exception or failed (if the outcome we are adding is exception or failed)
                        if ((outcome == TestResultOutcome.eFailed) || (outcome == TestResultOutcome.eException)) {
                            result = outcome;
                        }
                    } else if (result == TestResultOutcome.ePassed) {
                        // If the current sequence outcome is passed it stays at this state only if the
                        // result we are adding is passed, else it will be 'unknown', 
                        // 'passedButMemoryLeaks', 'exception' or 'failed'.
                        // depending on the outcome of the result we are adding.
                        result = outcome;
                    }
                }

                resolve(result)
            })
        })
        return testOutcomePromise
    }

    append(test) {
        // We need to update the number of the test
        if (this.tests.length == 0) {
            let newNumber = this.number().clone();
            test.information.number = newNumber.deeperNumber()
        } else {
            let newNumber = this.tests[this.tests.length - 1].number().clone();
            test.information.number = newNumber.increase()
	}

        this.tests.push(test)
    }

}
