'use strict'

class TestEnvironment {

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
