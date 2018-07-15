const jquery = require('jquery')
const ObjectsToCsv = require('objects-to-csv')
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })

nightmare
//visit the page
.goto('https://google.com')
//wait 2 seconds for page to load
.wait(2000)
//search datatables on google
.type('#lst-ib', 'datatables')
//click search button
.click('#mKlEF')
//wait for the results to load
.wait('.mw')
//click the first link
.click('#rso div:nth-child(1) div div div div h3 a')
.wait('#example_wrapper')

//choose the 100 results option from dropdown menu
.select('#example_length label select', 100)


//make sure to choose right selectors
  .evaluate(function(){
    const data = []
    for(n = 0; n < 57; n++) {
      data[n] = {
        name: document.querySelector(`#example tbody tr:nth-child(${n+1}) td.sorting_1`).innerText,
        position: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(2)`).innerText,
        office: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(3)`).innerText,
        age: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(4)`).innerText,
        startDate: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(5)`).innerText,
        salary: document.querySelector(`#example tbody tr:nth-child(${n+1}) td:nth-child(6)`).innerText
      };
    }
    return data
  })
  //close the electron process
  .end()
  //in order to use the result in the evaluate scope, you need to pass the result in as a promise
  .then(result=>{
    new ObjectsToCsv(result).toDisk('./test.csv');
    console.log(result)
  })
