/*!
 * Quark Util Core v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function( $, q ){
    var qut = {};
	
    q.util = {
        
        list: [],
            
        // attach util
        attach : function( root, setting ){
            var list = qut.list,
                length = list.length,
                i,
                options,
                name;
            
            for( i = 0; i < length; i++ ){
                name = qut.list[ i ];
                options = setting[ name ];
                if( options ) qut[ name ]( root, options );
            }
        }
    };
	
	qut = q.util;
        
})( jQuery, quark );
