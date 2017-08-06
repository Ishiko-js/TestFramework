'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

class MockTestClass1 extends tf.Test {

    constructor(name, behavior) {
        super(name)
        this.behavior = behavior
    }

    doRun(configuration, observer) {
        if ((this.behavior == null) || (this.behavior == "noreturn")) {
            // do nothing
        } else if (this.behavior == "returnfailed") {
            return tf.TestResultOutcome.eFailed
        } else if (this.behavior == "returnpassed") {
            return tf.TestResultOutcome.ePassed
        } else if (this.behavior == "returnpromisefailed") {
            return new Promise(function(resolve, reject) {
                resolve(tf.TestResultOutcome.eFailed)
            })
        } else if (this.behavior == "returnpromisepassed") {
            return new Promise(function(resolve, reject) {
                resolve(tf.TestResultOutcome.ePassed)
            })
        } else if (this.behavior == "throwexception") {
            throw "MockTestClass1Exception"
        }
    }

}

module.exports = MockTestClass1
