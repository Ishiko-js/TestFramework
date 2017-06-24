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
    let testPromise = new Promise(function(resolve, reject) {
        let test = new tf.FileComparisonTest(
            "FileComparisonTestRunSuccessTest1", 
            function(test) {
                test.setOutputFilePath(__dirname + "/data/comparisontestfiles/hello.txt");
                test.setReferenceFilePath(__dirname + "/data/comparisontestfiles/hello2.txt");
                return tf.TestResultOutcome.ePassed
            })

        Promise.resolve(test.run()).then(function() {
            resolve(test.result.outcome)
        })
    })
    return testPromise
}

function FileComparisonTestRunFailureTest1()
{
    let testPromise = new Promise(function(resolve, reject) {
        let test = new tf.FileComparisonTest(
            "FileComparisonTestRunFailureTest1", 
            function(test) {
                test.setOutputFilePath(__dirname + "/data/comparisontestfiles/hello.txt");
                test.setReferenceFilePath(__dirname + "/data/comparisontestfiles/nothello.txt");
                return tf.TestResultOutcome.ePassed
            })

        Promise.resolve(test.run()).then(function() {
            if (test.result.outcome == tf.TestResultOutcome.eFailed) {
                resolve(tf.TestResultOutcome.ePassed)
            } else {
                resolve(tf.TestResultOutcome.eFailed)
            }
        })
    })
    return testPromise
}
