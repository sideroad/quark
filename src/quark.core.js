/**!
 * Quark Core v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
var hadron = { },
    quark = { };

(function( $ ){
    var that = this,
        roots = {},
        intercepter = {},
        langSetting = {},
        data = {},
        lsData = {},
		controllers = {},
		views = {},
        self = that.quark;
    

	quark.controller = {
		/**
		 * 
		 */
		define : function define( name, methods ){
			controllers[ name ] = methods;
		},
		
		/**
		 * Call controller process
		 *
		 * @param {String} callName
		 *     quark name and method which separeted dot charactor.
		 * @param {Object} data
		 *     call arguments
		 * @param {jQueryElement} target
		 * @param {Function} next
		 *
		 */
		call: function call(callName, data, target, next ){
			if (!callName) return;
			//:Debug console.log( "[info] call : "+callName, data, target );
			if (!data) data = {};
			
			var hadr = that.hadron,
			    name = callName.split(".")[0],
				method = callName.split(".")[1], 
				execute = controllers[name][method] || (function(){
				   throw new ReferenceError(callName + " is not defined.");
			    })(),
				//:Test test = quar.test,
				core = that.quark.core, 
				intercept = core.intercept,  
				/**
				 * Render
				 *
				 *   @param {Object} data
				 *                 Used for render data
				 */
				render = function render( data, callback ){
                    if (!data) data = {};

                    // When omit a data					
					if( $.isFunction( data ) && callback === undefined ){
						callback = data;
						data = {};
					}
					
					$.ajax({
						url: hadr.path.template.replace(/\$\{quark\}/g, name).replace(/\$\{method\}/g, method),
						dataType: "html",
						cache : true,
						success: function(html){
		                    var id = callName.replace(".", "-"), 
		                        root = roots[id],
		                        tmpElem = $("<div></div>"), 
		                        config = (views[name]? views[name][method] : {}) || {},
		                        dialog = config.dialog;
		                    
		                    
		                    // Render                                
		                    root = $("#" + id);
		                    root = (root.length) ? root : $("<div></div>").appendTo(document.body);
		                    tmpElem.render(html, data);
		                    if (!root[0].id || !dialog || !dialog.singleton) {
		                        root.replaceWith(tmpElem[0].innerHTML);
		                    }
		                    roots[id] = root = $("#" + id);
		                    
		                    // UI display control
		                    root.find("[data-quark-ui]").each(function(){
		                        var elem = $(this), 
		                            ui = elem.data("quarkUi");
		                        
		                        (data["ui-" + ui]) ? elem.css({
		                            display: "block"
		                        }) : elem.css({
		                            display: "none"
		                        });
		                        
		                    });
		                    
		                    // Util attach
		                    if (quark.util) {
		                        quark.util.attach(root, config);
		                    }
		                    
		                    // UI attach
		                    if (quark.ui) {
		                        quark.ui.attach(root, config);
		                    }
		                    
		                    
		                    // Call render function
		                    if ( callback ) {
		                        callback( root );
		                    }
		                    
		                    if ( next ) {
		                        next();
		                    }
		                    
						},
						error: function(e){
							//:Debug console.log("[error] render : " + callName, e );
							throw new Error(e);
						}
					});
	
				};
			
			// Intercepter
			core.intercept(callName, data, target);
			
			// Execute
			execute({
				data: data,
				target: target,
				render : render
			});
			
		}
	};
	
	quark.model = {
		/**
		 * defaults
		 * default model methods object
		 * 
		 */
		defaults : {
			/**
			 * data
			 * 
			 * @param {String} key
			 * @param {Object} val
			 */
            data :function data( key, val ){
				var name = this.name;
                if( !val ) return quark.core.data( name )[ key ];
                quark.core.data( name )[ key ] = val;
            }
		},
		/**
		 * Define a model
		 * 
		 * @param {String} model name
		 * @param {Object} methods
		 */
		define : function define( name, methods ){
			var method = "",
				m;
			
			function F(){}
            F.prototype = this.defaults;
			m = new F();
			m.name = name;
			quark.core.data( name, {} );
			for( method in methods ){
				m[ method ] = ( function( name, method, options ){
					
			        /**
			         * Call model process
			         *
			         * @param {Object} data
			         *     call arguments
			         * @param {Function} next
			         *
			         */
					return function( data, next ){
			            var hadr = that.hadron,
			                before = options.before,
			                callback = options.callback, 
			                href = options.href;
			            
						//No ajax process
			            if( $.isFunction( options ) ){
			                options.call( m, data );
			                if( next ) next();
			                return;
			            }
			            
			            //URL override ( name, method )
			            name = options.name || name;
			            method = options.method || method;
			            
			            //Omittable data
			            if( $.isFunction( data ) && next === undefined ){
			                next = data;
			                data = {};
			            }
			            
			            if( before ) data = before.call( m, data ) || data;
			
			            // Href
			            if ( href ) {
			                data._ = new Date().getTime() + "_" + parseInt(Math.random() * 10000, 10);
			                location.href = href.replace("${quark}", name).replace("${method}", method) + "?" + $.param( data ).replace(/\+/g, "%20");
			                return;
			            }
			            
			            /**
			             * Call Ajax process
			             *     Ajax process
			             */
			            $.ajax({
			                url: hadr.url.replace("${quark}", name).replace("${method}", method),
			                data: data,
			                dataType: hadr.dataType,
			                success: function success(res){
			                    //:Debug console.log( "[info] res : " + name + "." + method ,  res );
			                    if( callback )  res = callback.call( m, res ) || res;
			                    if( next ) next( res );
			                }
			            });
                    };
					
				})( name, method, methods[ method ] );
			}
			that[ name ] = m;
		}
	};
	
	// Quark view
	quark.view = {
		config : function( name, config ){
            views[ name ] = config;
		},
		render : function( callName, data, html ){
			
		}
	};
	
	
    // Quark core
    quark.core = {
        /**
         * Attach event
         */
        attach : function attach( ){
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
                            core = self.core,
							call = self.controller.call,
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
                                call( callName, data, elem);
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
        deserialize : function deserialize( query ){
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
        setIntercept : function setIntercept( callName, func ){
            
            if( !intercepter[callName] ) {
                intercepter[ callName ] = [];
            }
            intercepter[ callName ].push( func );
        },
        
        /**
         * Intercepter function
         * 
         */
        intercept : function intercept( callName, data, elem ){
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
        data : function data( key, val, store ){
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
        loadData : function loadData(){
            var quarkData = $.extend( true, {}, 
                    this.deserialize( $.Storage.get( "quark-data" ) )
            );
            data = quarkData;
            lsData = $.extend( true, {}, quarkData );
        },
        
        /**
         * Set language
         */
        lang : function lang( lang, def, callback ){
            $.word( langSetting, def, lang, callback );
        },
        
        /**
         * Load language setting
         * 
         */
        loadLang : function loadLang( lang, path, callback ){
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
