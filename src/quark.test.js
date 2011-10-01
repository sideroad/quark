quark.test = {
	
	init : function(){
		
		$(document.body).html(
		    '<h1 id="qunit-header">Quark Test Suite</h1>' +
            '<h2 id="qunit-banner"></h2>' +
            '<div id="qunit-testrunner-toolbar"></div>' +
            '<h2 id="qunit-userAgent"></h2>' +
            '<ol id="qunit-tests"></ol>' + 
            '<div id="qunit-fixture">'
		);
		
		$(document.head).append('<link rel="stylesheet" type="text/css" href="css/qunit.css" />');
		
	},
	
	execute : function(){
		var qt = quark.test,
                t = {},
                name = "",
                method = "";
            
            for ( name in qt ) {
				if( name == "execute" || name == "test" ) continue;
                t = qt[ name ];
				
                module( name );
                for ( method in quark ) {
                    (function( test ){
                        asyncTest( name + "." + method, test );
                    })( t[ method ] );
                }
            }
		    
	}
	
};
