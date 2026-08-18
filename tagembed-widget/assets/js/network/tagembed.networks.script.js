/*--Start-- Get Network Source*/
window.addEventListener ? window.addEventListener("load", __tagembed__get_networks, false) : window.attachEvent && window.attachEvent("onload", __tagembed__get_networks);
function __tagembed__get_networks() {
    /*if (__tagembed__manageApiCall())
     return;*/
    /*Manage Widget Error*/
    let widgetData = document.querySelector("#__tagembed__widgets").selectedOptions[0];
    let __tagembed__toast = new TagembedToast;
    let formData = new FormData();
    formData.append('action', 'tagembed_data');
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__source_networks');
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
            /* Options are created with DOM methods, so the network names are never parsed as markup. */
            let __tagembed__networkSelect = document.getElementById("__tagembed__networks");
            let __tagembed__placeholderOption = document.createElement("option");
            __tagembed__placeholderOption.setAttribute("vlaue", "");
            __tagembed__placeholderOption.textContent = "Select Network";
            __tagembed__networkSelect.replaceChildren(__tagembed__placeholderOption);
            for (let index in response.data)
                if (response.data[index].id != 2) {/*Note : This Use For Merge Instagram 2/18*/
                    let name = response.data[index].name;
                    if (response.data[index].id == 18) {
                        name = name.split(' ')[0];
                    }
                    let __tagembed__networkOption = document.createElement("option");
                    __tagembed__networkOption.setAttribute("value", response.data[index].id + "#" + response.data[index].name);
                    __tagembed__networkOption.textContent = " " + name;
                    __tagembed__networkSelect.appendChild(__tagembed__networkOption);
                }
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
/*--End-- Get Network Source*/
/*--Start--Get Feed Filters*/
var __tagembed__networks = document.querySelector("#__tagembed__networks");
if (__tagembed__networks) {
    __tagembed__networks.addEventListener("change", function (event) {
        let __tagembed__account_error = document.querySelector("#__tagembed__feed_filter_row");
        __tagembed__account_error.style.display = 'none';
        let __tagembed__feed_filters = document.getElementById("__tagembed__feed_filters");
        __tagembed__feed_filters.innerHTML = '';
        let networkId = event.target.value.split('#')[0];
        let networkName = event.target.value.split('#')[1];
        if (!networkId || !networkName)
            return;
        /*Get Already Exist Auth For Create Feed*/
        __tagembed__get_already_exist_auth(networkId);
        let __tagembed__toast = new TagembedToast;
        __tagembed__open_loader();
        let formData = new FormData();
        formData.append('networkId', networkId);
        formData.append('action', 'tagembed_data');
        formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
        formData.append('__tagembed__ajax_action', '__tagembed__get_network_filter');
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
                __tagembed__account_error.style.display = 'flex';
                /* Options are created with DOM methods, so the filter names are never parsed as markup. */
                let __tagembed__filterPlaceholder = document.createElement("option");
                __tagembed__filterPlaceholder.setAttribute("vlaue", "-1");
                __tagembed__filterPlaceholder.textContent = "Select Feed Filter";
                __tagembed__feed_filters.replaceChildren(__tagembed__filterPlaceholder);
                for (let index in response.data) {
                    let __tagembed__filterOption = document.createElement("option");
                    __tagembed__filterOption.setAttribute("value", response.data[index].id + "#" + response.data[index].name);
                    __tagembed__filterOption.textContent = " " + response.data[index].name;
                    __tagembed__feed_filters.appendChild(__tagembed__filterOption);
                }
            } else {
                __tagembed__account_error.style.display = 'none';
                if (response.hasOwnProperty("message")) {
                    __tagembed__toast.danger({ message: response.message, position: '__tagembed__is-top-right' });
                } else {
                    __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
                }
            }
        }).catch((error) => {
            console.log(error);
            __tagembed__close_loader();
            __tagembed__account_error.style.display = 'none';
            __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
        });
    });
}
/*--End--Get Feed Filters*/

