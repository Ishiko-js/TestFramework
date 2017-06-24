'use strict'

import { Test } from "./Test.js"

/**
  Implements a test where the test logic is
  implemented by a callback that is passed
  in as argument to the constructor.
  @extends Test
*/
export class FunctionBasedTest extends Test {

    constructor(name, runFct, parentSequence) {
        super(name)
        this.runFct = runFct
        if (parentSequence) {
            parentSequence.append(this)
        }
    }

    doRun(observer) {
        let self = this
        let testPromise = new Promise(function(resolve, reject) {
            self.runFct(resolve, reject)
        })
        return testPromise
    }

}
