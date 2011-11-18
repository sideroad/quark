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
        
        //:Test quark.test.init();
        that.hadron = $.extend(true, {
                path : {
					hadron : "hadron/${hadron}.ren",
                    controller : "quark/c/${quark}.c.js",
					model : "quark/m/${quark}.m.js",
					view : "quark/v/${quark}.v.js",
                    template : "quark/v/${quark}/${method}.ren",
                    lang : "lang/",
                    mock : "quark/.mock/${quark}.mock.js",
                    test : "quark/.test/${quark}.test.js"
                },
                controller : [],
                model : [],
                lang : [],
                quark : [ ],
                init : function(){ 
                    true; 
                },
				mock : true,
				body : document.body
            }, that.hadron );
        
        var hadr = that.hadron,
            controllers = hadr.controller,
            models = hadr.model,
            controllerPath = hadr.path.controller,
            modelPath = hadr.path.model,
            viewPath = hadr.path.view,
            langPath = hadr.path.lang,
            //:Debug mockPath = hadr.path.mock,
            //:Test testPath = hadr.path.test,
            controllersLength = controllers.length,
            modelsLength = models.length,
            lang = hadr.lang,
            i = 0,
            cont = that.quark.controller,
            core = that.quark.core;
            
        // Load data from localStorage
        core.loadData();

        // load javascript files by headjs 
        for( i = 0; i < controllersLength; i++ ){
                head.js( controllerPath.replace( /\$\{quark\}/g, controllers[ i ]) );
                head.js( viewPath.replace( /\$\{quark\}/g, controllers[ i ]) );
                //:Test head.js( testPath.replace( /\$\{quark\}/g, controllers[ i ]) );
        }
        for( i = 0; i < modelsLength; i++ ){
                head.js( modelPath.replace( /\$\{quark\}/g, models[ i ]) );
                //:Debug if( hadr.mock ) head.js( mockPath.replace( /\$\{quark\}/g, models[ i ] ) );
        }
        
		function bodyRender(){
            var body = hadr.body;
            //:Test body = $( "#qunit-fixture" );
			
			function rendered(){
				
                    // all javascript loaded
                    head.ready( function( ){
                        var names = [ ],
                            i,
                            init = "",
                            inits = hadr.init || [],
                            initLength = inits.length;
                        
                        //:Debug if( hadr.mock ) quark.mock.attach();
                        
                        // Make name list
                        for( i=0; i < controllersLength; i++ ){
                            names.push( controllers[i] );
                        }
                        core.attach( names );

                        for( i=0; i<initLength;i++ ){
                            init = inits[ i ];
                            //:Debug console.log( "[info] init : " +init );
                            cont.call( init );
                        }
                        
                        ////:Test quark.test.execute();
                        
                        $(window).bind( "hashchange", function(){
                            var matches = location.hash.match( /^#([^\.]+\.[^\?]+)(\?|)(.*)$/ ) || [ ],
                                call = matches[ 1 ],
                                query = matches[ 3 ] || "";
                            
                            if ( ! call ) return;
                            
                            cont.call( call, core.deserialize( query ) );
                        }).trigger("hashchange");
                        
                    });
			}

            if( body ){
	            // Load index
	            $( body ).render({
	                url : hadr.path.hadron.replace( /\$\{hadron\}/g, hadr.name),
	                dataType : "html",
	                success : rendered
	            });
			} else {
				rendered();
			}
			
		}
        
        if (lang.length) {
        // Load language setting
            core.loadLang(lang, langPath, bodyRender);
        } else {
            bodyRender();
        }
        
        

        
    });
})(jQuery);
