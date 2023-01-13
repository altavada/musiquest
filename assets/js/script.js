
let actionButton = $("#actionbutton");
let searchArtist = $("#searchlyrics");
let videoPlayer = $('#videoplayer');
let preSearch = $('.beforesearch');
let postSearch = $('.aftersearch');
let userDash = $('#userdashboard');
let urlDisco = "https://theaudiodb.com/api/v1/json/2/discography.php?s=";
let urlInfo = "https://www.theaudiodb.com/api/v1/json/523532/search.php?s=";
let youTubeVid = "https://www.youtube.com/watch?v=";
let userDash = $("#userdashboard");

actionButton.click(userSearch);

function userSearch() {
    let artistName = searchArtist.val();
    fetch(urlDisco + artistName)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then(data => {
        let discoArray = data.album.length;
        for (let i = 0; i < discoArray; i++) {
            discography.append(`<li>${data.album[i].strAlbum} -- ${data.album[i].intYearReleased}</li>`);
        }
    })
    fetch(urlInfo + artistName)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then(data => {
        userDash.prepend(`<img src=${data.artists[0].strArtistBanner}>`);
    })
    let youTubeID = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + artistName + "&key=AIzaSyDefkvE7bM1ACryGnTt2zai9Z-pHZGAEXo"
    fetch(youTubeID)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then(data => {
        discography.append(`<img class="thumbNail" src="${data.items[0].snippet.thumbnails.default.url}"> 
            <a class="videoLink" href="https://www.youtube.com/watch?v=${data.items[0].id.videoId}" target="_blank">${data.items[0].snippet.title}</a>`);  
})
    if (actionButton.attr('data-toggle') == 'on') {
        fetchData(artistName);
    } else {
        $(".result-field").text('');
        videoPlayer.removeAttr('src');
        preSearch.removeAttr('style');
        postSearch.css('display', 'none');
        userDash.children('img').remove();
        actionButton.text('Submit');
        actionButton.attr('data-toggle','on');
    }
}

function fetchData(name) {
    $('#songnamebyartist').text(name);
    // this line to embed the video(s) will likely go somewhere else once YT API is integrated
    videoPlayer.attr('src','https://www.youtube.com/embed/4zAThXFOy2c');
    fetch(urlDisco + name)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then(data => {
            let discoArray = data.album.length;
            for (let i = 0; i < discoArray; i++) {
                $("#discography").append(`<li>${data.album[i].strAlbum} (${data.album[i].intYearReleased})</li>`);
            }   
            preSearch.css('display', 'none');
            postSearch.removeAttr('style');
            actionButton.text('Go Back');
            actionButton.attr('data-toggle','off');
        })
    fetch(urlInfo + name)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then(data => {
            let banner = data.artists[0].strArtistBanner;
            if (banner != null) {
                userDash.prepend('<img src=' + banner + '>');
            }
        })
}



// https://theaudiodb.com/api/v1/json/2/discography.php?s=
// Artist Albums & Release Years

