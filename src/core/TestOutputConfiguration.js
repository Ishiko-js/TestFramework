'use strict'

import { TestProgressObserverConfiguration } from "./TestProgressObserverConfiguration.js"

/**
  This class represents the configuration for the various possible output mechanisms.
*/
class TestOutputConfiguration {

    constructor(progressObserverConfiguration = new TestProgressObserverConfiguration()) {
        this.progressObserverConfiguration = progressObserverConfiguration
    }

}

export { TestOutputConfiguration }
