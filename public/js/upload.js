console.log("Hello upload!");

var beforeSendHandler = function () {console.log("beforeSendHandler")};
var completeHandler = function () {console.log("completeHandler")};
var errorHandler = function () {console.log("errorHandler")};


$(':file').change(function(){
  var file = this.files[0];
  var name = file.name;
  var size = file.size;
  var type = file.type;
  //Your validation
});

/*
$(':button').click(function(){
  console.log("button submit");
  var formData = new FormData($('form')[0]);
  $.ajax({
    url: '/upload',  //Server script to process data
    type: 'POST',
    xhr: function() {  // Custom XMLHttpRequest
      var myXhr = $.ajaxSettings.xhr();
      if(myXhr.upload){ // Check if upload property exists
        myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
      }
      return myXhr;
    },
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
});
*/

function progressHandlingFunction(e){
  if(e.lengthComputable){
    $('progress').attr({value:e.loaded,max:e.total});
  }
}

/* http://hayageek.com/jquery-ajax-form-submit/ version */
function getDoc(frame) {
   var doc = null;
 
   // IE8 cascading access check
   try {
     if (frame.contentWindow) {
       doc = frame.contentWindow.document;
     }
   } catch(err) {
   }
 
   if (doc) { // successful getting content
     return doc;
   }
 
   try { // simply checking may throw in ie8 under ssl or mismatched protocol
     doc = frame.contentDocument ? frame.contentDocument : frame.document;
   } catch(err) {
     // last attempt
     doc = frame.document;
   }
   return doc;
 }

$('#uploadForm').submit(function(e)
{
  console.log("multiform submit");

  var formObj = $(this);
  var formURL = formObj.attr("action");
 
  if(window.FormData !== undefined)  // for HTML5 browsers
  { 
    var formData = new FormData(this);
    $.ajax({
      url: '/upload',  //Server script to process data
      type: 'POST',
      mimeType:"multipart/form-data",
      xhr: function() {  // Custom XMLHttpRequest
        var myXhr = $.ajaxSettings.xhr();
        if(myXhr.upload){ // Check if upload property exists
          myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
        }
        return myXhr;
      },
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
    //$('#uploadForm').unbind();
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
//$("#multiform").submit();