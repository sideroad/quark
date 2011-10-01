(function( q ){
    var m = q.model;

	m.define( "auth", {
		signin : {
	        href : "https://litemessage.herokuapp.com/auth.signin.json" // Server set a auth token.
		},
		signup : {
	        href : "https://litemessage.herokuapp.com/auth.signup.json" // Server set a auth token.
		}
    });
    
})( quark );
