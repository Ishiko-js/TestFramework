'use strict'

// If you installed the module with npm you would include
// "ishiko-test-framework"
var tf = require("../../lib/index.js")

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
