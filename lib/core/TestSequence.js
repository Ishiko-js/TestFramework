'use strict'

module.exports = function() {

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
