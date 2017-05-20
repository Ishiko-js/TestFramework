'use strict'

var Test = require('./Test.js')
var TestResultOutcome = require('./TestResultOutcome.js')

class TestSequence extends Test {

    constructor(name) {
        super(name)
        this.tests = [ ]
    }

    doRun(observer) {
        let result = TestResultOutcome.eUnknown

        for (let i = 0; i < this.tests.length; i++) {
            let test = this.tests[i]

            test.run(observer)

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

        return result
    }

    append(test) {
        this.tests.push(test)
    }

}

module.exports = TestSequence
