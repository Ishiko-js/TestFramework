# ishiko-test-framework

This project is a test framework for JavaScript.

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

## License

Copyright (c) 2017 Xavier Leclercq

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.