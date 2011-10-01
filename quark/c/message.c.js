(function( q ){
    var c = q.controller;
        
	c.define( "message", {
		
	    open : function( arg ){
			arg.render( arg.data );
	    },
		
	    send : function( arg ){
			message.send( arg.data, function( res ){
	            if( res.status == "success" ) {
	                c.call( "message.complete", { dialog : arg.target } );
	            } else {
	                c.call( "message.close", {}, arg.data.elem );
	            }
			});
	    },
		
	    complete : function( arg ){ 
		    arg.render( function(){
                c.call( "message.close", {}, arg.data.dialog );				
			});
	    },
		
	    take : function(){
			message.unread( function( list ){
                var i;
				for( i = 0; i < list.length; i++ ){
				    (function( data, i ){
		                setTimeout(function(){
		                    c.call( "message.display", data );
		                }, 250*i);
					})( list[ i ], i );
				}

			});
	    },
		
	    remove : function( arg ){
			message.remove( arg.data );
	    },
		
	    display : function( arg ){
			arg.render( arg.data );	
	    },
		
	    close : function(){}
	});

})( quark );