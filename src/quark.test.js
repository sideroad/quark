var qt = quark.test = {
	
	execute : function(){
		var qt = quark.test,
                quark = {},
                name = "",
                action = "";
            
            for ( name in qt ) {
				if( name == "execute" || name == "test" ) continue;
                quark = qt[ name ];
				
                module( name );
                for ( action in quark ) {
                    (function( test ){
                        asyncTest( name + "." + action, test );
                    })( quark[ action ] );
                }
            }
		    
	},
	
    test : function( arg ){
        var callName = arg.call,
		    name = callName.split(".")[0],
			action = callName.split(".")[1],
            data = arg.data,
            response = arg.response,
			target = arg.target,
            test = arg.test;
        
        $.mockjax({
            url : particle.url.replace( /\$\{quark\}/g, name ).replace( /\$\{action\}/g, action ),
            response : function( setting ){
				this.responseText = response( { req : setting.data } );
			}
        });
		
		quark[name][action].test = function( arg ){
			test( arg );
		};
		quark.core.call( callName, data, target );
		
    }
};
