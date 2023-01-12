
let actionButton = $("#actionbutton");
let searchArtist = $("#searchlyrics");
let artistName = searchArtist.val();
let discography = $("#discography");
let urlDisco = "https://theaudiodb.com/api/v1/json/2/discography.php?s=";
let urlInfo = "https://www.theaudiodb.com/api/v1/json/523532/search.php?s=";

// DEMO ONLY, REMOVE/REWRITE WHEN DEVELOPING JS -- attaches display-toggle to button to demonstrate before/after search-event states
$('#actionbutton').click(function() {
    let toggle = $('#actionbutton');
    if (toggle.attr('data-toggle') === 'on') {
        // $('#songname').text('Tennessee Whiskey, ');
        $('#artistname').text(artistName);
        $('#videoplayer').attr('src','https://www.youtube.com/embed/4zAThXFOy2c');
        $('.beforesearch').attr('style','display:none');
        $('.aftersearch').removeAttr('style');
        toggle.text('Go Back');
        toggle.attr('data-toggle','off');
    } else {
        $('#songname').text('');
        $('#artistname').text('');
        $('#videoplayer').removeAttr('src');
        $('.beforesearch').removeAttr('style');
        $('.aftersearch').attr('style','display:none');
        toggle.text('Submit');
        toggle.attr('data-toggle','on');
    }
})


actionButton.click(userSearch);

function userSearch() {
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


}



// https://theaudiodb.com/api/v1/json/2/discography.php?s=
// Artist Albums & Release Years


