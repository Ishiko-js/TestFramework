'use strict'

var Test = require('./Test.js')

/**
  Implements a test where the test logic is
  implemented by a callback that is passed
  in as argument to the constructor.
  @extends Test
*/
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
