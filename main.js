var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1kb3TTZEggnDtHEFnKSIpW2dVcG5u4p5RusRjH8E7QLg/edit#gid=0';

function init() {
  Tabletop.init( {key: publicSpreadsheetUrl,
                  callback: showInfo,
                  simpleSheet: true } )
}

function showInfo(data, tabletop) {
  data.forEach(function(data) {
    body01.innerHTML = data.body;
    body02.innerHTML = data.body2;
    body03.innerHTML = data.body3;
    body04.innerHTML = data.body4;
    body05.innerHTML = data.body5;
    body06.innerHTML = data.body6;
    body07.innerHTML = data.body7;
    body08.innerHTML = data.body8;
    body09.innerHTML = data.body9;
    body10.innerHTML = data.body10;
 });
}

window.addEventListener('DOMContentLoaded', init)