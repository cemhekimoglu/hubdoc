// THIS GIVES TWO ARRAYS BUT SHOWS 20 results

const jquery = require('jquery')
const Nightmare = require('nightmare'),
      nightmare = Nightmare()

nightmare
//visit the page
.goto('https://google.com')
//visit the page
.wait(2000)
//wait 2 seconds for page to load
.type('#lst-ib', 'datatables')
.click('#mKlEF')
.wait('.mw')

.click('#rso div:nth-child(1) div div div div h3 a')
.wait('#example_wrapper')

// //click nr of entry selector
// .click('#example_length label select')
// .wait(1000)
// //click 100 to show all rows
// .click('#example_length label select option:nth-child(4)')
// .wait(1000)

  .evaluate(function(){
    const data = []
    for(n = 0; n < 10; n++) {
      data.push({
        name: document.querySelector(`#example tbody tr:nth-child(${n+1}) td.sorting_1`).innerText,
        position: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(2)`).innerText,
        office: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(3)`).innerText,
        age: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(4)`).innerText,
        startDate: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(5)`).innerText,
        salary: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(6)`).innerText
      });
    }
    return data
  })
  .then(function(result){
    console.log(result)
    console.log('\n')
  })

  .then(function() {
    return nightmare
      //click the next button to get the next page of search results
      .click('#example_next')
      .evaluate(function(){
        const data = []
        for(n = 0; n < 10; n++) {
          data.push({
            name: document.querySelector(`#example tbody tr:nth-child(${n+1}) td.sorting_1`).innerText,
            position: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(2)`).innerText,
            office: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(3)`).innerText,
            age: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(4)`).innerText,
            startDate: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(5)`).innerText,
            salary: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(6)`).innerText
          });
        }
        return data
      })
      .then(function(result){
        console.log(result)
        console.log('\n')
      })
    //queue ending the Nightmare instance along with the Electron instance it wraps
    //again, return the instance to leverage the internal `.then()`
    return nightmare.end();
  })
