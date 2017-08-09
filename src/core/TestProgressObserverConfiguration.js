'use strict'

/**
  This class represents the configuration for the TestProgressObserver class.

  @property {boolean} this.enabled - Whether this observer is enabled or not.
  @property {boolean} this.exceptionDetails - Whether to print the details of
    an exception if one is thrown during a test execution.
*/
class TestProgressObserverConfiguration {

    constructor(enabled = true, exceptionDetails = true) {
        this.enabled = enabled
        this.exceptionDetails = exceptionDetails
    }

}

export { TestProgressObserverConfiguration }
