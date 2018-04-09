
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

async function returnResult (movie, rest) {
   console.log('AAAAAAAA', rest)
  // console.log('assfuck', movie)
  for (let m = 0; m < movie.length; m++) {
    let movieEndTime = parseInt(movie[m].time.substring(0, 2)) + 2

    for (let r = 0; r < rest.length; r++) {
      let restTime = parseInt(rest[r].substring(3, 5), 10)

       // console.log(movieEndTime, ' ', restTime, ' ', movieEndTime === restTime)
      if (movieEndTime === restTime) {
        movie[m].table = restTime
        movie[m].tableEnd = movie[m].table + 2
      }
    }
  }

let finishproject = movie.filter(movie => (movie.table && movie.time))
  finishproject.forEach(movie => {
    // console.log('Fetching links ok...\nFetching Data ok...\n')
   // console.log(` On ${movie[0].day} there will be a free table between ${movie[0].table}:00 and ${movie[0].endTime}:00,\n after you have seen "${movie[0].movie}" which starts at ${movie[0].time}.\n`)
   console.log(` On ${dayNames[movie.day]} there will be a free table between  ${movie.table}:00 and ${movie.tableEnd}:00,\n after you have seen "${movieNames[movie.movie]}" which starts at ${movie.time}.\n`)
  })
}

module.exports.returnResult = returnResult
