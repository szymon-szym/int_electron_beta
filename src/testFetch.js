const moment = require('moment')
const axios = require('axios')

let fakefetch = () => {
    return axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.data)
}
let fakefetch2 = () => {
    return axios.get('https://jsonplaceholder.typicode.com/todos/2')
    .then(res => res.data)
}

const fetchData = async (date, unit, group) => {
    const dateScheduler = moment(date)
    dateScheduler.get('hours') < 3 && dateScheduler.subtract(1, 'day')
    // console.log(dateScheduler);
    const dateAval = dateScheduler.format('DD/MM/YYYY')
    // console.log(dateAval)
    const dateJobs = dateScheduler.format('MM-DD-YYYY')
    // console.log(dateJobs)
    const timeZone = dateScheduler.utcOffset()
    let PPData = {};
    const slots = await fakefetch()
    // const PPminArr = slots.reduce((acc, curr) => {
    //     acc[curr.FMNO] = curr.PPmin
    //     reutrn acc
    // }, {});
    const jobs = await fakefetch2()
    //.map with add PPmin
    PPData.slots = slots
    PPData.jobs = jobs
    return PPData
}
let test = fetchData("19/08/2018", 2, 3)
test