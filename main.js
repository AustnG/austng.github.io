var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1kb3TTZEggnDtHEFnKSIpW2dVcG5u4p5RusRjH8E7QLg/edit#gid=0';

function init() {
  Tabletop.init( {key: publicSpreadsheetUrl,
                  callback: showInfo,
                  simpleSheet: true } )
}

function showInfo(data, tabletop) {
  data.forEach(function(data) {
    template.innerHTML = data.template;
    aboutMyself.innerHTML = data.aboutMyself;
    cwOverview.innerHTML = data.cwOverview;
    cw1.innerHTML = data.cw1;
    cw2.innerHTML = data.cw2;
    cw3.innerHTML = data.cw3;
    cw4.innerHTML = data.cw4;
    koa.innerHTML = data.koa;
    gm.innerHTML = data.gm;
    ccb.innerHTML = data.ccb;
    education.innerHTML = data.education;
    body01.innerHTML = data.body01;
    body02.innerHTML = data.body02;
 });
}

window.addEventListener('DOMContentLoaded', init)