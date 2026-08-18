/*--Start-- Generate Random String*/
function __tagembed__generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
/*--End-- Generate Random String*/
/*--Start--Manage Widget Display  Preview According Widget*/
window.addEventListener ? window.addEventListener("load", __tagembed__changeFilterIfrmSrc, false) : window.attachEvent && window.attachEvent("onload", __tagembed__changeFilterIfrmSrc);
function __tagembed__changeFilterIfrmSrc() {
    let widgetData = document.querySelector("#__tagembed__widgets");
    if (widgetData) {
        let __tagembed__start = __tagembed__generateRandomString(10);
        let __tagembed__end = __tagembed__generateRandomString(10);
        let __tagembed__widgetId = widgetData.selectedOptions[0].value.split('#')[0];
        /* Validate before use : the widget id must be digits only. */
        if (!/^\d+$/.test(__tagembed__widgetId)) return;
        let __tagembed__moderation_url_param = __tagembed__widgetId + '-' + __tagembed__start + '-' + __tagembed__user_id + '-' + __tagembed__end;
        let __tagembed__filterFrame = document.createElement("iframe");
        __tagembed__filterFrame.setAttribute("src", __tagembed__plugin_server_url + "Moderation/index/" + __tagembed__moderation_url_param);
        __tagembed__filterFrame.setAttribute("title", "Tagembed");
        __tagembed__filterFrame.setAttribute("frameborder", "0");
        __tagembed__filterFrame.setAttribute("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        __tagembed__filterFrame.setAttribute("allowfullscreen", "");
        document.querySelector("#__tagembed__widget_filter_section_id").replaceChildren(__tagembed__filterFrame);
    }
}
/*--End--Manage Widget Display  Preview According Widget*/
