'use strict'

var ObserverEventType = require('./ObserverEventType.js')

module.exports = function() {

    this.notify = function(eventType, test) {
         switch (eventType) {
             case ObserverEventType.eTestStart:
                 console.log(test.name() + " started")
                 break

             case ObserverEventType.eTestEnd:
                 console.log(test.name() + " completed")
                 break
         }
    }

}
