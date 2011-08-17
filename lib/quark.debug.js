quark.debug = {
    attach : function(){
        var mock = quark.mock,
            callName = "";
        
        for( callName in mock ) {
            name = callName.split(".")[ 0 ];
            action = callName.split(".")[ 1 ];
            
            $.ajaxMock({
                url : particle.url.replace( /\$\{quark\}/g, name ).replace( /\$\{action\}/g, action ),
                response : mock[ callName ],
                ignoreAll : true
            });   
        }
    }    
};