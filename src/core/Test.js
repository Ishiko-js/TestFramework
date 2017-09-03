'use strict'

import { TestInformation } from "./TestInformation.js"
import { TestResult } from "./TestResult.js"
import { TestResultOutcome } from "./TestResultOutcome.js"
import { TestConfiguration } from "./TestConfiguration.js"
import { ObserverEventType } from "./ObserverEventType.js"

/**
  <p>The base class for all the classes implementing tests.</p>

  <p>Derived classes should override the doRun() method to
  implement their specific test logic.</p>

   @property {TestInformation} this.information - The description of the test (number, name, etc)
   @property {TestResult} this.result - The result of the test
*/
class Test {

    /** 
      Creates a new Test instance.
      @param {string} name - The name of the test.
    */
    constructor(name) {
        this.information = new TestInformation(name)
        this.result = new TestResult(this)
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
      @returns {Promise} A promise that will indicate when
        the test is complete.
    */
    run({ configuration = new TestConfiguration(), observer = null } = { }) {
        let self = this
        let timeout = null
        let testPromise = new Promise(function(resolve, reject) {
            self.notify(ObserverEventType.eTestStart, observer)
        
            let outcomePromise = Promise.resolve(self.tryDoRun(configuration, observer))
            if (outcomePromise) {
                outcomePromise
                    .then(function(outcome) {
                        let keyFound = false
                        var keys = Object.keys(TestResultOutcome)
                        for (let i = 0; i < keys.length; i++) {
                            if (TestResultOutcome[keys[i]] == outcome) {
                                keyFound = true
                                break
                            }
                        }
                        if (keyFound) {
                            self.result.outcome = outcome
                        } else {
                            self.result.outcome = TestResultOutcome.eExecutionError
                        }
                        self.notify(ObserverEventType.eTestEnd, observer)
                        if (timeout) {
                            clearTimeout(timeout)
                        }
                        resolve()
                    })
                    .catch(function(err) {
                        self.result.outcome = TestResultOutcome.eException
                        self.result.exception = err
                        self.notify(ObserverEventType.eTestEnd, observer)
                        if (timeout) {
                            clearTimeout(timeout)
                        }
                        resolve()
                    })
            } else {
                self.result.outcome = TestResultOutcome.eExecutionError
                self.notify(ObserverEventType.eTestEnd, observer)
                if (timeout) {
                    clearTimeout(timeout)
                }
                resolve()
            }
        })
        let timeoutPromise = new Promise(function(resolve, reject) {
            timeout = setTimeout(function() {
                if (self.result.outcome == TestResultOutcome.eUnknown) {
                   self.result.outcome = TestResultOutcome.eExecutionTimeout
                   self.notify(ObserverEventType.eTestEnd, observer)
                }
                resolve()
            },
            configuration.timeout)
        })
        let testPromiseWithTimeout = Promise.race([ testPromise, timeoutPromise ]) 
        return testPromiseWithTimeout
    }

    tryDoRun(configuration, observer) {
        try {
            return this.doRun(configuration, observer)
        } catch(err) {
            return Promise.reject(err);
        }
    }

    /**
      <p>Called by {@link Test#run} to execute the test. Do not
         call this function directly.</p>

      <p>This function is meant to be overriden by specific 
         test classes.The base class implementation always 
         returns TestResultOutcome.eFailed.</p>

      <p>If the test is asynchronous this function should
         return a Promise with an executor function that
         passes the outcome of the test to the resolve 
         function. So even even if the test fails resolve 
         should be used, not reject. Use reject to indicate
         the test couldn't be run.</p>

      @virtual
      @returns {TestResultOutcome|Promise} The outcome of the
        test or a Promise that will provide the outcome of the
        test.
      @see FunctionBasedTest
      @see FileComparisonTest
    */
    doRun(configuration, observer) {
        return TestResultOutcome.eFailed
    }

    notify(type, observer) {
        if (observer) {
            observer.notify(type, this)
        }
    }

}

export { Test }
