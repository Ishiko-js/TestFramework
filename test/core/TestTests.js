'use strict'

var tf = require("../../lib/index.js")
var SimpleTestClass1 = require("./SimpleTestClass1.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("Test tests")
    
    new tf.FunctionBasedTest("Creation test 1", TestCreationTest1, testSequence)
}

function TestCreationTest1()
{
    let testClass = new SimpleTestClass1("SimpleTestClass1");

    return tf.TestResultOutcome.ePassed;
}
