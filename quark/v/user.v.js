(function( q ){
    var v = q.view;
        
	v.config( "user", {
	    load : {
	        button : true
	        
	    },
	    
	    form : {
	        button : true,
	        validate : {
	            userSearch : /^.+$/
	        }
	    },
	    
	    updateOpen : {
	        button : true,
	        file : true,
	        dialog : {
	            singleton : true,
	            width : 500,
	            close : "user.updateClose"
	        },
	        validate : {
	            userId : /^[a-zA-Z0-9_\.]{4,32}$/,
	            password : /^.{6,32}$/,
	            name : /^.{4,32}$/
	        }
	    }
	    
	});

})( quark );
