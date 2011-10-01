(function( q ){
    var v = q.view;
        
	v.config( "message", {
	    open : {
	        dialog : {
	            singleton : false,
	            close : "message.close"
	        },
	        button : true,
	        validate: {
	            message : /^.+$/
	        }
	    },
	    complete : {
	        floatingMessage : {
	            time : 2000,
	            height: 25,
	            position : "top-right"
	        }
	    },
	    display : {
	        floatingMessage : {
	            height: 75 
	        }
	    }
	});

})( quark );