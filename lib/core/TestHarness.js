'use strict'

var TestProgressObserver = require('./TestProgressObserver.js')
var TestSequence = require('./TestSequence.js')

module.exports = function() {

    this.run = function() {
        let progressObserver = new TestProgressObserver()
        topSequence.run(progressObserver)
    }

    this.appendTestSequence = function(name) {
        let newTestSequence = new TestSequence(name)
        topSequence.append(newTestSequence)
        return newTestSequence
    }

    let topSequence = new TestSequence("top")
}
