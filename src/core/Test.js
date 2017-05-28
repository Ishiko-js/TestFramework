'use strict'

import { TestInformation } from "./TestInformation.js"
import { TestResult } from "./TestResult.js"
import { TestResultOutcome } from "./TestResultOutcome.js"
import { ObserverEventType } from "./ObserverEventType.js"

/**
  <p>The base class for all the classes implementing tests.</p>

  <p>Derived classes should override the doRun() method to
  implement their specific test logic.</p>

   @property {TestInformation} this.information - The description of the test (number, name, etc)
   @property {TestResult} this.result - The result of the test
*/
export class Test {

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
      <p>Executes the test.</p>

      <p>This method should not be overriden. Override
      doRun().</p>

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
      <p>Called by {@link Test#run} to execute the test. Do not
         call this function directly.</p>

      <p>This function is meant to be overriden by specific 
         test classes.The base class implementation always 
         returns TestResultOutcome.eFailed.</p>

      @virtual
      @returns {TestResultOutcome} The outcome of the test.
      @see FunctionBasedTest
      @see FileComparisonTest
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
