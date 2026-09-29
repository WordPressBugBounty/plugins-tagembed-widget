/*--Start-- Manage Scheduled Plan Change State*/
var __tagembed__plan_status = null;
var __tagembed__plan_order = { 53: 0, 42: 1, 28: 2, 29: 3, 67: 0, 69: 1, 68: 2, 66: 3 };
function __tagembed__isPlanChangeLocked() {
	return !!(__tagembed__plan_status && __tagembed__plan_status.lockPlanButtons);
}
function __tagembed__showPlanLockedToast() {
	let message = (__tagembed__plan_status && __tagembed__plan_status.message) ? __tagembed__plan_status.message : "A plan change is already scheduled on your account.";
	new TagembedToast().danger({ message: message, position: '__tagembed__is-top-right' });
}
function __tagembed__planChangeDateText() {
	if (__tagembed__plan_status && __tagembed__plan_status.effectiveLabel) return __tagembed__plan_status.effectiveLabel;
	if (__tagembed__billing_summary && __tagembed__billing_summary.renewsLabel) return __tagembed__billing_summary.renewsLabel;
	return "";
}
function __tagembed__isDowngradeSelection(planId, billingCycle) {
	if (!__tagembed__plan_status || !__tagembed__plan_status.currentPlanId) return false;
	let currentOrder = __tagembed__plan_order[__tagembed__plan_status.currentPlanId];
	let newOrder = __tagembed__plan_order[planId];
	if (currentOrder === undefined || newOrder === undefined) return false;
	if (currentOrder === 0) return false;
	if (newOrder > currentOrder) return false;
	if (newOrder < currentOrder) return true;
	return !(Number(__tagembed__plan_status.currentBillingCycle) === 0 && Number(billingCycle) === 1);
}
function __tagembed__render_plan_notice() {
	let noticeBox = document.querySelector("#__tagembed__plan_notice");
	let noticeTitle = document.querySelector("#__tagembed__plan_notice_title");
	let noticeMessage = document.querySelector("#__tagembed__plan_notice_message");
	if (!noticeBox || !noticeTitle || !noticeMessage) return;
	if (!__tagembed__isPlanChangeLocked()) {
		noticeBox.style.display = "none";
		return;
	}
	noticeTitle.textContent = __tagembed__plan_status.title ? __tagembed__plan_status.title : "Plan change scheduled";
	let noticeText = __tagembed__plan_status.message ? __tagembed__plan_status.message : "";
	noticeMessage.textContent = "";
	if (typeof __tagembed__confirmDialogMessage === "function") __tagembed__confirmDialogMessage(noticeMessage, noticeText, [__tagembed__plan_status.effectiveLabel]);
	else noticeMessage.textContent = noticeText;
	noticeBox.style.display = "block";
}
function __tagembed__applyPendingPlanState() {
	__tagembed__render_plan_notice();
	if (!__tagembed__plan_status) return;
	let planWrap = document.querySelector("#__tagembed__plan");
	if (!planWrap) return;
	if (__tagembed__isPlanChangeLocked()) {
		planWrap.querySelectorAll("[data-tagembed-action], .__tagembed__selectbtn_cancelled").forEach(function (planButton) {
			if (planButton.parentNode) planButton.parentNode.removeChild(planButton);
		});
	}
	if (!__tagembed__plan_status.canResume) return;
	let activeBox = planWrap.querySelector(".__tagembed__activeplan");
	if (!activeBox || activeBox.querySelector("[data-tagembed-action='resume-subscription']")) return;
	activeBox.querySelectorAll("[data-tagembed-action='cancel-subscription'], .__tagembed__selectbtn_cancelled").forEach(function (oldButton) {
		if (oldButton.parentNode) oldButton.parentNode.removeChild(oldButton);
	});
	let resumeButton = document.createElement("a");
	resumeButton.className = "__tagembed__selectbtn";
	resumeButton.setAttribute("href", "javascript:void(0);");
	resumeButton.setAttribute("data-tagembed-action", "resume-subscription");
	resumeButton.textContent = "Restart Subscription";
	resumeButton.addEventListener("click", function () {
		__tagembed__resume_subscription();
	});
	activeBox.appendChild(resumeButton);
}
function __tagembed__resume_subscription() {
	let changeDate = __tagembed__planChangeDateText();
	let onText = changeDate ? (" Your plan will keep running and renew on " + changeDate + ".") : "";
	__tagembed__confirmDialog({
		title: 'Restart subscription?',
		message: 'Your cancellation will be removed and your current plan will continue.' + onText,
		buttonText: 'Restart',
		type: 'info',
		align: 'justify',
		highlight: [changeDate]
	}, function () {
		let __tagembed__toast = new TagembedToast;
		let formData = new FormData();
		formData.append('action', 'tagembed_data');
		formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
		formData.append('__tagembed__ajax_action', '__tagembed__resume_subscription');
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
				__tagembed__toast.success({ message: response.hasOwnProperty("message") ? response.message : "Your subscription has been restarted", position: '__tagembed__is-top-right' });
				setTimeout(function () {
					window.location.reload();
				}, 1500);
				return;
			}
			__tagembed__toast.danger({ message: response.hasOwnProperty("message") ? response.message : "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
		}).catch((error) => {
			console.log(error);
			__tagembed__close_loader();
			__tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
		});
	});
}
function __tagembed__get_plan_status() {
	let formData = new FormData();
	formData.append('action', 'tagembed_data');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__get_plan_status');
	fetch(__tagembed__ajax_url, {
		method: 'POST',
		headers: {
			'x-requested-with': 'XMLHttpRequest',
		},
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (response.status !== true || !response.hasOwnProperty("data")) return;
		__tagembed__plan_status = response.data;
		__tagembed__applyPendingPlanState();
	}).catch((error) => {
		console.log(error);
	});
}
window.addEventListener ? window.addEventListener("load", __tagembed__get_plan_status, false) : window.attachEvent && window.attachEvent("onload", __tagembed__get_plan_status);
/*--End-- Manage Scheduled Plan Change State*/
/*--Start-- Manage Cancelled Subscription State*/
var __tagembed__billing_summary = null;
function __tagembed__applyCancelledPlanState() {
	if (!__tagembed__billing_summary || !__tagembed__billing_summary.cancelled) return;
	let planWrap = document.querySelector("#__tagembed__plan");
	if (!planWrap) return;
	planWrap.querySelectorAll('[data-tagembed-action="cancel-subscription"]').forEach(function (button) {
		let label = document.createElement("span");
		label.className = "__tagembed__selectbtn __tagembed__selectbtn_cancelled";
		label.textContent = "Cancelled";
		if (__tagembed__billing_summary.renewsLabel) label.setAttribute("title", "Access ends on " + __tagembed__billing_summary.renewsLabel);
		if (button.parentNode) button.parentNode.replaceChild(label, button);
	});
}
/*--End-- Manage Cancelled Subscription State*/
/*--Start-- Manage Upgrade Page Tabs*/
function __tagembed__manageUpgradeTab(tabName) {
	let planTab      = document.querySelector("#__tagembed__upgrade_tab_plan");
	let invoiceTab   = document.querySelector("#__tagembed__upgrade_tab_invoice");
	let planPanel    = document.querySelector("#__tagembed__upgrade_plan_panel");
	let invoicePanel = document.querySelector("#__tagembed__invoice_section");
	if (!planTab || !invoiceTab || !planPanel || !invoicePanel) return;
	if (tabName === "invoice") {
		planTab.classList.remove("__tagembed__active");
		invoiceTab.classList.add("__tagembed__active");
		planPanel.style.display = "none";
		invoicePanel.style.display = "block";
	} else {
		invoiceTab.classList.remove("__tagembed__active");
		planTab.classList.add("__tagembed__active");
		invoicePanel.style.display = "none";
		planPanel.style.display = "block";
	}
}
/*--End-- Manage Upgrade Page Tabs*/
/*--Start--Manage All Feacture Hide Show*/
function __tagembed__manageAllFeactureHideShow() {
	let __tagembed__all_feacture_section = document.querySelector("#__tagembed__all_feacture_section");
	let __tagembed__all_feacture_button = document.querySelector("#__tagembed__all_feacture_button");
	if (__tagembed__all_feacture_section.style.display === "none") {
		__tagembed__all_feacture_section.style.display = "block";
		__tagembed__all_feacture_button.textContent = "Hide Comparison";
	} else {
		__tagembed__all_feacture_section.style.display = "none";
		__tagembed__all_feacture_button.textContent = "Compare All Plans";
	}
}
/*--End--Manage All Feacture Hide Show*/
/*--Start--Manage All Feacture Hide Show*/
function __tagembed__manageSelectPlanPrice(timePeriod) {
	let __tagembbed__monthely_price_button = document.querySelector("#__tagembbed__monthely_price_button");
	let __tagembbed__yearly_price_button = document.querySelector("#__tagembbed__yearly_price_button");
	if (timePeriod == "monthely") {
		document.querySelectorAll('.__tagembed__yearly_plan').forEach(function (el) {
			el.style.display = 'none';
		});
		document.querySelectorAll('.__tagembed__monthely_plan').forEach(function (el) {
			el.style.display = 'block';
		});
		document.querySelectorAll('.__tagembed__selectbtn_yearly').forEach(function (el) {
			el.style.display = 'none';
		});
		document.querySelectorAll('.__tagembed__selectbtn_monthely').forEach(function (el) {
			el.style.display = 'block';
		});
		__tagembbed__monthely_price_button.classList.add("__tagembed__active");
		__tagembbed__yearly_price_button.classList.remove("__tagembed__active");
	} else if (timePeriod == "yearly") {
		document.querySelectorAll('.__tagembed__yearly_plan').forEach(function (el) {
			el.style.display = 'block';
		});
		document.querySelectorAll('.__tagembed__monthely_plan').forEach(function (el) {
			el.style.display = 'none';
		});
		document.querySelectorAll('.__tagembed__selectbtn_yearly').forEach(function (el) {
			el.style.display = 'block';
		});
		document.querySelectorAll('.__tagembed__selectbtn_monthely').forEach(function (el) {
			el.style.display = 'none';
		});
		__tagembbed__yearly_price_button.classList.add("__tagembed__active");
		__tagembbed__monthely_price_button.classList.remove("__tagembed__active");
	}
}
/*--End--Manage All Feacture Hide Show*/
/*--Start-- Get User Accounts Details*/
window.addEventListener ? window.addEventListener("load", __tagembed__get_account_details, false) : window.attachEvent && window.attachEvent("onload", __tagembed__get_account_details);
function __tagembed__get_account_details() {
	let __tagembed__all_feacture_section = document.querySelector("#__tagembed__all_feacture_section");
	let allFeactureRemovableKeys = ['id', 'created', 'modified', 'webEmbed', 'status', 'collaborator', 'collaboratorStatus', 'themes', 'updatesIntervalCron', 'unit_cron', 'retainPost'];
	let allFeactureIcons = ['apiLimit', 'name', 'retainPostCount', 'support', 'walls', 'feeds', 'linkedInFeedLimit', 'linkedInFeedLimit', 'twitterFeedLimit', 'viewCount']
	let freeTrialPlanIds = ['1'];
	let __tagembed__plan = document.querySelector("#__tagembed__plan");
	let __tagembed__toast = new TagembedToast;
	let formData = new FormData();
	formData.append('action', 'tagembed_data');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__get_account_details');
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

			/*--Start-- Manage Upgrade Plan Section Hide | Show*/
			let __tagembed__upgrade_plan_section = document.querySelector("#__tagembed__upgrade_plan_section");
			let __tagembed__support_section = document.querySelector("#__tagembed__support_section");
			if (response.data.upgradeSection && response.data.upgradeSection === "hide") {
				if (__tagembed__upgrade_plan_section) {
					__tagembed__upgrade_plan_section.style.display = "none";
				}
				if (__tagembed__support_section) {
					__tagembed__support_section.style.display = "block";
				}
				return false;
			}
			/*--End-- Manage Upgrade Plan Section Hide | Show*/

			/*--Start-- Manage All Feacture Section*/
			let allFeactureHTML = "";
			let i = 0;
			for (let indexxxxx in response.data.Product) {
				if (indexxxxx == "Plan") {
					for (let indexxxxxx in response.data.Product[indexxxxx]) {
						if (!freeTrialPlanIds.includes(response.data.Product[indexxxxx][indexxxxxx].Plan.id)) {
							const selectedKeys = [
								'name', 'walls', 'feeds', 'Networks', 'branding', 'api', 'support', 'apiLimit',
								'customCss', 'manualModeration', 'automaticModeration', 'webAnalytic',
								'customPost', 'customBanner', 'profanityFilter', 'cta', 'cdn', 'retainPostCount',
								'linkedInFeedLimit', 'twitterFeedLimit', 'viewCount'
							];
							if (i === 0) {
								allFeactureHTML += '<tr>';

								for (const key of selectedKeys) {
									const planRuleData = response.data.Product[indexxxxx][indexxxxxx].PlanRule;
									if (planRuleData.hasOwnProperty(key) && !allFeactureRemovableKeys.includes(key)) {
										allFeactureHTML += `<th>${__tagembed__escapeText(key.replace(/([A-Z])/g, ' $1'))}</th>`;
									}
								}
								allFeactureHTML += '<th>Networks</th></tr>';
							}
							i++;
							allFeactureHTML += '<tr>';

							for (const key of selectedKeys) {
								const planRuleData = response.data.Product[indexxxxx][indexxxxxx].PlanRule;
								if (planRuleData.hasOwnProperty(key) && !allFeactureRemovableKeys.includes(key)) {
									if (allFeactureIcons.includes(key)) {
										allFeactureHTML += `<td>${__tagembed__escapeText(planRuleData[key])}</td>`;
									} else {
										if (planRuleData[key] == "1") {
											allFeactureHTML += `<td class="text-center mb-0"><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" class="img-fluid"></td>`;
										} else {
											allFeactureHTML += `<td class="text-center mb-0"><img src="${__tagembed__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" class="img-fluid"></td>`;
										}
									}
								}
							}
							allFeactureHTML += '<td>';
							for (let network of response.data.Product[indexxxxx][indexxxxxx].Planrulenetwork) {
								allFeactureHTML += `<img style="height:14px; margin:2px;" src="${__tagembed__plugin_url_for_js}assets/images/network/${__tagembed__escapeAttr(network.network)}.png"/>`;
							}
							allFeactureHTML += '</td></tr>';
						}
					}
				}
			}
			__tagembed__setSafeHtml(__tagembed__all_feacture_section, `<table> ${allFeactureHTML}</table>`);
			/*--End-- Manage All Feacture Section*/
			/*--Start-- Manage Plan Serction Section*/
			let elemHTML = "";
			let __tagembed__activePlanId = (response.data.Product && response.data.Product.ActivePlan && response.data.Product.ActivePlan.id) ? response.data.Product.ActivePlan.id : "";
			for (let indexx in response.data.Product) {
				if (indexx == "Plan") {
					for (let indexxx in response.data.Product[indexx]) {
						elemHTML = `${elemHTML}<div class="__tagembed__planbox ${(response.data.Product[indexx][indexxx].Plan.id == __tagembed__activePlanId) ? '__tagembed__activeplan' : ''}">`;
						if (response.data.Product[indexx][indexxx].Plan.id == __tagembed__activePlanId)
							elemHTML = `${elemHTML}<span class="__tagembed__currentplan">Current Plan</span>`;
						elemHTML = `${elemHTML}<strong>${__tagembed__escapeText(response.data.Product[indexx][indexxx].Plan.name)}</strong>`;
						let monthelyPrice = response.data.Product[indexx][indexxx].Plan.wordpessMonthlyPrice;
						let yearlyPrice = response.data.Product[indexx][indexxx].Plan.wordpressYearlyPrice;
						if (response.data.Product[indexx][indexxx].Plan.id == 67 || response.data.Product[indexx][indexxx].Plan.id == 53) {
							elemHTML = `${elemHTML}<h2>Free</h2>`;
						} else {
							elemHTML = `${elemHTML}<h2 class="__tagembed__monthely_plan" style="display:none;">$${__tagembed__escapeText(monthelyPrice)}/Mo</h2>`;
							elemHTML = `${elemHTML}<h2 class="__tagembed__yearly_plan">$${__tagembed__escapeText(yearlyPrice)}/Mo</h2>`;
						}
						elemHTML = `${elemHTML}<p>${__tagembed__escapeText(response.data.Product[indexx][indexxx].Plan.description)}</p>`;
						elemHTML = `${elemHTML}<ul>`;
						elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />${__tagembed__escapeText(response.data.Product[indexx][indexxx].PlanRule.feeds)} ${response.data.Product[indexx][indexxx].Plan.id == 67 || response.data.Product[indexx][indexxx].Plan.id == 53 ? `Feed` : `Feeds`}</li>`;
						elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />${__tagembed__escapeText(response.data.Product[indexx][indexxx].PlanRule.viewCount)} Views/Month</li>`;
						if (response.data.Product[indexx][indexxx].Plan.id != 67 && response.data.Product[indexx][indexxx].Plan.id != 53) {
							if (response.data.Product[indexx][indexxx].PlanRule.linkedInFeedLimit != 0) {
								elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />LinkedIn Auto Update (Max ${__tagembed__escapeText(response.data.Product[indexx][indexxx].PlanRule.linkedInFeedLimit)} Feeds)</li>`;
							} else {
								elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />LinkedIn Manual</li>`;
							}
						} else {
							elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" />LinkedIn Feed</li>`;
						}
						elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />${__tagembed__escapeText(response.data.Product[indexx][indexxx].PlanRule.updatesIntervalCron)} ${(response.data.Product[indexx][indexxx].PlanRule.unit_cron == 3600) ? "Hours" : "Mins"}  Update Time</li>`;
						if (response.data.Product[indexx][indexxx].PlanRule.customCss == 0) {
							elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" />No Custom CSS</li>`;
						} else {
							elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />Custom CSS</li>`;
						}
						if (response.data.Product[indexx][indexxx].PlanRule.branding == 0) {
							elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" />No Tagembed Branding</li>`;
						} else {
							elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />Tagembed Branding</li>`;
						}
						elemHTML = `${elemHTML}</ul>`;
						if (response.data.Product[indexx][indexxx].Plan.id != 1) {
							if (response.data.Product[indexx][indexxx].Plan.id == __tagembed__activePlanId) {
								if (response.data.Product[indexx][indexxx].Plan.id != 67 && response.data.Product[indexx][indexxx].Plan.id != 53) {
									elemHTML = `${elemHTML}<a href="javascript:void(0);" data-tagembed-action="cancel-subscription" data-tagembed-plan-id="${__tagembed__escapeAttr(response.data.Product[indexx][indexxx].Plan.id)}" class="__tagembed__selectbtn">Cancel Subscription</a>`;
								}
							} else {
								if (response.data.Product[indexx][indexxx].Plan.id == 67 || response.data.Product[indexx][indexxx].Plan.id == 53) {
									elemHTML = `${elemHTML}<a href="javascript:void(0);" data-tagembed-action="lite-payment" data-tagembed-plan-id="${__tagembed__escapeAttr(response.data.Product[indexx][indexxx].Plan.id)}" data-tagembed-price-code="${__tagembed__escapeAttr(response.data.Product[indexx][indexxx].Plan.wordpressStripeMonthlyPriceCode)}" data-tagembed-cycle="0" class="__tagembed__selectbtn  __tagembed__selectbtn_monthely" style="display:none;">Select</a>`;
									elemHTML = `${elemHTML}<a href="javascript:void(0);" data-tagembed-action="lite-payment" data-tagembed-plan-id="${__tagembed__escapeAttr(response.data.Product[indexx][indexxx].Plan.id)}" data-tagembed-price-code="${__tagembed__escapeAttr(response.data.Product[indexx][indexxx].Plan.wordpressStripeYearlyPriceCode)}" data-tagembed-cycle="1" class="__tagembed__selectbtn  __tagembed__selectbtn_yearly">Select</a>`;
								} else {
									elemHTML = `${elemHTML}<a href="javascript:void(0);" data-tagembed-action="payment" data-tagembed-plan-id="${__tagembed__escapeAttr(response.data.Product[indexx][indexxx].Plan.id)}" data-tagembed-price-code="${__tagembed__escapeAttr(response.data.Product[indexx][indexxx].Plan.wordpressStripeMonthlyPriceCode)}" data-tagembed-cycle="0" class="__tagembed__selectbtn  __tagembed__selectbtn_monthely" style="display:none;">Select</a>`;
									elemHTML = `${elemHTML}<a href="javascript:void(0);" data-tagembed-action="payment" data-tagembed-plan-id="${__tagembed__escapeAttr(response.data.Product[indexx][indexxx].Plan.id)}" data-tagembed-price-code="${__tagembed__escapeAttr(response.data.Product[indexx][indexxx].Plan.wordpressStripeYearlyPriceCode)}" data-tagembed-cycle="1" class="__tagembed__selectbtn  __tagembed__selectbtn_yearly">Select</a>`;
								}
							}
						}
						elemHTML = `${elemHTML}</div>`;
					}
				}
			}
			__tagembed__setSafeHtml(__tagembed__plan, elemHTML);
			/* The plan buttons carry their values in data attributes and are wired up here,
			   so no event handler is written into the markup. */
			__tagembed__applyCancelledPlanState();
			__tagembed__applyPendingPlanState();
			__tagembed__plan.querySelectorAll("[data-tagembed-action]").forEach(function (__tagembed__planButton) {
				__tagembed__planButton.addEventListener("click", function () {
					let __tagembed__action = (this.getAttribute("data-tagembed-action") || "");
					let __tagembed__planId = (this.getAttribute("data-tagembed-plan-id") || "");
					let __tagembed__priceCode = (this.getAttribute("data-tagembed-price-code") || "");
					let __tagembed__billingCycle = (this.getAttribute("data-tagembed-cycle") || "0");
					if (__tagembed__isPlanChangeLocked()) return __tagembed__showPlanLockedToast();
					if ("cancel-subscription" === __tagembed__action) __tagembed__cancel_subscription(__tagembed__planId);
					else if ("lite-payment" === __tagembed__action) __tagembed__make_lite_plan_payment(__tagembed__planId, __tagembed__priceCode);
					else if ("payment" === __tagembed__action) __tagembed__confirm_plan_selection(__tagembed__planId, __tagembed__priceCode, __tagembed__billingCycle);
				});
			});
			/*--End-- Manage Plan Serction Section*/

			/*Manage Upgrade Plan Section Hide | Show */
			if (__tagembed__upgrade_plan_section)
				__tagembed__upgrade_plan_section.style.display = "block";

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
/*--End-- Get User Accounts Details*/
/*--Start-- Manage Payment*/
function __tagembed__make_lite_plan_payment(planId, priceCode) {
	let changeDate = __tagembed__planChangeDateText();
	let scheduleAtTermEnd = !!(__tagembed__plan_status && __tagembed__plan_status.scheduleAtTermEnd && __tagembed__plan_status.currentPlanId && __tagembed__plan_order[__tagembed__plan_status.currentPlanId] !== 0);
	let title = 'Opting Free Forever LITE Plan';
	let message = "Your current plan will be canceled and changed to Lite Plan.";
	if (scheduleAtTermEnd) {
		title = 'Are you sure?';
		let tillText = changeDate ? ("till " + changeDate) : "till your current billing cycle ends";
		let onText = changeDate ? ("on " + changeDate) : "when your current billing cycle ends";
		message = "Your current plan stays active " + tillText + " and your account moves to the Free plan " + onText + ". No further payment will be taken and no refund is given for the remaining time. You will not be able to change your plan until then.";
	}
	__tagembed__confirmDialog({ title: title, message: message, buttonText: 'Confirm', type: 'danger', align: 'justify', highlight: [changeDate] }, function () {
		__tagembed__make_payment(planId, priceCode);
	});
}
function __tagembed__confirm_plan_selection(planId, priceCode, billingCycle) {
	if (!__tagembed__isDowngradeSelection(planId, billingCycle)) return __tagembed__make_payment(planId, priceCode);
	let changeDate = __tagembed__planChangeDateText();
	let scheduleAtTermEnd = !!(__tagembed__plan_status && __tagembed__plan_status.scheduleAtTermEnd);
	let message = "";
	if (scheduleAtTermEnd) {
		let tillText = changeDate ? ("till " + changeDate) : "till your current billing cycle ends";
		let onText = changeDate ? ("on " + changeDate) : "when your current billing cycle ends";
		message = "This is a downgrade. Your current plan stays active " + tillText + " and the new plan starts " + onText + ". Nothing is charged today and no refund is given for the remaining time. You will not be able to change your plan until then.";
	} else {
		message = "This is a downgrade. Your new plan starts right away and no refund is given for the remaining time of your current plan.";
	}
	__tagembed__confirmDialog({ title: 'Are you sure?', message: message, buttonText: 'Confirm Downgrade', type: 'danger', align: 'justify', highlight: [changeDate] }, function () {
		__tagembed__make_payment(planId, priceCode);
	});
}
function __tagembed__make_payment(planId, priceCode) {
	let __tagembed__toast = new TagembedToast;
	if (!planId) {
		__tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
	} else {
		__tagembed__open_loader();
		let formData = new FormData();
		formData.append('action', 'tagembed_data');
		formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
		formData.append('__tagembed__ajax_action', '__tagembed__make_payment');
		formData.append('planId', planId);
		formData.append('priceCode', priceCode);
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
				window.open(response.data.redirectUrl + '?__tagembed__paymentData=' + response.data.__tagembed__paymentData + '&__tagembed__requestCallBackUrl=' + response.data.__tagembed__requestCallBackUrl, '_self');
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
/*--End-- Manage Payment*/
function __tagembed__cancel_subscription(planId) {
	let __tagembed__toast = new TagembedToast;
	if (!planId)
		return __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
	__tagembed__confirmDialog({ title: 'Are you sure!', message: 'Do you want to cancel subscription?', buttonText: 'Yes', type: 'danger' }, function () {
		let formData = new FormData();
		formData.append('planId', planId);
		formData.append('action', 'tagembed_data');
		formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
		formData.append('__tagembed__ajax_action', '__tagembed__cancel_subscription');
		__tagembed__open_loader();
		var __tagembed__toast = new TagembedToast;
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
				if (response.data.hasOwnProperty("message")) {
					__tagembed__toast.success({ message: response.data.message, position: '__tagembed__is-top-right' });
				}
				setTimeout(function () {
					window.open('https://tagembed.com/subscription-cancelled/', '_blank');
					setTimeout(function () {
						window.location.reload();
					}, 500);
				}, 3000);
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
}
/*--Start--Hide  Account Upgrade Modal*/
function __tagembed__hide_upgrade_account_popup() {
	let __tagembed__upgrade_account_popup = document.querySelector("#__tagembed__upgrade_account_popup");
	__tagembed__upgrade_account_popup.style.display = "none";
}
/*--End--Hide  Account Upgrade Modal*/

/*--Start-- Billing History*/
window.addEventListener ? window.addEventListener("load", __tagembed__get_invoices, false) : window.attachEvent && window.attachEvent("onload", __tagembed__get_invoices);
function __tagembed__is_stripe_receipt_url(url) {
	if (typeof url !== "string" || url.indexOf("https://") !== 0) return false;
	try {
		let parsed = new URL(url);
		return parsed.protocol === "https:" && (parsed.hostname === "stripe.com" || parsed.hostname.endsWith(".stripe.com") || parsed.hostname === "chargebee.com" || parsed.hostname.endsWith(".chargebee.com"));
	} catch (error) {
		return false;
	}
}
function __tagembed__invoice_table_html(rowsHTML) {
	return '<table class="__tagembed__invoice_table">'
		+ '<thead><tr>'
		+ '<th class="__tagembed__invoice_col_date">Date</th>'
		+ '<th class="__tagembed__invoice_col_number">Invoice</th>'
		+ '<th class="__tagembed__invoice_col_plan">Plan</th>'
		+ '<th class="__tagembed__invoice_col_amount">Amount</th>'
		+ '<th class="__tagembed__invoice_col_status">Status</th>'
		+ '<th class="__tagembed__invoice_col_action">&nbsp;</th>'
		+ '</tr></thead>'
		+ '<tbody>' + rowsHTML + '</tbody>'
		+ '</table>';
}
function __tagembed__download_invoice_pdf(invoiceId, linkEl) {
	let __tagembed__toast = new TagembedToast;
	if (!invoiceId) return __tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
	if (linkEl && linkEl.getAttribute("data-tagembed-busy") === "1") return;
	if (linkEl) {
		linkEl.setAttribute("data-tagembed-busy", "1");
		linkEl.textContent = "Preparing\u2026";
	}
	let formData = new FormData();
	formData.append('action', 'tagembed_data');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__get_invoice_pdf');
	formData.append('invoiceId', invoiceId);
	fetch(__tagembed__ajax_url, {
		method: 'POST',
		headers: {
			'x-requested-with': 'XMLHttpRequest',
		},
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (linkEl) {
			linkEl.removeAttribute("data-tagembed-busy");
			linkEl.textContent = "Download PDF";
		}
		if (response.status === true && response.data && response.data.downloadUrl) {
			window.open(response.data.downloadUrl, '_blank', 'noopener');
			return;
		}
		__tagembed__toast.danger({ message: response.hasOwnProperty("message") ? response.message : "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
	}).catch((error) => {
		console.log(error);
		if (linkEl) {
			linkEl.removeAttribute("data-tagembed-busy");
			linkEl.textContent = "Download PDF";
		}
		__tagembed__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right' });
	});
}
function __tagembed__render_invoice_state(message) {
	let note = document.querySelector("#__tagembed__invoice_note");
	if (note) note.style.display = "none";
	let countBadge = document.querySelector("#__tagembed__upgrade_tab_count");
	if (countBadge) countBadge.style.display = "none";
	let wrap = document.querySelector("#__tagembed__invoice_wrap");
	if (!wrap) return;
	__tagembed__setSafeHtml(wrap, __tagembed__invoice_table_html('<tr><td colspan="6" class="__tagembed__invoice_empty">' + __tagembed__escapeText(message) + '</td></tr>'));
}
function __tagembed__render_billing_summary(summary) {
	let box = document.querySelector("#__tagembed__billing_stats");
	if (!box) return;
	if (!summary || typeof summary !== "object") {
		box.style.display = "none";
		return;
	}
	let planText = summary.planName ? summary.planName : (summary.planLabel || "");
	if (summary.priceLabel) planText = planText ? planText + " \u2014 " + summary.priceLabel : summary.priceLabel;
	let viewsText = "";
	if (summary.viewsUsedLabel) viewsText = summary.viewsLimitLabel ? summary.viewsUsedLabel + " / " + summary.viewsLimitLabel : summary.viewsUsedLabel;
	let cells = [
		{ id: "__tagembed__billing_stat_plan", value: planText },
		{ id: "__tagembed__billing_stat_renews", value: summary.renewsLabel || "", title: summary.renewsTitle || "Renews" },
		{ id: "__tagembed__billing_stat_views", value: viewsText }
	];
	let shown = 0;
	cells.forEach(function (cell) {
		let node = document.querySelector("#" + cell.id);
		if (!node) return;
		if (cell.value) {
			node.textContent = cell.value;
			shown++;
			if (cell.title && node.parentNode) {
				let caption = node.parentNode.querySelector("span");
				if (caption) caption.textContent = cell.title;
			}
			if (node.parentNode) node.parentNode.style.display = "block";
		} else if (node.parentNode) {
			node.parentNode.style.display = "none";
		}
	});
	box.style.display = shown ? "flex" : "none";
}
/*--Start-- Payment Method (Card) Section*/
function __tagembed__render_cards(data) {
	let wrap = document.querySelector("#__tagembed__card_wrap");
	if (!wrap) return;
	let cards = (data && Array.isArray(data.cards)) ? data.cards : [];
	if (!data || data.canManage !== true || cards.length === 0) { /* Details Na Ho To Section Dikhana Hi Nahi */
		wrap.style.display = "none";
		return;
	}
	while (wrap.firstChild) wrap.removeChild(wrap.firstChild);

	let head = document.createElement("p");
	head.className = "__tagembed__card_head";
	head.textContent = "Payment Method";
	wrap.appendChild(head);

	let row = document.createElement("div");
	row.className = "__tagembed__card_row";

	let card = cards.filter(function (item) { return item.isDefault; })[0] || cards[0];

	let detail = document.createElement("div");
	if (card) {
		detail.className = "__tagembed__card_detail";
		let name = document.createElement("strong");
		name.textContent = (card.brand ? card.brand : "Card") + " •••• " + (card.last4 ? card.last4 : "****");
		detail.appendChild(name);
		if (card.expiry) {
			let exp = document.createElement("span");
			exp.className = card.isExpired ? "__tagembed__card_expired" : "__tagembed__card_expiry";
			exp.textContent = (card.isExpired ? "  Expired " : "  Expires ") + card.expiry;
			detail.appendChild(exp);
		}
	}
	row.appendChild(detail);

	let action = document.createElement("a");
	action.className = "__tagembed__card_action";
	action.setAttribute("href", "javascript:void(0);");
	action.setAttribute("data-tagembed-action", "card-session");
	action.textContent = "Update Card";
	action.addEventListener("click", __tagembed__open_card_session);
	row.appendChild(action);

	wrap.appendChild(row);
	wrap.style.display = "block";
}
function __tagembed__get_cards() {
	let formData = new FormData();
	formData.append('action', 'tagembed_data');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__get_cards');
	fetch(__tagembed__ajax_url, {
		method: 'POST',
		headers: { 'x-requested-with': 'XMLHttpRequest' },
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (response.status !== true || !response.hasOwnProperty("data")) return;
		__tagembed__render_cards(response.data);
	}).catch(() => { });
}
function __tagembed__open_card_session() {
	let button = this;
	if (button && button.getAttribute("data-tagembed-busy") === "1") return;
	if (button) button.setAttribute("data-tagembed-busy", "1");
	let formData = new FormData();
	formData.append('action', 'tagembed_data');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__card_session');
	fetch(__tagembed__ajax_url, {
		method: 'POST',
		headers: { 'x-requested-with': 'XMLHttpRequest' },
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (button) button.removeAttribute("data-tagembed-busy");
		if (response.status !== true || !response.hasOwnProperty("data") || !response.data.url) {
			__tagembed__toast.danger({ message: "Card management is not available right now. Please try after sometime." });
			return;
		}
		window.open(response.data.url, '_blank');
	}).catch(() => {
		if (button) button.removeAttribute("data-tagembed-busy");
		__tagembed__toast.danger({ message: "Card management is not available right now. Please try after sometime." });
	});
}
window.addEventListener ? window.addEventListener("load", __tagembed__get_cards, false) : window.attachEvent && window.attachEvent("onload", __tagembed__get_cards);
/*--End-- Payment Method (Card) Section*/
function __tagembed__get_invoices() {
	let section = document.querySelector("#__tagembed__invoice_section");
	let wrap = document.querySelector("#__tagembed__invoice_wrap");
	if (!section || !wrap) return;
	let formData = new FormData();
	formData.append('action', 'tagembed_data');
	formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
	formData.append('__tagembed__ajax_action', '__tagembed__get_invoices');
	fetch(__tagembed__ajax_url, {
		method: 'POST',
		headers: {
			'x-requested-with': 'XMLHttpRequest',
		},
		body: formData,
	}).then(response => {
		return response.json();
	}).then(response => {
		let invoiceTabItem = document.querySelector("#__tagembed__upgrade_tab_invoice_item");
		if (response.status !== true || !response.hasOwnProperty("data") || response.data.invoiceSection !== "show") {
			section.style.display = "none";
			if (invoiceTabItem) invoiceTabItem.style.display = "none";
			__tagembed__render_billing_summary(null);
			__tagembed__manageUpgradeTab("plan");
			return;
		}
		__tagembed__billing_summary = response.data.summary || null;
		__tagembed__render_billing_summary(__tagembed__billing_summary);
		__tagembed__applyCancelledPlanState();
		__tagembed__applyPendingPlanState();
		let invoices = Array.isArray(response.data.invoices) ? response.data.invoices : [];
		let countBadge = document.querySelector("#__tagembed__upgrade_tab_count");
		if (countBadge) {
			if (invoices.length) {
				countBadge.textContent = invoices.length;
				countBadge.style.display = "inline-block";
			} else {
				countBadge.style.display = "none";
			}
		}
		if (!invoices.length) {
			__tagembed__render_invoice_state("No payments yet. Your invoices will appear here after your first payment.");
			return;
		}
		let rowsHTML = "";
		invoices.forEach(function (invoice) {
			let actionUrl = __tagembed__is_stripe_receipt_url(invoice.pdfUrl) ? invoice.pdfUrl : (__tagembed__is_stripe_receipt_url(invoice.receiptUrl) ? invoice.receiptUrl : "");
			let actionText = __tagembed__is_stripe_receipt_url(invoice.pdfUrl) ? "Download PDF" : "View Receipt";
			let actionHTML = '<span class="__tagembed__invoice_muted">&ndash;</span>';
			if (actionUrl)
				actionHTML = '<a class="__tagembed__invoice_action_link" href="' + __tagembed__escapeAttr(actionUrl) + '" rel="noopener noreferrer">' + actionText + '</a>';
			else if (invoice.gateway === 'chargebee' && invoice.invoiceId)
				actionHTML = '<a class="__tagembed__invoice_action_link" href="javascript:void(0);" data-tagembed-invoice-id="' + __tagembed__escapeAttr(invoice.invoiceId) + '">Download PDF</a>';
			let planHTML = invoice.planLabel ? __tagembed__escapeText(invoice.planLabel) : (invoice.plan ? __tagembed__escapeText(invoice.plan) : '<span class="__tagembed__invoice_muted">&ndash;</span>');
			if (invoice.discountLabel) {
				let couponText = invoice.coupon ? invoice.coupon : 'Discount';
				if (invoice.couponOff) couponText += ' \u00b7 ' + invoice.couponOff;
				planHTML += '<span class="__tagembed__invoice_coupon">' + __tagembed__escapeText(couponText) + '</span>';
			}
			let amountHTML = __tagembed__escapeText(invoice.amountLabel);
			if (invoice.discountLabel && invoice.subtotalLabel)
				amountHTML = '<span class="__tagembed__invoice_was">' + __tagembed__escapeText(invoice.subtotalLabel) + '</span>' + amountHTML;
			let stateClass = (invoice.state && invoice.state !== "paid") ? ' __tagembed__invoice_state_refunded' : '';
			let stateHTML = '<span class="__tagembed__invoice_state' + stateClass + '">' + __tagembed__escapeText(invoice.stateLabel || 'PAID') + '</span>';
			rowsHTML += '<tr>'
				+ '<td>' + __tagembed__escapeText(invoice.dateLabel) + '</td>'
				+ '<td class="__tagembed__invoice_number">' + __tagembed__escapeText(invoice.number) + '</td>'
				+ '<td class="__tagembed__invoice_plan">' + planHTML + '</td>'
				+ '<td class="__tagembed__invoice_amount">' + amountHTML + '</td>'
				+ '<td class="__tagembed__invoice_status">' + stateHTML + '</td>'
				+ '<td class="__tagembed__invoice_action">' + actionHTML + '</td>'
				+ '</tr>';
		});
		__tagembed__setSafeHtml(wrap, __tagembed__invoice_table_html(rowsHTML));
		wrap.querySelectorAll("[data-tagembed-invoice-id]").forEach(function (invoiceLink) {
			invoiceLink.addEventListener("click", function () {
				__tagembed__download_invoice_pdf(this.getAttribute("data-tagembed-invoice-id") || "", this);
			});
		});
		wrap.querySelectorAll('.__tagembed__invoice_action_link').forEach(function (link) {
			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
		});
		let note = document.querySelector("#__tagembed__invoice_note");
		if (note) {
			note.textContent = invoices.length === 1 ? "Showing 1 invoice." : "Showing " + invoices.length + " invoices.";
			note.style.display = "block";
		}
	}).catch((error) => {
		console.log(error);
		__tagembed__render_billing_summary(null);
		__tagembed__render_invoice_state("Billing history could not be loaded. Please refresh the page.");
	});
}
/*--End-- Billing History*/
