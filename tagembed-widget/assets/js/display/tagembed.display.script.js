/*--Start-- Manage  Widget Display Preview According Device*/
/*var __tagembed__display_preview_loader = document.querySelector("#__tagembed__display_preview_loader");*/
function __tagembed__displayPreview(__tagembed__display_preview_new_class) {
    let __tagembed__widget_display_preview_id = document.querySelector("#__tagembed__widget_display_preview_id");
    let __tagembed__display_preview_old_class = __tagembed__widget_display_preview_id.className;
    if (__tagembed__display_preview_old_class == __tagembed__display_preview_new_class)
        return;
    __tagembed__widget_display_preview_id.classList.remove(__tagembed__display_preview_old_class);
    __tagembed__widget_display_preview_id.classList.add(__tagembed__display_preview_new_class);
    document.querySelector("#" + __tagembed__display_preview_old_class).classList.remove('__tagembed__previewactive');
    document.querySelector("#" + __tagembed__display_preview_new_class).classList.add('__tagembed__previewactive');
    /*Refresh Change Iframe According Device */
    __tagembed__changeIfrmSrc();
}
/*--End-- Manage  Widget Display Preview According Device*/
/*--Start--Manage Widget Display  Preview According Widget*/
window.addEventListener ? window.addEventListener("load", __tagembed__changeIfrmSrc, false) : window.attachEvent && window.attachEvent("onload", __tagembed__changeIfrmSrc);
function __tagembed__changeIfrmSrc() {
    /*if (!__tagembed__display_preview_loader) return; __tagembed__display_preview_loader.style.display = 'block'; */
    let widgetData = document.querySelector("#__tagembed__widgets");
    if (widgetData) {
        let __tagembed__widgetId = widgetData.selectedOptions[0].value.split('#')[0];
        document.querySelector("#__tagembed__widget_display_preview_id").innerHTML = `<iframe id="__tagembed__display_ifrm" width="100%" height="100%" src="${__tagembed__plugin_react_url + __tagembed__widgetId}?editor=1" title="Tagembed" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    /*Close  Loader After 5 Second*/
    /*setTimeout(function () {__tagembed__display_preview_loader.style.display = 'none'}, 2000);*/
}
/*--End--Manage Widget Display  Preview According Widget*/

/*--Start--Manage Embed Code Acording Widget*/
window.addEventListener ? window.addEventListener("load", __tagembed__manageEmbedCode, false) : window.attachEvent && window.attachEvent("onload", __tagembed__manageEmbedCode);
function __tagembed__manageEmbedCode() {
    let __tagembed__html_embed_code = document.querySelector("#__tagembed__html_embed_code");
    let __tagembed__iframe_embed_code = document.querySelector("#__tagembed__iframe_embed_code");
    let widgetData = document.querySelector("#__tagembed__widgets");
    if (widgetData) {
        let __tagembed__widgetId = widgetData.selectedOptions[0].value.split('#')[0];
        /*__tagembed__html_embed_code.value = `<div class="tagembed-container" style=" width:100%;height:100%;overflow: auto;"><div class="tagembed-socialwall" data-wall-id="${__tagembed__widgetId}"></div><script src="//widget.tagembed.com/embed.min.js" type="text/javascript"></script></div>`;*/
        __tagembed__html_embed_code.value = `<div class="tagembed-widget" style="width:100%;height:100%" data-widget-id="${__tagembed__widgetId}" view-url="https://widget.tagembed.com/${__tagembed__widgetId}"></div>`;
        __tagembed__iframe_embed_code.value = `<iframe src="${__tagembed__plugin_react_url + __tagembed__widgetId}?view" style=" width:100%;height:500px;overflow: auto;" frameborder="0" allowtransparency="true"></iframe>`;
    }
}
/*--End--Manage Embed Code Acording Widget*/
/*--Start-- Expand Full Screen*/
function __tagembed__openFullscreen() {
    var __tagembed__widgetDisplayPreview = document.getElementById("__tagembed__widget_display_preview_id");
    if (__tagembed__widgetDisplayPreview.requestFullscreen) {
        __tagembed__widgetDisplayPreview.requestFullscreen();
    } else if (__tagembed__widgetDisplayPreview.webkitRequestFullscreen) {
        __tagembed__widgetDisplayPreview.webkitRequestFullscreen();
    } else if (__tagembed__widgetDisplayPreview.msRequestFullscreen) {
        __tagembed__widgetDisplayPreview.msRequestFullscreen();
    }
}
/*--End-- Expand Full Screen*/
