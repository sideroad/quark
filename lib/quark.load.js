(function( $ ){
    var that = this;
    
    
    // document.ready
    $(function(){
        var isDebug = ( quark.debug && console ) ? true : false,
            isMock = ( quark.mock ) ? true : false,
            isTest = ( quark.test ) ? true : false;
        
        that.particle = $.extend(true, {
                path : {
                    action : "quark/",
                    render : "render/",
                    lang : "lang/",
                    debug : "quark/debug/"
                },
                lang : [],
                quark : [ ],
                init : function(){ 
                    true; 
                }
            }, that.particle );
        
        var part = that.particle,
            quarks = part.quark,
            actionPath = part.path.action,
            langPath = part.path.lang,
            debugPath = part.path.debug,
            testPath = part.path.test,
            quarksLength = quarks.length,
            lang = part.lang,
            i = 0,
            core = that.quark.core;
            
        // Load data from localStorage
        core.loadData();

        // load javascript files by headjs 
        for( i=0; i<quarksLength; i++ ){
                head.js( actionPath + quarks[ i ] + ".js" );
                if ( isDebug ) head.js( debugPath + quarks[ i ] + ".debug.js" );
                if ( isTest ) head.js( testPath + quarks[ i ] + ".test.js" );
        }
        
        // Load language setting
        core.loadLang( lang, langPath );
        
        // Load index
        $(document.body).render({
            url : "render/index.ren"
        });
        
        // all javascript loaded
        head.ready( function( ){
            var names = [ ],
                i,
                init = "",
                inits = part.init || [],
                initLength = inits.length;
            
            // Mock attache for Debug
            if ( isMock ) quark.mock.attach();
            
            // Make name list
            for( i=0; i<quarksLength; i++ ){
                names.push( quarks[i] );
            }
            core.attach( names );

            for( i=0; i<initLength;i++ ){
                init = inits[ i ];
                if ( isDebug ) console.log( "[info] init : " +init );
                core.call( init );
            }
            $(window).hashchange(function(){
                var matches = location.hash.match( /^#([^\.]+\.[^\?]+)(\?|)(.*)$/ ),
                    call = matches[ 1 ],
                    query = matches[ 3 ] || "";
                
                core.call( call, qc.deserialize( query ) );
            });
        });

        
    });
})(jQuery);
