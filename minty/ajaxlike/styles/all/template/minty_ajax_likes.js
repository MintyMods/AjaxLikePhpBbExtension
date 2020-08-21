

function initMintyAjaxLikes() {
    PNotify.defaults.styling = 'material';
    PNotify.defaults.icons = 'fontawesome';   
    injectAjax();   
}

function doThanksTheMintyWay(url, id) {
    console.log("id",id);
	$.ajax({ url, cache: false, custom: id  }).done(function(result, status, jqXHR) {
        console.log("Minty Thanks Given", result);
        $('#' + id + '> i').addClass('fa-recycle').removeClass('fa-thumbs-o-up');
        var url = $('#' + id).attr('href');
        url = url.replace("javascript:doThanksTheMintyWay('","");
        url = url.substring(0, url.lastIndexOf("','" + id + "')"));
        url = url.replace("&thanks=","&rthanks=");
        $('#' + id).attr('href', url);
        PNotify.notice({ 
            title: result.MESSAGE_TITLE, 
            text: "You have just thanked for the post.", 
            icon: "fa fa-thumbs-o-up fa-2x", 
            delay:1000,
            styling: 'custom',
            maxTextHeight: null,
            addModelessClass: 'nonblock'
        });
	}).fail(function( result ) {
        console.log("Minty Thanks Failed", result);
        PNotify.error({ title: result.MESSAGE_TITLE, text: result.MESSAGE_TEXT });
	});
}

function injectAjax() {
    $('a[id^="lnk_thanks"]').each(function( index ) {
        var url = $( this ).attr('href');
        var id = $( this ).attr('id');
        if (url.indexOf('&thanks=') > -1) {
            $( this ).attr('href', "javascript:doThanksTheMintyWay('" + url + "','" + id + "')");
        } 
    });
}
