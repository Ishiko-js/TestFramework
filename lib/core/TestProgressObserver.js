'use strict'

var ObserverEventType = require('./ObserverEventType.js')
var TestResultOutcome = require('./TestResultOutcome.js')

module.exports = function() {

    this.notify = function(eventType, test) {
         switch (eventType) {
             case ObserverEventType.eTestStart:
                 console.log(test.name() + " started")
                 break

             case ObserverEventType.eTestEnd:
                 console.log(test.name() + " completed, result is " + formatResult(test.result))
                 break
         }
    }

    function formatResult(result) {
        let formattedResult = ""
        switch (result.outcome) {
            case TestResultOutcome.eUnknown:
                formattedResult = "UNKNOWN!!!"
                break

            default:
                formattedResult = "UNEXPECTED OUTCOME ENUM VALUE"
        }
        return formattedResult
    }

}
