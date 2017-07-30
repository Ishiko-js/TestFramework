'use strict'

var fs = require('fs')
import { Test } from "./Test.js"
import { TestResultOutcome } from "./TestResultOutcome.js"

/**
  Implements a test where a file is generated
  and its contents compared with a reference file.
  @extends Test
*/
export class FileComparisonTest extends Test {

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

    doRun(configuration, observer) {
        let self = this

        let runFctPromise = new Promise(function(resolve, reject) {
            if (self.runFct) {
                self.runFct(resolve, reject, self)
            } else {
                resolve(TestResultOutcome.ePassed)
            }
        })

        let testPromise = new Promise(function(resolve, reject) {
            runFctPromise.then(function(outcome) {
                if (outcome == TestResultOutcome.ePassed) {
                    if (self.outputFilePath && self.referenceFilePath) {
                        let outputContents = fs.readFileSync(self.outputFilePath)
                        let referenceContents = fs.readFileSync(self.referenceFilePath)
                        if (outputContents.equals(referenceContents)) {
                            resolve(TestResultOutcome.ePassed)
                        } else {
                            resolve(TestResultOutcome.eFailed)
                        }
                    }
                }
            })
        })  

        return testPromise;
    }

}
