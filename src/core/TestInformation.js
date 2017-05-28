'use strict'

import { TestNumber } from "./TestNumber.js"

/** 
    Stores the number and name of the
    test.
*/
export class TestInformation {

    constructor(name) {
        this.number = new TestNumber()
        this.name = name
    }

}
