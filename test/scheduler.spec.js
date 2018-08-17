const { calcPP, PPAvalBetween, PPUsedBetween, PPAvalAfter, PPUsedAfter } = require('../src/scheduler.js')

test('Calculate fun', () => {
    let Start = "2018-08-06T10:00:00";
    let End = "2018-08-06T11:00:00";
    let PPmin = 0.1;
    expect(calcPP(Start, End, PPmin)).toBe(6)
});

test('Calculate avalible PP full', () => {
    let slots = [{
        "Start": "2018-08-06T10:00:00",
        "End": "2018-08-06T11:00:00",
        "PPmin": 0.1
    }]
    let start = '2018-08-06T10:00:00'
    expect(PPAvalAfter(slots, start)).toBe(6)
});

test('Calculate avalible PP none', () => {
    let slots = [{
        "Start": "2018-08-06T10:00:00",
        "End": "2018-08-06T11:00:00",
        "PPmin": 0.1
    }]
    let start = '2018-08-06T11:00:00'
    expect(PPAvalAfter(slots, start)).toBe(0)
});

test('Calculate avalible PP partial before', () => {
    let slots = [{
        "Start": "2018-08-06T10:00:00",
        "End": "2018-08-06T11:00:00",
        "PPmin": 0.1
    }]
    let start = '2018-08-06T10:30:00'
    expect(PPAvalAfter(slots, start)).toBe(3)
});

test('Calculate avalible PP partial after', () => {
    let slots = [{
        "Start": "2018-08-06T10:00:00",
        "End": "2018-08-06T11:00:00",
        "PPmin": 0.1
    }]
    let start = '2018-08-06T07:30:00'
    expect(PPAvalAfter(slots, start)).toBe(6)
});

test('Calculate avalible PP', () => {
    let jobs = [{
        "StartDate": "2018-08-01 10:00",
        "EndDate": "2018-08-01 11:00",
        "PPmin": 0.1
    }]
    let start = '2018-08-01T10:00:00'
    expect(PPUsedAfter(jobs, start)).toBe(6)
});

test('Calculate avalible PP partial before', () => {
    let jobs = [{
        "StartDate": "2018-08-01 10:00",
        "EndDate": "2018-08-01 11:00",
        "PPmin": 0.1
    }]
    let start = '2018-08-01T10:30:00'
    expect(PPUsedAfter(jobs, start)).toBe(3)
});

test('Calculate avalible PP partial after', () => {
    let jobs = [{
        "StartDate": "2018-08-01 10:00",
        "EndDate": "2018-08-01 11:00",
        "PPmin": 0.1
    }]
    let start = '2018-08-01T07:30:00'
    expect(PPUsedAfter(jobs, start)).toBe(6)
});

test('Calculate used PP partial', () => {
    let jobs = [{
            "StartDate": "2018-08-01 10:00",
            "EndDate": "2018-08-01 11:00",
            "PPmin": 0.1
        },
        {
            "StartDate": "2018-08-01 10:30",
            "EndDate": "2018-08-01 11:00",
            "PPmin": 0.1
        },
        {
            "StartDate": "2018-08-01 15:30",
            "EndDate": "2018-08-01 16:00",
            "PPmin": 0.1
        }
    ]
    let start = '2018-08-01T10:00:00'
    let end = '2018-08-01T11:00:00'
    expect(PPUsedBetween(jobs, start, end)).toBe(9)
});

test('Calculate avalible PP between', () => {
    let slots = [{
            "Start": "2018-08-06T10:00:00",
            "End": "2018-08-06T11:00:00",
            "PPmin": 0.1
        },
        {
            "Start": "2018-08-06T10:50:00",
            "End": "2018-08-06T11:00:00",
            "PPmin": 1
        }
    ]
    let start = '2018-08-06T10:00:00'
    let end = '2018-08-06T11:00:00'
    expect(PPAvalBetween(slots, start, end)).toBe(16)
});