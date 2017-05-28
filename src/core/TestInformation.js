'use strict'

var TestNumber = require("./TestNumber.js")

/** 
    Stores the number and name of the
    test.
*/
class TestInformation {

    constructor(name) {
        this.number = new TestNumber()
        this.name = name
    }

}

module.exports = TestInformation
