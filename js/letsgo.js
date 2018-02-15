async function letsGo (movie, resturangenVa) {
    for (let m = 0; m < movie.length; m++) {
      let movieEndTime = parseInt(movie[m].time.substring(0, 2), 10) + 2

      for (let r = 0; r < resturangenVa.length; r++) {
        let restTime = parseInt(resturangenVa[r].substring(3, 5), 10)
         // console.log(movieEndTime, ' ', restTime, ' ', movieEndTime === restTime)
        if (movieEndTime === restTime) {
          movie[m].table = restTime
        }
      }
    }
  
      // console.log('Fetching links ok...\nFetching Data ok...\n')
      console.log(` On ${movie[0].day} there will be a free table between ${movie[0].table}:00 and ${movie[0].endTime}:00,\n after you have seen "${movie[0].movie}" which starts at ${movie[0].time}.\n`)
    
  }

module.exports.letsGo = letsGo
