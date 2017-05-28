'use strict'

/**
  This class stores context information
  that can be used by the tests.

  This is somewhat equivalent to global
  variables for the tests.

  @property {Object} this.testDataDirectories - An 
     associative array that stores a list of directories
     where test data is stored. The "(default)" key acts
     as the default test data directory so you don't have
     to bother with specifying the key if your test
     suite doesn't use more than one test data directory.
     See {@link TestEnvironment#setTestDataDirectory}.
*/
export class TestEnvironment {

    /** Creates a new TestEnvironment instance. */
    constructor() {
        this.testDataDirectories = { }
    }

    /**
      Adds or updates a test data directory. If no id
      is specified then it is considered to be the id
      of the default test data directory: "(default)".

      @param {string} path - The path of the test
        data directory.
      @param {string=} id - The identifier of this
        test data directory.
    */
    setTestDataDirectory(path, id) {
        if (id == null) {
            id = "(default)"
        }
        this.testDataDirectories[id] = path
    }

}
