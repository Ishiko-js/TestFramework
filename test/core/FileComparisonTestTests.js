'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("FileComparisonTest tests")

    new tf.FunctionBasedTest("Creation test 1", FileComparisonTestCreationTest1, testSequence)

    new tf.FunctionBasedTest("run success test 1", FileComparisonTestRunSuccessTest1, testSequence)

    new tf.FunctionBasedTest("run failure test 1", FileComparisonTestRunFailureTest1, testSequence)
}

function FileComparisonTestCreationTest1()
{
    let test = new tf.FileComparisonTest(
        "FileComparisonTestCreationTest1", 
        function() {
            return tf.TestResultOutcome.ePassed
        })
    return tf.TestResultOutcome.ePassed
}

function FileComparisonTestRunSuccessTest1()
{
    let test = new tf.FileComparisonTest(
        "FileComparisonTestRunSuccessTest1", 
        function(test) {
            test.setOutputFilePath(__dirname + "/data/comparisontestfiles/hello.txt");
            test.setReferenceFilePath(__dirname + "/data/comparisontestfiles/hello2.txt");
            return tf.TestResultOutcome.ePassed
        })

    test.run()

    return test.result.outcome
}

function FileComparisonTestRunFailureTest1()
{
    let test = new tf.FileComparisonTest(
        "FileComparisonTestRunFailureTest1", 
        function(test) {
            test.setOutputFilePath(__dirname + "/data/comparisontestfiles/hello.txt");
            test.setReferenceFilePath(__dirname + "/data/comparisontestfiles/nothello.txt");
            return tf.TestResultOutcome.ePassed
        })

    test.run()

    if (test.result.outcome == tf.TestResultOutcome.eFailed) {
        return tf.TestResultOutcome.ePassed
    } else {
        return tf.TestResultOutcome.eFailed
    }
}
