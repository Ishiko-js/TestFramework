'use strict'

import { TestProgressObserverConfiguration } from "./TestProgressObserverConfiguration.js"
import { ObserverEventType } from "./ObserverEventType.js"
import { TestResultOutcome } from "./TestResultOutcome.js"
import { TestSequence } from "./TestSequence.js"

var fs = require('fs')

var nesting = Symbol()

/** 
  Observes the progress when a test is being executed
  and prints that information on the console.
  @extends TestObserver
*/
export class TestProgressObserver {

    constructor(configuration = new TestProgressObserverConfiguration()) {
        this.configuration = configuration
        if (this.configuration.filepath != null) {
            this.file = fs.createWriteStream(this.configuration.filepath)
        }
        this.notify = function(eventType, test) {
             switch (eventType) {
                 case ObserverEventType.eTestStart:
                     if (this.configuration.console) {
                         console.log(this[nesting] + formatNumber(test.number()) + " " + test.name() + " started")
                     }
                     this[nesting] += "    "
                     break

                 case ObserverEventType.eTestEnd:
                     if (this[nesting].length >= 4) {
                         this[nesting] = this[nesting].substring(0, (this[nesting].length - 4))
                     }
                     if (this.configuration.console) {
                         console.log(this[nesting] + formatNumber(test.number()) + " " + test.name() +
                             " completed, result is " + formatResult(test.result, this.configuration, test instanceof TestSequence))
                     }
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

function formatResult(result, configuration, isSequence) {
    let formattedResult = ""
    switch (result.outcome) {
        case TestResultOutcome.eUnknown:
            formattedResult = "UNKNOWN!!!"
            break

        case TestResultOutcome.ePassed:
            formattedResult = "passed"
            break

       case TestResultOutcome.eException:
            formattedResult = "EXCEPTION THROWN!!!"
            // If this is a test sequence we do no want to print the
            // exception details as there wouldn't be any, it's the
            // individual tests that have that information
            if (!isSequence) {
                if (configuration.exceptionDetails) {
                    formattedResult += "\nException details:\n"
                    if (result.exception instanceof Error) {
                        formattedResult += result.exception.stack
                    } else {
                        formattedResult += result.exception
                    }
                }
            }
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
            formattedResult = "UNEXPECTED OUTCOME ENUM VALUE: " + result.outcome
    }
    return formattedResult
}
