'use strict'

var tf = require("../../lib/index.js")
var AddTestTests = require("./TestTests.js")
var AddFunctionBasedTestTests = require("./FunctionBasedTestTests.js")
var AddFileComparisonTestTests = require("./FileComparisonTestTests.js")

let theTestHarness = new tf.TestHarness("ishiko-js/test-framework/core")

theTestHarness.environment.setTestDataDirectory("data")

AddTestTests(theTestHarness)
AddFunctionBasedTestTests(theTestHarness)
AddFileComparisonTestTests(theTestHarness)

theTestHarness.run()
