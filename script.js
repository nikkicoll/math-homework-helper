function sideScroll () {
    var sidebarPos = document.getElementById("sidebar")
}

function createPlaylist(response) {
    // Converts string response into object
    var videos = JSON.parse(response);

    var videoList = "";
    // Loops through every video returned by the Khan Academy API and creates a list item
    for (var i = 0; i < videos.length; i++) {
        videoList += '<li><iframe width="560" height="315" src="https://www.youtube.com/embed/'+ videos[i].youtube_id +'" frameborder="0" allowfullscreen></iframe></li>'
    }
    // Appends video list to the page 
    document.getElementById("video-list").innerHTML = videoList;
}

function createExerciseList(response) {
    var exercises = JSON.parse(response);

    var exercisesList = "";
    // Loops through every exercise returned by Khan Academy API and creates list item
    for (var i = 0; i < exercises.length; i++) {

        exercisesList += '<li><a target="_blank" href="'+exercises[i].ka_url+'">Exercises: ' + exercises[i].title +'</a></li><br><li>' + exercises[i].translated_description+ '</li><br>'
    }
    // Appends exercise list to the page
    document.getElementById("exercises-list").innerHTML = exercisesList;
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
