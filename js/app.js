'use strict';



//Generate location objects as following:
var pike= {
    name: '1st and Pike',
    minCust:23,
    maxCust:65,
    avgSale: 6.3,
    id: 'pike',
   
}
var seaTac= {
    name: 'SeaTac Airport',
    minCust:3,
    maxCust:24,
    avgSale: 1.2,
    id: 'seaTac',
   
}
var seaCenter= {
    name: 'Seattle Center',
    minCust:11,
    maxCust:38,
    avgSale: 3.7,
    id: 'seaCenter',

}
var capitalHill= {
    name: 'Capitol Hill',
    minCust:20,
    maxCust:38,
    avgSale: 2.3,
    id: 'capitalHill',
   

}
var alki= {
    name: 'Alki',
    minCust:2,
    maxCust:16,
    avgSale: 4.6,
    id: 'alki',
    
}

//generate a location object array

var locationObjectArray=[pike,seaTac,seaCenter,capitalHill,alki];

//create a time array:
var firstHour=6;
var lastHour=20;
var hourArray=[]
for (var i=firstHour;i<=lastHour;i++){
    if (i<12){
        hourArray.push(`${i}am`);
    }
    else if (i===12){
        hourArray.push(`${i}pm`);
    }
    else{
        hourArray.push(`${i-12}pm`)
    }
}
hourArray.push('Total');
console.log(hourArray);

//define function getRandomCust to get random customer number
function getRandomCust(min, max) {
    return Math.floor(Math.random()*(max-min+1) + min);
  }


//define a function called getSalesArray to generate a list of hourly sales and total daily sales
function getSalesArray(location){
    var dailySum=0;
    var salesArray=[];
    var firstHour = 6;
    var lastHour = 20;   
    for (var i=firstHour;i<=lastHour;i++){
        var randomCustomerNumber = getRandomCust(location.minCust,location.maxCust);
        var roundNumber = Math.round(location.avgSale*randomCustomerNumber);
        salesArray.push(roundNumber);
        dailySum =dailySum + roundNumber;
    }
    salesArray.push(dailySum);
return salesArray;
}

//define a function called render to connect to sales.HTML and create a list of hourly sales and total sales


function render(hourArray, location){
    var salesArray = getSalesArray(location);
    var salesList = document.getElementById(location.id);
    
    for (var i=0; i<hourArray.length; i++){
        var liEl = document.createElement('li');
        liEl.textContent = `${hourArray[i]}: ${salesArray[i]} cookies`;
        salesList.appendChild(liEl);

    }
}



for (var k=0;k<locationObjectArray.length;k++){
    render(hourArray,locationObjectArray[k]);
}

