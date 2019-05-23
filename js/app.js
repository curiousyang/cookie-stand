'use strict';

//create hourArray:
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


var storeArray=[];
var Store = function (name,minCust,maxCust,avgSale,id){
    this.name =name;
    this.minCust=minCust;
    this.maxCust=maxCust;
    this.avgSale=avgSale;
    this.id=id;
    this.salesArray=[];
    this.dailySum=0;
    storeArray.push(this);
}

var pike = new Store('1st and Pike',23,65,6.3,'pike');
var seaTac = new Store('SeaTac Airport',3,24,1.2,'seaTac');
var seaCenter = new Store('Seattle Center',11,38,3.7,'seaCenter');
var capitalHill = new Store ('Capitol Hill',20,38,2.3,'capitalHill');
var alki = new Store('Alki',2,16,4.6,'alki');


Store.prototype.getRandomCust= function (){
    return Math.floor(Math.random()*(this.maxCust-this.minCust+1) + this.minCust);
}

Store.prototype.getSalesArray =function(){
    var firstHour = 6;
    var lastHour = 20;   
    for (var i=firstHour;i<=lastHour;i++){
        var randomCustomerNumber = this.getRandomCust();
        var roundNumber = Math.round(this.avgSale*randomCustomerNumber);
        this.salesArray.push(roundNumber);
        this.dailySum =this.dailySum + roundNumber;
    }
    this.salesArray.push(this.dailySum);
}

Store.prototype.render = function(hourArray){
    var tableEl = document.getElementById("sales-table");
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);
    var tdEl = document.createElement('td');
    tdEl.textContent = this.name;
    trEl.appendChild(tdEl);
    
    for (var i=0; i<hourArray.length; i++){
        var tdEl = document.createElement('td');
        tdEl.textContent = this.salesArray[i];
        trEl.appendChild(tdEl);
    }
}

//call function render
for (var k=0;k<storeArray.length;k++){
    storeArray[k].getSalesArray();
    storeArray[k].render(hourArray);
}

var tableEl = document.getElementById("sales-table");
var trEl = document.createElement('tr');
tableEl.appendChild(trEl);

var tdEl = document.createElement('td');
tdEl.textContent = "Totals";
trEl.appendChild(tdEl);


for (var j=0; j<hourArray.length;j++){
    var tdEl = document.createElement('td');
    tdEl.textContent = storeArray[0].salesArray[j]+storeArray[1].salesArray[j]+storeArray[2].salesArray[j]+storeArray[3].salesArray[j]+storeArray[4].salesArray[j];
    trEl.appendChild(tdEl);
}


