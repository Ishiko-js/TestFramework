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

    passed() {
        return this.result.passed()
    }

    run(observer) {
        this.notify(ObserverEventType.eTestStart, observer)
        
        let outcome = this.doRun(observer)

        this.result.outcome = outcome

        this.notify(ObserverEventType.eTestEnd, observer)
    }

    doRun(observer) {
        return TestResultOutcome.eFailed
    }

    notify(type, observer) {
        if (observer) {
            observer.notify(type, this)
        }
    }

}

module.exports = Test
