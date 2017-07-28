'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("TestSequence tests")

    new tf.FunctionBasedTest("Creation test 1", TestSequenceCreationTest1, testSequence)
}

function TestSequenceCreationTest1(resolve, reject)
{
    let testSequence = new tf.TestSequence()

    resolve(tf.TestResultOutcome.ePassed)
}
