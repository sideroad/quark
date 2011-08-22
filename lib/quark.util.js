var qu = {};

(function( $ ){
    var that = this,
        core = that.quark.core,
        isOpened = {},
        multi = function( root ){
            var suffix = new Date().getTime() + "" + parseInt( Math.random() * 10000, 10 ),
                id = root[0].id;
            
            root.find( "[id]" ).each(function(){
                this.id = this.id + suffix;
            });
            root.find( "[data-quark-event]" ).each(function(){
                var elem = $( this ),
                    events = elem.data( "quarkEvent" ).replace(/\s/, "").split(","),
                    length = events.length,
                    event,
                    reg = /^[^-]+-[^\.]+\.[^\:]+\:.+$/,
                    newEvents = [],
                    newEvent = "",
                    i;
                
                for( i = 0; i < length; i++ ){
                    event = events[ i ];
                    if( reg.test( event ) ) {
                        event = event + suffix;
                    }
                    newEvents.push( event );
                }
                newEvent = newEvents.join( ", " );
                elem.data( "quarkEvent", newEvent ).attr( "data-quark-event", newEvent );
            });
            root.addClass( id );
            root.attr( "id", id + suffix );
        };
    
    qu = quark.util = {
            
        // Dialog control
        dialog : function( root, setting ){
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
                multi( root );
            }
            
            // Close intercepter
            close = setting.close;
            if( close ) {
                core.setIntercept( close, ( singleton ) ? function(){
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
                        core.call( close, {}, root );
                        return false;                        
                    }
                }
            };
            
            root.dialog(options);
            isOpened[ id ] = true;
            
        },
        
        // Validate
        validate : function( root, options ){
            var id = "",
                option,
                elem;
            
            
            for( id in options ){
                option = $.extend( true, {}, options[ id ] );
                elem = root.find( "#" + id + "-validate" );
                option.messageElem = elem;
                
                // Item
                root.find( "#" + id )
                    .data( "validate", option )
                    .bind( "focus keyup", function(){
                        $(this).validate();
                    });
                
                // Message
                if( !elem.hasClass("invalid-message") ) {
                    elem
                        .css( "display", "none" )
                        .addClass("invalid-message ui-state-error ui-corner-all")
                        .children()
                        .prepend('<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>');
                }
                
            }
        },
        
        // Button
        button : function( root ){
            root.find("input[type=button]").button();
        },
        
        // FloatingMessage
        floatingMessage : function( root, setting ){
            multi( root );
            root.floatingMessage( setting );
            
        }
    };
    
    $(function(){
        
    });
    

        
})(jQuery);
