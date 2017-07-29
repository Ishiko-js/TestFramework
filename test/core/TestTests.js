'use strict'

var tf = require("../../dist/ishiko-test-framework.js")
var SimpleTestClass1 = require("./SimpleTestClass1.js")
var MockTestClass1 = require("./MockTestClass1.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("Test tests")
    
    new tf.FunctionBasedTest("Creation test 1", TestCreationTest1, testSequence)

    new tf.FunctionBasedTest("run test 1", TestRunTest1, testSequence)
    new tf.FunctionBasedTest("run test 2", TestRunTest2, testSequence)
}

function TestCreationTest1(resolve, reject)
{
    let testClass = new SimpleTestClass1("TestCreationTest1")

    resolve(tf.TestResultOutcome.ePassed)
}

function TestRunTest1(resolve, reject)
{
    let testClass = new SimpleTestClass1("TestRunTest1")

    testClass.run().then(function() {
        // By default the base class doRun returns failed and SimpleClass1
        // doesn't override it
        if (testClass.result.outcome  == tf.TestResultOutcome.eFailed) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}

function TestRunTest2(resolve, reject)
{
    let testClass = new MockTestClass1("TestRunTest2")

    testClass.run().then(function() {
        if (testClass.result.outcome == tf.TestResultOutcome.eExecutionError) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}
