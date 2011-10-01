(function( q ){
    var m = q.model;

	m.define( "user", {
		load : {},
		find : {},
		update : {
	        href : "https://litemessage.herokuapp.com/user.update.json" // Server set a auth token.
		},
		upload : {}
	});

})( quark );
