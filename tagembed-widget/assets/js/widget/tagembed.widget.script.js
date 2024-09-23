/*--Start--Edit Widget*/
function __tagembed__widgetEditForm(__tagembed__widget_id, __tagembed__widget_name) {
    let __tagembed__toast = new TagembedToast;
    if (!__tagembed__widget_id || !__tagembed__widget_name)
        return __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    __tagembed__dialog_form({popupSize: '__tagembed__popup_md', title: 'Edit Widget',
        form: {method: 'post', buttonText: 'Rename'},
        inputs: [{label: 'Widget Name', type: 'text', value: __tagembed__widget_name, name: 'name', placeholder: 'Enter your widget name e.g. mywidget'}],
        action: function (event, formData) {
            let __tagembed__name_error = document.querySelector("#__tagembed__name_error");
            __tagembed__name_error.style.display = 'none';
            if (__tagembed__widget_name === formData.get('name')) {
                __tagembed__name_error.style.display = 'block';
                __tagembed__name_error.textContent = "No Change.";
                return;
            }
            __tagembed__open_loader();
            formData.append('action', 'data');
            formData.append('widgetId', __tagembed__widget_id);
            formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
            formData.append('__tagembed__ajax_action', '__tagembed__edit_widget');
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
                    document.querySelector('#__tagembed__dialog_form_id_').remove();
                    if (response.data.hasOwnProperty("message")) {
                        __tagembed__toast.success({message: response.data.message, position: '__tagembed__is-top-right'});
                    }
                    window.location.replace(response.data.redirectUrl);
                } else {
                    if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                        if (response.data.hasOwnProperty("name")) {
                            __tagembed__name_error.style.display = 'block';
                            __tagembed__name_error.textContent = response.data.name;
                        }
                    } else {
                        if (response.hasOwnProperty("message")) {
                            __tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
                        } else {
                            __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
                        }
                    }
                }
            }).catch((error) => {
                console.log(error);
                __tagembed__close_loader();
                __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
            });
        }
    });
}
/*--End--Edit Widget*/
/*--Start-- Update Status*/
function __tagembed__updateWidgetStauts(__tagembed__widget_id, count) {
    /*Manage Toggel Botton On Space*/
    if (__tagembed__manageToggelOnPressSpace())
        return;
    let __tagembed__widget = document.querySelector(`#widget-${count}`);
    let __tagembed__widget_status = __tagembed__widget.getAttribute('data-widgetStatus');
    let __tagembed__toast = new TagembedToast;
    if (!__tagembed__widget_id || !__tagembed__widget_status)
        return __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    /*confirmDialog({title: 'Yes, update widget status', message: 'Are you sure! do you want to update widget status?', buttonText: 'Update', type: 'warning'}, function () {*/
    let formData = new FormData();
    formData.append('widgetId', __tagembed__widget_id);
    formData.append('status', __tagembed__widget_status);
    formData.append('action', 'data');
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__update_widget_status');
    __tagembed__open_loader();
    fetch(__tagembed__ajax_url, {
        method: 'POST',
        headers: {
            'x-requested-with': 'XMLHttpRequest', },
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        __tagembed__close_loader();
        if (response.status == true) {
            if (response.data.hasOwnProperty("message")) {
                __tagembed__toast.success({message: response.data.message, position: '__tagembed__is-top-right'});
            }
            /*Manage Widget Status*/
            switch (__tagembed__widget_status) {
                case '0':
                    __tagembed__widget.setAttribute("data-widgetStatus", '1');
                    break;
                case '1':
                    __tagembed__widget.setAttribute("data-widgetStatus", '0');
                    break;
                default:
                    break;
            }
        } else {
            if (response.hasOwnProperty("message")) {
                __tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
            } else {
                __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
            }
        }
    }).catch((error) => {
        console.log(error);
        __tagembed__close_loader();
        __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
        /*});*/
    });
}
/*--End-- Update Status*/
/*--Start-- Delete Widget*/
function __tagembed__deleteWidget(__tagembed__widget_id, __tagembed__widgetbox_id) {
    let __tagembed__toast = new TagembedToast;
    if (!__tagembed__widget_id || !__tagembed__widgetbox_id)
        return __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    confirmDialog({title: 'Yes, delete widget', message: 'Are you sure! do you want to delete widget?', buttonText: 'Delete', type: 'danger'}, function () {
        let formData = new FormData();
        formData.append('widgetId', __tagembed__widget_id);
        formData.append('action', 'data');
        formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
        formData.append('__tagembed__ajax_action', '__tagembed__delete_widget');
        __tagembed__open_loader();
        var __tagembed__toast = new TagembedToast;
        fetch(__tagembed__ajax_url, {
            method: 'POST',
            headers: {
                'x-requested-with': 'XMLHttpRequest', },
            body: formData,
        }).then(response => {
            return response.json()
        }).then(response => {
            __tagembed__close_loader();
            if (response.status == true) {
                document.querySelector('#' + __tagembed__widgetbox_id).remove();
                if (response.data.hasOwnProperty("message")) {
                    __tagembed__toast.success({message: response.data.message, position: '__tagembed__is-top-right'});
                    window.location.reload();
                }
            } else {
                if (response.hasOwnProperty("message")) {
                    __tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
                } else {
                    __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
                }
            }
        }).catch((error) => {
            console.log(error);
            __tagembed__close_loader();
            __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
        });
    });
}
/*--End-- Delete Widget*/
/*--Start--Copy Short Code*/
function __tagembed__copyToWidgetShortCode(text) {
    let __tagembed__toast = new TagembedToast;
    navigator.clipboard.writeText(text);
    __tagembed__toast.success({message: 'copied', position: '__tagembed__is-top-right'});
}
/*--End--Copy Short Code*/
