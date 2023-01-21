
let actionButton = $("#actionbutton");
let searchArtist = $("#searchlyrics");
let videoPlayer = $('#videoplayer');
let preSearch = $('.beforesearch');
let postSearch = $('.aftersearch');
let songNBA = $('#songnamebyartist');
let userDash = $('#userdashboard');
let discography = $("#discography");
let musiQuest = $('#headline')
let urlDisco = "https://theaudiodb.com/api/v1/json/2/discography.php?s=";
let urlInfo = "https://www.theaudiodb.com/api/v1/json/523532/search.php?s=";
let youTubeVid = "https://www.youtube.com/embed/";
let history = $("#history");
let historyCount = localStorage.length;

actionButton.click(userSearch);
musiQuest.click(headingRefresh); //Event listener for click on h1 (MusiQuest)
window.addEventListener('load', (event) => {
    new cursoreffects.springyEmojiCursor({ emoji: "🎤🎵" });
});

$(document).on("click", ".historyLi", function () {
    searchArtist.val($(this).text());
    userSearch();
});

startUp();
function startUp() {
    Object.keys(localStorage).forEach(function (key) {
        history.append(`<li class="historyLi">${localStorage.getItem(key)}</li>`);
        if ($("#history li").length > 5) {
            $("#history li").last().remove();
        }
    });
}

//Function to ensure it only runs after a search has been completed
function headingRefresh() {
    if (actionButton.attr('data-toggle') == 'off') {
        startUp();
        userSearch();
    } else {
        startUp();
        return;
    }
}

function userSearch() {
    let artistName = searchArtist.val();
    if (actionButton.attr('data-toggle') == 'on') {
        fetchData(artistName);
    } else {
        location.reload();
    }
    if ($("#history li").length > 4) {
        $("#history li").last().remove();
    }
}

function fetchData(name) {

    fetch(urlDisco + name)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then(data => {
            if (data.album == null) {
                searchArtist.val('')
                    .attr("placeholder", "Artist Not Found -- Please try again");
                return;
            } else {
                if (!historyCount) {
                    historyCount = 0;
                } else {
                    historyCount = historyCount + 1;
                }
                localStorage.setItem("history" + historyCount, searchArtist.val());
                let discoArray = data.album.length;
                for (let i = 0; i < discoArray; i++) {
                    discography.append(`<li>${data.album[i].strAlbum} (${data.album[i].intYearReleased})</li>`);
                }
                fetchMedia(name);
                preSearch.css('display', 'none');
                postSearch.removeAttr('style');
                actionButton.text('Go Back');
                actionButton.attr('data-toggle', 'off');
            }
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
                songNBA.prepend('<img src=' + banner + '>');
            } else {
                $('#songnamebyartist').text(data.artists[0].strArtist);
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
            // debug for first search result sometimes being a YT channel instead of a video
            let x = 0;
            if (data.items[0].id.kind != 'youtube#video') {
                x++;
            }
            videoPlayer.attr('src', youTubeVid + data.items[x].id.videoId);
            // discography.append(`<img class="thumbNail" src="${data.items[x].snippet.thumbnails.default.url}">
            // <a class="videoLink" href="https://www.youtube.com/watch?v=${data.items[x].id.videoId}" target="_blank">${data.items[x].snippet.title}</a>`);  
        })
}

function embedVideo() {

}

// https://theaudiodb.com/api/v1/json/2/discography.php?s=
// Artist Albums & Release Years