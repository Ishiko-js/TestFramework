'use strict'

var tf = require("../../lib/index.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("FunctionBasedTest tests")

    new tf.FunctionBasedTest("Creation test 1", FunctionBasedTestCreationTest1, testSequence)
    new tf.FunctionBasedTest("run success test 1", FunctionBasedTestRunSuccessTest1, testSequence)
    new tf.FunctionBasedTest("run failure test 1", FunctionBasedTestRunFailureTest1, testSequence)
}

function FunctionBasedTestCreationTest1()
{
    let test = new tf.FunctionBasedTest(
        "FunctionBasedTestCreationTest1", 
        function() {
            return tf.TestResultOutcome.ePassed
        })
    return tf.TestResultOutcome.ePassed
}

function FunctionBasedTestRunSuccessTest1()
{
    let test = new tf.FunctionBasedTest(
        "FunctionBasedTestRunSuccessTest1", 
        function() {
            return tf.TestResultOutcome.ePassed
        })

    test.run()

    if (test.result.outcome == tf.TestResultOutcome.ePassed) {
        return tf.TestResultOutcome.ePassed
    } else {
        return tf.TestResultOutcome.eFailed
    }
}

function FunctionBasedTestRunFailureTest1()
{
    let test = new tf.FunctionBasedTest(
        "FunctionBasedTestRunSuccessTest1", 
        function() {
            return tf.TestResultOutcome.eFailed
        });

    test.run()

    if (test.result.outcome == tf.TestResultOutcome.eFailed) {
        return tf.TestResultOutcome.ePassed
    } else {
        return tf.TestResultOutcome.eFailed
    }
}
