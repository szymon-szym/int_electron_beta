export const calcPP = (start, end, PPmin) => {
    let calcStart = new Date(start)
    let calcEnd = new Date(end)
    return ((calcEnd - calcStart) / 60000) * PPmin
};

export const PPAvalAfter = (avalArr, start) => {
    let result = avalArr.filter(e => {
            return !((new Date(e.End)) < (new Date(start)))
        })
        .reduce((acc, curr) => {
            if ((new Date(curr.Start)) < (new Date(start))) {
                return acc += calcPP(start, curr.End, curr.PPmin)
            }
            return acc += calcPP(curr.Start, curr.End, curr.PPmin)
        }, 0)
    return result
}

export const PPUsedAfter = (jobs, start) => {
    let result = jobs.filter(e => {
            return new Date(e.EndDate) > new Date(start)
        })
        .reduce((acc, curr) => {
            if (new Date(curr.StartDate) > new Date(start)) {
                return acc += calcPP(curr.StartDate, curr.EndDate, curr.PPmin)
            }
            return acc += calcPP(start, curr.EndDate, curr.PPmin)
        }, 0)
    return result
}

export const PPAvalBetween = (avalArr, start, end) => {
    let result = avalArr.filter(e => {
        return (new Date(e.End) > new Date(start))&&(new Date(e.Start) < new Date(end))
    })
    .reduce((acc, curr) => {
        let startTime = (new Date(curr.Start))>(new Date(start)) ? new Date(curr.Start) : new Date(start)
        let endTime = (new Date(curr.End))>(new Date(end)) ? new Date(end) : new Date(curr.End)
        return acc += calcPP(startTime, endTime, curr.PPmin)
        }, 0)
    return result
}

export const PPUsedBetween = (jobs, start, end) => {
    let result = jobs.filter(e => {
            return (new Date(e.EndDate) > new Date(start))&&(new Date(e.StartDate) < new Date(end))
        })
        .reduce((acc, curr) => {
            let startTime = (new Date(curr.StartDate))>(new Date(start)) ? new Date(curr.StartDate) : new Date(start)
            let endTime = (new Date(curr.EndDate))>(new Date(end)) ? new Date(end) : new Date(curr.EndDate)
            return acc += calcPP(startTime, endTime, curr.PPmin)
        }, 0)
    return result
}
