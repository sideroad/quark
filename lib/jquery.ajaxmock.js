/*!
 * jquery.ajaxmock v1.1.1
 * http://sideroad.secret.jp/
 *
 * Mock test for using jQuery Ajax
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
    var mock = {},
        ignores = {},
        ignoreAlls = {},
        ajaxOrg = $.ajax;
    
    $.ajaxMock = function( settings ){
        var url = settings.url,
            ignore = settings.ignore,
            ignoreAll = settings.ignoreAll;
        
        ignores[ url ] = ignore || [];
        ignoreAlls[ url ] = ignoreAll || false;
        if ( settings.data && !ignoreAll) {
            url+= "?" + $.param( settings.data );
        }
        mock[ url ] = settings;
    };
    
    $.ajax = function( options ){
        var url = options.url,
            ignore = ignores[ url ] || [],
            ignoreAll = ignoreAlls[ url ] || false,
            length = ignore.length,
            callback = options.success,
            data = options.data,
            check = $.extend(true, {}, data),
            settings, res, intercepter, i;
        
        if (check && !ignoreAll) {
            for( i=0; i<length; i++ ){
                delete( check[ ignore[ i ] ]);
            }
            url+= "?" + $.param( check );
        }
        settings = mock[ url ];
        
        if( settings ) {
            intercepter = settings.intercepter;
            res = settings.response || {};
            if( intercepter ) {
                res = intercepter( data, res ) || res;
            }
            if(callback) setTimeout(function(){ callback(res); }, 100);
        } else {
            ajaxOrg( options );
        }
    };
    
    
})( jQuery );