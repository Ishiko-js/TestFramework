'use strict'

var TestProgressObserver = require('./TestProgressObserver.js')
var TestSequence = require('./TestSequence.js')
var TopTestSequence = require('./TopTestSequence.js')

module.exports = function(name) {

    this.run = function() {
        console.log("Test Suite: " + topSequence.name())
        console.log()

        let progressObserver = new TestProgressObserver()
        topSequence.run(progressObserver)
    }

    this.appendTestSequence = function(name) {
        let newTestSequence = new TestSequence(name)
        topSequence.append(newTestSequence)
        return newTestSequence
    }

    let topSequence = new TopTestSequence(name)
}
