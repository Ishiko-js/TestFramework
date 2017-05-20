'use strict'

var TestInformation = require('./TestInformation.js')
var TestResult = require('./TestResult.js')
var ObserverEventType = require('./ObserverEventType.js')

module.exports = function(name) {

    this.information = new TestInformation(name)
    this.result = new TestResult

    this.name = function() {
        return this.information.name
    }

    this.run = function(observer) {
        if (observer) {
            observer.notify(ObserverEventType.eTestStart, this)
        }

        if (observer) {
            observer.notify(ObserverEventType.eTestEnd, this)
        }
    }

}
