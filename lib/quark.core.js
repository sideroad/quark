var particle = { },
    quark = { };

(function( $ ){
    var that = this,
        roots = {},
        intercepter = {},
        isDebug = false,
        langSetting = {},
        quars = that.quark;
    

    // Quark core
    quark.core = {
            
        /**
         * Call quark process
         * 
         * @param {String} callName
         *     quark name and action which separeted dot charactor.
         * @param {Object} params
         *     call arguments
         * 
         */
        call : function( callName, params ){
            if ( !callName ) return;
            if ( isDebug ) console.log( "[info] call : "+callName+" : " + $.param( params||{} ) );
            
            var part = that.particle,
                name = callName.split(".")[0],
                action = callName.split(".")[1],
                quar = that.quark[name],
                callback = quar.callback[action],
                rendered = quar.rendered[action],
                hasRender = quar.render[action],
                data = {},
                ajax = false,
                chain = "",
                core = that.quark.core,
                intercept = core.intercept,
                success = function( html, data ){
                    var id = callName.replace(".","-"),
                        root = roots[ id ],
                        tmpElem = $("<div></div>");
                
                    // Get root element                                
                    if( !root ) {
                        root = $("#"+id);
                        root = roots [ id ] = ( root.length ) ? root : $("<div></div>").appendTo( document.body );
                    }
                    
                    // Render 
                    tmpElem.render( html, data );
                    root.replaceWith( tmpElem[0].innerHTML );
                    root = $("#"+id);
                    
                    // Call rendered function
                    if( rendered ) {
                        chain = rendered( data ) || "";
                    }
                    
                    // Dialog ( QuarkUtil )
                    if( quar.dialog && quar.dialog[ action ] ) {
                        quark.util.dialog( root, quar.dialog[ action ] );
                    }
                    
                    // Call chain function
                    // TODO consider chain specification
                    if( chain ) {
                        chainer = quar.chain[action][chain];
                        core.call( chainer );
                    }
                },
                
                /**
                 * Render
                 *   
                 *   @param data : Object
                 *                 Used for render data
                 */
                render = function( data ){
                    if( hasRender ){
                        $.ajax({
                            url : part.path.render+name+"/"+action+".ren",
                            dataType : "text",
                            success : function(html){
                                success(html, data);
                            },
                            error : function( e ){
                                if(isDebug) {
                                    console.log("[error] render : " + callName, e );
                                }
                                throw new Error( e ) ;
                            }
                        });
                    } else {
                        success( "", data );
                    }
                };
        
        // Intercepter
        core.intercept( callName );
                
        // Execute
        data = quar.execute[action]( params ) || {};
        
        /**
         * Call Ajax process when the callback exists  
         *     Ajax process
         * 
         * Other
         *     Normal process
         */
        callback ?
                // Ajax process
                $.ajax({
                    url : part.url.replace( "${quark}", name ).replace( "${action}", action ),
                    data : data,
                    success : function( json ){
                        render( callback( json, data ) || data );
                    }
                }) :
                    
                // Normal process
                (function(){
                    render( data );
                })();
        
        },
        
        /**
         * Unserialize data
         * un-serialize a query data.
         * 
         * @param {String} query
         */
        unserialize : function( query ){
            var set = query.replace("+", "%20").split("&") || [],
                length = set.length,
                keyVal = [],
                key, val, existedVal,i,
                data = {};
            for( i = 0; i < length; i++ ){
                keyVal = set[ i ].split("=");
                key = decodeURIComponent( keyVal[ 0 ]);
                val = decodeURIComponent( keyVal[ 1 ]);
                existedVal = data[ key ];
                if ( existedVal ) {
                    if( typeof existedVal == "string" ){
                        data[ key ] = [ existedVal ];
                    }
                    data[ key ].push( val );
                } else {
                    data[ key ] = val;
                }
            }
            return data;
        },
        
        /**
         * Attach event
         */
        attach : function( ){
            var types = [ "click", "change", "keydown" ],
                length = types.length,
                doc = $(document.body),
                i;
            
            for( i = 0; i < length; i++ ){
                doc.bind(types[ i ],function( e ){
                    var events = ($(e.target).data("quarkEvent")||"").split(",") || [],
                        length = events.length,
                        reg = /^([^-]+)-([^\.]+\.[^\:\?]+)(\:|\?|)(.*)/,
                        type = e.type,
                        core = quars.core,
                        i, matches, event, data,context, callName;

                    if( type == "keydown" && e.keyCode == "13") {
                        type = "enter";
                    }
                        
                    for( i = 0; i < length; i++ ) {
                        event = events[ i ];
                        matches = event.match( reg ) || false;
                        if( matches && type == matches[1] ) {
                            callName = matches[2];
                            separate = matches[3];
                            context = matches[4];
                            data = {};
                            if ( context ) {
                                if( separate == ":" ){
                                    context = $( "#" + callName.replace(".","-") + "-" + context ).serialize();
                                }
                                data = core.unserialize( context ) || {};
                            }
                            core.call( callName, data);
                        }
                        
                    }
                });
            }
        },
        
        /**
         * Call quark initialize function
         */
        initialize : function( names ){
            var length = names.length,
                quark = quars,
                name = "", i;
            
            for( i=0; i<length; i++ ){
                name = names[ i ];
                if ( isDebug ) console.log( "[info] init : "+name );
                quark[ name ].init( );
            };
        },
        
        /**
         * Intercepter function
         * 
         */
        intercept : function( callName, func ){
            if( func ) {
                intercepter[ callName ] = func;
            } else if( intercepter[ callName ] ) {
                var func = intercepter[ callName ];
                intercepter[ callName ] = false;
                func();
            }
        },
        
        /**
         * Load language setting
         * 
         */
        loadLang : function( lang, path ){
            var length = lang.length,
                setting = {},
                core = that.quark.core,
                i;

            for( i = 0; i < length; i++ ){
                setting[ lang[ i ] ] = path + "word." + lang[ i ];
            }
            langSetting = setting;
            
            if( length ) {
                core.setLang( "", lang[ 0 ] );
            }
        },
        
        /**
         * Set language
         */
        setLang : function( lang, def ){
            $.loadWordSetting( langSetting, def, lang );
        }
    };
    
    $(function(){
        isDebug = ( quark.debug && console ) ? true : false;
    });
    
})(jQuery);
