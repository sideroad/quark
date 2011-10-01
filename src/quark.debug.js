/*!
 * Quark Debug v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
quark.debug = {};
quark.mock = {
    attach : function(){
        var mocks = quark.mock,
            mock = {},
            name = "",
            method = "";
        
        for ( name in mocks ) {
            mock = mocks[ name ];
            for ( method in mock ) {
                (function( mock ){
                    $.mockjax({
                        url : hadron.url.replace( /\$\{quark\}/g, name ).replace( /\$\{method\}/g, method ),
                        response : function( setting ){
                            this.responseText = mock( setting.data );
                        }
                    });
                })( mock[ method ] );
            }
        }
    }
};

