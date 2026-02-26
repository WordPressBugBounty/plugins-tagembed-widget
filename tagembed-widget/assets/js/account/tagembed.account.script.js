/*--Start-- Manage Account Views*/
function __tagembed__manage_account_view(accountType) {
    if (accountType == 'login') {
        let __tagembed__account_error = document.querySelector("#__tagembed__account_error");
        __tagembed__account_error.style.display = 'none';
        let __tagembed__account_tab_view = document.querySelector("#__tagembed__account_tab_view");
        __tagembed__account_tab_view.style.display = 'block';
        let __tagembed__account_register = document.querySelector("#__tagembed__account_register");
        __tagembed__account_register.classList.remove('active');
        let __tagembed__account_login = document.querySelector("#__tagembed__account_login");
        __tagembed__account_login.classList.add('active');
        let __tagembed__account_login_view = document.querySelector("#__tagembed__account_login_view");
        __tagembed__account_login_view.style.display = 'block';
        let __tagembed__account_register_view = document.querySelector("#__tagembed__account_register_view");
        __tagembed__account_register_view.style.display = 'none';

        /*let __tagembed__account_forgot_password_view = document.querySelector("#__tagembed__account_forgot_password_view");
         __tagembed__account_forgot_password_view.style.display = 'none';*/

    } else if (accountType == 'register') {
        let __tagembed__account_error = document.querySelector("#__tagembed__account_error");
        __tagembed__account_error.style.display = 'none';
        let __tagembed__account_tab_view = document.querySelector("#__tagembed__account_tab_view");
        __tagembed__account_tab_view.style.display = 'block';
        let __tagembed__account_register = document.querySelector("#__tagembed__account_login");
        __tagembed__account_register.classList.remove('active');
        let __tagembed__account_login = document.querySelector("#__tagembed__account_register");
        __tagembed__account_login.classList.add('active');
        let __tagembed__account_login_view = document.querySelector("#__tagembed__account_login_view");
        __tagembed__account_login_view.style.display = 'none';
        let __tagembed__account_register_view = document.querySelector("#__tagembed__account_register_view");
        __tagembed__account_register_view.style.display = 'block';
        /*let __tagembed__account_forgot_password_view = document.querySelector("#__tagembed__account_forgot_password_view");
         __tagembed__account_forgot_password_view.style.display = 'none';*/
    } else if (accountType == 'forgotPassword') {
        let __tagembed__account_error = document.querySelector("#__tagembed__account_error");
        __tagembed__account_error.style.display = 'none';
        let __tagembed__account_tab_view = document.querySelector("#__tagembed__account_tab_view");
        __tagembed__account_tab_view.style.display = 'none';
        let __tagembed__account_login_view = document.querySelector("#__tagembed__account_login_view");
        __tagembed__account_login_view.style.display = 'none';
        let __tagembed__account_register_view = document.querySelector("#__tagembed__account_register_view");
        __tagembed__account_register_view.style.display = 'none';
        /* let __tagembed__account_forgot_password_view = document.querySelector("#__tagembed__account_forgot_password_view");
         __tagembed__account_forgot_password_view.style.display = 'block';*/
    } else {

    }
}
/*--End-- Manage Account Views*/

/*--Start-- Manage Other Plugin Account Popup*/
function __tagembed__manage_other_plugin_account(otherPluginInstallStatus, pluginUrl, existingPluginUser, otherPluginInstallUrl) {
    let elemHTML = `<div id="__tagembed__upgrade_plan_overlay" style="left:0;position:fixed;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:999;"></div>`;
    elemHTML = `${elemHTML}<div class="__tagembed__popupwrap __tagembed__popup_xl">`;
    elemHTML = `${elemHTML}<button onclick="__tagembed__hide_other_plugin_account_popup_close();" type="button" class="__tagembed__closebtn"></button>`;
    elemHTML = `${elemHTML}<div class="__tagembed__popupinn">`;
    elemHTML = `${elemHTML}<div class="__tagembed__header"><h2>Taggbox & Tagembed Are Now One 🤝</h2></div>`;
    elemHTML = `${elemHTML}<hr class="__tagembed__horizontaborder">`;
    elemHTML = `${elemHTML}<div class="__tagembed__formwbody">`;
    elemHTML = `${elemHTML}<div class="__tagembed__formwrow">`;
    elemHTML = `${elemHTML}<p style="text-align: center;"> You already have an account on <strong style="text-transform: capitalize;">${existingPluginUser}</strong> Plugin. Install and Use the same credentials to log in Or to continue sign up with a different email.</p>`;
    elemHTML = `${elemHTML}</div></div>`;
    elemHTML = `${elemHTML}<div class="__tagembed__btnwrap text-center">`;

    if (otherPluginInstallStatus) {
        elemHTML = `${elemHTML}<a href="${otherPluginInstallUrl}" style=""  class="__tagembed__okaybtn">Login</a>`;
    } else {
        elemHTML = `${elemHTML}<a href="${pluginUrl}" target="_blank" style=""  class="__tagembed__okaybtn">Install <strong style="text-transform: capitalize;">${existingPluginUser}</strong>  Plugin</a>`;
    }
    elemHTML = `${elemHTML}</div>`;
    elemHTML = `${elemHTML}</div></div>`;
    let __tagembed__other_plugin_popup = document.getElementById("__tagembed__other_plugin_popup");
    __tagembed__other_plugin_popup.innerHTML = elemHTML;
    __tagembed__other_plugin_popup.style.display = "block";
}
function __tagembed__hide_other_plugin_account_popup_close() {
    let __tagembed__other_plugin_popup = document.querySelector("#__tagembed__other_plugin_popup")
    __tagembed__other_plugin_popup.style.display = "none";
}
/*--End-- Manage Other Plugin Account Popup*/

