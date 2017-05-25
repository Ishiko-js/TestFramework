'use strict'

var TestResultOutcome = require('./TestResultOutcome.js')

/** Represents the result of a test. */
class TestResult {

    constructor() {
        this.outcome = TestResultOutcome.eUnknown
    }

    passed() {
        return (this.outcome == TestResultOutcome.ePassed)
    }

}

module.exports = TestResult
