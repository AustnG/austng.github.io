This was pulled from this example on css-tricks:


https://css-tricks.com/creating-an-editable-webpage-with-google-spreadsheets-and-tabletop-js/










Please raise your hand if you’ve ever faced never-ending content revision requests from your clients. It’s not that the changes themselves are difficult, but wouldn’t it be less complicated if clients could just make the revisions themselves? That would save everyone valuable time, and  allow you to turn your attention to more important tasks.

In the case where the site is built on the flat files (e.g. HTML, CSS and JavaScript) instead of a CMS (e.g. WordPress), you’ll need some other sort of solution to edit the content without directly editing those files.

Tabletop.js allows us to use Google Spreadsheets as a sort of data store, by taking the spreadsheet and making it easily accessible through JavaScript. It provides the data from a Google Spreadsheet in JSON format, which can then use in an app, like pulling data from any other API. In this article, we’ll be adding data to a spreadsheet then setting up Tabletop so that it can pull data from the data source to our HTML. Let us get straight to the code!

This article is going to be based off a real-world site I built when I was initially trying to wrap my head around Tabletop. By the way, I always advise developers to build applications with any form of technology they’re trying to learn, even after watching or reading tutorials.

We’ll be using the demo I made, with its source code and spreadsheet . The first thing we’ll need is a Google account to access the spreadsheet. 

Open a new spreadsheet and input your own values in the columns just like mine. The first cell on each column is the reference that’ll be used later in our JavaScript, and the second cell is the actual content for the website. As in header is the reference name, and Please edit me! is the actual content in the first column.


Next up, we’ll publish the data to the web by clicking on File → Publish to the web in the menu bar.


A link will be provided, but it’s technically useless to us, so we can ignore. The important thing is that the spreadsheet (and its data) is now publicly accessible so we can fetch it for our app.

That said, there is a link we need. Clicking the big green “Share” button in the upper-right corner of the page will trigger a modal that provides a sharable link to the spreadsheet and lets us set permissions as well. Let’s grab that link and set the permissions so that anyone with the link can view the spreadsheet. That way, the data won’t inadvertently be edited by someone else.


Now is the time to initialize Tabletop in our project. Let’s link up to their hosted minified file. Similarly, we could copy the raw minified code, drop it into our own script file and host it ourselves.

Here’s the document file linked up to Tabletop’s CDN and with code snagged from the documentation.

<script src='https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.1/tabletop.min.js'></script>

<script type='text/javascript'>    
  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1sbyMINQHPsJctjAtMW0lCfLrcpMqoGMOJj6AN-sNQrc/pubhtml';

  function init() {
    Tabletop.init( {
      key: publicSpreadsheetUrl,
      callback: showInfo,
      simpleSheet: true 
    } )
  }

  function showInfo(data, tabletop) {
    alert('Successfully processed!')
    console.log(data);
  }

  window.addEventListener('DOMContentLoaded', init)
</script>
Replace the publicSpreadsheetUrl variable in the code with the sharable link from the spreadsheet. See, told you we’d need that!

Now to the interesting part. Let’s give the HTML unique IDs and leave them empty. Then, inside the showInfo function, we’ll use the forEach() method to loop through each spreadsheet column while equating it with the corresponding ID.innerHTML method which, in turn, loads the spreadsheet’s data into the HTML tag through the ID.

function showInfo(data, tabletop) {
  data.forEach(function(data) {
    header.innerHTML = data.header;
    header2.innerHTML = data.header2;
    body.innerHTML = data.body;
    body2.innerHTML = data.body2;
    body3.innerHTML = data.body3;
    body4.innerHTML = data.body4;
    body5.innerHTML = data.body5;
    body6.innerHTML = data.body6;
    body7.innerHTML = data.body7;
    body8.innerHTML = data.body8;
    body9.innerHTML = data.body9;
    body10.innerHTML = data.body10;
    body11.innerHTML = data.body11;
    body12.innerHTML = data.body12;
    body13.innerHTML = data.body13;
    body14.innerHTML = data.body14;
    body15.innerHTML = data.body15;
    body16.innerHTML = data.body16;
    body17.innerHTML = data.body17;
 });
}
window.addEventListener('DOMContentLoaded', init)
This is a section of HTML from my demo showing the empty tags. This is a good way to go, but it could be abstracted further but creating the HTML elements directly from JavaScript.

<!-- Start Section One: Keep track of your snippets -->
<section class="feature">
  <div class="intro-text">
    <h3 id="body"></h3>
    <p id="body2">
      
    </p>
  </div>
  <div class="track-snippets">
    <div class="snippet-left"><img src="img/image-computer.png" alt="computer" /></div>
    <div class="snippet-right">
      <div>
        <h4 id="body3"></h4>
        <p id="body4">
        </p>
      </div>
      <div>
        <h4 id="body5"></h4>
        <p id="body6"></p>
      </div>
      <div>
        <h4 id="body7"></h4>
        <p id="body8">
        </p>
      </div>
    </div>
  </div>
</section>
Hey, look at that! Now we can change the content on a website in real-time by editing the content in the spreadsheet.
