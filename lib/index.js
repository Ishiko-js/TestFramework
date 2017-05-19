'use strict'

var TestInformation = require('./core/TestInformation.js')
var TestResult = require('./core/TestResult.js')
var TestProgressObserver = require('./core/TestProgressObserver.js')
var ObserverEventType = require('./core/ObserverEventType.js')

module.exports = {

    Test: Test,
    TestHarness: TestHarness

}

function TestHarness() {

    this.run = function() {
        let progressObserver = new TestProgressObserver()
        topSequence.run(progressObserver)
    }

    this.appendTestSequence = function(name) {
        let newTestSequence = new TestSequence(name)
        topSequence.append(newTestSequence)
        return newTestSequence
    }

    let topSequence = new TestSequence()
}

function Test(name) {

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

function TestSequence() {

    this.run = function(observer) {
        for (let i = 0; i < tests.length; i++) {
             tests[i].run(observer)
        }
    }

    this.append = function(test) {
        tests.push(test)
    }

    let tests = [ ]

}
