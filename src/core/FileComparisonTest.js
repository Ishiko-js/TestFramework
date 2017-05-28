'use strict'

var fs = require('fs')
var Test = require('./Test.js')
var TestResultOutcome = require('./TestResultOutcome.js')

/**
  Implements a test where a file is generated
  and its contents compared with a reference file.
  @extends Test
*/
class FileComparisonTest extends Test {

    /**
      Callback that implements a specific test case.
      @callback FileComparisonTestRunFct
      @return {TestResultOutcome} The outcome of the test.
    */

    /**
      Creates a new FileComparisonTest instance.
      @param {string} name - The name of the test.
      @param {FileComparisonTestRunFct} runFct - The callback that 
        will run the test and should generate the file
        that will be compared to the reference file.
      @param {TestSequence=} parentSequence - A test
        sequence to which the new test will be appended.
    */
    constructor(name, runFct, parentSequence) {
        super(name)
        this.runFct = runFct
        if (parentSequence) {
            parentSequence.append(this)
        }
    }

    setOutputFilePath(path) {
        this.outputFilePath = path;
    }

    setReferenceFilePath(path){
        this.referenceFilePath = path;
    }

    doRun(observer) {
        let result = TestResultOutcome.eFailed

        if (this.runFct) {
            result = this.runFct(this);
        } else {
            result = TestResultOutcome.ePassed
        }

        if (result == TestResultOutcome.ePassed) {
            result = TestResultOutcome.eFailed
            if (this.outputFilePath && this.referenceFilePath) {
                let outputContents = fs.readFileSync(this.outputFilePath)
                let referenceContents = fs.readFileSync(this.referenceFilePath)
                if (outputContents.equals(referenceContents)) {
                    result = TestResultOutcome.ePassed
                }
            }
        }

        return result;
    }

}

module.exports = FileComparisonTest
