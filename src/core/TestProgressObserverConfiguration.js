'use strict'

/**
  This class represents the configuration for the TestProgressObserver class.

  @property {boolean} this.enabled - Whether this observer is enabled or not.
  @property {boolean} this.exceptionDetails - Whether to print the details of
    an exception if one is thrown during a test execution.
  @property {boolean} this.console - Whether the output needs to be printed to
    the console.
  @property {string} this.filepath - If this is not null it's the path to a file
    where the output will be written.
*/
class TestProgressObserverConfiguration {

    constructor(enabled = true, exceptionDetails = true) {
        this.enabled = enabled
        this.exceptionDetails = exceptionDetails
        this.console = true
        this.filepath = null
    }

}

export { TestProgressObserverConfiguration }
