'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("TestConfiguration tests")

    new tf.FunctionBasedTest("Creation test 1", TestConfigurationCreationTest1, testSequence)

    new tf.FunctionBasedTest("readFromFile test 1", TestConfigurationReadFromFileTest1, testSequence)
    new tf.FunctionBasedTest("readFromFile test 2", TestConfigurationReadFromFileTest2, testSequence)
}

function TestConfigurationCreationTest1(resolve, reject)
{
    let config = new tf.TestConfiguration()

    resolve(tf.TestResultOutcome.ePassed)
}

function TestConfigurationReadFromFileTest1(resolve, reject)
{
    let result = tf.TestResultOutcome.eFailed
    let config = new tf.TestConfiguration()
    config.readFromFile(__dirname + "/data/testconfigfiles/testconfig1.json")

    if ((config.timeout == 10000) && (config.parallelExecution == true)) {
        result = tf.TestResultOutcome.ePassed
    }
    
    resolve(result)
}

function TestConfigurationReadFromFileTest2(resolve, reject)
{
    let result = tf.TestResultOutcome.eFailed
    let config = new tf.TestConfiguration()
    config.readFromFile(__dirname + "/data/testconfigfiles/testconfig2.json")

    if ((config.timeout == 1000) && (config.parallelExecution == false)) {
        result = tf.TestResultOutcome.ePassed
    }
    
    resolve(result)
}
