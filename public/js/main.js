(function ($) {

	new WOW().init();

	jQuery(window).load(function() { 
		jQuery("#preloader").delay(100).fadeOut("slow");
		jQuery("#load").delay(100).fadeOut("slow");
	});


	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$('.navbar-nav li a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
		$('.page-scroll a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});

})(jQuery);

//console.log("just some global mainjs code");
videojs.options.flash.swf = "http://localhost:3000/js/video-js/video-js.swf";

$(document).ready(function() {

  // Place JavaScript code here...
  //console.log("document ready mainjs started");
  $('#subscribeBox .form-group span.glyphicon.glyphicon-ok').hide()
  $('#subscribeBox .form-group span.glyphicon.glyphicon-remove').hide()
  $('#subscribeBox p.result-block').hide()

  var beforeSendHandler = function () {};
  var completeHandler = function () {    
    $('#subscribeBox .form-group').removeClass('has-error has-feedback').addClass('has-success has-feedback')
    $('#subscribeBox .form-group span.glyphicon.glyphicon-remove').hide()
    $('#subscribeBox .form-group span.glyphicon.glyphicon-ok').show()
    $('#subscribeBox p.result-block').show()
  };
  var errorHandler = function (err) {
    $('#subscribeBox .form-group').removeClass('has-success has-feedback').addClass('has-error has-feedback')
    $('#subscribeBox .form-group span.glyphicon.glyphicon-ok').hide()
    $('#subscribeBox .form-group span.glyphicon.glyphicon-remove').show()
    $('#subscribeBox p.result-block').hide()
  };

  $('#subscribeBox').submit(function(e){
    var formObj = $(this);
    var formURL = formObj.attr("action");
   
    if(window.FormData !== undefined)  // for HTML5 browsers
    { 
      var formData = new FormData(this);
      $.ajax({
        url: '/subscribe',  //Server script to process data
        type: 'POST',
        mimeType:"text/plain",
        //Ajax events
        beforeSend: beforeSendHandler,
        success: completeHandler,
        error: errorHandler,
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
      });
      e.preventDefault();
    }
     else  //for olden browsers
    {
      //generate a random id
      var  iframeId = 'unique' + (new Date().getTime());
   
      //create an empty iframe
      var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');
   
      //hide it
      iframe.hide();
   
      //set form target to iframe
      formObj.attr('target',iframeId);
   
      //Add iframe to body
      iframe.appendTo('body');
      iframe.load(function(e)
      {
        var doc = getDoc(iframe[0]);
        var docRoot = doc.body ? doc.body : doc.documentElement;
        var data = docRoot.innerHTML;
        //data is returned from server. 
      }); 
    }
  });


});