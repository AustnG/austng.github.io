var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1kb3TTZEggnDtHEFnKSIpW2dVcG5u4p5RusRjH8E7QLg/edit#gid=0';

function init() {
  Tabletop.init( {key: publicSpreadsheetUrl,
                  callback: showInfo,
                  simpleSheet: true } )
}

function showInfo(data, tabletop) {
  data.forEach(function(data) {
    body01.innerHTML = data.body01;
    body02.innerHTML = data.body02;
    body03.innerHTML = data.body03;
    body04.innerHTML = data.body04;
    body05.innerHTML = data.body05;
    body06.innerHTML = data.body06;
    body07.innerHTML = data.body07;
    body08.innerHTML = data.body08;
    body09.innerHTML = data.body09;
    body10.innerHTML = data.body10;
 });
}

window.addEventListener('DOMContentLoaded', init)