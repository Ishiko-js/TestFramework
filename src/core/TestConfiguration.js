'use strict'

export class TestConfiguration {

    constructor(parallelExecution = true, timeout = 10000) {
        this.parallelExecution = parallelExecution
        this.timeout = timeout
    }

}
