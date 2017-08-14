'use strict'

var tf = require("../../dist/ishiko-test-framework.js")
var AddTestProgressObserverConfigurationTests = require("./TestProgressObserverConfigurationTests.js")
var AddTestOutputConfigurationTests = require("./TestOutputConfigurationTests.js")
var AddTestConfigurationTests = require("./TestConfigurationTests.js")
var AddTestResultTests = require("./TestResultTests.js")
var AddTestTests = require("./TestTests.js")
var AddTestSequenceTests = require("./TestSequenceTests.js")
var AddFunctionBasedTestTests = require("./FunctionBasedTestTests.js")
var AddFileComparisonTestTests = require("./FileComparisonTestTests.js")
var AddTestProgressObserverTests = require("./TestProgressObserverTests")

let theTestHarness = new tf.TestHarness("ishiko-js/test-framework/core")

theTestHarness.environment.setTestDataDirectory("data")

AddTestProgressObserverConfigurationTests(theTestHarness)
AddTestOutputConfigurationTests(theTestHarness)
AddTestConfigurationTests(theTestHarness)
AddTestResultTests(theTestHarness)
AddTestTests(theTestHarness)
AddTestSequenceTests(theTestHarness)
AddFunctionBasedTestTests(theTestHarness)
AddFileComparisonTestTests(theTestHarness)
AddTestProgressObserverTests(theTestHarness)

theTestHarness.run()
