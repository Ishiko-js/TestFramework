'use strict'

var TestNumber = require("./TestNumber.js")

module.exports = function(name) {

    this.number = new TestNumber()
    this.name = name

}
