'use strict'

import { TestSequence } from "./TestSequence.js"

export class TopTestSequence extends TestSequence {

    notify(type, observer) {
        // Do nothing because the top level sequence is a 
        // sequence hidden to the user and used by the test 
        // harness internally only
    }

}
