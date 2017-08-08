'use strict'

import { TestProgressObserverConfiguration } from "./TestProgressObserverConfiguration.js"

export class TestOutputConfiguration {

    constructor(progressObserverConfiguration = new TestProgressObserverConfiguration()) {
        this.progressObserverConfiguration = progressObserverConfiguration
    }

}
