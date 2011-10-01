(function( q ){
	var v = q.view;
		
	v.config( "auth", {
		open: {
			button: true,
			dialog: {
				singleton: true,
				width: 500,
				close: "auth.close"
			},
			validate: {
				userId: /^[a-zA-Z0-9_\.]{4,32}$/,
				password: /^.{6,32}$/
			}
		},
		
		signupOpen: {
			button: true,
			dialog: {
				singleton: true,
				width: 500,
				close: "auth.signupClose"
			},
			validate: {
				userId: /^[a-zA-Z0-9_\.]{4,32}$/,
				password: /^.{6,32}$/,
				name: /^.{4,32}$/
			},
			file: true
		}
	});

})( quark );