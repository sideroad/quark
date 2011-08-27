var qt = quark.test = {
    qunit : function(){
        var mock = qm,
            quark = {},
            name = "",
            action = "";
        
        for ( name in mock ) {
            quark = mock[ name ];
            for ( action in quark ) {
                $.mockjax({
                    url : particle.url.replace( /\$\{quark\}/g, name ).replace( /\$\{action\}/g, action ),
                    response : quark[ action ]
                });   
            }
        }
    }
};
