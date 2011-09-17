/*!
 * Quark Load v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function( $ ){
    var that = this;
    
    
    // document.ready
    $(function(){
        
        that.particle = $.extend(true, {
                path : {
                    action : "quark/${quark}/${quark}.js",
                    render : "quark/${quark}/render/${action}.ren",
                    lang : "lang/",
                    mock : "quark/${quark}/${quark}.mock.js"
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
            //:Debug mockPath = part.path.mock,
            //:Test testPath = part.path.test,
            quarksLength = quarks.length,
            lang = part.lang,
            i = 0,
            core = that.quark.core;
            
        // Load data from localStorage
        core.loadData();

        // load javascript files by headjs 
        for( i=0; i<quarksLength; i++ ){
                head.js( actionPath.replace( /\$\{quark\}/g, quarks[ i ]) );
                //:Debug head.js( mockPath.replace( /\$\{quark\}/g, quarks[ i ] ) );
                //:Test head.js( testPath.replace( /\$\{quark\}/g, quarks[ i ]) );
        }
        
        // Load language setting
        core.loadLang( lang, langPath ,function(){

            // Load index
            $(document.body).render({
                url : "particle/${particle}/index.ren".replace( /\$\{particle\}/g, part.name),
                dataType : "html",
                success : function(){

                    // all javascript loaded
                    head.ready( function( ){
                        var names = [ ],
                            i,
                            init = "",
                            inits = part.init || [],
                            initLength = inits.length;
                        
                        // Mock attach for Debug
                        //:Debug quark.mock.attach();
                        
                        // Make name list
                        for( i=0; i<quarksLength; i++ ){
                            names.push( quarks[i] );
                        }
                        core.attach( names );

                        for( i=0; i<initLength;i++ ){
                            init = inits[ i ];
                            //:Debug console.log( "[info] init : " +init );
                            core.call( init );
                        }
						
                        // Execute test
                        //:Test quark.test.execute();
						
                        $(window).bind( "hashchange", function(){
                            var matches = location.hash.match( /^#([^\.]+\.[^\?]+)(\?|)(.*)$/ ) || [ ],
                                call = matches[ 1 ],
                                query = matches[ 3 ] || "";
                            
                            if ( ! call ) return;
                            
                            core.call( call, qc.deserialize( query ) );
                        }).trigger("hashchange");
                        
                    });
                }
            });
        });
        
        

        
    });
})(jQuery);
