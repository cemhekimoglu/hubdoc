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

.select('#example_length label select', 100)

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
  .end()
  .then(function(result){
    console.log(result)
  })
