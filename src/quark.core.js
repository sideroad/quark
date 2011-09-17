/*!
 * Quark Core v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
var particle = { },
    quark = { },
    qc;

(function( $ ){
    var that = this,
        roots = {},
        intercepter = {},
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
            //:Debug console.log( "[info] call : "+callName, params, target );
            if ( !params ) params = {};
            
            var part = that.particle,
                name = callName.split(".")[0],
                action = callName.split(".")[1],
                quar = that.quark[name][action] || (function(){ throw new ReferenceError( callName + " is not defined." ); })(),
                execute = quar.execute,
                callback = quar.callback,
                render = quar.render,
                ajax = quar.ajax,
                href = quar.href,
                //:Test test = quar.test,
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
                getTemplate = function( res, req, params, target ){
                    if ( render ){
                        $.ajax({
                            url : part.path.render.replace(/\$\{quark\}/g, name).replace( /\$\{action\}/g, action ),
                            dataType : "html",
                            success : function(html){
                                getTemplateSuccess( html, res, req, params, target );
                            },
                            error : function( e ){
                                //:Debug console.log("[error] render : " + callName, e );
                                throw new Error( e ) ;
                            }
                        });
                    } else {
                        getTemplateSuccess( "", res, req, params, target );
                    }
                },
                ajaxSuccess = function( res ){
                    //:Debug console.log( "[info] res : " + callName ,  res );
                    getTemplate( callback( { res : res, req : req, data : params, target : target } ) || res, req, params, target );
                },
                getTemplateSuccess = function( html, res, req, params, target ){
                    var id = callName.replace(".","-"),
                        root = roots[ id ],
                        tmpElem = $("<div></div>"),
                        dialog = quar.dialog;

                    // Render 
                    if ( render ) {

                        // Render                                
                        root = $( "#" + id );
                        root = ( root.length ) ? root : $("<div></div>").appendTo( document.body );
                        tmpElem.render( html, res );
                        if( !root[0].id || !dialog || !dialog.singleton ){
                            root.replaceWith( tmpElem[0].innerHTML );
                        }
                        roots [ id ] = root = $( "#" + id );
                        
                        // UI display control
                        root.find( "[data-quark-ui]" ).each(function(){
                            var elem = $( this ),
                                ui = elem.data( "quarkUi" );
                            
                            ( params[ "ui-" + ui ] ) ? elem.css( { display : "block" } ) : elem.css( { display : "none" } );
                            
                        });
                        
                        // Util attach
                        if( quark.util ){
                            quark.util.attach( root, quar );
                        }
                        
                        // UI attach
                        if( quark.ui ){
                            quark.ui.attach( root, quar );
                        }
                    }
                    
                    // Call render function
                    if( render && $.isFunction( render ) ) {
                        chain = render( { elem : root, res : res, req : req, data : params, target : target } ) || {};
                        chain = ( typeof chain == "string" || chain instanceof String ) ? { call : chain } : chain;
                    }
					
					//:Test if(test) test( { elem : root, res : res, req : req, data : params, target : target } );
                    
                    // Call chain function
                    // useless current specification
//                    if( chain.call ) {
//                        core.call( chain.call, chain.data, chain.elem );
//                    }
                };
        
            // Intercepter
            core.intercept( callName, params, target );
                    
            // Execute
            if ( execute ) {
                req = execute( { data : params, target : target } ) || $.extend( true, {}, params ) || {};
            } else {
                req = $.extend( true, {}, params ) || {};
            }
            
            // Href
            if ( href ) {
                req._ = new Date().getTime() + "_" + parseInt( Math.random() * 10000, 10 );
                location.href = href.replace( "${quark}", name ).replace( "${action}", action ) + "?" + $.param( req ).replace( /\+/g, "%20" );
                return;
            }
            
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
                            dataType: part.dataType,
                            success : ajaxSuccess
                        } )
                        
                    // Normal process
                    : ( function(){
                        getTemplate( $.extend( true, {}, req ), req, params, target );
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
            var set = query.replace( /\+/g, "%20" ).split( "&" ) || [],
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
                //:Debug console.log( "[info] get data : ", key, data[ key ] );
                return data[ key ];
            }
            //:Debug console.log( "[info] set data : ", key, val );
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
            var quarkData = $.extend( true, {}, 
                    this.deserialize( $.Storage.get( "quark-data" ) )
            );
            data = quarkData;
            lsData = $.extend( true, {}, quarkData );
        },
        
        /**
         * Set language
         */
        lang : function( lang, def, callback ){
            $.word( langSetting, def, lang, callback );
        },
        
        /**
         * Load language setting
         * 
         */
        loadLang : function( lang, path, callback ){
            var length = lang.length,
                setting = {},
                core = that.quark.core,
                i;

            for( i = 0; i < length; i++ ){
                setting[ lang[ i ] ] = path + "word." + lang[ i ];
            }
            langSetting = setting;
            
            if( length ) {
                core.lang( "en", lang[ 0 ], callback );
            }
        }
    };
    
})(jQuery);
