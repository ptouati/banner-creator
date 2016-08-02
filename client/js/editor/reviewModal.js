import {editor} from './fabmain';
import {disableControls} from './editor.js';

require('./modals.js');
const modal = document.getElementById('reviewModal');

function sendToReview(event) {
    event.preventDefault();
    let o = editor.canv.getActiveObject(),
        g = editor.canv.getActiveGroup();
        disableControls(o,g);
    const formData = new FormData(event.target);
    let imageReview = editor.canv.toJSON();
    // append image as base64 string
    formData.append('file', editor.canv.toDataURL("image/png", 1.0));
    formData.append('file_json', JSON.stringify(imageReview));
    fetch('/api/review',
        {
            method: 'POST',
            credentials: 'same-origin',
            body: formData
        }
    )
        .then((res) => res.json())
        .then(function ({result}) {
            document.getElementById('resulting').src = result.src;
            document.getElementById('continue').href += result.rev;
            document.getElementById('continue').style.display = "block";
            document.getElementById('result_review').style.display = "block";
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
    modal.style.display = "none";
}

module.exports = function (node) {
    node.addEventListener('submit', sendToReview)
};