var particle = { },
    quark = { },
    qc;

(function( $ ){
    var that = this,
        roots = {},
        intercepter = {},
        isDebug = false,
        langSetting = {},
        data = {},
        lsData = {},
        quars = that.quark;
    

    // Quark core
    qc = quark.core = {
            
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
                quar = that.quark[name][action],
                callback = quar.callback,
                rendered = quar.rendered,
                hasRender = quar.render,
                validate = quar.validate,
                data = {},
                ajax = false,
                chain = "",
                core = that.quark.core,
                intercept = core.intercept,
                success = function( html, data ){
                    var id = callName.replace(".","-"),
                        root = roots[ id ],
                        tmpElem = $("<div></div>"),
                        dialog = quar.dialog,
                        button = quar.button;
                
                    // Get root element                                
                    if( !root || !root.length || !root.attr("id")) {
                        root = $("#"+id);
                        root = ( root.length ) ? root : $("<div></div>").appendTo( document.body );
                    }
                    
                    // Render 
                    tmpElem.render( html, data );
                    root.replaceWith( tmpElem[0].innerHTML );
                    if( $("#"+id).length ) {
                        roots [ id ] = root = $("#"+id);
                    }
                    
                    // Call rendered function
                    if( rendered ) {
                        chain = rendered( data ) || "";
                    }
                    
                    // Button
                    if( button ) {
                        quark.util.button( root );
                    }
                    
                    // Dialog ( QuarkUtil )
                    if( dialog ) {
                        quark.util.dialog( root, dialog );
                    }
                    
                    // Set validate
                    if( validate ){
                        quark.util.validate( validate );
                    } 
                    
                    // Call chain function
                    // TODO consider chain specification
                    if( chain ) {
                        core.call( chain );
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
        data = quar.execute( params ) || params || {};
        
        
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
                        if( isDebug ) console.log( "[info] res : " + callName ,  json );
                        render( callback( json, data ) || json );
                    }
                }) :
                    
                // Normal process
                (function(){
                    render( data );
                })();
        
        },
        
        /**
         * deserialize data
         * deserialize a query data.
         * 
         * @param {String} query
         */
        deserialize : function( query ){
            if( !query) return {};
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
                    var elem = $(e.target),
                        parents = elem.parents("[data-quark-event]");
                    
                    $([elem, parents]).each(function(){
                        var events = ($(this).data("quarkEvent")||"").replace(/\s/,"").split(",") || [],
                            length = events.length,
                            reg = /^([^-]+)-([^\.]+\.[^\:\?]+)(\:|\?|)(.*)/,
                            type = e.type,
                            core = quars.core,
                            i, matches, event, data,context, callName,isValid,
                            form;
    
                        if( type == "keydown" && e.keyCode == "13" ) {
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
                                        form = $( "#" + callName.replace(".","-") + "-" + context );
                                        isValid = form.find("input, select, textarea").validate();
                                        
                                        if(!form.find("input.prevent-enter-submit").length) {
                                            form.append('<input type="text" style="display:none;" disabled="disabled" class="prevent-enter-submit" >');
                                        }

                                        if( isValid ){
                                            context = form.serialize();
                                        }  else {
                                            return false;
                                        }
                                    }
                                    data = core.deserialize( context ) || {};
                                }
                                core.call( callName, data);
                            }
                        }
                    });
                });
            }
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
         * data storage
         * @param {String} key
         * @param {Any} val
         * @param {Boolean} store to local storage
         */
        data : function( key, val, store ){
            if( val === undefined ){
                return data[ key ];
            }
            data[ key ] = val;
            
            if( store ) {
                lsData[ key ] = val;
                $.Storage.set( "quark-data", $.param( lsData ) );
            }
            
        },
        
        /**
         * Load data from localStorage
         */
        loadData : function(){
            var quarkData = $.Storage.get( "quark-data" );
            data = this.deserialize( quarkData );
            lsData = this.deserialize( quarkData );
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
                core.setLang( "en", lang[ 0 ] );
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
