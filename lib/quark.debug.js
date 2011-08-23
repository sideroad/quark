quark.debug = {
    attach : function(){
        var mock = quark.mock,
            callName = "",
            name,
            action;
        
        for( callName in mock ) {
            name = callName.split(".")[ 0 ];
            action = callName.split(".")[ 1 ];
            $.mockjax({
                url : particle.url.replace( /\$\{quark\}/g, name ).replace( /\$\{action\}/g, action ),
                response : mock[ callName ]
            });   
        }
    }    
};
