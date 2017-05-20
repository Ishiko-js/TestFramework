'use strict'

var TestResultOutcome = require('./TestResultOutcome.js')

module.exports = function() {

    this.outcome = TestResultOutcome.eUnknown

    this.passed = function() {
        return (this.outcome == TestResultOutcome.ePassed)
    }

}
