'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("TestResult tests")

    new tf.FunctionBasedTest("Creation test 1", TestResultCreationTest1, testSequence)
}

function TestResultCreationTest1(resolve, reject)
{
    let result = new tf.TestResult()

    resolve(tf.TestResultOutcome.ePassed)
}