/*--Start-- Register*/
var __tagembed__register_form = document.querySelector("#__tagembed__register_form");
if (__tagembed__register_form) {
    __tagembed__register_form.addEventListener("submit", function (event) {
        __tagembed__manage_account_view('register');
        let __tagembed__register_full_name_error = document.querySelector("#__tagembed__register_full_name_error");
        __tagembed__register_full_name_error.style.display = 'none';
        let __tagembed__register_email_id_error = document.querySelector("#__tagembed__register_email_id_error");
        __tagembed__register_email_id_error.style.display = 'none';
        let __tagembed__register_password_error = document.querySelector("#__tagembed__register_password_error");
        __tagembed__register_password_error.style.display = 'none';
        let __tagembed__register_contact_no_error = document.querySelector("#__tagembed__register_contact_no_error");
        __tagembed__register_contact_no_error.style.display = 'none';
        __tagembed__open_loader();
        let __tagembed__toast = new TagembedToast;
        let formData = document.querySelector("#__tagembed__register_form")
        formData = new FormData(formData);
        formData.append('action', 'data');
        formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
        formData.append('__tagembed__ajax_action', '__tagembed__register');
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
                if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                    if (response.data.hasOwnProperty("accountAlreadyOtherPluginStatus")) {
                        if (response.data.accountAlreadyOtherPluginStatus == true)
                            __tagembed__manage_other_plugin_account(response.data.otherPluginInstallStatus, response.data.pluginUrl, response.data.existingPluginUser, response.data.otherPluginInstallUrl);
                    } else {
                        window.location.replace(response.data.redirectUrl);
                    }
                }
            } else {
                if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                    if (response.data.hasOwnProperty("fullName")) {
                        __tagembed__register_full_name_error.style.display = 'block';
                        __tagembed__register_full_name_error.textContent = response.data.fullName;
                    }
                    if (response.data.hasOwnProperty("emailId")) {
                        __tagembed__register_email_id_error.style.display = 'block';
                        __tagembed__register_email_id_error.textContent = response.data.emailId;
                    }
                    if (response.data.hasOwnProperty("password")) {
                        __tagembed__register_password_error.style.display = 'block';
                        __tagembed__register_password_error.textContent = response.data.password;
                    }
                    if (response.data.hasOwnProperty("contact_no")) {
                        __tagembed__register_contact_no_error.style.display = 'block';
                        __tagembed__register_contact_no_error.textContent = response.data.contact_no;
                    }
                    /*--End-- Manage Validation Error*/
                } else {
                    if (response.hasOwnProperty("message")) {
                        let __tagembed__account_error = document.querySelector("#__tagembed__account_error");
                        __tagembed__account_error.style.display = 'block';
                        __tagembed__account_error.textContent = response.message;
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
    });
}
/*--End-- Register*/
/*--Start-- Login*/
var __tagembed__login_form = document.querySelector("#__tagembed__login_form");
if (__tagembed__login_form) {
    __tagembed__login_form.addEventListener("submit", function (event) {
        __tagembed__manage_account_view('login');
        let __tagembed__login_email_id_error = document.querySelector("#__tagembed__login_email_id_error");
        __tagembed__login_email_id_error.style.display = 'none';
        let __tagembed__login_password_error = document.querySelector("#__tagembed__login_password_error");
        __tagembed__login_password_error.style.display = 'none';
        __tagembed__open_loader();
        let __tagembed__toast = new TagembedToast;
        let formData = document.querySelector("#__tagembed__login_form")
        formData = new FormData(formData);
        formData.append('action', 'data');
        formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
        formData.append('__tagembed__ajax_action', '__tagembed__login');
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
                if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                    if (response.data.hasOwnProperty("accountAlreadyOtherPluginStatus")) {
                        if (response.data.accountAlreadyOtherPluginStatus == true)
                            __tagembed__manage_other_plugin_account(response.data.otherPluginInstallStatus, response.data.pluginUrl, response.data.existingPluginUser, response.data.otherPluginInstallUrl);
                    } else {
                        window.location.replace(response.data.redirectUrl);
                    }
                }
            } else {
                if (response.hasOwnProperty("data") && Object.keys(response.data).length > 0) {
                    if (response.data.hasOwnProperty("emailId")) {
                        __tagembed__login_email_id_error.style.display = 'block';
                        __tagembed__login_email_id_error.textContent = response.data.emailId;
                    }
                    if (response.data.hasOwnProperty("password")) {
                        __tagembed__login_password_error.style.display = 'block';
                        __tagembed__login_password_error.textContent = response.data.password;
                    }
                } else {
                    if (response.hasOwnProperty("message")) {
                        let __tagembed__account_error = document.querySelector("#__tagembed__account_error");
                        __tagembed__account_error.style.display = 'block';
                        __tagembed__account_error.textContent = response.message;
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
    });
}
/*--End-- Login*/