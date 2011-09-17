/*!
 * Quark FloatingMessage v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends
 *   jquery.ui.js
 *   jquery.floatingmessage.js
 */
(function( $, q ){
    var qui = q.ui;

    qui.list.push( "floatingMessage" );
    qui.floatingMessage =  function( root, setting ){
            qui.multi( root );
            root.floatingMessage( setting );        
    };
    
})( jQuery, quark );
