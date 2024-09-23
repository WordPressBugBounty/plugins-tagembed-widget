/*--Start--Manage All Feacture Hide Show*/
function __tagembed__manageAllFeactureHideShow() {
    let __tagembed__all_feacture_section = document.querySelector("#__tagembed__all_feacture_section");
    let __tagembed__all_feacture_button = document.querySelector("#__tagembed__all_feacture_button");
    if (__tagembed__all_feacture_section.style.display === "none") {
        __tagembed__all_feacture_section.style.display = "block";
        __tagembed__all_feacture_button.innerHTML = "Hide All Features";
    } else {
        __tagembed__all_feacture_section.style.display = "none";
        __tagembed__all_feacture_button.innerHTML = "Show All Features";
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
    let allFeactureRemovableKeys = ['id', 'created', 'modified', 'webEmbed', 'status', 'collaborator', 'collaboratorStatus', 'themes', 'updatesIntervalCron', 'unitCron', 'retainPost'];
    let allFeactureIcons = ['apiLimit', 'name', 'retainPostCount', 'support', 'walls', 'feeds', 'linkedinFeed', 'linkedinFeed', 'twitterFeed', 'viewCount']
    let suitePlanIds = ['55', '56'];
    let freeTrialPlanIds = ['43', '48', '49'];
    let __tagembed__plan = document.querySelector("#__tagembed__plan");
    let __tagembed__toast = new TagembedToast;
    let formData = new FormData();
    formData.append('action', 'data');
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
            /*--Start-- Manage All Feacture Section*/
            let allFeactureHTML = "";
            let i = 0;
            for (let indexxxx in response.data) {
                for (let indexxxxx in response.data[indexxxx].Product) {
                    if (indexxxxx == "Plan") {
                        for (let indexxxxxx in response.data[indexxxx].Product[indexxxxx]) {
                            if (!freeTrialPlanIds.includes(response.data[indexxxx].Product[indexxxxx][indexxxxxx].Plan.id) && !suitePlanIds.includes(response.data[indexxxx].Product[indexxxxx][indexxxxxx].Plan.id)) {
                                if (i == 0) {
                                    allFeactureHTML = `${allFeactureHTML}<tr>`;
                                    for (const [key, value] of Object.entries(response.data[indexxxx].Product[indexxxxx][indexxxxxx].PlanRule)) {
                                        if (!allFeactureRemovableKeys.includes(key)) {
                                            allFeactureHTML = `${allFeactureHTML}<th>${ key.replace(/([A-Z])/g, ' $1')}</th>`;
                                        }
                                    }
                                    allFeactureHTML = `${allFeactureHTML}<th>Networks</th></tr>`;
                                }
                                i++;
                                allFeactureHTML = `${allFeactureHTML}<tr>`;
                                for (const [key, value] of Object.entries(response.data[indexxxx].Product[indexxxxx][indexxxxxx].PlanRule)) {
                                    if (!allFeactureRemovableKeys.includes(key)) {
                                        if (allFeactureIcons.includes(key)) {
                                            allFeactureHTML = `${allFeactureHTML}<td>${value}</td>`;
                                        } else {
                                            if (value == "1") {
                                                allFeactureHTML = `${allFeactureHTML}<td class="text-center mb-0"><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" class="img-fluid"></td>`;
                                            } else {
                                                allFeactureHTML = `${allFeactureHTML}<td class="text-center mb-0"><img src="${__tagembed__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" class="img-fluid"></td>`;
                                            }
                                        }
                                    }
                                }
                                allFeactureHTML = `${allFeactureHTML}<td>`;
                                for (let indexxxxxxx in response.data[indexxxx].Product[indexxxxx][indexxxxxx].Planrulenetwork) {
                                    allFeactureHTML = `${allFeactureHTML}<img style="height:14px; margin:2px;" src="${__tagembed__plugin_url_for_js}assets/images/network/${response.data[indexxxx].Product[indexxxxx][indexxxxxx].Planrulenetwork[indexxxxxxx].network}.png"/>`;
                                }
                                allFeactureHTML = `${allFeactureHTML}</td></tr>`;
                            }
                        }
                    }
                }
            }
            __tagembed__all_feacture_section.innerHTML = `<table> ${allFeactureHTML}</table>`;
            /*--End-- Manage All Feacture Section*/
            /*--Start-- Manage Plan Serction Section*/
            let elemHTML = "";
            for (let index in response.data) {
                for (let indexx in response.data[index].Product) {
                    if (indexx == "Plan") {
                        for (let indexxx in response.data[index].Product[indexx]) {
                            elemHTML = `${elemHTML}<div class="__tagembed__planbox ${(response.data[index].Product[indexx][indexxx].Plan.id == response.data[index].Product.Subscription.planId) ? '__tagembed__activeplan' : ''}">`;
                            if (response.data[index].Product[indexx][indexxx].Plan.id == response.data[index].Product.Subscription.planId)
                                elemHTML = `${elemHTML}<span class="__tagembed__currentplan">Current Plan</span>`;
                            elemHTML = `${elemHTML}<strong>${response.data[index].Product[indexx][indexxx].Plan.name}</strong>`;
                            let monthelyPrice = response.data[index].Product[indexx][indexxx].Plan.wordpessMonthlyPrice;
                            let yearlyPrice = response.data[index].Product[indexx][indexxx].Plan.wordpressYearlyPrice;
                            if (response.data[index].Product[indexx][indexxx].Plan.id == 28) {
                                elemHTML = `${elemHTML}<h2>Free</h2>`;
                            } else {
                                elemHTML = `${elemHTML}<h2 class="__tagembed__monthely_plan" style="display:none;">$${monthelyPrice}/Mo</h2>`;
                                elemHTML = `${elemHTML}<h2 class="__tagembed__yearly_plan">$${yearlyPrice}/Mo</h2>`;
                            }
                            elemHTML = `${elemHTML}<p>${response.data[index].Product[indexx][indexxx].Plan.description}</p>`;
                            elemHTML = `${elemHTML}<ul>`;
                            elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />${response.data[index].Product[indexx][indexxx].PlanRule.feeds} ${response.data[index].Product[indexx][indexxx].Plan.id == 28 ? `Feed` : `Feeds`}</li>`;
                            elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />${response.data[index].Product[indexx][indexxx].PlanRule.viewCount} Views/Month</li>`;
                            if (response.data[index].Product[indexx][indexxx].Plan.id != 28) {
                                if (response.data[index].Product[indexx][indexxx].PlanRule.linkedinFeed != 0) {
                                    elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />LinkedIn Auto Update (Max 2 Feeds)</li>`;
                                } else {
                                    elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />LinkedIn Manual</li>`;
                                }
                            } else {
                                elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" />LinkedIn Feed</li>`;
                            }
                            elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />${response.data[index].Product[indexx][indexxx].PlanRule.updatesIntervalCron} ${(response.data[index].Product[indexx][indexxx].PlanRule.unitCron == 3600) ? "Hours" : "Mins"}  Update Time</li>`;
                            if (response.data[index].Product[indexx][indexxx].PlanRule.customCss == 0) {
                                elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" />No Custom CSS</li>`;
                            } else {
                                elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />Custom CSS</li>`;
                            }
                            if (response.data[index].Product[indexx][indexxx].PlanRule.branding == 0) {
                                elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-cross.svg" alt="no-access" />No Tagembed Branding</li>`;
                            } else {
                                elemHTML = `${elemHTML}<li><img src="${__tagembed__plugin_url_for_js}assets/images/plan-ok.svg" alt="access" />Tagembed Branding</li>`;
                            }
                            elemHTML = `${elemHTML}</ul>`;
                            if (response.data[index].Product[indexx][indexxx].Plan.id != 43) {
                                if (response.data[index].Product[indexx][indexxx].Plan.id == response.data[index].Product.Subscription.planId) {
                                    if (response.data[index].Product[indexx][indexxx].Plan.id != 28) {
                                        elemHTML = `${elemHTML}<a href="javascript:void(0);" onclick="__tagembed__cancel_subscription('${response.data[index].Product[indexx][indexxx].Plan.id}');" class="__tagembed__selectbtn">Cancel Subscription</a>`;
                                    }
                                } else {
                                    if (response.data[index].Product[indexx][indexxx].Plan.id == 28) {
                                        elemHTML = `${elemHTML}<a href="javascript:void(0);" onclick="__tagembed__make_lite_plan_payment('${response.data[index].Product[indexx][indexxx].Plan.id}','${response.data[index].Product[indexx][indexxx].Plan.wordpressStripeMonthlyPriceCode}');" class="__tagembed__selectbtn  __tagembed__selectbtn_monthely" style="display:none;">Select</a>`;
                                        elemHTML = `${elemHTML}<a href="javascript:void(0);" onclick="__tagembed__make_lite_plan_payment('${response.data[index].Product[indexx][indexxx].Plan.id}','${response.data[index].Product[indexx][indexxx].Plan.wordpressStripeYearlyPriceCode}');" class="__tagembed__selectbtn  __tagembed__selectbtn_yearly">Select</a>`;
                                    } else {
                                        elemHTML = `${elemHTML}<a href="javascript:void(0);" onclick="__tagembed__make_payment('${response.data[index].Product[indexx][indexxx].Plan.id}','${response.data[index].Product[indexx][indexxx].Plan.wordpressStripeMonthlyPriceCode}');" class="__tagembed__selectbtn  __tagembed__selectbtn_monthely" style="display:none;">Select</a>`;
                                        elemHTML = `${elemHTML}<a href="javascript:void(0);" onclick="__tagembed__make_payment('${response.data[index].Product[indexx][indexxx].Plan.id}','${response.data[index].Product[indexx][indexxx].Plan.wordpressStripeYearlyPriceCode}');" class="__tagembed__selectbtn  __tagembed__selectbtn_yearly">Select</a>`;
                                    }
                                }
                            }
                            elemHTML = `${elemHTML}</div>`;
                        }
                    }
                }
            }
            __tagembed__plan.innerHTML = elemHTML;
            /*--End-- Manage Plan Serction Section*/
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
}
/*--End-- Get User Accounts Details*/
/*--Start-- Manage Payment*/
function __tagembed__make_lite_plan_payment(planId, priceCode) {
    confirmDialog({title: 'Opting Free Forever LITE Plan', message: 'Your current plan will be canceled and changed to Lite Plan.', buttonText: 'Confirm', type: 'danger'}, function () {
        __tagembed__make_payment(planId, priceCode);
    });
}
function __tagembed__make_payment(planId, priceCode) {
    let __tagembed__toast = new TagembedToast;
    if (!planId || !priceCode) {
        __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    } else {
        __tagembed__open_loader();
        let formData = new FormData();
        formData.append('action', 'data');
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
    }
}
/*--End-- Manage Payment*/
function __tagembed__cancel_subscription(planId) {
    let __tagembed__toast = new TagembedToast;
    if (!planId)
        return __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    confirmDialog({title: 'Are you sure!', message: 'Do you want to cancel subscription?', buttonText: 'Yes', type: 'danger'}, function () {
        let formData = new FormData();
        formData.append('planId', planId);
        formData.append('action', 'data');
        formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
        formData.append('__tagembed__ajax_action', '__tagembed__cancel_subscription');
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
                if (response.data.hasOwnProperty("message")) {
                    __tagembed__toast.success({message: response.data.message, position: '__tagembed__is-top-right'});
                }
                setTimeout(function () {
                    window.open('https://tagembed.com/subscription-cancelled/', '_blank');
                }, 3000);
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
/*--Start--Hide  Account Upgrade Modal*/
function __tagembed__hide_upgrade_account_popup() {
    let __tagembed__upgrade_account_popup = document.querySelector("#__tagembed__upgrade_account_popup");
    __tagembed__upgrade_account_popup.style.display = "none";
}
/*--End--Hide  Account Upgrade Modal*/