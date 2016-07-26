// main logic for our editor by constructtor

// in array http://stackoverflow.com/questions/784012/javascript-equivalent-of-phps-in-array
function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}


// extend function without jquery https://gist.github.com/cfv1984/6319681685f78333d98a
var extend = function () {

    function isFunction(fn) {
        return typeof(fn) === "function" && fn.constructor === Function
    }

    function isArray(ar) {
        return ar instanceof Array
    }

    function isPlainObject(obj) {
        return typeof obj == 'object' && obj.constructor == Object
    }

    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    if (typeof target !== "object" && !isFunction(target)) target = {};
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) continue;

                if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                    if (!copyIsArray) {
                        copyIsArray = false;
                        clone = src && isArray(src) ? src : [];
                    }
                    else clone = src && isPlainObject(src) ? src : {};

                    target[name] = extend(deep, clone, copy);
                }
                else if (copy !== undefined) target[name] = copy;
            }
        }
    }

    return target;
};

// initial fabric
let fabric = require('fabric').fabric;

// this is used to align buttons by bottom. When we add new button - dynamic left coord changes
let leftCoords = 0;
// padding between buttons
let padding_buttons = 65;


// initial tag type for fabric

fabric.Tag = fabric.util.createClass(fabric.Group, {
    type: 'Tag',

    initialize: function (options, objects, isAlreadyGrouped) {
        if (!options) {
            objects = [];
            options = {};
            options.top = 20;
            options.left = 10 + leftCoords;

            var defaults = {
                width: 200,
                height: 40,
                originX: 'center',
                originY: 'center'
            };

            objects[0] = new fabric.Rect(extend({}, defaults, {
                fill: 'rgba(0,0,0,0)',
                stroke: '#000',
                strokewidth: 4,
                rx: 5,
                ry: 5
            }));

            objects[1] = new fabric.IText('Смотреть     >', extend({}, defaults, {
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: 20
            }));
        }
        leftCoords += objects[0].width + padding_buttons;
        this.callSuper('initialize', objects, options, isAlreadyGrouped);
    }
});

fabric.Tag.fromObject = function (object, callback) {
    var _enlivenedObjects;
    fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
        delete object.objects;
        _enlivenedObjects = enlivenedObjects;
    });
    return new fabric.Tag(object, _enlivenedObjects);
};
fabric.Tag.async = false;

// make editor
export default class Editor {
    constructor(canvas, width, height) {
        this.canvas_id = canvas;
        this.width = width;
        this.height = height;
        //initial object of fabric
        this.canv = new fabric.Canvas(this.canvas_id,
            {
                width: this.width,
                height: this.height
            });
    }

    //sets background
    setBackground(imgsrc) {
        let center = this.canv.getCenter();
        this.canv.setBackgroundImage(imgsrc, this.canv.renderAll.bind(this.canv), {
            scaleX: 1,
            scaleY: 1,
            top: center.top,
            left: center.left,
            originX: 'center',
            originY: 'center'
        });
    }

    setFont(family, size, color, texts) {
        let obj = new fabric.IText(
            texts,
            {
                fontFamily: family,
                left: 500,
                top: 100,
                fontSize: size,
                fill: color
            });
        this.canv.add(obj);
        this.canv.renderAll();
    }

    setPrice(family, size, color, texts) {
        let obj = new fabric.IText(
            texts,
            {
                fontFamily: family,
                left: 500,
                top: 100,
                fontSize: size,
                fill: color,
                styles: {
                    0: {
                        0: {fontSize: size * 0.7},
                        1: {fontSize: size * 0.7},
                        3: {fontSize: size * 1.3},

                        5: {fontSize: size * 1.3},
                        6: {fontSize: size * 1.3},
                        7: {fontSize: size * 1.3},

                        9: {fontSize: size},
                        10: {fontSize: size},
                        11: {fontSize: size}
                    }
                }
            });
        this.canv.add(obj);
        this.canv.renderAll();
    }

    addImage(imgForAdd) {
        fabric.Image.fromURL(imgForAdd, (img) => {
            this.canv.add(img);
        });
    }

    addButton() {
        this.canv.add(new fabric.Tag())
    }

    //working now
    downloadImage(link) {
        link.href = this.canv.toDataURL({
                format: 'png',
                quality: 1.0
            }
        );
        link.download = 'result.png';
    }

    deleteObject(obj, group) {
        let canvaser = this.canv;
        if (obj) {
            if (this.canv.getActiveObject().get('type') === 'Tag') {
                leftCoords = 0;
            }
            canvaser.remove(obj);
        }
        else if (group) {
            let del_types = [];
            const objectsInGroup = group.getObjects();
            canvaser.discardActiveGroup();
            for (var i = 0; i < objectsInGroup.length; i++) {
                del_types.push(objectsInGroup[i].get('type'));
            }
            if (inArray('Tag', del_types)) {
                leftCoords = 0;
            }
            objectsInGroup.forEach(function (object) {
                canvaser.remove(object);
            });
        }

    }
}