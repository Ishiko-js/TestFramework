'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("FunctionBasedTest tests")

    new tf.FunctionBasedTest("Creation test 1", FunctionBasedTestCreationTest1, testSequence)
    new tf.FunctionBasedTest("run success test 1", FunctionBasedTestRunSuccessTest1, testSequence)
    new tf.FunctionBasedTest("run failure test 1", FunctionBasedTestRunFailureTest1, testSequence)
    new tf.FunctionBasedTest("run timeout test 1", FunctionBasedTestRunTimeoutTest1, testSequence)
}

function FunctionBasedTestCreationTest1(resolve, reject)
{
    let test = new tf.FunctionBasedTest(
        "FunctionBasedTestCreationTest1", 
        function(resolve, reject) {
            resolve(tf.TestResultOutcome.ePassed)
        })
    resolve(tf.TestResultOutcome.ePassed)
}

function FunctionBasedTestRunSuccessTest1(resolve, reject)
{
    let test = new tf.FunctionBasedTest(
        "FunctionBasedTestRunSuccessTest1", 
        function(resolve, reject) {
            resolve(tf.TestResultOutcome.ePassed)
        })

    Promise.resolve(test.run()).then(function() {
        if (test.result.outcome == tf.TestResultOutcome.ePassed) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}

function FunctionBasedTestRunFailureTest1(resolve, reject)
{
    let test = new tf.FunctionBasedTest(
        "FunctionBasedTestRunFailureTest1", 
        function(resolve, reject) {
            resolve(tf.TestResultOutcome.eFailed)
        });

    Promise.resolve(test.run()).then(function() {
        if (test.result.outcome == tf.TestResultOutcome.eFailed) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}

function FunctionBasedTestRunTimeoutTest1(resolve, reject)
{
    let test = new tf.FunctionBasedTest(
        "FunctionBasedTestRunTimeoutErrorTest1", 
        function(resolve, reject) {
            // Intentionally forget to call resolve
        });

    // Decrease the default timeout else we're going to
    // timeout this test itself
    Promise.resolve(test.run({ configuration: new tf.TestConfiguration(false, 1000) }))
        .then(function() {
            console.log(test.result.outcome)
            if (test.result.outcome == tf.TestResultOutcome.eExecutionTimeout) {
                resolve(tf.TestResultOutcome.ePassed)
            } else {
                resolve(tf.TestResultOutcome.eFailed)
            }
        })
}
