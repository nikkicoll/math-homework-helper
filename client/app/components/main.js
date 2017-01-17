const apiKey = require('../config.js');

//Iterates over every element in a collection (an array or object)
function each(coll, f) {
    if(Array.isArray(coll)) {
        for (var i = 0; i < coll.length; i++) {
            f(coll[i],i);
        }
    } else {
        for (var key in coll) {
            f(coll[key], key);
        }
    }
}

//Creates video playlist
function createPlaylist(response) {
    // Converts string response into object
    var videos = JSON.parse(response);
    var videoList = "";
    // Loops through every video returned by the Khan Academy API and creates a list item
    each(videos, function(video){
        videoList += '<li align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/'+video.youtube_id+'" frameborder="0" allowfullscreen></iframe></li>';
    })
    // Appends video list to the page
    document.getElementById("video-list").innerHTML = videoList;
}

//Creates exercise list
function createExerciseList(response) {
    var exercises = JSON.parse(response);
    var exercisesList = "";
    // Loops through every exercise returned by Khan Academy API and creates list item
    each(exercises, function(exercise) {
        exercisesList += '<li align="center"><a target="_blank" href="'+exercise.ka_url+ '">Exercises: '+exercise.title+'</a></li><br><li align="center">Description: ' + exercise.translated_description+ '</li><br>';
    })
    // Appends exercise list to the page
    document.getElementById("exercises-list").innerHTML = exercisesList;
}

//Goal: have list of book images that when clicked takes students to a preview of that book
//Creates suggested reading list based on 7th grade math search
function appendBooks(response) {
    var books = JSON.parse(response);
    console.log(books);
    var booksList = "";
    for (var i = 0; i < books.items.length; i++) {
        booksList += '<li id="books-list"><a target ="_blank" href ="' + books.items[i].accessInfo.webReaderLink + '"><img src="' + books.items[i].volumeInfo.imageLinks.smallThumbnail +'"></a></li>';
    }
     document.getElementById("books-list").innerHTML = booksList;
}

//Access to Khan Academy API
function request() {
    // Gets value of user selected topic
    var topic = document.getElementById('topic-selection').value;
    // Create new XMLHttpRequest object to retrieve data from Khan Academy API
    var xhr = new XMLHttpRequest();
    // Construct API request based off user selected topic
    var url = 'http://www.khanacademy.org/api/v1/topic/' + topic +'/videos';
    // Passing callback method to create and append video list if the readyState of the xhr request
    // returns with a 4 ('request finished and response is ready') and status is 200('OK')
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            createPlaylist(xhr.response);
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
    // Repeat same action but with exercises
    var exercisesRequest = new XMLHttpRequest();
    var exercisesURL = 'http://www.khanacademy.org/api/v1/topic/' + topic +'/exercises';

    exercisesRequest.onreadystatechange = function() {
        if (exercisesRequest.readyState === 4 && exercisesRequest.status === 200) {
            createExerciseList(exercisesRequest.response);
        }
    }
    exercisesRequest.open("GET", exercisesURL, true);
    exercisesRequest.send();
}

//Requests access to Google Books API
function searchGoogle () {
    var xhr = new XMLHttpRequest();
    // Construct API request based off 7th grade math search
    var url = 'https://www.googleapis.com/books/v1/volumes?q=middle+school+math&download=epub&key='+apiKey;
    // Passing callback method to create and append video list if the readyState of the xhr request
    // returns with a 4 ('request finished and response is ready') and status is 200('OK')
    xhr.open("GET", url, true);
    xhr.send();
    // Repeat same action but with books
    var bookRequest = new XMLHttpRequest();
    var bookURL = 'https://www.googleapis.com/books/v1/volumes?q=middle+school+math&download=epub&key='+apiKey;

    bookRequest.onreadystatechange = function() {
        if (bookRequest.readyState === 4 && bookRequest.status === 200) {
            appendBooks(bookRequest.response);
        }
    }
    bookRequest.open("GET", bookURL, true);
    bookRequest.send();
}

searchGoogle();

    <div class="header">
      <h1>| Math 7</h1>
    </div>
    <div class="curric-info" id="stds">
      <h3>Homework Info</h3>
      <p>Nightly homework will be assigned by topic. From the dropdown menu, students will select the topic we are currently working through. Then, once the topic is selected, there are videos (under "<strong>videos</strong>" section below) and exercises (under "<strong>homework</strong>" section below) available.</p>
      <p> The required exercises will be assigned in class. I highly recommend watching the videos before completing the exercises and remember, have fun!</p>
    </div>
    <div class="side-bar" id="sidebar">
      <h2>Useful Resources:</h2>
      <!--Link to grades-->
      <a target="_blank" class="active" href="https://phms.schoolloop.com/portal/login?d=x&return_url=1461444854042"><span>Grades</span></a><br><br>
      <!--Link to school website-->
      <a target="_blank" href="https://phms.schoolloop.com/"><span>Parkway Heights MS</span></a><br><br>
      <!--Link to contact info-->
      <a target="_blank" href="contact-me.html"><span>Contact</span></a><br><br>
      <!--Link to class routine download-->
      <a href="../assets/Math7ClassRoutine.pdf" download><span>Class Routine</span></a><br><br>
      <!--Link to Khan Academy-->
      <a target="_blank" href="https://khanacademy.org"><span>Khan Academy</span></a>
    </div>
    <div class="math-info">
      <div class="math-content">
        <div class="math-videos">
          <h2>Videos</h2>
          <select id="topic-selection" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <option>Select topic here</option>
            <option value="cc-7th-add-negatives">Adding negative numbers</option>
            <option value="cc-7th-sub-neg-intro">Subtracting negative numbers</option>
            <option value="cc-7th-add-and-sub-integers">Adding and subtracting integers</option>
            <option value="cc-7th-add-sub-neg-number-line">Adding and subtracting with negatives on the number line</option>
            <option value="cc-7th-add-sub-neg-fractions">Adding and subtracting negative fractions</option>
            <option value="cc-7th-add-sub-word-problems-w-negatives">Addition and subtraction word problems with negatives</option>
            <option value="cc-7th-mult-div-negatives">Multiply and divide negative numbers</option>
            <option value="cc-7th-mult-div-neg-word-problems">Multiplication and division word problems with negatives</option>
            <option value="cc-7th-mult-div-neg-fractions">Multiply and divide negative fractions</option>
            <option value="cc-7th-mult-div-fractions-2">Understanding multiplying and dividing fractions</option>
            <option value="cc-7th-rates">Rate problems with fractions</option>
            <option value="cc-7th-write-and-solve-proportions">Writing and solving proportions</option>
            <option value="cc-7th-unknown-angle-algebra">Unknown angle algebra problems</option>
          </select>
          <button class="btn btn-default btn-sm" onclick="request()">Submit</button>
          <br>
          <br>
          <div class="videos">
            <ul id="video-list" style="list-style-type: none">
              <br>
            </ul>
          </div>
        </div>
        <div class="math-exercises">
          <h2>Homework</h2>
          <ul id="exercises-list" style="list-style-type: none"></ul>
        </div>
      </div>
    </div>
    <div class="books">
      <h2>Suggested Reading</h2>
      <h4>Click on book for book preview</h4>
      <ul id="books-list" style="list-style-type: none"></ul>
      <span class="stretch"></span>
