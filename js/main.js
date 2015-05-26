     /***********************/
    /*** CREATE THE HTML ***/
   /***********************/
    // is the user on a mobile ? 
    var isMobile = isMobile();

    // adjust container top according to jumbotron height
    $('#container').css('top',$('.jumbotron').height()+15);
    $('.loadmore').css('margin-top',$('.jumbotron').height());
    
    // for each element of the array, key=start date and value=facebook event's id
    function addItems(key,value){
     // get the event's info
        var fields = "name,description,place,cover";
        var fburl = "https://graph.facebook.com/"+ value +"/?fields="+ fields +"&access_token="+ access_token;   
        $.getJSON(fburl, function(data){
            var $item = $(document.createElement("div")).addClass("item").appendTo("#container");
            var $panel = $(document.createElement("div")).addClass("panel panel-default").appendTo($item);
            
            // when a user click on a panel
            $panel.on('mousedown', function (evt) {
              $panel.on('mouseup mousemove', function handler(evt) {
                if (evt.type === 'mouseup') {
                    // click event
                    if (isMobile) {
                        window.open("https://www.facebook.com/events/"+ value);
                        return false;
                    }
                    else
                    {
                        var hei = $(this).children(".front").height();
                        var wid = $(this).children(".front").width();
                        jQuery($(this).children(".back")).css('height', hei+20);
                        jQuery($(this).children(".back")).css('width', wid+25);

                        var position = $(this).children(".front").offset();
                        $(this).children(".back").offset({ top: position.top, left: position.left});

                        this.classList.toggle('hover');
                        var thisClass = this;

                        // get back to front automatically after 20 seconds
                        setTimeout(function() {
                            thisClass.classList.remove('hover');
                        }, 20000);
                    }
                } else {
                    // drag event, handled by Kinetic plugin
                }
                $panel.off('mouseup mousemove', handler);
              });
            });

            //Kinetic
            $('.back').kinetic();
     
            //Panel heading
            var $panelHeading = $(document.createElement("div")).addClass("panel-heading").html("<h2 class='panel-title'>" + data["name"] + "</h2>").appendTo($panel);

            //Panel body
            //Front
            var $front = $(document.createElement("div")).addClass("panel-body front").appendTo($panel);
            // put the cover picture if it exists, or put the default one
            if("cover" in data ){
                $(document.createElement("img")).attr('id','photo').attr('src',data['cover']['source']).appendTo($front);
            }else{
                $(document.createElement("img")).attr('id','photo').attr('src','images/defaultcover.png').appendTo($front);
            }
            //Back
            if(!isMobile){
                var $back = $(document.createElement("div")).addClass("panel-body back").appendTo($panel);
                var $descQR = $(document.createElement("div")).attr('id','descQR').appendTo($back);

                // put the qrcode of the event's link
                var qrcodesrc = "http://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=https://www.facebook.com/events/"+ value;
                $(document.createElement("img")).attr('id','QRCode').attr('src',qrcodesrc).appendTo($descQR);
                // put the event's description
                $descQR.append("<h4>Description <small>(Flashez le QRCode pour plus d'informations)</small></h4>");
                $(document.createElement("hr")).appendTo($descQR);
                // if the event has no description we put a default sentence
                if(typeof data['description'] != "undefined"){
                    var description = data['description'].split(50);
                    $descQR.append("<p>" + data['description'] + "</p>");
                }else{
                    $descQR.append("<p> Il n'y a pas de description pour cet événement.</p>");
                }
            }

            //Panel footer
            // If the date has no time : MM-DD-YYYY
            if(key.length == 10){
                var timestamp = Date.parse(key);
                var date = new Date(timestamp);
                var months = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'];
                var year = date.getFullYear();
                var month = months[date.getMonth()];
                var day = date.getDate();
                var days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
                var weekDay = days[date.getDay()];
                var hour = "0" + (date.getHours()-2);
                var min = "0" + date.getMinutes();
                var time = weekDay + ' ' + day + ' ' + month + ' ' + year;
            }
            else{ // If the date is in ISO8601 format
                var date = dateFromISO8601(key);
                var timestamp = Date.parse(date);
                var months = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'];
                var year = date.getFullYear();
                var month = months[date.getMonth()];
                var day = date.getDate();
                var days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
                var weekDay = days[date.getDay()];
                var hour = "0" + (date.getHours()-2);
                var min = "0" + date.getMinutes();
                var time = weekDay + ' ' + day + ' ' + month + ' ' + year + ' à ' + hour.substr(hour.length-2) + 'h' + min.substr(min.length-2);
            }
            if("place" in data ){
                $panel.append("<div class='panel-footer'><p class='text-muted date'> <b>Où : </b>" + data["place"]["name"] + " <span><b>Quand : </b>" + time + "</span></p></div>");
            }else{
                $panel.append("<div class='panel-footer'><p class='text-muted date'> <b>Où : </b><span><b>Quand : </b>" + time + "</span></p></div>");
            }
            
            // Hiden timestamp for isotope sorting
            $item.append("<div class='timestamp'>"+ timestamp +"</div>");
                
             /*******************/
            /***** PLUGINS *****/
           /*******************/
            // Plugin isotope : position of items
            var $container = $('#container');
            $container.imagesLoaded( function() {
                var iso = new Isotope("#container", {
                itemSelector: '.item',
                layoutMode: 'masonry',
                getSortData: {
                    timestamp: '.timestamp'
                },
                sortBy:[ 'timestamp']
              });
            });

            // Plugin FitText : to make font-sizes flexible
            $(".item").fitText(5, { minFontSize: '8px', maxFontSize: '40px' });

            // when the window is resized, to ajust the back's size
            $(window).on('resize', function(){
                // get the size of the .front div and put it to the .back div
                var hei = $front.height();
                var wid = $front.width();
                $back.css('height', hei+20);
                $back.css('width', wid+25);
                if ($(window).width() < 500) {
                    jQuery('.info').html("?").css('font-size','300%');
                    jQuery('.slogan').css('display','none');
                    jQuery('#refreshImage').css('display','none');
                    jQuery('#container').css('top', 90);
                }
                else if($(window).width() >= 500){
                    jQuery('.info').html("Comment publier un événement ?").css('font-size','20px');
                    jQuery('.slogan').css('display','block');
                    jQuery('#refreshImage').css('display','inline');
                    jQuery('#container').css('top',$('.jumbotron').height()+15);
                }
            });
        });
    }
    
    // function to get a number of events
    function getXEvents(x){
        var XEvents = {};
        var i = 0;
        for (var key in events){
            XEvents[key] = events[key];
            delete events[key];
            i++;
            if (i == x){
                break;
            }
        }
        return XEvents;
    }

    var XEvents = getXEvents(12);

    $.each(XEvents, addItems);

    // Pseudo-infinite scroll (until there is no event left)
    // When the document is ready we look for the scroll event
    $(document).ready(function(){
        $('.loadmore').hide();
        var load = false; // there are no events loading

        $(window).scroll(function(){
            // If the scroll bar is at the bottom and if the page is not laoding new events yet and if there are more events to load
            if(($(window).scrollTop() + $(window).height() >= (95*$(document).height()/100)) && load==false && !(jQuery.isEmptyObject(events)) ){
                // We are about to load events
                load = true;

                // Display a loader loader
                $('.loadmore').show();
                $('.loadmore').fadeOut(5000);

                // Add X events
                XEvents = getXEvents(6);
                $.each(XEvents, addItems);
                
                // We finished loading events
                setTimeout(function() {
                    load = false;
                }, 3000);
            }
            else if(jQuery.isEmptyObject(events)){
                jQuery('.loadmore').html("Il n'y a plus d'évènements à charger.");
                $('.loadmore').show();
                $('.loadmore').fadeOut(3000);
            }
         });
    });

    // reload when click on the refresh image
    $('#refreshImage').click(function(){
        location.reload();
    });
    // reload when click on the refresh text in the info
    $('.refresh').click(function(){
        location.reload();
    });

    // Plugin Kinetic : for dragscroll with cursor
    if (!isMobile) {
        $('body').kinetic();
    }

    // Function to know if the user is on a mobiles
    function isMobile() {
         return !!navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS|playbook|silk/i);
    }

    // Toggle the 'help' when click on the info div
    $(".info").click(function() 
    {
        $(".contenu").slideToggle();
    });

    // Plugin FitText : to make font-sizes flexible;
    $(".contenu").fitText(2, { minFontSize: '12px', maxFontSize: '20px' });

    // If the user is on a mobile we hide the QRCode and we make a link on the text
    if (isMobile) {
        $('.lien').click(function(){
            window.open("https://www.facebook.com/agendamontpellier");
        })
        $('#facebookPage').css('display','none');
    }

    // If the user's window is small (Smartphone...)
    if ($(window).width() < 500) {
        jQuery('.info').html("?").css('font-size','300%');
        jQuery('.slogan').css('display','none');
        jQuery('#refreshImage').css('display','none');
        jQuery('#container').css('top', 90);
    }

    // Close .contenu when click outside
    $(document).mouseup(function (e)
    {
        var contenu = $(".contenu");
        var info = $(".info");

        if ((!contenu.is(e.target)) // if the target of the click isn't the contenu...
            && (!info.is(e.target)) // ... nor info itself ...
            && (contenu.is(":visible"))) // ... and the contenu is visible
        {   
            contenu.slideToggle();
        }
    });

    // random number between 1 and 4
    var random = Math.floor((Math.random() * 4) + 1);
    // chose randomly a background color for the header
    switch(random){
        case 1:
            $('.jumbotron').css('background-color', '#0D9AD2'); //Blue
            break;
        case 2:
            $('.jumbotron').css('background-color', '#9DBD1A'); //Green
            break;
        case 3:
            $('.jumbotron').css('background-color', '#9b59b6'); //Purple
            break;
        case 4:
           $('.jumbotron').css('background-color', '#e67e22'); //Orange
           break;
    }

    // function to convert date in ISO8601 format to a date for all browsers 
    function dateFromISO8601(iso8601Date) {
       var parts = iso8601Date.match(/\d+/g);
       var isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
       var isoDate = new Date(isoTime);
       return isoDate;
    }
