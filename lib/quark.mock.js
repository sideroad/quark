var qm = quark.mock = {
    attach : function(){
        var mock = qm,
            quark = {},
            name = "",
            action = "";
        
        for ( name in mock ) {
            quark = mock[ name ];
            for ( action in quark ) {
                (function( mock ){
                    $.mockjax({
                        url : particle.url.replace( /\$\{quark\}/g, name ).replace( /\$\{action\}/g, action ),
                        response : function( setting ){
                            this.responseText = mock( { req : setting.data });
                        }
                    });
                })( quark[ action ] );
            }
        }
    }
};
