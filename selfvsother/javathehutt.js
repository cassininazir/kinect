// JavaScript Document
/*backspace*/
$(document).ready(function () {
    $('#thoughttext').focus();
//////////////////
/// 1. Declare Variables 
//////////////////
    var backspace = '';
    var del = '';
    var browser = "Unknown OS";
    var osname = '';
    var monitor_width = window.screen.width;
    var monitor_height = window.screen.height;
    var width = $(window).width();
    var height = $(window).height();
    var elapsed = ''; // time to submit
    // time of submission
    // day of the week

//////////////////
/// 2. Capture Variables 
//////////////////
    // backspace key 
    $('html').keyup(function (e) {
        if (e.keyCode == 08) {
            backspace = backspace + 1;
            $("#bcksp").html("<input type='text' name='backspace' value='" + backspace.toString().length + "'>");
        }
    });
    // delete key 
    $('html').keyup(function (e) {
        if (e.keyCode == 46) {
            del = del + 1;
            $("#del").html("<input type='text' name='del' value='" + del.toString().length + "'>");
        }
    });
    //browser detection
    var isOpera = !!window.opera || navigator.userAgent.indexOf('Opera') >= 0;
    if (isOpera = !!window.opera || navigator.userAgent.indexOf('Opera') >= 0) {
        browser = "Opera";
    }
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox = typeof InstallTrigger !== 'undefined') {
        browser = 'Firefox';
    }
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    if (isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
        browser = 'Safari';
    }
    var isChrome = !! window.chrome;
    if (isChrome = !! window.chrome) {
        browser = 'Chrome';
    }
    var isIE = /*@cc_on!@*/ false;
    if (isIE = /*@cc_on!@*/ false) {
        browser = 'Internet Explorer';
    }
    //OS detection
    if (navigator.appVersion.indexOf("Win") != -1) osname = "Windows";
    else if (navigator.appVersion.indexOf("Mac") != -1) osname = "MacOS";
    else if (navigator.appVersion.indexOf("X11") != -1) osname = "UNIX";
    else if (navigator.appVersion.indexOf("Linux") != -1) osname = "Linux";
    //device detection
    var windowWidth = window.screen.width < window.outerWidth ? window.screen.width : window.outerWidth;
    var screenSize = 0;
    if (windowWidth > 1024) {
        screenSize = "Desktop";
    }
    if (windowWidth < 1024) {
        if (windowWidth > 768) {
            screenSize = "Tablet";
        }
        if (windowWidth < 768) {
            screenSize = "Phone";
        }
    }
    //geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $("#hidden").append("<input type='text' name='lat' value='" + lat + "'>");
        $("#hidden").append("<input type='text' name='lng' value='" + lng + "'>");
      });
    }  
    //time
    var currentDate = new Date()
    var month = currentDate.getMonth() + 1
        //alert("Month" + " " + month)


    //elapsed time
    count = 0;
    setInterval(function(){
        count = count + 1;
        $("#interval").html("<input type='text' id='elapsed' name='elapsed' value='" + count + "'>");
    }, 10);

    $('#formSub').click(function(){ 
        alert(count);
    });
    //Profanity filter
    var swear_words_arr = new Array("shit", "piss", "fuck", "cunt", "cocksucker", "motherfucker", "tits");
    var regex = new RegExp('\\b(' + swear_words_arr.join('|') + ')\\b', 'i');



        function validate_user_text() {
        var text = $('#myInput').text();

        if (regex.test(text)) {
            alert("Woah -- ease up there, George Carlinl."); /* + alert_text */
            $('#myInput').focus();
            return false;
        }

    }
    //I
    var I_arr = new Array("I");
    var regex = new RegExp('\\b(' + I_arr.join('|') + ')\\b', 'i');

    function validate_user_text() {
        var text = $('#myInput').text();

        if (regex.test(text)) {
            alert("Input of 'I'."); /* + alert_text */
            $('#myInput').focus();
            return false;
        }

    }

//////////////////
/// 3. Write Variables to HTML
//////////////////
    $("#hidden").append("<input type='text' name='browser' value='" + browser + "'>");
    $("#hidden").append("<input type='text' name='osname' value='" + osname + "'>");
    $("#hidden").append("<input type='text' name='monitor_width' value='" + monitor_width + "'>");
    $("#hidden").append("<input type='text' name='monitor_height' value='" + monitor_height + "'>");
    $("#hidden").append("<input type='text' name='width' value='" + width + "'>");
    $("#hidden").append("<input type='text' name='height' value='" + height + "'>");
    //end doc ready
});
