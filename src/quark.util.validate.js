/*!
 * Quark Util Validate v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends
 *   jquery.simple.validate.js
 */
(function( $, q ){
    var qut = q.util;
    
    qut.list.push( "validate" );
    qut.validate = function( root, options ){
            var id = "",
                option,
                elem;
            
            
            for( id in options ){
                option = $.extend( true, {}, {
                    pattern : options[ id ]
                } );
                elem = root.find( "#" + id + "-validate" );
                option.messageElem = elem;
                
                // Item
                root.find( "#" + id )
                    .data( "validate", option )
                    .bind( "focus keyup", function(){
                        $(this).validate();
                    });
                
                // Message
                if( !elem.hasClass("invalid-message") ) {
                    elem
                        .css( "display", "none" )
                        .addClass("invalid-message ui-state-error ui-corner-all")
                        .children()
                        .prepend('<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>');
                }
                
            }
    };
    

        
})( jQuery, quark );
