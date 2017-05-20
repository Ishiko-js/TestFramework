'use strict'

var Test = require('./Test.js')

class FunctionBasedTest extends Test {

    constructor(name, runFct, parentSequence) {
        super(name)
        this.runFct = runFct
        if (parentSequence) {
            parentSequence.append(this)
        }
    }

    doRun(observer) {
        return this.runFct(observer)
    }

}

module.exports = FunctionBasedTest
