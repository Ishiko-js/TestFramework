(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"));
	else if(typeof define === 'function' && define.amd)
		define(["fs"], factory);
	else if(typeof exports === 'object')
		exports["IshikoTestFramework"] = factory(require("fs"));
	else
		root["IshikoTestFramework"] = factory(root["fs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestResultOutcome; });


/**
  The possible outcomes of a test.
  @readonly
  @enum {number}
*/
var TestResultOutcome = {
    /**
      The result of the test is unknown.
      This is used as the initial value before
      the test has been run.
    */
    eUnknown: 0,
    /** The test passed. */
    ePassed: 1,
    /** The code being tested threw an exception */
    eException: 2,
    /** The test failed. */
    eFailed: 3,
    /** 
      The test couldn't be executed correctly. 
      This indicates an error with the way was written
      rather than a problem with the code that is being
      tested.
    */
    eExecutionError: 4,
    /**
      The test execution timed out.
    */
    eExecutionTimeout: 5
}

 

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestInformation_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TestResult_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TestConfiguration_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ObserverEventType_js__ = __webpack_require__(7);








/**
  <p>The base class for all the classes implementing tests.</p>

  <p>Derived classes should override the doRun() method to
  implement their specific test logic.</p>

   @property {TestInformation} this.information - The description of the test (number, name, etc)
   @property {TestResult} this.result - The result of the test
*/
class Test {

    /** 
      Creates a new Test instance.
      @param {string} name - The name of the test.
    */
    constructor(name) {
        this.information = new __WEBPACK_IMPORTED_MODULE_0__TestInformation_js__["a" /* TestInformation */](name)
        this.result = new __WEBPACK_IMPORTED_MODULE_1__TestResult_js__["a" /* TestResult */]()
    }

    number() {
        return this.information.number
    }

    name() {
        return this.information.name
    }

    passed() {
        return this.result.passed()
    }

    /**
      <p>Executes the test.</p>

      <p>This method should not be overriden. Override
      doRun().</p>

      @param {TestObserver=} observer - An observer that
        will monitor the execution of the test.
      @returns {Promise} A promise that will indicate when
        the test is complete.
    */
    run({ configuration = new __WEBPACK_IMPORTED_MODULE_3__TestConfiguration_js__["a" /* TestConfiguration */](), observer = null } = { }) {
        let self = this
        let timeout = null
        let testPromise = new Promise(function(resolve, reject) {
            self.notify(__WEBPACK_IMPORTED_MODULE_4__ObserverEventType_js__["a" /* ObserverEventType */].eTestStart, observer)
        
            let outcomePromise = Promise.resolve(self.tryDoRun(configuration, observer))
            if (outcomePromise) {
                outcomePromise
                    .then(function(outcome) {
                        let keyFound = false
                        var keys = Object.keys(__WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */])
                        for (let i = 0; i < keys.length; i++) {
                            if (__WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */][keys[i]] == outcome) {
                                keyFound = true
                                break
                            }
                        }
                        if (keyFound) {
                            self.result.outcome = outcome
                        } else {
                            self.result.outcome = __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eExecutionError
                        }
                        self.notify(__WEBPACK_IMPORTED_MODULE_4__ObserverEventType_js__["a" /* ObserverEventType */].eTestEnd, observer)
                        if (timeout) {
                            clearTimeout(timeout)
                        }
                        resolve()
                    })
                    .catch(function(err) {
                        self.result.outcome = __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eException
                        self.result.exception = err
                        self.notify(__WEBPACK_IMPORTED_MODULE_4__ObserverEventType_js__["a" /* ObserverEventType */].eTestEnd, observer)
                        if (timeout) {
                            clearTimeout(timeout)
                        }
                        resolve()
                    })
            } else {
                self.result.outcome = __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eExecutionError
                self.notify(__WEBPACK_IMPORTED_MODULE_4__ObserverEventType_js__["a" /* ObserverEventType */].eTestEnd, observer)
                if (timeout) {
                    clearTimeout(timeout)
                }
                resolve()
            }
        })
        let timeoutPromise = new Promise(function(resolve, reject) {
            timeout = setTimeout(function() {
                if (self.result.outcome == __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eUnknown) {
                   self.result.outcome = __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eExecutionTimeout
                   self.notify(__WEBPACK_IMPORTED_MODULE_4__ObserverEventType_js__["a" /* ObserverEventType */].eTestEnd, observer)
                }
                resolve()
            },
            configuration.timeout)
        })
        let testPromiseWithTimeout = Promise.race([ testPromise, timeoutPromise ]) 
        return testPromiseWithTimeout
    }

    tryDoRun(configuration, observer) {
        try {
            return this.doRun(configuration, observer)
        } catch(err) {
            return Promise.reject(err);
        }
    }

    /**
      <p>Called by {@link Test#run} to execute the test. Do not
         call this function directly.</p>

      <p>This function is meant to be overriden by specific 
         test classes.The base class implementation always 
         returns TestResultOutcome.eFailed.</p>

      <p>If the test is asynchronous this function should
         return a Promise with an executor function that
         passes the outcome of the test to the resolve 
         function. So even even if the test fails resolve 
         should be used, not reject. Use reject to indicate
         the test couldn't be run.</p>

      @virtual
      @returns {TestResultOutcome|Promise} The outcome of the
        test or a Promise that will provide the outcome of the
        test.
      @see FunctionBasedTest
      @see FileComparisonTest
    */
    doRun(configuration, observer) {
        return __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eFailed
    }

    notify(type, observer) {
        if (observer) {
            observer.notify(type, this)
        }
    }

}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestOutputConfiguration_js__ = __webpack_require__(5);




class TestConfiguration {

    constructor(parallelExecution = true, timeout = 10000, outputConfiguration = new __WEBPACK_IMPORTED_MODULE_0__TestOutputConfiguration_js__["a" /* TestOutputConfiguration */]()) {
        this.parallelExecution = parallelExecution
        this.timeout = timeout
        this.outputConfiguration = outputConfiguration
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestConfiguration;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class TestProgressObserverConfiguration {

    constructor(enabled = true) {
        this.enabled = enabled
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestProgressObserverConfiguration;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestSequence; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Test_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__ = __webpack_require__(0);





/**
  Represents a sequence of tests.
  @extends Test
*/
class TestSequence extends __WEBPACK_IMPORTED_MODULE_0__Test_js__["a" /* Test */] {

    /** 
      Creates a new TestSequence instance.
      @param {string} name - The name of the test sequence.
    */
    constructor(name) {
        super(name)
        this.tests = [ ]
    }

    /**
      Executes the test.
      @returns {Promise} a Promise that will provide the outcome of the
        test.
    */
    doRun(configuration, observer) {
        let self = this
        let testOutcomePromise = new Promise(function(resolve, reject) {

            let allTestsCompletePromise = null
            if (configuration.parallelExecution) {
                // Start all tests in the sequence
                let testPromises = [ ];
                for (let i = 0; i < self.tests.length; i++) {
                    let test = self.tests[i]
                    let testPromise = Promise.resolve(test.run({ configuration: configuration, observer: observer }))
                    testPromises.push(testPromise)
                }
                allTestsCompletePromise = Promise.all(testPromises)
            } else {
                allTestsCompletePromise = new Promise(function(resolve, reject) {
                    runNextTest(self.tests, 0, configuration, observer, resolve)
                })
            }

            // Wait for all tests to complete and update the
            // test sequence result
            allTestsCompletePromise.then(function() {
                let result = __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eUnknown

                for (let i = 0; i < self.tests.length; i++) {
                    let test = self.tests[i]
                    let outcome = test.result.outcome
                    if (i == 0) {
                        // The first test determines the initial value of the result
                        result = outcome
                    } else if (result == __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eUnknown) {
                        // If the current sequence outcome is unknown it can only get worse and be set
                        // to exception or failed (if the outcome we are adding is exception or failed)
                        if ((outcome == __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eFailed) || (outcome == __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eException)) {
                            result = outcome;
                        }
                    } else if (result == __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed) {
                        // If the current sequence outcome is passed it stays at this state only if the
                        // result we are adding is passed, else it will be 'unknown', 
                        // 'passedButMemoryLeaks', 'exception' or 'failed'.
                        // depending on the outcome of the result we are adding.
                        result = outcome;
                    }
                }

                resolve(result)
            })
        })
        return testOutcomePromise
    }

    append(test) {
        // We need to update the number of the test
        if (this.tests.length == 0) {
            let newNumber = this.number().clone();
            test.information.number = newNumber.deeperNumber()
        } else {
            let newNumber = this.tests[this.tests.length - 1].number().clone();
            test.information.number = newNumber.increase()
	}

        this.tests.push(test)
    }

}

function runNextTest(tests, index, configuration, observer, resolve) {
    if (index < tests.length) {
        // Execute all tests sequentially
        tests[index].run({ configuration: configuration, observer: observer })
            .then(function() {
                runNextTest(tests, (index+1), configuration, observer, resolve)
            })
    } else {
        resolve()
    }
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestProgressObserverConfiguration_js__ = __webpack_require__(3);




class TestOutputConfiguration {

    constructor(progressObserverConfiguration = new __WEBPACK_IMPORTED_MODULE_0__TestProgressObserverConfiguration_js__["a" /* TestProgressObserverConfiguration */]()) {
        this.progressObserverConfiguration = progressObserverConfiguration
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestOutputConfiguration;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestResult; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestResultOutcome_js__ = __webpack_require__(0);




/** 
  Represents the result of a test.

  @property {TestResultOutcome} this.outcome - An enum indicating the outcome of the test
*/
class TestResult {

    /**
      Creates a new TestResult instance. The outcome is
      set to TestResultOutcome.eUnknown.
    */
    constructor() {
        this.outcome = __WEBPACK_IMPORTED_MODULE_0__TestResultOutcome_js__["a" /* TestResultOutcome */].eUnknown
        this.exception = null
    }

    /**
      Checks whether the test passed.

      @returns True if this.outcome is TestResultOutcome.ePassed,
        False in all other cases.
    */
    passed() {
        return (this.outcome == __WEBPACK_IMPORTED_MODULE_0__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed)
    }

}




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserverEventType; });


/**
  The type of events generated by
  test runs.

  @readonly
  @enum {number}
*/
var ObserverEventType = {
    /** The test has started. */
    eTestStart: 0,
    /**
      The test has completed and its result
      has been updated.
    */
    eTestEnd : 1
}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileComparisonTest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Test_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__ = __webpack_require__(0);


var fs = __webpack_require__(17)



/**
  Implements a test where a file is generated
  and its contents compared with a reference file.
  @extends Test
*/
class FileComparisonTest extends __WEBPACK_IMPORTED_MODULE_0__Test_js__["a" /* Test */] {

    /**
      Callback that implements a specific test case.
      @callback FileComparisonTestRunFct
      @return {TestResultOutcome} The outcome of the test.
    */

    /**
      Creates a new FileComparisonTest instance.
      @param {string} name - The name of the test.
      @param {FileComparisonTestRunFct} runFct - The callback that 
        will run the test and should generate the file
        that will be compared to the reference file.
      @param {TestSequence=} parentSequence - A test
        sequence to which the new test will be appended.
    */
    constructor(name, runFct, parentSequence) {
        super(name)
        this.runFct = runFct
        if (parentSequence) {
            parentSequence.append(this)
        }
    }

    setOutputFilePath(path) {
        this.outputFilePath = path;
    }

    setReferenceFilePath(path){
        this.referenceFilePath = path;
    }

    doRun(configuration, observer) {
        let self = this

        let runFctPromise = new Promise(function(resolve, reject) {
            if (self.runFct) {
                self.runFct(resolve, reject, self)
            } else {
                resolve(__WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed)
            }
        })

        let testPromise = new Promise(function(resolve, reject) {
            runFctPromise.then(function(outcome) {
                if (outcome == __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed) {
                    if (self.outputFilePath && self.referenceFilePath) {
                        let outputContents = fs.readFileSync(self.outputFilePath)
                        let referenceContents = fs.readFileSync(self.referenceFilePath)
                        if (outputContents.equals(referenceContents)) {
                            resolve(__WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed)
                        } else {
                            resolve(__WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eFailed)
                        }
                    } else {
                        resolve(__WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eExecutionError)
                    }
                } else {
                    resolve(outcome)
                }
            })
        })  

        return testPromise;
    }

}




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Test_js__ = __webpack_require__(1);




/**
  Implements a test where the test logic is
  implemented by a callback that is passed
  in as argument to the constructor.
  @extends Test
*/
class FunctionBasedTest extends __WEBPACK_IMPORTED_MODULE_0__Test_js__["a" /* Test */] {

    constructor(name, runFct, parentSequence) {
        super(name)
        this.runFct = runFct
        if (parentSequence) {
            parentSequence.append(this)
        }
    }

    doRun(configuration, observer) {
        let self = this
        let testPromise = new Promise(function(resolve, reject) {
            self.runFct(resolve, reject)
        })
        return testPromise
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = FunctionBasedTest;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestHarness; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestConfiguration_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TestProgressObserver_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TestSequence_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TestEnvironment_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TopTestSequence_js__ = __webpack_require__(15);








let topSequence = Symbol()

/** 
  The class that manages the execution of the
  test suite. Think of this as the entry point
  for a test suite.

  @example
'use strict'

var tf = require("ishiko-test-framework")

// Create the test harness
let theTestHarness = new tf.TestHarness("My First Test Suite")

// Add a test sequence
let numberTests = theTestHarness.appendTestSequence("Number tests")

// Add the first test to the test sequence
new tf.FunctionBasedTest(
    "Addition",
    function(resolve) {
        if ((3 + 2) == 5) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    },
    numberTests)

// Add a second test to the test sequence
new tf.FunctionBasedTest(
    "Subtraction",
    function(resolve) {
        if ((3 - 2) == 2) {
            resolve(tf.TestResultOutcome.ePassed)
        } else {
            resolve(tf.TestResultOutcome.eFailed)
        }
    },
    numberTests)

// Run the test suite
theTestHarness.run()

*/
class TestHarness {

    /** 
      Creates a new TestHarness instance.
      @param {string} name - The title of the test suite.
    */
    constructor(name) {
        this.environment = new __WEBPACK_IMPORTED_MODULE_3__TestEnvironment_js__["a" /* TestEnvironment */]()
        this[topSequence] = new __WEBPACK_IMPORTED_MODULE_4__TopTestSequence_js__["a" /* TopTestSequence */](name)
    }

    /**
      Executes the tests in the test suite.
    */
    run() {
        let self = this
        console.log("Test Suite: " + self[topSequence].name())
        console.log()

        let configuration = new __WEBPACK_IMPORTED_MODULE_0__TestConfiguration_js__["a" /* TestConfiguration */](false)

        let progressObserver = null
        if (configuration.outputConfiguration.progressObserverConfiguration.enabled) {
            progressObserver = new __WEBPACK_IMPORTED_MODULE_1__TestProgressObserver_js__["a" /* TestProgressObserver */]()
        }

        let testPromise = Promise.resolve(self[topSequence].run({ configuration: configuration, observer: progressObserver }))
        testPromise.then(function() {
            console.log()
            if (!self[topSequence].passed()) {
                console.log("Test Suite FAILED!!!")
            } else {
                console.log("Test Suite passed")
            }
        })
    }

    appendTestSequence(name) {
        let newTestSequence = new __WEBPACK_IMPORTED_MODULE_2__TestSequence_js__["a" /* TestSequence */](name)
        this[topSequence].append(newTestSequence)
        return newTestSequence
    }

}




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestEnvironment; });


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
class TestEnvironment {

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




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestNumber_js__ = __webpack_require__(13);




/** 
    Stores the number and name of the
    test.
*/
class TestInformation {

    constructor(name) {
        this.number = new __WEBPACK_IMPORTED_MODULE_0__TestNumber_js__["a" /* TestNumber */]()
        this.name = name
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestInformation;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/** Represents the number of a test. */
class TestNumber {

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
/* harmony export (immutable) */ __webpack_exports__["a"] = TestNumber;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestProgressObserverConfiguration_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObserverEventType_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__ = __webpack_require__(0);






var nesting = Symbol()

/** 
  Observes the progress when a test is being executed
  and prints that information on the console.
  @extends TestObserver
*/
class TestProgressObserver {

    constructor(configuration = new __WEBPACK_IMPORTED_MODULE_0__TestProgressObserverConfiguration_js__["a" /* TestProgressObserverConfiguration */]()) {
        this.notify = function(eventType, test) {
             switch (eventType) {
                 case __WEBPACK_IMPORTED_MODULE_1__ObserverEventType_js__["a" /* ObserverEventType */].eTestStart:
                     console.log(this[nesting] + formatNumber(test.number()) + " " + test.name() + " started")
                     this[nesting] += "    "
                     break

                 case __WEBPACK_IMPORTED_MODULE_1__ObserverEventType_js__["a" /* ObserverEventType */].eTestEnd:
                     if (this[nesting].length >= 4) {
                         this[nesting] = this[nesting].substring(0, (this[nesting].length - 4))
                     }
                     console.log(this[nesting] + formatNumber(test.number()) + " " + test.name() +
                         " completed, result is " + formatResult(test.result))
                     break
             }
        }
        this[nesting] = ""
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestProgressObserver;


function formatNumber(number) {
    let formattedNumber = ""
    for (let i = 0; i < number.depth(); i++) {
         formattedNumber += number.part(i) + ".";
    }
    return formattedNumber
}

function formatResult(result) {
    let formattedResult = ""
    switch (result.outcome) {
        case __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eUnknown:
            formattedResult = "UNKNOWN!!!"
            break

        case __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed:
            formattedResult = "passed"
            break

       case __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eException:
            formattedResult = "EXCEPTION THROWN!!!"
            break

        case __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eFailed:
            formattedResult = "FAILED!!!"
            break

        case __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eExecutionError:
            formattedResult = "EXECUTION ERROR!!!"
            break

        case __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eTimeout:
            formattedResult = "TIMEOUT!!!"
            break

        default:
            formattedResult = "UNEXPECTED OUTCOME ENUM VALUE: " + result.outcome
    }
    return formattedResult
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestSequence_js__ = __webpack_require__(4);




class TopTestSequence extends __WEBPACK_IMPORTED_MODULE_0__TestSequence_js__["a" /* TestSequence */] {

    notify(type, observer) {
        // Do nothing because the top level sequence is a 
        // sequence hidden to the user and used by the test 
        // harness internally only
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TopTestSequence;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_TestProgressObserverConfiguration_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_TestOutputConfiguration_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_TestConfiguration_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_TestHarness_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_Test_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_TestResult_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_TestResultOutcome_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_TestSequence_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_FunctionBasedTest_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_FileComparisonTest_js__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestHarness", function() { return __WEBPACK_IMPORTED_MODULE_3__core_TestHarness_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestConfiguration", function() { return __WEBPACK_IMPORTED_MODULE_2__core_TestConfiguration_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestOutputConfiguration", function() { return __WEBPACK_IMPORTED_MODULE_1__core_TestOutputConfiguration_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestProgressObserverConfiguration", function() { return __WEBPACK_IMPORTED_MODULE_0__core_TestProgressObserverConfiguration_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Test", function() { return __WEBPACK_IMPORTED_MODULE_4__core_Test_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestResult", function() { return __WEBPACK_IMPORTED_MODULE_5__core_TestResult_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestResultOutcome", function() { return __WEBPACK_IMPORTED_MODULE_6__core_TestResultOutcome_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestSequence", function() { return __WEBPACK_IMPORTED_MODULE_7__core_TestSequence_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionBasedTest", function() { return __WEBPACK_IMPORTED_MODULE_8__core_FunctionBasedTest_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FileComparisonTest", function() { return __WEBPACK_IMPORTED_MODULE_9__core_FileComparisonTest_js__["a"]; });
















/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ })
/******/ ]);
});