/*!
 * Quark UI Core v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function( $, q ){
    var qui = {};
	
    q.ui = {
            list : [],
            
            // attach ui
            attach : function( root, setting ){
                var list = qui.list,
                    length = list.length,
                    i,
                    options,
                    name;
                
                for( i = 0; i < length; i++ ){
                    name = qui.list[ i ];
                    options = setting[ name ];
                    if( options ) qui[ name ]( root, options );
                }
            },

            // multiple instance
            multi : function( root ){
                var suffix = new Date().getTime() + "" + parseInt( Math.random() * 10000, 10 ),
                    id = root[0].id;
                
                root.find( "[id]" ).each(function(){
                    this.id = this.id + suffix;
                });
                root.find( "[data-quark-event]" ).each(function(){
                    var elem = $( this ),
                        events = elem.data( "quarkEvent" ).replace(/\s/, "").split(","),
                        length = events.length,
                        event,
                        reg = /^[^-]+-[^\.]+\.[^\:]+\:.+$/,
                        newEvents = [],
                        newEvent = "",
                        i;
                    
                    for( i = 0; i < length; i++ ){
                        event = events[ i ];
                        if( reg.test( event ) ) {
                            event = event + suffix;
                        }
                        newEvents.push( event );
                    }
                    newEvent = newEvents.join( ", " );
                    elem.data( "quarkEvent", newEvent ).attr( "data-quark-event", newEvent );
                });
                root.addClass( id );
                root.attr( "id", id + suffix );
            }
    };
    
	qui = q.ui;

        
})( jQuery, quark );
