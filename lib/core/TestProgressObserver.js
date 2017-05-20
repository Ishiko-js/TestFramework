'use strict'

var ObserverEventType = require('./ObserverEventType.js')
var TestResultOutcome = require('./TestResultOutcome.js')

module.exports = function() {

    this.notify = function(eventType, test) {
         switch (eventType) {
             case ObserverEventType.eTestStart:
                 console.log(nesting + test.name() + " started")
                 nesting += "    "
                 break

             case ObserverEventType.eTestEnd:
                 if (nesting.length >= 4) {
                     nesting = nesting.substring(0, (nesting.length - 4))
                 }
                 console.log(nesting + test.name() + " completed, result is " + formatResult(test.result))
                 break
         }
    }

    function formatResult(result) {
        let formattedResult = ""
        switch (result.outcome) {
            case TestResultOutcome.eUnknown:
                formattedResult = "UNKNOWN!!!"
                break

            case TestResultOutcome.ePassed:
                formattedResult = "passed"
                break

            case TestResultOutcome.eFailed:
                formattedResult = "FAILED!!!"
                break

            default:
                formattedResult = "UNEXPECTED OUTCOME ENUM VALUE"
        }
        return formattedResult
    }

    let nesting = ""

}
