'use strict'

var tf = require("../../lib/index.js")
var AddTestTests = require("./TestTests.js")
var AddFunctionBasedTestTests = require("./FunctionBasedTestTests.js")

let theTestHarness = new tf.TestHarness("ishiko-js/test-framework/core")

AddTestTests(theTestHarness);
AddFunctionBasedTestTests(theTestHarness);

theTestHarness.run()
