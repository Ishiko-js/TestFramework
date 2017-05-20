'use strict'

var TestSequence = require('./TestSequence.js')

class TopTestSequence extends TestSequence {

    notify(type, observer) {
        // Do nothing because the top level sequence is a 
        // sequence hidden to the user and used by the test 
        // harness internally only
    }

}

module.exports = TopTestSequence
