let __tagembedLoaderImageCustomPath = __tagembed__pluginLoaderImageUrlObj.__tagembed__pluginLoaderImageUrl + 'assets/images/loader.gif';
if (typeof __tagembed__plugin_url_for_js != "undefined") {
    __tagembedLoaderImageCustomPath = __tagembed__plugin_url_for_js + 'assets/images/loader.gif';
}
function __tagembed__open_loader(text = '', loaderImage = '') {
    text = (text) ? text : 'Please Wait...';
    loaderImage = (loaderImage) ? loaderImage : __tagembedLoaderImageCustomPath;
    document.body.style.cursor = "wait";
    let elem = document.createElement('div');
    elem.innerHTML = '<div id="__tagembed__loader" class="__tagembed__loader-overlay"><div class="__tagembed__loader"><img src="' + loaderImage + '"/><br/>' + text + '</div></div>';
    document.body.appendChild(elem.firstChild);
}
function __tagembed__close_loader() {
    document.body.style.cursor = "auto";
    let elem = document.querySelector('#__tagembed__loader');
    elem.remove();
}