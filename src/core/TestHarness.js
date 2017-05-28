'use strict'

var TestProgressObserver = require('./TestProgressObserver.js')
var TestSequence = require('./TestSequence.js')
var TestEnvironment = require('./TestEnvironment.js')
var TopTestSequence = require('./TopTestSequence.js')

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
    function() {
        if ((3 + 2) == 5) {
            return tf.TestResultOutcome.ePassed
        } else {
            return tf.TestResultOutcome.eFailed
        }
    },
    numberTests)

// Add a second test to the test sequence
new tf.FunctionBasedTest(
    "Subtraction",
    function() {
        if ((3 - 2) == 2) {
            return tf.TestResultOutcome.ePassed
        } else {
            return tf.TestResultOutcome.eFailed
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
        console.log("Test Suite: " + this[topSequence].name())
        console.log()

        let progressObserver = new TestProgressObserver()
        this[topSequence].run(progressObserver)

        console.log()
        if (!this[topSequence].passed()) {
            console.log("Test Suite FAILED!!!")
        } else {
            console.log("Test Suite passed")
        }	
    }

    appendTestSequence(name) {
        let newTestSequence = new TestSequence(name)
        this[topSequence].append(newTestSequence)
        return newTestSequence
    }

}

module.exports = TestHarness
