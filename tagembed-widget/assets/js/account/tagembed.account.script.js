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

/*--Start-- Get Country Code For Register*/
window.addEventListener ? window.addEventListener("load", __tagembed__getCallingCode, false) : window.attachEvent && window.attachEvent("onload", __tagembed__getCallingCode);
function __tagembed__getCallingCode() {
    /*Manage Customizaton Section Hide Show*/
    let __tagembed__toast = new TagembedToast;
    let formData = new FormData();
    formData.append('action', 'tagembed_data');
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__getCallingCode');
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
            let callingCodes = response.data.callingCode;
            let select = document.getElementById("__tagembed__callingCode");
            callingCodes.forEach((callingCode, index) => {
                let option = document.createElement("option");
                option.value = callingCode.callingCode;
                option.textContent = `${callingCode.flag} ${callingCode.name} (${callingCode.callingCode})`;
                select.appendChild(option);
            });
            /*Keep "Select Country Code" placeholder selected by default*/
            select.value = "";
        }
    }).catch((error) => {
        console.log(error);
        __tagembed__close_loader();
        __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
    });
}
/*--End-- Get Country Code For Register*/

function __tagembed__get_timezone() {
    try {
        var __tagembed__timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return (typeof __tagembed__timezone === "string") ? __tagembed__timezone : "";
    } catch (__tagembed__error) {
        return "";
    }
}

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
        let __tagembed__register_calling_code_error = document.querySelector("#__tagembed__register_calling_code_error");
        __tagembed__register_calling_code_error.style.display = 'none';
        /*Country code is required when contact number is entered*/
        let __tagembed__register_contact_no = __tagembed__register_form.querySelector("[name='contact_no']").value.trim();
        let __tagembed__register_calling_code = __tagembed__register_form.querySelector("[name='calling_code']").value;
        if (__tagembed__register_contact_no !== "" && __tagembed__register_calling_code === "") {
            __tagembed__register_calling_code_error.style.display = 'block';
            __tagembed__register_calling_code_error.textContent = "Please select country code.";
            return;
        }
        __tagembed__open_loader();
        let __tagembed__toast = new TagembedToast;
        let formData = document.querySelector("#__tagembed__register_form")
        formData = new FormData(formData);
        formData.append('action', 'tagembed_data');
        formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
        formData.append('__tagembed__ajax_action', '__tagembed__register');
        formData.append('timezone', __tagembed__get_timezone());
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
                    window.location.replace(response.data.redirectUrl);
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
                    if (response.data.hasOwnProperty("calling_code")) {
                        __tagembed__register_calling_code_error.style.display = 'block';
                        __tagembed__register_calling_code_error.textContent = response.data.calling_code;
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
        formData.append('action', 'tagembed_data');
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
                    window.location.replace(response.data.redirectUrl);
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
/*--Start-- Google Login*/
var __tagembed__google_login_buttons = document.querySelectorAll(".__tagembed__google_btn");
if (__tagembed__google_login_buttons.length) {
    __tagembed__google_login_buttons.forEach(function (__tagembed__google_login_button) {
        __tagembed__google_login_button.addEventListener("click", function () {
            let __tagembed__toast = new TagembedToast;
            let formData = new FormData();
            formData.append('action', 'tagembed_data');
            formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
            formData.append('__tagembed__ajax_action', '__tagembed__google_auth_url');
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
                if (response.status == true && response.hasOwnProperty("data") && response.data.authUrl) {
                    window.location.href = response.data.authUrl;
                    return;
                }
                __tagembed__close_loader();
                __tagembed__toast.danger({ message: response.hasOwnProperty("message") ? response.message : "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
            }).catch((error) => {
                console.log(error);
                __tagembed__close_loader();
                __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
            });
        });
    });
}
/*--End-- Google Login*/

/*--Start-- Password Show/Hide Toggle*/
document.addEventListener("click", function (event) {
    let __tagembed__toggle = event.target.closest(".__tagembed__password_toggle");
    if (!__tagembed__toggle) return;
    event.preventDefault();
    let __tagembed__input = __tagembed__toggle.parentNode.querySelector("input");
    if (!__tagembed__input) return;
    let __tagembed__show = __tagembed__input.type === "password";
    __tagembed__input.type = __tagembed__show ? "text" : "password";
    __tagembed__toggle.classList.toggle("__tagembed__visible", __tagembed__show);
    __tagembed__toggle.setAttribute("aria-pressed", __tagembed__show ? "true" : "false");
    __tagembed__toggle.setAttribute("aria-label", __tagembed__show ? "Hide password" : "Show password");
    __tagembed__toggle.setAttribute("title", __tagembed__show ? "Hide password" : "Show password");
});
/*--End-- Password Show/Hide Toggle*/
