function TestHarness() {

    this.run = function() {
        let progressObserver = new TestProgressObserver()
        topSequence.run(progressObserver)
    }

    this.appendTestSequence = function(name) {
        let newTestSequence = new TestSequence(name)
        topSequence.append(newTestSequence)
        return newTestSequence
    }

    let topSequence = new TestSequence()
}

function Test(name) {

    this.information = new TestInformation(name)
    this.result = new TestResult

    this.name = function() {
        return this.information.name
    }

    this.run = function(observer) {
        if (observer) {
            observer.notify(ObserverEventType.eTestStart, this)
        }

        if (observer) {
            observer.notify(ObserverEventType.eTestEnd, this)
        }
    }

}

function TestInformation(name) {

    this.name = name

}

function TestResult() {
}

var ObserverEventType = {
    eTestStart: 0,
    eTestEnd : 1
}

function TestObserver() {
}

function TestProgressObserver() {

    this.notify = function(eventType, test) {
         switch (eventType) {
             case ObserverEventType.eTestStart:
                 console.log(test.name() + " started")
                 break

             case ObserverEventType.eTestEnd:
                 console.log(test.name() + " completed")
                 break
         }
    }

}

function TestSequence() {

    this.run = function(observer) {
        for (let i = 0; i < tests.length; i++) {
             tests[i].run(observer)
        }
    }

    this.append = function(test) {
        tests.push(test)
    }

    let tests = [ ]

}

let tests = new TestHarness()
let testSequence = tests.appendTestSequence()
testSequence.append(new Test("Test1"))
tests.run()