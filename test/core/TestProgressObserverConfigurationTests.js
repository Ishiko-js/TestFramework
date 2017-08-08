'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("TestProgressObserverConfiguration tests")

    new tf.FunctionBasedTest("Creation test 1", TestProgressObserverConfigurationCreationTest1, testSequence)
}

function TestProgressObserverConfigurationCreationTest1(resolve, reject)
{
    let observerConfig = new tf.TestProgressObserverConfiguration()

    resolve(tf.TestResultOutcome.ePassed)
}
