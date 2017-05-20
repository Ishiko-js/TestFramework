'use strict'

var tf = require("../../lib/index.js")

let tests = new tf.TestHarness()
let testSequence = tests.appendTestSequence("ishiko-js/test-framework/core tests")
testSequence.append(new tf.Test("Test1"))
tests.run()