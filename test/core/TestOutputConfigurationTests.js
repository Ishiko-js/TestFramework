'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("TestOutputConfiguration tests")

    new tf.FunctionBasedTest("Creation test 1", TestOutputConfigurationCreationTest1, testSequence)
}

function TestOutputConfigurationCreationTest1(resolve, reject)
{
    let outputConfig = new tf.TestOutputConfiguration()

    resolve(tf.TestResultOutcome.ePassed)
}
