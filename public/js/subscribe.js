function changeClass(obj, newclass) {
  if( !classie.has( obj, newclass ) ) {
    classie.add( obj, newclass );
  }
}

var beforeSendHandler = function () {console.log("beforeSendHandler")};
var completeHandler = function () {
  console.log("completeHandler");
  changeClass(($('#subscr')[0]), "btn-success");
};
var errorHandler = function (err) {
  console.log("errorHandler {0} ", err)
  changeClass(($('#subscr')[0]), "btn-error");
};

$('#subscribeBox').submit(function(e){  
  console.log("subscribeBox submit");

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

var buttons7Click = Array.prototype.slice.call( document.querySelectorAll( '#btn-click button' ) ),
  buttons9Click = Array.prototype.slice.call( document.querySelectorAll( 'button.btn-8g' ) ),
  totalButtons7Click = buttons7Click.length,
  totalButtons9Click = buttons9Click.length;

buttons7Click.forEach( function( el, i ) { el.addEventListener( 'click', activate, false ); } );
buttons9Click.forEach( function( el, i ) { el.addEventListener( 'click', activate, false ); } );

function activate() {
  var self = this, activatedClass = 'btn-activated';

  if( classie.has( this, 'btn-7h' ) ) {
    // if it is the first of the two btn-7h then activatedClass = 'btn-error';
    // if it is the second then activatedClass = 'btn-success'
    activatedClass = buttons7Click.indexOf( this ) === totalButtons7Click-2 ? 'btn-error' : 'btn-success';
  }
  else if( classie.has( this, 'btn-8g' ) ) {
    // if it is the first of the two btn-8g then activatedClass = 'btn-success3d';
    // if it is the second then activatedClass = 'btn-error3d'
    activatedClass = buttons9Click.indexOf( this ) === totalButtons9Click-2 ? 'btn-success3d' : 'btn-error3d';
  }

  if( !classie.has( this, activatedClass ) ) {
    classie.add( this, activatedClass );
    //setTimeout( function() { classie.remove( self, activatedClass ) }, 1000000 );
  }
}