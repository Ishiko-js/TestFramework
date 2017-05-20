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
             }
        }

        return result
    }

    append(test) {
        this.tests.push(test)
    }

}

module.exports = TestSequence
