import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// console.log(basicLightbox);

export default function onClickImage(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    
    const lightboxImageUrl = e.target.dataset.source;

    const instance = basicLightbox.create(`<img src="${lightboxImageUrl}">`);

    instance.show();
}