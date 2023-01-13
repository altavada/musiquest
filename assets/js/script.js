
let actionButton = $("#actionbutton");
let searchArtist = $("#searchlyrics");
let videoPlayer = $('#videoplayer');
let preSearch = $('.beforesearch');
let postSearch = $('.aftersearch');
let userDash = $('#userdashboard');
let discography = $("#discography");
let urlDisco = "https://theaudiodb.com/api/v1/json/2/discography.php?s=";
let urlInfo = "https://www.theaudiodb.com/api/v1/json/523532/search.php?s=";
let youTubeVid = "https://www.youtube.com/embed/";

actionButton.click(userSearch);

function userSearch() {
    let artistName = searchArtist.val();
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
                discography.append(`<li>${data.album[i].strAlbum} (${data.album[i].intYearReleased})</li>`);
            }
            fetchMedia(name);   
            preSearch.css('display', 'none');
            postSearch.removeAttr('style');
            actionButton.text('Go Back');
            actionButton.attr('data-toggle','off');
        })
}

function fetchMedia(artist) {
    fetch(urlInfo + artist)
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
    let youTubeID = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + artist + "&key=AIzaSyDefkvE7bM1ACryGnTt2zai9Z-pHZGAEXo"
    fetch(youTubeID)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then(data => {
            videoPlayer.attr('src', youTubeVid + data.items[0].id.videoId);
            discography.append(`<img class="thumbNail" src="${data.items[0].snippet.thumbnails.default.url}">`);
            // discography.append(`<img class="thumbNail" src="${data.items[0].snippet.thumbnails.default.url}">
            // <a class="videoLink" href="https://www.youtube.com/watch?v=${data.items[0].id.videoId}" target="_blank">${data.items[0].snippet.title}</a>`);  
    })
}


// https://theaudiodb.com/api/v1/json/2/discography.php?s=
// Artist Albums & Release Years

