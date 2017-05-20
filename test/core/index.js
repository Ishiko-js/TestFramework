'use strict'

var tf = require("../../lib/index.js")
var AddTestTests = require("./TestTests.js")

let theTestHarness = new tf.TestHarness("ishiko-js/test-framework/core")

AddTestTests(theTestHarness);

theTestHarness.run()
