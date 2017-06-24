'use strict'

var tf = require("../../dist/ishiko-test-framework.js")
var SimpleTestClass1 = require("./SimpleTestClass1.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("Test tests")
    
    new tf.FunctionBasedTest("Creation test 1", TestCreationTest1, testSequence)
}

function TestCreationTest1(resolve, reject)
{
    let testClass = new SimpleTestClass1("SimpleTestClass1")

    resolve(tf.TestResultOutcome.ePassed)
}
