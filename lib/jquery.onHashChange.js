/*!
 * jquery.onHashChange v1.1.1
 * http://sideroad.secret.jp/
 *
 * Custom event for hash change
 * 
 * Copyright (c) 2011 sideroad
 *
 * Dual licensed under the MIT or GPL licenses.
 * Date: 2011-08-17
 * 
 * @author sideroad
 * @requires jQuery
 * 
 */
(function( $ ){
    var hash = location.hash,
        _loc = location;
        observer = function(){
            if( hash != _loc.hash ) {
                hash = _loc.hash;
                $(window).trigger( "hash" );
            }
        };
    
    observer();
    setInterval(observer,100);
    
    $(window).bind("hash",function(){
        alert(1);
    });
    
})( jQuery );