'use strict'

var tf = require("../../dist/ishiko-test-framework.js")
var SimpleTestClass1 = require("./SimpleTestClass1.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("TestProgressObserver tests")

    new tf.FunctionBasedTest("Creation test 1", TestProgressObserverCreationTest1, testSequence)
    new tf.FunctionBasedTest("Creation test 2", TestProgressObserverCreationTest2, testSequence)

    new tf.FunctionBasedTest("notify test 1", TestProgressObserverNotifyTest1, testSequence)
}

function TestProgressObserverCreationTest1(resolve, reject)
{
    let observer = new tf.TestProgressObserver()
    resolve(tf.TestResultOutcome.ePassed)
}

function TestProgressObserverCreationTest2(resolve, reject)
{
    let config = new tf.TestProgressObserverConfiguration()
    config.console = false
    let observer = new tf.TestProgressObserver(config)
    resolve(tf.TestResultOutcome.ePassed)
}

function TestProgressObserverNotifyTest1(resolve, reject)
{
    let config = new tf.TestProgressObserverConfiguration()
    config.console = false
    let observer = new tf.TestProgressObserver(config)

    let test = new SimpleTestClass1("TestProgressObserverNotifyTest1")
    observer.notify(tf.ObserverEventType.eTestStart, test)

    resolve(tf.TestResultOutcome.ePassed)
}
