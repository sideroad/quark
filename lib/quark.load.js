(function( $ ){
    var that = this,
        isDebug = false;
    
    
    // document.ready
    $(function(){
        that.particle = $.extend(true, {
                path : {
                    action : "quark/",
                    render : "quark/render/"
                },
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
            quarksLength = quarks.length,
            i = 0,
            core = that.quark.core;
            
        
        

        // load javascript files by headjs 
        for( i=0; i<quarksLength; i++ ){
                head.js( actionPath + quarks[ i ] + ".js" );
        }
        
        // all javascript loaded
        head.ready( function( ){
            var names = [ ],i;
            
            // Make name list
            for( i=0; i<quarksLength; i++ ){
                names.push( quarks[i] );
            }
            core.attach( names );
            core.initialize( names );

            if ( isDebug ) console.log( "[info] init : particle" );
            part.init( );
            
        });

        
    });
})(jQuery);
