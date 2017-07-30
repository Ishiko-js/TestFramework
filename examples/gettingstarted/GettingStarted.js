'use strict'

// If you installed the module with npm you would include
// "ishiko-test-framework"
var tf = require("../../dist/ishiko-test-framework.js")

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
