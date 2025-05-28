/*--Start--Create Feed*/
function __tagembed__create_feed(__tagembed__feed_data, useCommonInput = true) {
    let __tagembed__toast = new TagembedToast;
    if (Object.keys(__tagembed__feed_data).length === 0)
        __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
    /*
     if (useCommonInput)
     __tagembed__feed_data.inputs = __tagembed__feed_data.inputs.concat([{label: 'Manually approve posts before making them public?', type: 'checkbox', name: 'moderation'}]);
     */
    __tagembed__feed_data.networkName = __tagembed__feed_data.networkId == 2 ? 'Instagram' : __tagembed__feed_data.networkName;
    __tagembed__dialog_form({
        popupSize: '__tagembed__popup_md', title: 'Create ' + __tagembed__feed_data.networkName + ' ' + __tagembed__feed_data.filterName + ' Feed',
        form: { method: 'post', buttonText: 'Create' },
        inputs: __tagembed__feed_data.inputs,
        cancelAction: function () {
            document.querySelector("#__tagembed__feed_filters").selectedIndex = 0;
            return;
        },
        action: function (event, formData) {
            let validationError = false;
            for (let index in __tagembed__feed_data.inputs) {
                if (!["text"].includes(__tagembed__feed_data.inputs[index].type))
                    continue;
                document.querySelector("#__tagembed__" + __tagembed__feed_data.inputs[index].name + "_error").style.display = 'none';
                if (formData.get(__tagembed__feed_data.inputs[index].name))
                    continue;
                document.querySelector("#__tagembed__" + __tagembed__feed_data.inputs[index].name + "_error").style.display = 'block';
                document.querySelector("#__tagembed__" + __tagembed__feed_data.inputs[index].name + "_error").textContent = "This field is required";
                validationError = true;
            }
            /*--Start--Search Facebook Page Validation*/
            if (__tagembed__feed_data.filterId == 8) {
                let __tagembed__facebook_search_page = document.getElementById('__tagembed__facebook_search_page').value;
                let __tagembed__facebookPage_error = document.getElementById('__tagembed__facebookPage_error');
                let __tagembed__search_option = document.getElementById('__tagembed__search_option');
                __tagembed__search_option.style.display = "none";
                __tagembed__facebookPage_error.textContent = "";
                if (__tagembed__facebook_search_page.length < 3) {
                    __tagembed__facebookPage_error.style.display = 'block';
                    __tagembed__facebookPage_error.textContent = "Enter Minimum 3 Characters";
                    return;
                }
            }
            /*--End--Search Facebook Page Validation*/
            if (validationError)
                return;
            __tagembed__open_loader();
            formData.append('action', 'data');
            formData.append('widgetId', __tagembed__feed_data.widgetId);
            formData.append('widgetName', __tagembed__feed_data.widgetName);
            formData.append('networkId', __tagembed__feed_data.networkId);
            formData.append('networkName', __tagembed__feed_data.networkName);
            formData.append('filterId', __tagembed__feed_data.filterId);
            formData.append('filterName', __tagembed__feed_data.filterName);
            formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
            formData.append('__tagembed__ajax_action', '__tagembed__create_feed');
            fetch(__tagembed__ajax_url, {
                method: 'POST',
                headers: {
                    'x-requested-with': 'XMLHttpRequest',
                },
                body: formData,
            }).then(response => {
                return response.json();
            }).then(response => {
                if (response.status == true) {
                    document.querySelector('#__tagembed__dialog_form_id_').remove();
                    /* window.open(response.data.redirectUrl + '?__tagembed__feedData=' + response.data.__tagembed__feedData + '&__tagembed__requestCallBackUrl=' + response.data.__tagembed__requestCallBackUrl, '_self');*/
                    let __tagembed__Url = response.data.redirectUrl + '?__tagembed__feedData=' + response.data.__tagembed__feedData + '&__tagembed__requestCallBackUrl=' + response.data.__tagembed__requestCallBackUrl;
                    /*__tagmebed__openWindowPopup(__tagembed__Url);*/
                    if (!response.data.byapiCall) {
                        __tagmebed__openWindowPopup(__tagembed__Url);
                    } else {
                        /*--Start-- Feed Create By Api Call*/
                        fetch(__tagembed__Url, {
                            method: 'GET', /*headers: {'x-requested-with': 'XMLHttpRequest'},*/
                        }).then(response => {
                            return response.json();
                        }).then(response => {
                            if (response.head.status == true) {
                                __tagembed__close_loader();
                                location.reload();
                            } else {
                                __tagembed__close_loader();
                                return toastr['error']('Something went wrong. Please try after sometime');
                            }
                        }).catch((error) => {
                            console.log(error);
                            __tagembed__close_loader();
                            return toastr['error']('Something went wrong. Please try after sometime');
                        });
                    }
                    /*--End-- Feed Create By Api Call*/
                } else {
                    __tagembed__close_loader();
                    if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                        for (let key in response.data) {
                            if (response.data.hasOwnProperty(key)) {
                                document.querySelector("#__tagembed__" + key + "_error").style.display = 'block';
                                document.querySelector("#__tagembed__" + key + "_error").textContent = response.data[key];
                            }
                        }
                    } else {
                        if (response.hasOwnProperty("message")) {
                            __tagembed__toast.danger({ message: response.message, position: '__tagembed__is-top-right' });
                        } else {
                            __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
                        }
                    }
                }
            }).catch((error) => {
                console.log(error);
                __tagembed__close_loader();
                __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
            });
        }
    });
}
/*--End--Create Feed*/