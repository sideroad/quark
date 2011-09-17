/*!
 * Quark UI Button v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends
 *   jquery.ui.button.js
 */
(function( $, q ){
    var qui = q.ui;

    qui.list.push( "button" );
    qui.button = function( root ){
            root.find("input[type=button]").button();
    };
    
})( jQuery, quark );
