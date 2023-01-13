
let actionButton = $("#actionbutton");
let searchArtist = $("#searchlyrics");
let videoPlayer = $('#videoplayer');
let preSearch = $('.beforesearch');
let postSearch = $('.aftersearch');
let urlDisco = "https://theaudiodb.com/api/v1/json/2/discography.php?s=";
let urlInfo = "https://www.theaudiodb.com/api/v1/json/523532/search.php?s=";

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
                $("#discography").append(`<li>${data.album[i].strAlbum} -- ${data.album[i].intYearReleased}</li>`);
            }   
            preSearch.css('display', 'none');
            postSearch.removeAttr('style');
            actionButton.text('Go Back');
            actionButton.attr('data-toggle','off');
        })
}


    // fetch(urlInfo + artistName)
    // .then(function (response) {
    //     if (response.ok) {
    //         return response.json();
    //     } else {
    //         return Promise.reject(response);
    //     }
    // })
    // .then(data => {
    //     discography.append(data.album[0].strAlbum)
    // })

// https://theaudiodb.com/api/v1/json/2/discography.php?s=
// Artist Albums & Release Years


