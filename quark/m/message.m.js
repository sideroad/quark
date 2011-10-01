(function( q ){
    var m = q.model;

	m.define( "message", {
		unread : {
			method : "take",
			callback : function( res ){
	            var list = res.list || [],
	                length = list.length,
	                i,
					data,
					unread = [];
	                mes = this.data( "taken" ) || {};
	            
	            for( i = 0; i < length; i++ ){
					data = list[i];
	                if ( mes[ data.mid ] ) continue;
					unread.push( data );
	                mes[ data.mid ] = true;
	            }
	            this.data( "taken", mes );	
				return unread;
			}
		},
		send : {},
		remove : {}
	});

})( quark );
