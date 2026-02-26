/*--Start-- Get Network Source*/
window.addEventListener ? window.addEventListener("load", __tagembed__check_user_accout_status, false) : window.attachEvent && window.attachEvent("onload", __tagembed__check_user_accout_status);
function __tagembed__check_user_accout_status() {
    /*if (__tagembed__manageApiCall())
     return;*/
    /*Manage Widget Error*/
    let __tagembed__book_demo_free_btn = document.querySelector("#__tagembed__book_demo_free_btn");
    let __tagembed__book_demo_paid_btn = document.querySelector("#__tagembed__book_demo_paid_btn");

    let __tagembed__toast = new TagembedToast;
    let formData = new FormData();
    formData.append('action', 'data');
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__check_user_accout_status');
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
            console.log(response);
            if (response.data.hasOwnProperty("accountStatus")) {
                if (response.data.accountStatus == "paid") {
                    __tagembed__book_demo_paid_btn.style.display = "inline-block";
                } else {
                    __tagembed__book_demo_paid_btn.style.display = "none";
                }
                if (response.data.accountStatus == "free") {
                    __tagembed__book_demo_free_btn.style.display = "inline-block";
                } else {
                    __tagembed__book_demo_free_btn.style.display = "none";
                }
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

