#!/bin/sh

#jquery.render
cp ../../../jquery.render/src/jquery.render.js ./.

#Quark core all
cat head.js jquery.js jquery.Storage.js jquery.render.js quark.core.js quark.load.js > ../lib/quark.core.all.js

java -jar yuicompressor-2.4.6.jar ../lib/quark.core.all.js -o ../lib/quark.core.all.min.js

#Quark ui all
cat jquery-ui.js jquery.floatingmessage.js quark.ui.core.js quark.ui.button.js quark.ui.dialog.js quark.ui.floatingmessage.js > ../lib/quark.ui.all.js

java -jar yuicompressor-2.4.6.jar ../lib/quark.ui.all.js -o ../lib/quark.ui.all.min.js

#Quark util all
cat jquery.upload.js jquery.simple.validate.js quark.util.core.js quark.util.file.js quark.util.validate.js > ../lib/quark.util.all.js

java -jar yuicompressor-2.4.6.jar ../lib/quark.util.all.js -o ../lib/quark.util.all.min.js

#Quark debug all
cat head.js jquery.js jquery.Storage.js jquery.render.js jquery.mockjax.js quark.core.js quark.debug.js quark.load.js > ../lib/quark.debug.all.js.tem

sed 's/\/\/\:Debug //g' ../lib/quark.debug.all.js.tem > ../lib/quark.debug.all.js
rm ../lib/quark.debug.all.js.tem

java -jar yuicompressor-2.4.6.jar ../lib/quark.debug.all.js -o ../lib/quark.debug.all.min.js


#Quark test all
cat head.js jquery.js jquery.Storage.js jquery.render.js qunit.js quark.core.js quark.test.js quark.load.js > ../lib/quark.test.all.js.tem

sed 's/\/\/\:Test //g' ../lib/quark.test.all.js.tem > ../lib/quark.test.all.js
rm ../lib/quark.test.all.js.tem

java -jar yuicompressor-2.4.6.jar ../lib/quark.test.all.js -o ../lib/quark.test.all.min.js

cp ../lib/quark.debug.all.js ../../../clearife-client/js/.
cp ../lib/quark.ui.all.js ../../../clearife-client/js/.
cp ../lib/quark.util.all.js ../../../clearife-client/js/.



cp -R ../lib ../../../quark/.
cp -R ../src ../../../quark/.
cp -R ../quark ../../../quark/.
