//API Key needed to access Google Books API
var apiKey = 'AIzaSyAfRai3-s-CRSF-VBvFPEg_M9qkXFyqXbU';

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
        videoList += '<li align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/'+ video.youtube_id +'" frameborder="0" allowfullscreen></iframe></li>';
    })
    // Appends video list to the page 
    document.getElementById("video-list").innerHTML = videoList;
}
//Creates exercise list
function createExerciseList(response) {
    console.log(response);
    var exercises = JSON.parse(response);
    var exercisesList = "";
    // Loops through every exercise returned by Khan Academy API and creates list item
    each(exercises, function(exercise) {
        exercisesList += '<li align="center"><a target="_blank" href="'+exercise.ka_url+'">Exercises: ' + exercise.title +'</a></li><br><li align="center">Description: ' + exercise.translated_description+ '</li><br>';
    })
    // Appends exercise list to the page
    document.getElementById("exercises-list").innerHTML = exercisesList;
}
//Creates suggested reading list
function appendBooks (response) {
    console.log(response);
    var books = JSON.parse(response);
    var booksList = "";
    //Loops through every book return by Google Books API and creates a listed book
    each(books, function(book) {
        booksList += '<div><img src='+book.smallThumbnail+'></div>';
    })
    //Appends books to the page
    document.getElementById("book-list").innerHTML = booksList;

}

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

function searchGoogle () {
    var xhr = new XMLHttpRequest();
    // Construct API request based off user selected to
    var url = 'https://www.googleapis.com/books/v1/volumes?q=7th+grade+math&download=epub&key=' + apiKey;
    // Passing callback method to create and append video list if the readyState of the xhr request
    // returns with a 4 ('request finished and response is ready') and status is 200('OK')
    xhr.open("GET", url, true);
    xhr.send();
    // Repeat same action but with exercises
    var bookRequest = new XMLHttpRequest();
    var bookURL = 'https://www.googleapis.com/books/v1/volumes?q=7th+grade+math&download=epub&key=' + apiKey;

    bookRequest.onreadystatechange = function() {
        if (bookRequest.readyState === 4 && bookRequest.status === 200) {
            appendBooks(bookRequest.response);
        }
    }
    bookRequest.open("GET", bookURL, true);
    bookRequest.send();
}

searchGoogle();