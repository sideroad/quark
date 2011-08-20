(function( $ ){
    var that = this,
        isDebug = false;
    
    
    // document.ready
    $(function(){
        that.particle = $.extend(true, {
                path : {
                    action : "quark/",
                    render : "quark/render/",
                    lang : "quark/lang/"
                },
                lang : [],
                quark : [ ],
                init : function(){ 
                    true; 
                }
            }, that.particle );
        
        // Debug attach
        isDebug = ( quark.debug && console ) ? true : false;
        if( isDebug ) {
            quark.debug.attach();
        }
        
        var part = that.particle,
            quarks = part.quark,
            actionPath = part.path.action,
            langPath = part.path.lang,
            quarksLength = quarks.length,
            lang = part.lang,
            i = 0,
            core = that.quark.core;
            
        // Load data from localStorage
        core.loadData();

        // load javascript files by headjs 
        for( i=0; i<quarksLength; i++ ){
                head.js( actionPath + quarks[ i ] + ".js" );
        }
        
        // load language setting
        core.loadLang( lang, langPath );
        
        // all javascript loaded
        head.ready( function( ){
            var names = [ ],
                i,
                init = "",
                inits = part.init || [],
                initLength = inits.length;
            
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
                core.call( location.hash );
            });
        });

        
    });
})(jQuery);
