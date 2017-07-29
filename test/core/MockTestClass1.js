'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

class MockTestClass1 extends tf.Test {

    constructor(name, behavior) {
        super(name)
        this.behaviour = behavior
    }

    doRun(configuration, observer) {
        if ((this.behavior == null) || (this.behavior == "noreturn")) {
            // do nothing
        }
    }

}

module.exports = MockTestClass1
