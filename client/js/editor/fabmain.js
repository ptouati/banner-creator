//load fabric
let fabric = require('fabric').fabric;

import Editor from './editor.js';
import {disableControls} from './editor.js';

let editor = new Editor('main', 960, 420);

const fileInput = document.getElementById('input');
const downloadLink = document.getElementById('download');
const addbutton = document.getElementById('addButt');
const addtexts = document.querySelectorAll('#rightcol ul li');
const filetoeditor = document.getElementById('inputted');
const deleteFabricItem = document.getElementById('del_item');
const resultPreview = document.getElementById('result_review');
const modals = document.getElementById('myModal');
const continueButton = document.getElementById('continue');

const span = document.getElementsByClassName("close")[0];

//show result
resultPreview.addEventListener('click', () => {
    modals.style.display = "block";
});

//hide result
span.onclick = ()=> {
    modals.style.display = "none";
};
window.onclick = (e) => {
    if (e.target == modals) {
        modals.style.display = "none";
    }
};

// send image to review model
function sendImageForReview() {
    document.getElementById('continue').href = '';
    let imageReview = editor.canv.toJSON();
    let o = editor.canv.getActiveObject(),
        g = editor.canv.getActiveGroup();
        disableControls(o,g);
    let image_base64 = editor.canv.toDataURL("image/png", 1.0);
    let random_name = Math.random().toString(36).substr(2, 10) + '.png';
    const data = {
        file: image_base64,
        name: random_name,
        file_json: imageReview
    };
    fetch('/api/review/', {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then(function ({result}) {
            document.getElementById('resulting').src = result.src;
            continueButton.href += result.rev;
            continueButton.style.display = "block";
            resultPreview.style.display = "block";
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

// deletes custom object from canvas
deleteFabricItem.addEventListener('click', function () {
    let activeObject = editor.canv.getActiveObject(),
        activeGroup = editor.canv.getActiveGroup();
    editor.deleteObject(activeObject, activeGroup);
});


addbutton.addEventListener('click', function () {
    editor.addButton();
});

for (var i = 0; i < addtexts.length; i++) {
    addtexts[i].addEventListener('click', function () {
        let sizes = this.getAttribute("data-size");
        let texting = this.getAttribute("data-text");
        let typings = this.getAttribute("data-type");
        if (typings) {
            editor.setPrice('Roboto', sizes, '#000', texting);
        }
        else {
            editor.setFont('Roboto', sizes, '#000', texting);
        }
    });
}

fileInput.addEventListener('click', function () {
    document.getElementById('inputted').click();
    return false;
});

filetoeditor.addEventListener('change', (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    fabric.Image.fromURL(url, (img) => {

        let originalsize = img.getOriginalSize();
        let imgratio = img.width / img.height;
        let newsize = [editor.canv.width * 0.5, editor.canv.width * 0.5 / imgratio];

        if (originalsize.width > editor.canv.width || originalsize.height > editor.canv.height) {
            img.set({
                width: newsize[0],
                height: newsize[1]
            })
        }
        editor.canv.add(img);
        filetoeditor.value = ""
    });
});

downloadLink.addEventListener('click', function () {
    const link = this;
    let activeObject = editor.canv.getActiveObject(),
        activeGroup = editor.canv.getActiveGroup();
    editor.downloadImage(link, activeObject, activeGroup);
}, false);


function sendingReview(node) {
    node.addEventListener('click', sendImageForReview);
}

module.exports = {
    'editor': editor,
    'sendingReview': sendingReview,
    'fabric': fabric
};