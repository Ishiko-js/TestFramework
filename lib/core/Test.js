'use strict'

var TestInformation = require('./TestInformation.js')
var TestResult = require('./TestResult.js')
var TestResultOutcome = require('./TestResultOutcome.js')
var ObserverEventType = require('./ObserverEventType.js')

/**
  The base class for all the classes implementing tests.

  Derived classes should override the doRun() method to
  implement their specific test logic.
*/
class Test {

    /** 
      Creates a new Test instance.
      @param {string} name - The name of the test.
    */
    constructor(name) {
        this.information = new TestInformation(name)
        this.result = new TestResult
    }

    number() {
        return this.information.number
    }

    name() {
        return this.information.name
    }

    passed() {
        return this.result.passed()
    }

    /**
      Executes the test.

      This method should not be overriden. Override
      doRun().

      @param {TestObserver=} observer - An observer that
        will monitor the execution of the test.
    */
    run(observer) {
        this.notify(ObserverEventType.eTestStart, observer)
        
        let outcome = this.doRun(observer)

        this.result.outcome = outcome

        this.notify(ObserverEventType.eTestEnd, observer)
    }

    /**
      Executes the test.
      The base class implementation always returns TestResultOutcome.eFailed.
      @virtual
      @returns {TestResultOutcome} The outcome of the test.
    */
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
