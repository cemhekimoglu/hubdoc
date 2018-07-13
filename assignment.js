const jquery = require('jquery')
const Nightmare = require('nightmare'),
      nightmare = Nightmare()

nightmare
  .goto('https://google.com')
  //visit the page
  .wait(2000)
  //wait 2 seconds for page to load

  .type('text[title="Search"]', 'datatables')
  .click('#mKlEF')
  .wait('.mw')

  .click('#rso div:nth-child(1) div div div div h3 a')
  .wait('#example_wrapper')

  .evaluate(function(){
    var data = [].split('\n');
    $('#example tbody tr:nth-child(1)').each(function(){
      rows = {}
      for(n = 1; n <= 57; n++) {
        rows["name"] = $('#example tbody tr:nth-child(n) td.sorting_1').text()
        rows["position"] = $('#example tbody tr:nth-child(n) td:nth-child(2)').text()
        rows["office"] = $('#example tbody tr:nth-child(n) td:nth-child(3)').text()
        rows["age"] = $('#example tbody tr:nth-child(n) td:nth-child(4)').text()
        rows["startDate"] = $('#example tbody tr:nth-child(n) td:nth-child(5)').text()
        rows["salary"] = $('#example tbody tr:nth-child(n) td:nth-child(6)').text()
      }
      data.push(rows)
    })
    return data
  })
  .end()
  .then(function(result){
    for(res in result) {
      console.log(result[res].name)
      console.log(result[res].position)
      console.log(result[res].office)
      console.log(result[res].age)
      console.log(result[res].startDate)
      console.log(result[res].salary)
      console.log("\n")
    }
  })
