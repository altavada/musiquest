// DEMO ONLY, REMOVE/REWRITE WHEN DEVELOPING JS -- attaches display-toggle to button to demonstrate before/after search-event states
$('#actionbutton').click(function() {
    let toggle = $('#actionbutton');
    if (toggle.attr('data-toggle') === 'on') {
        $('#songname').text('Tennessee Whiskey');
        $('#artistname').text('Chris Stapleton');
        $('#videoplayer').attr('src','https://www.youtube.com/embed/4zAThXFOy2c');
        $('.beforesearch').attr('style','display:none');
        $('.aftersearch').removeAttr('style');
        $('#songnamebyartist').removeAttr('style');
        toggle.text('Go Back');
        toggle.attr('data-toggle','off');
    } else {
        $('#songname').text('');
        $('#artistname').text('');
        $('#videoplayer').removeAttr('src');
        $('.beforesearch').removeAttr('style');
        $('.aftersearch').attr('style','display:none');
        $('#songnamebyartist').attr('style', 'display:none');
        toggle.text('Submit');
        toggle.attr('data-toggle','on');
    }
})