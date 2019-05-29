'use strict';
//create hourArray:
var hourArray =['','6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','Daily Location Total'];

//constructor function Store
var storeArray=[];
var Store = function (name,minCust,maxCust,avgSale,id){
    this.name =name;
    this.minCust=minCust;
    this.maxCust=maxCust;
    this.avgSale=avgSale;
    this.id=id;
    this.salesArray=[];
    this.dailySum=0;
    this.tosserArray =[];
    this.dailyTosserSum =0;
    storeArray.push(this);
}

//create original instances
var pike = new Store('1st and Pike',23,65,6.3,'pike');
var seaTac = new Store('SeaTac Airport',3,24,1.2,'seaTac');
var seaCenter = new Store('Seattle Center',11,38,3.7,'seaCenter');
var capitalHill = new Store ('Capitol Hill',20,38,2.3,'capitalHill');
var alki = new Store('Alki',2,16,4.6,'alki');


//define function 'getRandomCust':
Store.prototype.getRandomCust= function (){
    return Math.floor(Math.random()*(this.maxCust-this.minCust+1) + this.minCust);
}

//define function 'getSalesArray' with control curve (to generate salesArray and tosserArray)
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


//define function 'renderTitle' to render titles for Sales Table and Tosser Table:
function renderTitle(tableId){
    var tableEl = document.getElementById(tableId);
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);

    for (var i=0;i<hourArray.length;i++){
        var thEl = document.createElement('th');
        thEl.textContent = hourArray[i];
        trEl.appendChild(thEl);
    }

}

//define function 'render' to render content of Sales Table and Tosser Table (except for title and last row)
Store.prototype.render = function(hourArray,tableId){
    var tableEl = document.getElementById(tableId);
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);
    var tdEl = document.createElement('td');
    tdEl.textContent = this.name;
    trEl.appendChild(tdEl);

    for (var i=0; i<hourArray.length-1; i++){
        var tdEl = document.createElement('td');
        if (tableId==='sales-table'){
            tdEl.textContent = this.salesArray[i];
        }
        if (tableId==='tosser-table'){
            tdEl.textContent = this.tosserArray[i];
        }
        trEl.appendChild(tdEl);
    }

}


//define function 'renderLastRow' to render last row for Sales Table and Tosser Table:
function renderLastRow(tableId){
    var tableEl = document.getElementById(tableId);
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);

    var tdEl = document.createElement('td');
    tdEl.textContent = 'Totals';
    trEl.appendChild(tdEl);

    for (var j=0; j<hourArray.length-1;j++){
        var tdEl = document.createElement('td');
        var content =0;
        {
            for (var m=0;m<storeArray.length;m++){
                if (tableId ==='sales-table'){
                    content = content + storeArray[m].salesArray[j];
                }
                if (tableId ==='tosser-table'){
                    content = content + storeArray[m].tosserArray[j];
                }
                
            }
            tdEl.textContent = content;
        }
        trEl.appendChild(tdEl);
    }
}

//get Form data and call all the render functions (renderTitle, render, renderLastRow)
var formEl = document.getElementById('store-input');
formEl.addEventListener('submit',function(e){

    //everytime click submit, clear the previous generated tables:
    document.getElementById("sales-table").innerHTML = '';
    document.getElementById("tosser-table").innerHTML = '';
    
    //get additional store information from form:
    e.preventDefault();
    var name =e.target.name.value;
    var minCust =Number(e.target.minCust.value);
    var maxCust =Number(e.target.maxCust.value);
    var avgSale =Number(e.target.avgSale.value);
    var id =e.target.id.value;
    new Store(name,minCust,maxCust,avgSale,id);




    //call renderTitle, render, and renderLastRow:
    renderTitle('sales-table');
    renderTitle('tosser-table');

    for (var k=0;k<storeArray.length;k++){
        storeArray[k].getSalesArray();
        storeArray[k].render(hourArray,'sales-table');
        storeArray[k].render(hourArray,'tosser-table');
    }
    renderLastRow('sales-table');
    renderLastRow('tosser-table');


});

//default table:
renderTitle('sales-table');
    renderTitle('tosser-table');

    for (var k=0;k<storeArray.length;k++){
        storeArray[k].getSalesArray();
        storeArray[k].render(hourArray,'sales-table');
        storeArray[k].render(hourArray,'tosser-table');
    }
    renderLastRow('sales-table');
    renderLastRow('tosser-table');
