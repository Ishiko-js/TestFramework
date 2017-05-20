'use strict'

var TestInformation = require('./TestInformation.js')
var TestResult = require('./TestResult.js')
var TestResultOutcome = require('./TestResultOutcome.js')
var ObserverEventType = require('./ObserverEventType.js')

class Test {

    constructor(name) {
        this.information = new TestInformation(name)
        this.result = new TestResult
    }

    name() {
        return this.information.name
    }

    run(observer) {
        if (observer) {
            observer.notify(ObserverEventType.eTestStart, this)
        }

        let outcome = this.doRun(observer)

        this.result.outcome = outcome

        if (observer) {
            observer.notify(ObserverEventType.eTestEnd, this)
        }
    }

    doRun(observer) {
        return TestResultOutcome.eFailed
    }

}

module.exports = Test
