( function( $, q ){
	var c = q.controller;
	
	module("auth",{
		setup : function(){
			// setup something
		},
		teardown : function(){
			// teardown something
		}
	});
	
	asyncTest("open", function(){
		expect( 5 );
		
		c.call( "auth.open", {}, undefined, function(){
			var elem = $("#auth-open");
			ok( elem.dialog("isOpen") );
			
			// User ID
			$( "#userId" ).focus();
			equal( $("#userId-validate").css("display"), "block" );
			$( "#userId" ).val( "test" ).focus().blur();
	        equal( $("#userId-validate").css("display"), "none" );
			
			// Password
	        $( "#password" ).focus();
	        equal( $("#password-validate").css("display"), "block" );
	        $( "#password" ).val( "testtest" ).focus().blur();
	        equal( $("#password-validate").css("display"), "none" );
			
			start();
		} );
});
})( jQuery, quark );
