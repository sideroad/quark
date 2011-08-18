(function( $ ){
    var that = this,
        core = that.quark.core,
        isOpened = {};
    
    quark.util = {
            
        // Dialog control
        dialog : function( root, setting ){
            var options = {},
                id = root.attr("id"),
                width = root.data("dialogWidth") || "auto",
                height = root.data("dialogHeight") || "auto",
                close,
                isIntercepted = false;
            
            setting = $.extend(true, {
                singleton : true,
                focus : false,
                close : false
            }, setting);
            
            // Avoid conflicting dialog for singleton
            if ( isOpened[ id ] && setting.singleton) {
                return;
            }
            
            // Close intercepter
            close = setting.close;
            if( close ) {
                core.intercept( close, function(){
                    isIntercepted = true;
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
                beforeClose : function(){
                    isOpened[ id ] = false;
                    if( close && !isIntercepted ) {
                        core.call( close );
                        return false;                        
                    }
                }
            };
            
            isOpened[ id ] = true;
            root.dialog(options);
            
        },
        
        // Validate
        // TODO
        validate : function(){
            
        }
    };
    
    $(function(){
        
    });
    

        
})(jQuery);
