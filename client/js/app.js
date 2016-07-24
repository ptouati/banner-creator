import header from './header.jsx';
import renderImages from './renderImages.jsx';
import backgroundsAdmin from './admin/backgroundsAdmin.jsx'

var styluses = require('./../css/main.styl');
var Baz = require('bazooka');


Baz.register({
    'backgroundsAdmin': backgroundsAdmin,
    'header': header,
    'renderImages':renderImages
});


var unwatch = Baz.watch();