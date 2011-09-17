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
            var mock = qm,
                quark = {},
                name = "",
                action = "";
            
            for ( name in mock ) {
                quark = mock[ name ];
                for ( action in quark ) {
                    (function( mock ){
                        $.mockjax({
                            url : particle.url.replace( /\$\{quark\}/g, name ).replace( /\$\{action\}/g, action ),
                            response : function( setting ){
                                this.responseText = mock( { req : setting.data });
                            }
                        });
                    })( quark[ action ] );
                }
            }
        }
    };

qd = quark.debug;
qm = quark.mock;
