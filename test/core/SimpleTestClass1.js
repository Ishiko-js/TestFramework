'use strict'

var tf = require("../../dist/ishiko-test-framework.js")

class SimpleTestClass1 extends tf.Test {

    constructor(name) {
        super(name)
    }

    // doRun function not overriden on purpose
}

module.exports = SimpleTestClass1
