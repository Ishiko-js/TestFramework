'use strict'

/** Represents the number of a test. */
export class TestNumber {

    constructor() {
        this.number = [ ]
    }

    clone() {
        let newNumber = new TestNumber()
        for (let i = 0; i < this.number.length; i++) {
             newNumber.number.push(this.number[i])
        }
        return newNumber
    }

    depth() {
        return this.number.length
    }

    part(i) {
        return this.number[i]
    }

    deeperNumber() {
        this.number.push(1)
        return this
    }

    increase() {
        if (this.number.length) {
            this.number[this.number.length - 1]++
        }
        return this
    }
}
