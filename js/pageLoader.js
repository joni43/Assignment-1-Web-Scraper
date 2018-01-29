// const cheerio = require('cheerio')
// const request = require('request')

// module.exports = {
//   WebcrawlUrl: WebcrawlUrl
// }
//  function WebcrawlUrl (url) {
//    console.log(WebcrawlUrl)
//     request(url, function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//         return console.log(error)
//       }
//       var StartUrl = []
//       var $ = cheerio.load(body)
//       links = $('a')
//       $(links).each(function (i, link) {
//        // console.log(link) //Ger ett konstigt terminal utskrift
//         var AllUrl = $(this).attr('href')
  
//         StartUrl.push(AllUrl)
//       })
//       var CalendarLink = StartUrl[0]
//       request(CalendarLink, function (error2, response2, body2) {
//         if (error2) throw error2
//         var User = []
//         var $$ = cheerio.load(body2)
//         var links2 = $$('a')
  
  
//         $(links2).each(function (i, link) {
//           var page_link = $$(this).attr('href')
//           User.push(page_link)
  
//         })
//         var similarDates = []
//         User.forEach(function (link) {
//           link = 'http://vhost3.lnu.se:20080/calendar/' + link
//           console.log(link)
//           request(link, function (error, response, body) {
//             if (error) throw error
  
  
//             var $ = cheerio.load(body)
//   // laddar body
//             var tr = $('tr')
//           // hämtar ut tr
  
//             var user_dates = []
  
//             // let weekend = {friday: '', saturday: '', sunday: ''}
//             tr.each(function () {
//               $(this).find('td').each(function () {
//                 // get ok message
//                 user_dates.push($(this).text())
//               })
//             })
  
//             similarDates.push(user_dates)
//             let FridayisOk = user_dates[0]
//             AllOk = []
//             AllOk.push(FridayisOk)
//           })
//         })
//       })
  
//       callback(null, StartUrl)
//     })
//   }
//   WebcrawlUrl(function (err, links) {
//     if (err) return console.log(err)
//   })
