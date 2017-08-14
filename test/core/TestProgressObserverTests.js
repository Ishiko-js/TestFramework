'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("TestProgressObserver tests")

    new tf.FunctionBasedTest("Creation test 1", TestProgressObserverCreationTest1, testSequence)
}

function TestProgressObserverCreationTest1(resolve, reject)
{
    let observer = new tf.TestProgressObserver()

    resolve(tf.TestResultOutcome.ePassed)
}
