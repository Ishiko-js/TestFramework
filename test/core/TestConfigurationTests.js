'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("TestConfiguration tests")

    new tf.FunctionBasedTest("Creation test 1", TestConfigurationCreationTest1, testSequence)
}

function TestConfigurationCreationTest1(resolve, reject)
{
    let config = new tf.TestConfiguration()

    resolve(tf.TestResultOutcome.ePassed)
}
