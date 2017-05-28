'use strict'

var TestHarness = require('./core/TestHarness.js')
var Test = require('./core/Test.js')
var TestResultOutcome = require('./core/TestResultOutcome.js')
var TestSequence = require('./core/TestSequence.js')
var FunctionBasedTest = require('./core/FunctionBasedTest.js')
var FileComparisonTest = require('./core/FileComparisonTest.js')

module.exports = {

    TestHarness: TestHarness,
    Test: Test,
    TestResultOutcome: TestResultOutcome,
    TestSequence: TestSequence,
    FunctionBasedTest: FunctionBasedTest,
    FileComparisonTest: FileComparisonTest

}
