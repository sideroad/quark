(function( q ){
    var c = q.controller;
        
	c.define( "user", {
	    load : function( arg ){
			user.load( function( res ){				
	            res.info = res.info.replace(/\n/g,"<br/>");
				arg.render( res, function( elem ){
		            c.call( "user.form" );
		            c.call( "message.take" );
		            setInterval(function(){
		                c.call( "message.take" );
		            }, 5000 );
				} );
			} );
	    },
	    
	    form : function( arg ){
			arg.render( function(){
	            $("#userSearch").focus();
	        } );
	    },
	    
	    search : function( arg ){
			user.find( arg.data ,function( res ){				
                arg.render( res );
			});
	    },
	    
	    updateOpen : function( arg ){
			if( arg.data.id == "guest" ) return;
			arg.render( arg.data );
	    },
	    
	    update : function( arg ){
			user.update( arg.data );
	    },
	    
	    upload : function( arg ){
			arg.render( arg.data );
	    },
	    
	    updateClose : function(){}
	    
	});

})( quark );
