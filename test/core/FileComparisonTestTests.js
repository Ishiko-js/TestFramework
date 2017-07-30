'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("FileComparisonTest tests")

    new tf.FunctionBasedTest("Creation test 1", FileComparisonTestCreationTest1, testSequence)

    new tf.FunctionBasedTest("run success test 1", FileComparisonTestRunSuccessTest1, testSequence)

    new tf.FunctionBasedTest("run failure test 1", FileComparisonTestRunFailureTest1, testSequence)
}

function FileComparisonTestCreationTest1(resolve, reject)
{
    let test = new tf.FileComparisonTest(
        "FileComparisonTestCreationTest1", 
        function(resolve) {
            resolve(tf.TestResultOutcome.ePassed)
        })
    resolve(tf.TestResultOutcome.ePassed)
}

function FileComparisonTestRunSuccessTest1(resolve, reject)
{
    let test = new tf.FileComparisonTest(
        "FileComparisonTestRunSuccessTest1", 
        function(resolve, reject, test) {
            test.setOutputFilePath(__dirname + "/data/comparisontestfiles/hello.txt");
            test.setReferenceFilePath(__dirname + "/data/comparisontestfiles/hello2.txt");
            resolve(tf.TestResultOutcome.ePassed)
        })

    Promise.resolve(test.run()).then(function() {
        resolve(test.result.outcome)
    })
}

function FileComparisonTestRunFailureTest1(resolve, reject)
{
    let test = new tf.FileComparisonTest(
        "FileComparisonTestRunFailureTest1", 
        function(resolve, reject, test) {
            test.setOutputFilePath(__dirname + "/data/comparisontestfiles/hello.txt");
            test.setReferenceFilePath(__dirname + "/data/comparisontestfiles/nothello.txt");
            resolve(tf.TestResultOutcome.ePassed)
        })

    Promise.resolve(test.run()).then(function() {
        if (test.result.outcome == tf.TestResultOutcome.eFailed) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}
