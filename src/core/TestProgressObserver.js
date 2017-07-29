'use strict'

import { ObserverEventType } from "./ObserverEventType.js"
import { TestResultOutcome } from "./TestResultOutcome.js"

var nesting = Symbol()

/** 
  Observes the progress when a test is being executed
  and prints that information on the console.
  @extends TestObserver
*/
export class TestProgressObserver {

    constructor() {
        this.notify = function(eventType, test) {
             switch (eventType) {
                 case ObserverEventType.eTestStart:
                     console.log(this[nesting] + formatNumber(test.number()) + " " + test.name() + " started")
                     this[nesting] += "    "
                     break

                 case ObserverEventType.eTestEnd:
                     if (this[nesting].length >= 4) {
                         this[nesting] = this[nesting].substring(0, (this[nesting].length - 4))
                     }
                     console.log(this[nesting] + formatNumber(test.number()) + " " + test.name() +
                         " completed, result is " + formatResult(test.result))
                     break
             }
        }
        this[nesting] = ""
    }

}

function formatNumber(number) {
    let formattedNumber = ""
    for (let i = 0; i < number.depth(); i++) {
         formattedNumber += number.part(i) + ".";
    }
    return formattedNumber
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

        case TestResultOutcome.eExecutionError:
            formattedResult = "EXECUTION ERROR!!!"
            break

        case TestResultOutcome.eTimeout:
            formattedResult = "TIMEOUT!!!"
            break

        default:
            formattedResult = "UNEXPECTED OUTCOME ENUM VALUE"
    }
    return formattedResult
}
