'use strict';

//create hourArray:

var hourArray =['','6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','Daily Location Total'];


//constructor Store
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
    this.tosserArray =[];
    this.dailyTosserSum =0;
}

//create instances
var pike = new Store('1st and Pike',23,65,6.3,'pike');
var seaTac = new Store('SeaTac Airport',3,24,1.2,'seaTac');
var seaCenter = new Store('Seattle Center',11,38,3.7,'seaCenter');
var capitalHill = new Store ('Capitol Hill',20,38,2.3,'capitalHill');
var alki = new Store('Alki',2,16,4.6,'alki');

//function getRandomCust
Store.prototype.getRandomCust= function (){
    return Math.floor(Math.random()*(this.maxCust-this.minCust+1) + this.minCust);
}
//function getSalesArray with control curve
Store.prototype.getSalesArray =function(){
    var firstHour = 6;
    var lastHour = 20;
    var controlCurve= [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
    for (var i=firstHour;i<=lastHour;i++){
        var randomCustomerNumber = this.getRandomCust();
        var roundNumber = Math.round(this.avgSale*randomCustomerNumber*controlCurve[i-6]);
        this.salesArray.push(roundNumber);
        this.dailySum =this.dailySum + roundNumber;
        var tosserNumber = Math.max(Math.ceil(roundNumber/20),2);
        this.tosserArray.push(tosserNumber);
        this.dailyTosserSum = this.dailyTosserSum + tosserNumber;
    }
    this.salesArray.push(this.dailySum);
    this.tosserArray.push(this.dailyTosserSum);
}

//render title of Sales Table and Tosser Table:
var tableEl = document.getElementById("sales-table");
var tableEl2 = document.getElementById("tosser-table");
var trEl = document.createElement('tr');
var trEl2 = document.createElement('tr');
tableEl.appendChild(trEl);
tableEl2.appendChild(trEl2);

for (var i=0;i<hourArray.length;i++){
    var thEl = document.createElement('th');
    thEl.textContent = hourArray[i];
    trEl.appendChild(thEl);
    var thEl2 = document.createElement('th');
    thEl2.textContent = hourArray[i];
    trEl2.appendChild(thEl2);
}







//function render of Sales Table and Tosser Table (except for title)
Store.prototype.render = function(hourArray){
    var tableEl = document.getElementById("sales-table");
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);
    var tdEl = document.createElement('td');
    tdEl.textContent = this.name;
    trEl.appendChild(tdEl);

    var tableEl2 = document.getElementById("tosser-table");
    var trEl2 = document.createElement('tr');
    tableEl2.appendChild(trEl2);
    var tdEl2 = document.createElement('td');
    tdEl2.textContent = this.name;
    trEl2.appendChild(tdEl2);


    for (var i=0; i<hourArray.length-1; i++){
        var tdEl = document.createElement('td');
        tdEl.textContent = this.salesArray[i];
        trEl.appendChild(tdEl);
        var tdEl2 = document.createElement('td');
        tdEl2.textContent = this.tosserArray[i];
        trEl2.appendChild(tdEl2);
    }

}

//call function render to render 1st row to second last row of sales table and tosser table:
for (var k=0;k<storeArray.length;k++){
    storeArray[k].getSalesArray();
    storeArray[k].render(hourArray);
}

//create last row of the sales table and tosser table:
var tableEl = document.getElementById("sales-table");
var trEl = document.createElement('tr');
tableEl.appendChild(trEl);

var tdEl = document.createElement('td');
tdEl.textContent = "Totals";
trEl.appendChild(tdEl);

var tableEl2 = document.getElementById("tosser-table");
var trEl2 = document.createElement('tr');
tableEl2.appendChild(trEl2);

var tdEl2 = document.createElement('td');
tdEl2.textContent = "Totals";
trEl2.appendChild(tdEl2);

for (var j=0; j<hourArray.length-1;j++){
    var tdEl = document.createElement('td');
    tdEl.textContent = storeArray[0].salesArray[j]+storeArray[1].salesArray[j]+storeArray[2].salesArray[j]+storeArray[3].salesArray[j]+storeArray[4].salesArray[j];
    trEl.appendChild(tdEl);

    var tdEl2 = document.createElement('td');
    tdEl2.textContent = storeArray[0].tosserArray[j]+storeArray[1].tosserArray[j]+storeArray[2].tosserArray[j]+storeArray[3].tosserArray[j]+storeArray[4].tosserArray[j];
    trEl2.appendChild(tdEl2);


}


