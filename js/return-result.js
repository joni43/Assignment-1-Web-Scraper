
const movieNames = {
  '01': 'The Flying Deuces'
  , '02': 'Keep Your Seats, Please'
  , '03': 'A Day at the Races'
}

const dayNames = {
  '05': 'Friday'
  , '06': 'Saturday'
  , '07': 'Sunday'
}

async function returnResult (movie, rest, tryme) {
  // console.log('badboi', tryme)
  for (let m = 0; m < tryme.length; m++) {
    let movieEndTime = parseInt(tryme[m].time.substring(0, 2)) + 2
    console.log('AAAAAAAA', tryme[m])
    for (let r = 0; r < rest.length; r++) {
      let restTime = parseInt(rest[r].substring(3, 5), 10)

       // console.log(movieEndTime, ' ', restTime, ' ', movieEndTime === restTime)
      if (movieEndTime === restTime) {
        tryme[m].table = restTime
        tryme[m].tableEnd = tryme[m].table + 2
      }
    }
  }
  console.log('analbaster', movieNames[0])
let finishproject = tryme.filter(tryme => (tryme.table && tryme.time))
console.log(finishproject)
  finishproject.forEach(tryme => {
    // console.log('Fetching links ok...\nFetching Data ok...\n')
   // console.log(` On ${movie[0].day} there will be a free table between ${movie[0].table}:00 and ${movie[0].endTime}:00,\n after you have seen "${movie[0].movie}" which starts at ${movie[0].time}.\n`)
   console.log(` On ${dayNames[tryme.day]} there will be a free table between  ${tryme.table}:00 and ${tryme.tableEnd}:00,\n after you have seen "${movieNames[tryme.tryme]}" which starts at ${tryme.time}.\n`)
  })
}

module.exports.returnResult = returnResult
