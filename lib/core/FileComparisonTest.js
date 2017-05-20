'use strict'

var fs = require('fs')
var Test = require('./Test.js')
var TestResultOutcome = require('./TestResultOutcome.js')

class FileComparisonTest extends Test {

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
