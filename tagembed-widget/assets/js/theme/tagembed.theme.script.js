/*--Start-- Get Social Accounts*/
window.addEventListener ? window.addEventListener("load", __tagembed__get_theme, false) : window.attachEvent && window.attachEvent("onload", __tagembed__get_theme);
function __tagembed__get_theme() {
    let widgetId = document.querySelector("#__tagembed__widgets");
    if (!widgetId)
        return;
    widgetId = widgetId.selectedOptions[0];
    widgetId = widgetId.value.split('#')[0];
    let __tagembed__theme = document.querySelector("#__tagembed__theme");
    let __tagembed__toast = new TagembedToast;
    let formData = new FormData();
    formData.append('action', 'data');
    formData.append('widgetId', widgetId);
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__get_themes');
    __tagembed__open_loader();
    fetch(__tagembed__ajax_url, {
        method: 'POST',
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        __tagembed__close_loader();
        if (response.status == true) {
            let elemHTML = "";
            if (typeof response.data !== 'undefined' && response.data.length > 0) {
                for (let index in response.data) {
                    elemHTML = `${elemHTML}<li>`;
                    elemHTML = `${elemHTML}<label class="${response.data[index].active == 1 ? "__tagembed__themeactive" : ""} ">`;
                    elemHTML = `${elemHTML}<span class="__tagembed__theme-img">`;
                    /*elemHTML = `${elemHTML}<img src="${__tagembed__plugin_url_for_js}assets/images/theme/themeThumb${response.data[index].themeId}.png" alt="modern fall" />`;*/
                    elemHTML = `${elemHTML}<img class="lazyload" src="${__tagembed__plugin_url_for_js}assets/images/blur-img.gif" data-src="${__tagembed__plugin_url_for_js}assets/images/theme/themeThumb${response.data[index].themeId}.png" alt="theme-image" />`;
                    elemHTML = `${elemHTML}</span>`;
                    elemHTML = `${elemHTML}<span class="__tagembed__themename"> ${response.data[index].name} </span>`;
                    elemHTML = `${elemHTML}<input type="radio" onclick="__tagembed__editTheme(${response.data[index].themeId});" class="__tagembed__theme_radio_button"  name="themeId" value="${response.data[index].themeId}" ${response.data[index].active == 1 ? "checked" : ""}  />`;
                    elemHTML = `${elemHTML}</label>`;
                    elemHTML = `${elemHTML}</li>`;
                }
            }
            __tagembed__theme.innerHTML = elemHTML;
            __tagembed__image__lazy_loading()/*Image Lazy Loader*/
        } else {
            if (response.hasOwnProperty("message")) {
                __tagembed__toast.danger({ message: response.message, position: '__tagembed__is-top-right' });
            } else {
                __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
            }
        }
    }).catch((error) => {
        console.log(error);
        __tagembed__close_loader();
        __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
    });
}
/*--End-- Get Social Accounts*/
/*--Start--Image Lazy Loadin*/
function __tagembed__image__lazy_loading() {
    let images = document.querySelectorAll(".lazyload");
    lazyload(images);
}
/*--End--Image Lazy Loadin*/
/*--Start--Edit Theme*/
function __tagembed__editTheme(__tagembed__theme_id) {
    let __tagembed__widget_id = document.querySelector("#__tagembed__widgets").selectedOptions[0];
    __tagembed__widget_id = __tagembed__widget_id.value.split('#')[0];
    let __tagembed__toast = new TagembedToast;
    if (!__tagembed__widget_id || !__tagembed__theme_id)
        return __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
    let formData = new FormData();
    formData.append('action', 'data');
    formData.append('widgetId', __tagembed__widget_id);
    formData.append('themeId', __tagembed__theme_id);
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__edit_themes');
    __tagembed__open_loader();
    fetch(__tagembed__ajax_url, {
        method: 'POST',
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
        body: formData,
    }).then(response => {
        return response.json();
    }).then(response => {
        __tagembed__close_loader();
        if (response.status == true) {
            __tagembed__toast.success({ message: "Theme Updated.", position: '__tagembed__is-top-right' });
        } else {
            if (response.hasOwnProperty("message")) {
                __tagembed__toast.danger({ message: response.message, position: '__tagembed__is-top-right' });
            } else {
                __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
            }
        }
    }).catch((error) => {
        console.log(error);
        __tagembed__close_loader();
        __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
    });

}
/*--End--Edit Theme*/