'use strict'

/**
  This class stores context information
  that can be used by the tests.

  This is somewhat equivalent to global
  variables for the tests.
*/
class TestEnvironment {

    /** Creates a new TestEnvironment instance. */
    constructor() {
        this.testDataDirectories = { }
    }

    setTestDataDirectory(path, id) {
        if (id == null) {
            id = "(default)"
        }
        this.testDataDirectories[id] = path
    }

}

module.exports = TestEnvironment
