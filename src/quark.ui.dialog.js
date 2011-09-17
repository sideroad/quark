/*!
 * Quark UI Dialog v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends
 *   jquery.ui.dialog.js
 */
(function( $, q ){
    var qc = q.core,
        qui = q.ui,
        isOpened = {};
    
    qui.list.push( "dialog" );
    qui.dialog = function( root, setting ){
            var options = {},
                id = root.attr("id"),
                close,
                isIntercepted = false,
                singleton;
            
            setting = $.extend(true, {
                singleton : true,
                focus : false,
                modal : false,
                close : false
            }, setting);
            singleton = setting.singleton;
            
            // Avoid conflicting dialog for singleton
            if ( isOpened[ id ] && setting.singleton ) {
                root.dialog( "moveToTop" );
                return;
            }
            
            // Multi-instance dialog
            if( !setting.singleton ){
                qui.multi( root );
            }
            
            // Close intercepter
            close = setting.close;
            if( close ) {
                qc.setIntercept( close, ( singleton ) ? function(){
                    isIntercepted = true;
                    root.dialog( "close" ).remove();
                    isOpened[ id ] = false;
                } : function( data, target ){
                    var rootId = root.attr( "id" );
                    
                    if ( target.closest( "[id='"+rootId+"']" ).length ) {
                        isIntercepted = true;
                        root.dialog( "close" ).remove();
                        isOpened[ id ] = false;
                        return;
                    }
                    return false;
                });
            }
            
            options = {
                modal : (setting.modal) ? true : false,
                draggable : (singleton) ? false : true,
                resizable : (singleton) ? false : true,
                width : (setting.width) ? setting.width : "auto",
                height : (setting.height) ? setting.height : "auto",
                beforeClose : function(){
                    if( close && !isIntercepted ) {
                        qc.call( close, {}, root );
                        return false;                        
                    }
                }
            };
            
            root.dialog(options);
            isOpened[ id ] = true;
            
    };
    

        
})( jQuery, quark );
