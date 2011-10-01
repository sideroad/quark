Overview
========

Quark is a MVC framework for rich JavaScript web application.
The framework is stood on the many amazing libraries.
Quark Core
---------
* head.js
* jQuery
* jQueryStorage
* jQueryRender

Quark UI
--------
* jQueryUI
* jQueryFloatingMessage

Quark Util
----------
* jQueryUpload
* jQuerySimpleValidate

Quark Debug
-----------
* jQueryMockjax

Quark Test
----------
* Qunit

Structure
=========

Hadron
------
Hadron is composed by several quarks.
Define the configure for the page.
* hadron/${application_name}.js
* hadron/${application_name}.ren

Controller
----------
* quark/c/${quark_name}.c.js
Controllers are the glue between models and views. ( just like a gluon )

    //quark/c/user.c.js
    quark.controller.define( "user", {
    
        dialog : function( arg ){
            arg.render();
        },
    
        seek : function( arg ){
            User.find( { id : "foo" }, function( res ){
                arg.render( res );
            } );
        }
    } );



Model
-------
* quark/m/${quark_name}.m.js
Model don't know any controllers and views.

    //quark/m/user.m.js
    quark.model.define( "User", {
    
        find : {
            method : "take", /* Override the method name for server request */
            before : function( req ){
                /* Setup function before server request */
                return req;
            },
            callback : function( res ){
                /* Callback function after server request */
                return res;
            }
        },
        
        remove : {}, /* You can omit a any configure when you don't need to set configure especially */
     
    } );

    User.find({ id : "foo" });  /* server request with parameter. "id=foo" */

View
----
View don't have any logic
You can set a configure.
* quark/v/${quark_name}.v.js

    //quark/v/user.v.js
    quark.view.config( "user", {
        dialog : {
            button : true,
            dialog : {
                singleton : true,
                width : 500,
                close : "user.close"
            },
            validate : {
                userId : /^[a-zA-Z0-9_\.]{4,32}$/
            } 
        }
    } );
    
* quark/v/${quark_name}/${method_name}.ren

    <!-- quark/v/user/dialog.ren -->
    <div id="user-dialog">
        <form id="user-seek-form" >
            <input type="text" id="userId" name="id" >
            <input type="button" data-quark-event="click-user.seek:form" >
        </form>
    </div>
    


