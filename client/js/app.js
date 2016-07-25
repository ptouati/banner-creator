import inactiveImg from './admin/inactiveImg.js';
import deleteImg from './admin/deleteFromDB.js';
//import fabric from './fabmain';
import renderImages from './renderImages.jsx';
// var editor = require('./editor.js');
var styluses = require('./../css/main.styl');
var Baz = require('bazooka');


Baz.register({
    'inactiveImg': inactiveImg,
    'deleteImg': deleteImg,
    'renderImages':renderImages,
    //'fabric': fabric
    
});

var unwatch = Baz.watch();

