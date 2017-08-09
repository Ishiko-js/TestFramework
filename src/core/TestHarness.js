'use strict'

import { TestConfiguration } from "./TestConfiguration.js"
import { TestProgressObserver } from "./TestProgressObserver.js"
import { TestSequence } from "./TestSequence.js"
import { TestEnvironment } from "./TestEnvironment.js"
import { TopTestSequence } from "./TopTestSequence.js"

let argv = require("minimist")(process.argv.slice(2));

let topSequence = Symbol()

/** 
  The class that manages the execution of the
  test suite. Think of this as the entry point
  for a test suite.

  @example
'use strict'

var tf = require("ishiko-test-framework")

// Create the test harness
let theTestHarness = new tf.TestHarness("My First Test Suite")

// Add a test sequence
let numberTests = theTestHarness.appendTestSequence("Number tests")

// Add the first test to the test sequence
new tf.FunctionBasedTest(
    "Addition",
    function(resolve) {
        if ((3 + 2) == 5) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    },
    numberTests)

// Add a second test to the test sequence
new tf.FunctionBasedTest(
    "Subtraction",
    function(resolve) {
        if ((3 - 2) == 2) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    },
    numberTests)

// Run the test suite
theTestHarness.run()

*/
class TestHarness {

    /** 
      Creates a new TestHarness instance.
      @param {string} name - The title of the test suite.
    */
    constructor(name) {
        this.environment = new TestEnvironment()
        this[topSequence] = new TopTestSequence(name)
    }

    /**
      Executes the tests in the test suite.
    */
    run() {
        let self = this
        console.log("Test Suite: " + self[topSequence].name())
        console.log()

        let parallelExecution = false
        if (argv.parallel) {
            parallelExecution = (argv.parallel == "true")
        }
        let configuration = new TestConfiguration(parallelExecution)

        let progressObserver = null
        if (configuration.outputConfiguration.progressObserverConfiguration.enabled) {
            progressObserver = new TestProgressObserver()
        }

        let testPromise = Promise.resolve(self[topSequence].run({ configuration: configuration, observer: progressObserver }))
        testPromise.then(function() {
            if (!self[topSequence].passed()) {
                console.log("Test Suite FAILED!!!")
            } else {
                console.log("Test Suite passed")
            }
        })
    }

    appendTestSequence(name) {
        let newTestSequence = new TestSequence(name)
        this[topSequence].append(newTestSequence)
        return newTestSequence
    }

}

export { TestHarness }
