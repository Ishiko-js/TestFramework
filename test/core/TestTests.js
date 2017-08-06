'use strict'

var tf = require("../../dist/ishiko-test-framework.js")
var SimpleTestClass1 = require("./SimpleTestClass1.js")
var MockTestClass1 = require("./MockTestClass1.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("Test tests")
    
    new tf.FunctionBasedTest("Creation test 1", TestCreationTest1, testSequence)

    new tf.FunctionBasedTest("run test 1", TestRunTest1, testSequence)
    new tf.FunctionBasedTest("run test 2", TestRunTest2, testSequence)
    new tf.FunctionBasedTest("run test 3", TestRunTest3, testSequence)
    new tf.FunctionBasedTest("run test 4", TestRunTest4, testSequence)
    new tf.FunctionBasedTest("run test 5", TestRunTest5, testSequence)
    new tf.FunctionBasedTest("run test 6", TestRunTest6, testSequence)
    new tf.FunctionBasedTest("run test 7", TestRunTest7, testSequence)
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
    let testClass = new MockTestClass1("TestRunTest2", "noreturn")

    testClass.run().then(function() {
        if (testClass.result.outcome == tf.TestResultOutcome.eExecutionError) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}

function TestRunTest3(resolve, reject)
{
    let testClass = new MockTestClass1("TestRunTest3", "returnfailed")

    testClass.run().then(function() {
        if (testClass.result.outcome == tf.TestResultOutcome.eFailed) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}

function TestRunTest4(resolve, reject)
{
    let testClass = new MockTestClass1("TestRunTest4", "returnpassed")

    testClass.run().then(function() {
        if (testClass.result.outcome == tf.TestResultOutcome.ePassed) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}

function TestRunTest5(resolve, reject)
{
    let testClass = new MockTestClass1("TestRunTest5", "returnpromisefailed")

    testClass.run().then(function() {
        if (testClass.result.outcome == tf.TestResultOutcome.eFailed) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}

function TestRunTest6(resolve, reject)
{
    let testClass = new MockTestClass1("TestRunTest6", "returnpromisepassed")

    testClass.run().then(function() {
        if (testClass.result.outcome == tf.TestResultOutcome.ePassed) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}

function TestRunTest7(resolve, reject)
{
    let testClass = new MockTestClass1("TestRunTest7", "throwexception")

    testClass.run().then(function() {
        if (testClass.result.outcome == tf.TestResultOutcome.eException) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    })
}
