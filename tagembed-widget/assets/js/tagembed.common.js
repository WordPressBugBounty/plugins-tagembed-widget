/*--Start-- Manage Window Popup In New Tab*/
/*function __tagmebed__openWindowPopup(url, windowName = "Tagembed") {
 __tagmebed__window_popup = window.open(url, '_blank');
 __tagmebed__window_popup.focus();
 var __tagembed__window_pupup_timer = setInterval(function () {
 if (__tagmebed__window_popup.closed) {
 location.reload();
 clearInterval(__tagembed__window_pupup_timer);
 }
 }, 250);
 }*/
function __tagmebed__openWindowPopup(url, windowName = "Tagembed") {
	__tagmebed__window_popup = window.open(url, windowName, 'height=600,width=600,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
	var __tagembed__window_pupup_timer = setInterval(function () {
		if (__tagmebed__window_popup.closed) {
			location.reload();
			clearInterval(__tagembed__window_pupup_timer);
		}
	}, 250);
}
function __tagmebed__closeWindowPopup() {
	if (__tagmebed__window_popup)
		__tagmebed__window_popup.close();
}
/*--End-- Create And Manage Window Popup*/

/*--Start--Hide/Show Loader During Page Readay State*/
document.onreadystatechange = function () {
	if (document.readyState !== "complete") {
		__tagembed__open_loader();
	} else {
		__tagembed__close_loader();
	}
};
/*--End--Hide/Show Loader During Page Readay State*/

/*--Start-- Manage Response Message*/
window.addEventListener ? window.addEventListener("load", __tagembed__message, false) : window.attachEvent && window.attachEvent("onload", __tagembed__message);
function __tagembed__message() {
	let __tagembed__toast = new TagembedToast;
	/*--Start-- Manage Redirect Url Error*/
	let urlSearchParams = new URLSearchParams(window.location.search);
	let __tagembed__message = Object.fromEntries(urlSearchParams.entries());
	/*--Start-- Manage Show Messaage According Time*/
	let getTime = new Date();
	getTime = getTime.getTime(); /*milliseconds*/
	getTime = Math.floor(getTime / 1000); /*seconds*/
	if (__tagembed__message.hasOwnProperty("status")) {
		if (__tagembed__message.status < getTime)
			return;
	}
	/*--End-- Manage Show Messaage According Time*/
	if (__tagembed__message.hasOwnProperty("__tagembed__message")) {
		if (__tagembed__message.hasOwnProperty("success")) {
			__tagembed__toast.success({ message: __tagembed__message.__tagembed__message.replace(/-/g, ' '), position: '__tagembed__is-top-right' });
		} else if (__tagembed__message.hasOwnProperty("info")) {
			__tagembed__toast.info({ message: __tagembed__message.__tagembed__message.replace(/-/g, ' '), position: '__tagembed__is-top-right' });
		} else if (__tagembed__message.hasOwnProperty("warning")) {
			__tagembed__toast.warning({ message: __tagembed__message.__tagembed__message.replace(/-/g, ' '), position: '__tagembed__is-top-right' });
		} else {
			__tagembed__toast.danger({ message: __tagembed__message.__tagembed__message.replace(/-/g, ' '), position: '__tagembed__is-top-right' });
		}
		/*--Start--Show Popup On Plan Upgrade Time*/
		if (__tagembed__message.hasOwnProperty("planName") && __tagembed__message.hasOwnProperty("amount") && __tagembed__message.hasOwnProperty("paymentId")) {
			let __tagembed__upgrade_account_popup = document.querySelector("#__tagembed__upgrade_account_popup");
			let elemHTML = `<div class="__tagembed__popupwrap __tagembed__popup_md">`;
			elemHTML = `${elemHTML}<button id="__tagembed__upgrade_account_popup_close_btn" onclick="__tagembed__hide_upgrade_account_popup();" type="button" class="__tagembed__closebtn"></button>`;
			elemHTML = `${elemHTML}<div class="__tagembed__popupinn">`;
			elemHTML = `${elemHTML}<div class="__tagembed__formwbody">`;
			elemHTML = `${elemHTML}<div class="__tagembed__thankyou">`;
			elemHTML = `${elemHTML}<img src="${__tagembed__plugin_url_for_js}assets/images/check-green.png" alt="check">`;
			elemHTML = `${elemHTML}<h2>Congratulations! <span>Your account has been upgraded</span></h2>`;
			elemHTML = `${elemHTML}<div class="__tagembed__plandetail">`;
			elemHTML = `${elemHTML}<div class="__tagembed__planbox">`;
			elemHTML = `${elemHTML}<p>Amount</p>`;
			elemHTML = `${elemHTML}<span>$${__tagembed__message.amount}</span>`;
			elemHTML = `${elemHTML}</div>`;
			elemHTML = `${elemHTML}<div class="__tagembed__planbox">`;
			elemHTML = `${elemHTML}<p>Payment Id</p>`;
			elemHTML = `${elemHTML}<span>${__tagembed__message.paymentId}</span>`;
			elemHTML = `${elemHTML}</div>`;
			elemHTML = `${elemHTML}<div class="__tagembed__planbox">`;
			elemHTML = `${elemHTML}<p>Plan</p>`;
			elemHTML = `${elemHTML}<span>${__tagembed__message.planName}</span>`;
			elemHTML = `${elemHTML}</div></div></div></div></div></div>`;
			__tagembed__upgrade_account_popup.innerHTML = elemHTML;
			__tagembed__upgrade_account_popup.style.display = "block";
		}
		/*--End--Show Popup On Plan Upgrade Time*/
	}
}
/*--End-- Manage Response Message*/
/*--Start--Manage Windiow Onload Function When Response Message Exist In Query String*/
function __tagembed__manageApiCall() {
	let urlSearchParams = new URLSearchParams(window.location.search);
	let __tagembed__message = Object.fromEntries(urlSearchParams.entries());
	if (__tagembed__message.hasOwnProperty("__tagembed__message"))
		return true
	return false;
}
/*--End--Manage Windiow Onload Function When Response Message Exist In Query String*/
/*--Start-- Logout*/
var __tagembed__logout = document.querySelector("#__tagembed__logout");
if (__tagembed__logout) {
	__tagembed__logout.addEventListener('click', function (event) {
		confirmDialog({ title: 'Yes, sign out', message: 'Are you sure! do you want to sign out?', buttonText: 'Sign Out', type: 'warning' }, function () {
			let formData = new FormData();
			formData.append('action', 'data');
			formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
			formData.append('__tagembed__ajax_action', '__tagembed__logout');
			__tagembed__open_loader();
			let __tagembed__toast = new TagembedToast;
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
					window.location.replace(response.data.redirectUrl);
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
		});
	});
}
/*--End-- Logout*/

/*--Start--Manage Tagembed Menue*/
function __tagembed__menus(__tagembed__menu_id, __tagembed__widgetId = null) {
	if (__tagembed__widgetId)
		__tagembed__manageActiveWidget(__tagembed__widgetId);
	__tagembed__open_loader();
	let __tagembed__toast = new TagembedToast;
	let formData = new FormData();
	formData.append('action', 'data');
	formData.append('menueId', __tagembed__menu_id);
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__menue');
	fetch(__tagembed__ajax_url, {
		method: 'POST',
		headers: {
			'x-requested-with': 'XMLHttpRequest',
		},
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (response.status == true) {
			return window.location.replace(response.data.redirectUrl);
			/*return window.location.href = response.data.redirectUrl;*/
		} else {
			__tagembed__close_loader();
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
/*--End--Manage Tagembed Menue*/
/*--Start-- Get Already Exist Auth*/
function __tagembed__get_already_exist_auth(__tagembed__network_id) {
	if (!__tagembed__network_id)
		return;
	let formData = new FormData();
	formData.append('networkId', __tagembed__network_id);
	formData.append('action', 'data');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__get_already_exist_auth');
	fetch(__tagembed__ajax_url, {
		method: 'POST',
		headers: {
			'x-requested-with': 'XMLHttpRequest',
		},
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (response.status == true)
			__tagembed__network_already_exist_auth = response.data;
	});
}
/*Note : This Use For Merge Instagram 2/18*/
function __tagembed__get_already_exist_auth_new(__tagembed__network_id, __tagembed__feed_data) {
	if (!__tagembed__network_id)
		return;
	__tagembed__open_loader();
	let formData = new FormData();
	formData.append('networkId', __tagembed__network_id);
	formData.append('action', 'data');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__get_already_exist_auth');
	fetch(__tagembed__ajax_url, {
		method: 'POST',
		headers: { 'x-requested-with': 'XMLHttpRequest', },
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (response.status == true) {
			__tagembed__network_already_exist_auth = response.data;
			__tagembed__createInstagramBusinessFeed(__tagembed__feed_data);
			__tagembed__close_loader();
		}
	});
}
/*--End-- Get Already Exist Auth*/
/*--Start-- Manage Active Widget*/
var __tagembed__widgets = document.querySelector("#__tagembed__widgets");
if (__tagembed__widgets) {
	__tagembed__widgets.addEventListener("change", function (event) {
		if (typeof __tagembed__get_theme !== 'undefined')
			__tagembed__get_theme(); /*Manage Widget Theme According Widget*/
		if (typeof __tagembed__changeIfrmSrc !== 'undefined')
			__tagembed__changeIfrmSrc(); /*Manage Widget Display Preview According Widget*/
		if (typeof __tagembed__manageShotrCode !== 'undefined')
			__tagembed__manageShotrCode(); /*Manage Short Code According Widget*/
		if (typeof __tagembed__manageEmbedCode !== 'undefined')
			__tagembed__manageEmbedCode(); /*Manage Embed Code According Widget*/
		if (typeof __tagembed__getFeed !== 'undefined')
			__tagembed__getFeed(); /*Get Feed According Widget*/
		if (typeof __tagembed__changeFilterIfrmSrc !== 'undefined')
			__tagembed__changeFilterIfrmSrc(); /*Mange Filter Section According Widget*/
		__tagembed__manageActiveWidget(); /*Manage Active Widget*/
		if (typeof __tagembed__getCustomizationOption !== 'undefined')/*Call Get Customization Options*/
			__tagembed__getCustomizationOption();
	});
}
function __tagembed__manageActiveWidget(__tagembed__widgetId = null) {
	if (!__tagembed__widgetId) {
		__tagembed__widgetId = document.querySelector("#__tagembed__widgets").selectedOptions[0];
		__tagembed__widgetId = __tagembed__widgetId.value.split('#')[0];
	}
	let __tagembed__toast = new TagembedToast;
	let formData = new FormData();
	formData.append('action', 'data');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__manage_active_widget');
	formData.append('widgetId', __tagembed__widgetId);
	if (__tagembed__loader_status)
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
		if (__tagembed__loader_status)
			__tagembed__close_loader();
		if (response.status == true) {
			/*--Start--Reload Page For Manage Active Class On Widget Page*/
			if (document.querySelector("#__tagembed__widgetbox0"))
				location.reload();
			/*--End--Reload Page For Manage Active Class On Widget Page*/
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
/*--End-- Manage Active Widget*/
/*--Start--Create Widget*/
var __tagembed__widget_create_form = document.querySelector("#__tagembed__widget_create_form");
if (__tagembed__widget_create_form) {
	__tagembed__widget_create_form.addEventListener("click", function (event) {
		__tagembed__dialog_form({
			popupSize: '__tagembed__popup_md', title: 'Create Widget',
			form: { method: 'post', buttonText: 'Create' },
			inputs: [{ label: 'Widget Name', type: 'text', name: 'name', placeholder: 'Enter your widget name e.g. mywidget' }, { label: 'Profanity Filter', type: 'checkbox', name: 'profanity' }],
			action: function (event, formData) {
				let __tagembed__name_error = document.querySelector("#__tagembed__name_error");
				__tagembed__name_error.style.display = 'none';
				if (!formData.get('name')) {
					__tagembed__name_error.style.display = 'block';
					__tagembed__name_error.textContent = "Widget name is required";
					return;
				}
				__tagembed__open_loader();
				let __tagembed__toast = new TagembedToast;
				formData.append('action', 'data');
				formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
				formData.append('__tagembed__ajax_action', '__tagembed__create_widget');
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
							__tagembed__toast.success({ message: response.data.message, position: '__tagembed__is-top-right' });
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
	});
}
/*--End--Create Widget*/
/*--Start--Manage Menue Hide Show In Mobile*/
function __tagembed__manageMenueHideShowInMobile() {
	let __tagembed__menulist = document.querySelector("#__tagembed__menulist");
	let __tagembed__burger = document.querySelector("#__tagembed__burger");
	if (__tagembed__menulist.style.display === "none") {
		__tagembed__menulist.style.display = "block";
		__tagembed__burger.classList.add("__tagembed__addclose");
	} else {
		__tagembed__menulist.style.display = "none";
		__tagembed__burger.classList.remove("__tagembed__addclose");
	}
}
/*--Start--Manage Menue Hide Show In Mobile*/
/*--Start--Manage Toggel On Press Space Button*/
function __tagembed__manageToggelOnPressSpace() {
	let tagembedConfirmDialog = document.querySelector("#tagembedConfirmDialog");
	if (tagembedConfirmDialog)
		return true;
	return false;
}
/*--End--Manage Toggel On Press Space Button*/
/*--Start-- Add And Update Connected Account*/
function __tageembed__addUpdateAndRefreshAccount(__tagembed__networkId, __tagembed__type, __tagembed__connected_account_id = null, __tagembed__feed_id = null, __tagembed__feed_filter_id = null, __tagembed__other_data = null) {
	if (__tagembed__networkId) {
		let __tagembed__toast = new TagembedToast;
		let formData = new FormData();
		formData.append('action', 'data');
		formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
		formData.append('__tagembed__ajax_action', '__tagembed__add_or_update_account');
		formData.append('type', __tagembed__type);
		formData.append('connectedAccountId', __tagembed__connected_account_id);
		formData.append('feedId', __tagembed__feed_id);
		formData.append('networkId', __tagembed__networkId);
		formData.append('filterId', __tagembed__feed_filter_id);
		formData.append('otherData', __tagembed__other_data);
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
			if (response.status == true) {
				/*window.open(response.data.redirectUrl + '?__tagembed__feedData=' + response.data.__tagembed__feedData + '&__tagembed__requestCallBackUrl=' + response.data.__tagembed__requestCallBackUrl, '_self');*/
				let __tagembed__Url = response.data.redirectUrl + '?__tagembed__feedData=' + response.data.__tagembed__feedData + '&__tagembed__requestCallBackUrl=' + response.data.__tagembed__requestCallBackUrl;
				__tagmebed__openWindowPopup(__tagembed__Url);

			} else {
				__tagembed__close_loader();
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
}
/*--End-- Add And Update Connected Account*/
/*--Start-- Manage Short Code*/
window.addEventListener ? window.addEventListener("load", __tagembed__manageShotrCode, false) : window.attachEvent && window.attachEvent("onload", __tagembed__manageShotrCode);
function __tagembed__manageShotrCode() {
	let widgetData = document.querySelector("#__tagembed__widgets");
	if (widgetData) {
		let __tagembed__widgetId = widgetData.selectedOptions[0].value.split('#')[0];
		let __tagembed__shortCode = document.querySelector("#__tagembed__shortCode");
		if (__tagembed__shortCode)
			__tagembed__shortCode.innerHTML = `[tagembed widgetid ${__tagembed__widgetId}]`;
	}
}
/*--Start--Copy Short Code*/
async function __tagembed__copyCodeEmbed(__tagembed__codeType, __tagembed__copyEmbedId) {

	let ___tagembed__shouldStop = await __tagembed__upgradePlan();
	if (___tagembed__shouldStop) return;

	let __tagembed__toast = new TagembedToast;
	let __tagembed__copyEmbedCode = "";
	switch (__tagembed__codeType) {
		case "shortCode":
			__tagembed__copyEmbedCode = document.querySelector(`#${__tagembed__copyEmbedId}`).innerHTML;
			break;
		case "embedCode":
			__tagembed__copyEmbedCode = document.querySelector(`#${__tagembed__copyEmbedId}`).value;
			break;
	}
	navigator.clipboard.writeText(__tagembed__copyEmbedCode);
	__tagembed__toast.success({ message: 'copied', position: '__tagembed__is-top-right' });
}
/*--End--Copy Short Code*/

