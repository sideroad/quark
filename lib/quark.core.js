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
         * @param {jQueryElement} elem
         * 
         */
        call : function( callName, params, target ){
            if ( !callName ) return;
            if ( isDebug ) console.log( "[info] call : "+callName, params, target );
            
            var part = that.particle,
                name = callName.split(".")[0],
                action = callName.split(".")[1],
                quar = that.quark[name][action] || (function(){ throw new ReferenceError( callName + " is not defined." ); })(),
                callback = quar.callback,
                rendered = quar.rendered,
                isRender = quar.render,
                validate = quar.validate,
                ajax = quar.ajax,
                file = quar.file,
                req = {},
                chain = "",
                core = that.quark.core,
                intercept = core.intercept,
                
                /**
                 * Render
                 *   
                 *   @param data : Object
                 *                 Used for render data
                 */
                render = function( res, req, params, target ){
                    if ( isRender ){
                        $.ajax({
                            url : part.path.render+name+"/"+action+".ren",
                            dataType : "text",
                            success : function(html){
                                getTemplateSuccess( html, res, req, params, target );
                            },
                            error : function( e ){
                                if ( isDebug ) console.log("[error] render : " + callName, e );
                                throw new Error( e ) ;
                            }
                        });
                    } else {
                        getTemplateSuccess( "", res, req, params, target );
                    }
                },
                ajaxSuccess = function( res ){
                    if ( isDebug ) console.log( "[info] res : " + callName ,  res );
                    render( callback( { res : res, req : req, data : params, target : target } ) || res, req, params, target );
                },
                getTemplateSuccess = function( html, res, req, params, target ){
                    var id = callName.replace(".","-"),
                        root = roots[ id ],
                        tmpElem = $("<div></div>"),
                        dialog = quar.dialog,
                        floatingMessage = quar.floatingMessage,
                        button = quar.button;

                    // Render 
                    if ( isRender ) {

                        // Render                                
                        root = $( "#" + id );
                        root = ( root.length ) ? root : $("<div></div>").appendTo( document.body );
                        tmpElem.render( html, res );
                        if( !root[0].id || !dialog || !dialog.singleton ){
                            root.replaceWith( tmpElem[0].innerHTML );
                        }
                        roots [ id ] = root = $( "#" + id );

                        // Set validate
                        if( validate ){
                            quark.util.validate( root, validate );
                        }
                        
                        // Set file upload
                        if( file ){
                            quark.util.file( root, file );
                        }
                        
                        // Button
                        if( button ) {
                            quark.util.button( root );
                        }
                        
                        // Dialog ( QuarkUtil )
                        if( dialog ) {
                            quark.util.dialog( root, dialog );
                        }
                        
                        // FloatingMessage ( QuarkUtil )
                        if( floatingMessage ) {
                            quark.util.floatingMessage( root, floatingMessage );
                        }
                    }
                    
                    // Call rendered function
                    if( rendered ) {
                        chain = rendered( { elem : root, res : res, req : req, data : params, target : target } ) || {};
                        chain = ( typeof chain == "string" || chain instanceof String ) ? { call : chain } : chain;
                    }
                    
                    // Call chain function
                    // useless current specification
//                    if( chain.call ) {
//                        core.call( chain.call, chain.data, chain.elem );
//                    }
                };
        
        // Intercepter
        core.intercept( callName, params, target );
                
        // Execute
        req = quar.execute( { data : params, target : target } ) || $.extend( true, {}, params ) || {};
        
        
        /**
         * Call Ajax process when the callback exists  
         *     Ajax process
         * 
         * Other
         *     Normal process
         */
        callback ?
                // Ajax process
//                ajax ?
//                        ajax( { req : req, data : params, target : target }, ajaxSuccess ) : 
                    $.ajax( {
                        url : part.url.replace( "${quark}", name ).replace( "${action}", action ),
                        data : req,
                        success : ajaxSuccess
                    } )
                    
                // Normal process
                : ( function(){
                    render( $.extend( true, {}, req ), req, params, target );
                } )();
        
        },
        
        /**
         * Attach event
         */
        attach : function( ){
            var types = [ "click", "change", "keydown" ],
                length = types.length,
                doc = $( document.body ),
                i;
            
            for( i = 0; i < length; i++ ){
                doc.bind(types[ i ],function( e ){
                    var elem = $(e.target),
                        parents = elem.parents("[data-quark-event]");
                    
                    $( [ elem, parents ] ).each( function(){
                        var elem = $(this),
                            events = ( elem.data("quarkEvent") || "" ).replace(/\s/,"").split(",") || [],
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
                                        
                                        if( !form.find("input.prevent-enter-submit").length ) {
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
                                core.call( callName, data, elem);
                            }
                        }
                    });
                });
            }
        },
        
        /**
         * deserialize data
         * deserialize a query data.
         * 
         * @param {String} query
         */
        deserialize : function( query ){
            if( !query ) return {};
            var set = query.replace( "+", "%20" ).split( "&" ) || [],
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
         * Intercepter function
         * 
         */
        setIntercept : function( callName, func ){
            
            if( !intercepter[callName] ) {
                intercepter[ callName ] = [];
            }
            intercepter[ callName ].push( func );
        },
        
        /**
         * Intercepter function
         * 
         */
        intercept : function( callName, data, elem ){
            var funcs = [],
                once = [],
                i,
                length;
            
            funcs = intercepter[ callName ] || [];
            length = funcs.length;
            
            for( i = 0; i < length; i++ ){
                func = funcs[ i ];
                if ( func( data, elem ) === false ){
                    once.push( func );
                }
            }
            intercepter[ callName ] = once;
        },
        
        /**
         * data storage
         * @param {String} key
         * @param {Any} val
         * @param {Boolean} store to local storage
         */
        data : function( key, val, store ){
            if( val === undefined ){
                if ( isDebug ) console.log( "[info] get data : ", key, data[ key ] );
                return data[ key ];
            }
            if ( isDebug ) console.log( "[info] set data : ", key, val );
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
