(function( $ ){
    var that = this,
        core = that.quark.core,
        isOpened = {};
    
    quark.util = {
        dialog : function( root, setting ){
            var options = {},
                id = root.attr("id"),
                width = root.data("dialogWidth") || "auto",
                height = root.data("dialogHeight") || "auto",
                close;
            
            setting = $.extend(true, {
                singleton : true,
                focus : false,
                close : false
            }, setting);
            
            // Avoid conflicting dialog for singleton
            if ( isOpened[ id ] && setting.singleton) {
                return;
            }
            
            // TODO
            // Double called setting.close
            close = setting.close;
            if( close ) {
                core.intercept( close, function(){
                    if( root.dialog( "isOpen" ) ) {
                        root.dialog( "close" );
                    }
                } );
            }
            
            options = {
                modal : (setting.singleton) ? true : false,
                draggable : (setting.singleton) ? false : true,
                resizable : (setting.singleton) ? false : true,
                width : width,
                height : height,
                close : function(){
                    isOpened[ id ] = false;
                    if( close ) core.call( close );
                }
            };
            
            isOpened[ id ] = true;
            root.dialog(options);
            
        }
    };
    
    $(function(){
        
    });
    

        
})(jQuery);
