let __tagembedLoaderImageCustomPath = __tagembed__pluginLoaderImageUrlObj.__tagembed__pluginLoaderImageUrl + 'assets/images/loader.gif';
if (typeof __tagembed__plugin_url_for_js != "undefined") {
    __tagembedLoaderImageCustomPath = __tagembed__plugin_url_for_js + 'assets/images/loader.gif';
}
function __tagembed__open_loader(text = '', loaderImage = '') {
    text = (text) ? text : 'Please Wait...';
    loaderImage = (loaderImage) ? loaderImage : __tagembedLoaderImageCustomPath;
    document.body.style.cursor = "wait";
    /* Built with DOM methods so no markup is produced from the arguments. */
    let overlay = document.createElement('div');
    overlay.setAttribute('id', '__tagembed__loader');
    overlay.className = '__tagembed__loader-overlay';
    let inner = document.createElement('div');
    inner.className = '__tagembed__loader';
    let image = document.createElement('img');
    image.setAttribute('src', loaderImage);
    inner.appendChild(image);
    inner.appendChild(document.createElement('br'));
    inner.appendChild(document.createTextNode(text));
    overlay.appendChild(inner);
    document.body.appendChild(overlay);
}
function __tagembed__close_loader() {
    document.body.style.cursor = "auto";
    let elem = document.querySelector('#__tagembed__loader');
    elem.remove();
}