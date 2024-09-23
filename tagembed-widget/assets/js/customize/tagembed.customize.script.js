/*--Start-- Manage Custom Font Family Dropdown*/
const mainEl = document.querySelector('.__tagembed__ff_dropdwon .__tagembed__dd_first');
const liEls = document.querySelectorAll('.__tagembed__ff_dropdwon > ul > li.__tagembed__dd_inputoption');
mainEl.addEventListener("click", () => {
    for (let liEl of liEls)
        liEl.style.display = 'list-item';
});
for (let liEl of liEls) {
    liEl.addEventListener("click", () => {
        mainEl.innerHTML = liEl.innerHTML;
        document.getElementById('__tagembed__font_family').value = liEl.getAttribute('data-value');
        for (let liEle of liEls)
            liEle.style.display = 'none';
    });
}
/*--End-- Manage Custom Font Family Dropdown*/
/*--Start--Get Customization Option*/
window.addEventListener ? window.addEventListener("load", __tagembed__getCustomizationOption, false) : window.attachEvent && window.attachEvent("onload", __tagembed__getCustomizationOption);
function __tagembed__getCustomizationOption() {
    /*Manage Customizaton Section Hide Show*/
    document.querySelector("#__tagembed__customization_section").style.display = "none";
    let widgetId = document.querySelector("#__tagembed__widgets").selectedOptions[0];
    widgetId = widgetId.value.split('#')[0];
    let __tagembed__toast = new TagembedToast;
    let formData = new FormData();
    formData.append('action', 'data');
    formData.append('widgetId', widgetId);
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__get_customization_option');
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
            __tagembed__manageCustomizationOptions(response.data);
            __tagembed__manageBlockAndUnblockSection(response.data.ThemeRule.inheritStyles);
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
/*--Start-- Manage Inherit Styles Customize Options */
function __tagembed__manageBlockAndUnblockSection(inheritStylesValue) {
    if (inheritStylesValue == "1") {
        document.querySelector("#__tagembed__inherit_styles_font_family").classList.add("__tagembed__inherit_styles_font_family");
        document.querySelector("#__tagembed__inherit_styles_auther_font_color").classList.add("__tagembed__inherit_styles_font_color");
        document.querySelector("#__tagembed__inherit_styles_font_color").classList.add("__tagembed__inherit_styles_font_color");
        document.querySelector("#__tagembed__inherit_styles_font_size").classList.add("__tagembed__inherit_styles_font_size");
    }
    if (inheritStylesValue == "0") {
        document.querySelector("#__tagembed__inherit_styles_font_family").classList.remove("__tagembed__inherit_styles_font_family");
        document.querySelector("#__tagembed__inherit_styles_auther_font_color").classList.remove("__tagembed__inherit_styles_font_color");
        document.querySelector("#__tagembed__inherit_styles_font_color").classList.remove("__tagembed__inherit_styles_font_color");
        document.querySelector("#__tagembed__inherit_styles_font_size").classList.remove("__tagembed__inherit_styles_font_size");
    }
}
function __tagembed__manageInheritStylesCustomizeOptions() {
    let __tagembed__show_is_ck = document.querySelector("#__tagembed__show_is_ck");
    if (__tagembed__show_is_ck.checked) {
        __tagembed__manageBlockAndUnblockSection("1");
    } else {
        __tagembed__manageBlockAndUnblockSection("0");
    }
}
/*--End-- Manage Inherit Styles Customize Options */
/*--Start-- Manage Customization Options*/
function __tagembed__manageCustomizationOptions(__tagembed__customizationsOptions) {
    document.querySelector("#__tagembed__personalization_id").value = __tagembed__customizationsOptions.Personalization.id;
    document.querySelector("#__tagembed__themeRule_id").value = __tagembed__customizationsOptions.ThemeRule.id;

    /*--Start-- Manage Layout Setting*/
    document.querySelector("#__tagembed__featured_popup").checked = false;
    document.querySelector("#__tagembed__direct_to_source").checked = false;
    document.querySelector("#__tagembed__none").checked = false;
    if (__tagembed__customizationsOptions.Personalization.postFeatured == 1)
        document.querySelector("#__tagembed__featured_popup").checked = true;
    if (__tagembed__customizationsOptions.Personalization.mobilePopup == 1)
        document.querySelector("#__tagembed__direct_to_source").checked = true;
    if (__tagembed__customizationsOptions.Personalization.postFeatured == 0 && __tagembed__customizationsOptions.Personalization.mobilePopup == 0)
        document.querySelector("#__tagembed__none").checked = true;
    document.querySelector("#__tagembed__total_noptd").value = __tagembed__customizationsOptions.ThemeRule.numberOfPosts;
    document.querySelector("#__tagembed__hide_top_ck").checked = false;
    if (__tagembed__customizationsOptions.Personalization.postText == 1)
        document.querySelector("#__tagembed__hide_top_ck").checked = true;
    document.querySelector("#__tagembed__ps").value = __tagembed__customizationsOptions.Personalization.padding;
    document.querySelector("#__tagembed__post_spacing_range_value_section").innerHTML = __tagembed__customizationsOptions.Personalization.padding;
    document.querySelector("#__tagembed__post_mw").value = __tagembed__customizationsOptions.Personalization.minimumPostWidth;
    document.querySelector("#__tagembed__post_width_range_value_section").innerHTML = __tagembed__customizationsOptions.Personalization.minimumPostWidth;
    document.querySelector("#__tagembed__columnCount").value = __tagembed__customizationsOptions.Personalization.columnCount;
    document.querySelector("#__tagembed__columnCountMobile").value = __tagembed__customizationsOptions.Personalization.columnCountMobile;
    /*--End-- Manage Layout Setting*/

    /*--Start-- Manage Card Setting*/
    document.querySelector("#__tagembed__fontColor").value = __tagembed__customizationsOptions.ThemeRule.fontColor;
    document.querySelector("#__tagembed__post_font_color_value_section").innerHTML = __tagembed__customizationsOptions.ThemeRule.fontColor;
    document.querySelector("#__tagembed__authorFontColor").value = __tagembed__customizationsOptions.ThemeRule.authorColor;
    document.querySelector("#__tagembed__author_font_color_value_section").innerHTML = __tagembed__customizationsOptions.ThemeRule.authorColor;
    document.querySelector("#__tagembed__cardColor").value = __tagembed__customizationsOptions.ThemeRule.cardColor;
    document.querySelector("#__tagembed__card_color_value_section").innerHTML = __tagembed__customizationsOptions.ThemeRule.cardColor;
    document.querySelector("#__tagembed__post_font_size").innerHTML = __tagembed__customizationsOptions.ThemeRule.fontSize;
    document.querySelector("#__tagembed__post_font_size_section").innerHTML = __tagembed__customizationsOptions.ThemeRule.fontSize;
    document.querySelector("#__tagembed__show_is_ck").checked = false;
    if (__tagembed__customizationsOptions.ThemeRule.inheritStyles == 1)
        document.querySelector("#__tagembed__show_is_ck").checked = true;
    document.querySelector("#__tagembed__show_so_ck").checked = false;
    if (__tagembed__customizationsOptions.ThemeRule.shareOption == 1)
        document.querySelector("#__tagembed__show_so_ck").checked = true;
    document.querySelector("#__tagembed__hide_c_ck").checked = false;
    if (__tagembed__customizationsOptions.ThemeRule.hideContent == 1)
        document.querySelector("#__tagembed__hide_c_ck").checked = true;
    document.querySelector("#__tagembed__show_ad_ck").checked = false;
    if (__tagembed__customizationsOptions.Personalization.postAuthor == 1)
        document.querySelector("#__tagembed__show_ad_ck").checked = true;
    document.querySelector("#__tagembed__show_date_ck").checked = false;
    if (__tagembed__customizationsOptions.Personalization.postTime == 1)
        document.querySelector("#__tagembed__show_date_ck").checked = true;
    document.querySelector("#__tagembed__font_family").value = __tagembed__customizationsOptions.ThemeRule.font;
    document.querySelector(".__tagembed__dd_first").innerHTML = `<img src="${__tagembed__plugin_url_for_js}assets/images/fonts/${__tagembed__customizationsOptions.ThemeRule.font}.png" alt="">`;
    document.querySelector("#__tagembed__linetrim").value = (__tagembed__customizationsOptions.ThemeRule.lineTrim == null) ? 0 : __tagembed__customizationsOptions.ThemeRule.lineTrim
    document.querySelector("#__tagembed__aspectimageratio").value = __tagembed__customizationsOptions.ThemeRule.aspectImageRatio;
    document.querySelector("#__tagembed__left_alignment").checked = false;
    document.querySelector("#__tagembed__center_alignment").checked = false;
    document.querySelector("#__tagembed__right_alignment").checked = false;
    if (__tagembed__customizationsOptions.ThemeRule.textAlignment == 'left')
        document.querySelector("#__tagembed__left_alignment").checked = true;
    if (__tagembed__customizationsOptions.ThemeRule.textAlignment == 'right')
        document.querySelector("#__tagembed__right_alignment").checked = true;
    if (__tagembed__customizationsOptions.ThemeRule.textAlignment == 'center' || __tagembed__customizationsOptions.ThemeRule.textAlignment == 'NULL')
        document.querySelector("#__tagembed__center_alignment").checked = true;
    document.querySelector("#__tagembed__square_curve").checked = false;
    document.querySelector("#__tagembed__rounded_corner").checked = false;
    document.querySelector("#__tagembed__circular_corner").checked = false;
    if (__tagembed__customizationsOptions.ThemeRule.cardCurve == 0)
        document.querySelector("#__tagembed__square_curve").checked = true;
    if (__tagembed__customizationsOptions.ThemeRule.cardCurve == 8)
        document.querySelector("#__tagembed__rounded_corner").checked = true;
    if (__tagembed__customizationsOptions.ThemeRule.cardCurve == 24)
        document.querySelector("#__tagembed__circular_corner").checked = true;
    document.querySelector("#__tagembed__light_theme").checked = false;
    document.querySelector("#__tagembed__dark_theme").checked = false;
    if (__tagembed__customizationsOptions.ThemeRule.colorType == 0)
        document.querySelector("#__tagembed__light_theme").checked = true;
    if (__tagembed__customizationsOptions.ThemeRule.colorType == 1)
        document.querySelector("#__tagembed__dark_theme").checked = true;
    /*--End-- Manage Card Setting*/

    /*--Start-- Manage Custom Css Setting*/
    document.querySelector("#__tagembed__custom_css").value = __tagembed__customizationsOptions.Personalization.css;
    /*--End-- Manage Custom Css Setting*/

    /*--Start-- Manage Footer Setting*/
    document.querySelector("#__tagembed__show_more").checked = false;
    document.querySelector("#__tagembed__auto_load").checked = false;
    document.querySelector("#__tagembed__showmore_autoload_none").checked = false;
    document.querySelector("#__tagembed__show_more_txt").value = __tagembed__customizationsOptions.Personalization.custom_lan_data.showMore;
    if (__tagembed__customizationsOptions.Personalization.loadMoreStatus == 1)
        document.querySelector("#__tagembed__show_more").checked = true;
    if (__tagembed__customizationsOptions.Personalization.autoScrollStatus == 1)
        document.querySelector("#__tagembed__auto_load").checked = true;
    if (__tagembed__customizationsOptions.Personalization.loadMoreStatus == 0 && __tagembed__customizationsOptions.Personalization.autoScrollStatus == 0)
        document.querySelector("#__tagembed__showmore_autoload_none").checked = true;
    if (__tagembed__customizationsOptions.Personalization.loadMoreStatus == 1) {
        document.querySelector("#__tagembed__show_more_text_sectction").style.display = "block";
    } else {
        document.querySelector("#__tagembed__show_more_text_sectction").style.display = "none";
    }
    /*--End-- Manage Footer Setting*/

    /*Manage Customizaton Section Hide Show*/
    document.querySelector("#__tagembed__customization_section").style.display = "flex";
}
/*--End-- Manage Customization Options*/
/*--End--Get Customization Option*/

/*--Start--Update Customization Option*/
function __tagembed__updateCustomizationOption(__tagembed__optionType) {
    let __tagembed__toast = new TagembedToast;
    let formData = new FormData();
    formData.append('personalizationId', document.querySelector("#__tagembed__personalization_id").value);
    formData.append('themeRuleId', document.querySelector("#__tagembed__themeRule_id").value);
    switch (__tagembed__optionType) {
        case 'footer':
            let __tagembed__show_more_txt = document.querySelector("#__tagembed__show_more_txt").value;
            let __tagembed__autoScrollStatusValue = 0;
            let __tagembed__showMoreValue = 0;
            if (document.querySelector("#__tagembed__show_more").checked) {
                __tagembed__showMoreValue = 1;
                __tagembed__autoScrollStatusValue = 0;
            }
            if (document.querySelector("#__tagembed__auto_load").checked) {
                __tagembed__showMoreValue = 0;
                __tagembed__autoScrollStatusValue = 1;
            }
            if (document.querySelector("#__tagembed__showmore_autoload_none").checked) {
                __tagembed__showMoreValue = 0;
                __tagembed__autoScrollStatusValue = 0;
            }
            /*Manage Form Data*/
            formData.append('loadMoreStatus', __tagembed__showMoreValue);
            formData.append('autoScrollStatus', __tagembed__autoScrollStatusValue);
            formData.append('showMoreTxt', __tagembed__show_more_txt);
            break;
        case 'layout':
            let __tagembed__total_numberOFPostToDisplay = document.querySelector("#__tagembed__total_noptd").value;
            let __tagembed__postSpacing = document.querySelector("#__tagembed__ps").value;
            let __tagembed__maximumPostWidth = document.querySelector("#__tagembed__post_mw").value;
            let __tagembed__columnCountDesktop = document.querySelector("#__tagembed__columnCount").value;
            let __tagembed__columnCountMobile = document.querySelector("#__tagembed__columnCountMobile").value;
            let __tagembed__hideTextOnlyPostCheckBoxValue = 0;
            let __tagembed__hideTextOnlyPost = document.querySelector("#__tagembed__hide_top_ck");
            if (__tagembed__hideTextOnlyPost.checked)
                __tagembed__hideTextOnlyPostCheckBoxValue = 1;
            let __tagembed__featurePopupCheckBoxValue = 0;
            if (document.querySelector("#__tagembed__featured_popup").checked)
                __tagembed__featurePopupCheckBoxValue = 1;
            let __tagembed__directToSourceCheckBoxValue = 0;
            if (document.querySelector("#__tagembed__direct_to_source").checked)
                __tagembed__directToSourceCheckBoxValue = 1;
            if (document.querySelector("#__tagembed__none").checked) {
                __tagembed__directToSourceCheckBoxValue = 0;
                __tagembed__featurePopupCheckBoxValue = 0;
            }
            /*Manage Form Data*/
            formData.append('numberOfPosts', __tagembed__total_numberOFPostToDisplay);
            formData.append('padding', __tagembed__postSpacing);
            formData.append('minimumPostWidth', __tagembed__maximumPostWidth);
            formData.append('columnCount', __tagembed__columnCountDesktop);
            formData.append('columnCountMobile', __tagembed__columnCountMobile);
            formData.append('postText', __tagembed__hideTextOnlyPostCheckBoxValue);
            formData.append('mobilePopup', __tagembed__directToSourceCheckBoxValue);
            formData.append('postFeatured', __tagembed__featurePopupCheckBoxValue);
            break;
        case 'card':
            let __tagembed__fontColor = document.querySelector("#__tagembed__fontColor").value;
            let __tagembed__authorFontColor = document.querySelector("#__tagembed__authorFontColor").value;
            let __tagembed__cardColor = document.querySelector("#__tagembed__cardColor").value;
            let __tagembed__fontSize = document.querySelector("#__tagembed__post_font_size").value;
            let __tagembed__font_family = document.querySelector("#__tagembed__font_family").value;
            let __tagembed__inheritStylesOptionCheckBoxValue = 0;
            let __tagembed__show_is_ck = document.querySelector("#__tagembed__show_is_ck");
            if (__tagembed__show_is_ck.checked)
                __tagembed__inheritStylesOptionCheckBoxValue = 1;
            let __tagembed__showShareOptionCheckBoxValue = 0;
            let __tagembed__show_so_ck = document.querySelector("#__tagembed__show_so_ck");
            if (__tagembed__show_so_ck.checked)
                __tagembed__showShareOptionCheckBoxValue = 1;
            let __tagembed__hideContentCheckBoxValue = 0;
            let __tagembed__hide_c_ck = document.querySelector("#__tagembed__hide_c_ck");
            if (__tagembed__hide_c_ck.checked)
                __tagembed__hideContentCheckBoxValue = 1;
            let __tagembed__showAuthorDetailsCheckBoxValue = 0;
            let __tagembed__show_ad_ck = document.querySelector("#__tagembed__show_ad_ck");
            if (__tagembed__show_ad_ck.checked)
                __tagembed__showAuthorDetailsCheckBoxValue = 1;
            let __tagembed__showDataCheckBoxValue = 0;
            let __tagembed__show_date_ck = document.querySelector("#__tagembed__show_date_ck");
            if (__tagembed__show_date_ck.checked)
                __tagembed__showDataCheckBoxValue = 1;
            /*New Card Style Data*/

            let __tagembed__linetrim = document.querySelector("#__tagembed__linetrim").value;
            let __tagembed__aspectImageRatio = document.querySelector("#__tagembed__aspectimageratio").value;
            if (document.querySelector("#__tagembed__left_alignment").checked)
                __tagembed__textAlignment = 'left';
            if (document.querySelector("#__tagembed__center_alignment").checked)
                __tagembed__textAlignment = 'center';
            if (document.querySelector("#__tagembed__right_alignment").checked)
                __tagembed__textAlignment = 'right';
            if (document.querySelector("#__tagembed__square_curve").checked)
                __tagembed__cardCurve = 0;
            if (document.querySelector("#__tagembed__rounded_corner").checked)
                __tagembed__cardCurve = 8;
            if (document.querySelector("#__tagembed__circular_corner").checked)
                __tagembed__cardCurve = 24;
            if (document.querySelector("#__tagembed__light_theme").checked)
                __tagembed__themeOption = 0;
            if (document.querySelector("#__tagembed__dark_theme").checked)
                __tagembed__themeOption = 1;
            /*Manage Form Data*/
            formData.append('inheritStyles', __tagembed__inheritStylesOptionCheckBoxValue);
            formData.append('fontColor', __tagembed__fontColor);
            formData.append('authorColor', __tagembed__authorFontColor);
            formData.append('cardColor', __tagembed__cardColor);
            formData.append('fontSize', __tagembed__fontSize);
            formData.append('font', __tagembed__font_family);
            formData.append('shareOption', __tagembed__showShareOptionCheckBoxValue);
            formData.append('hideContent', __tagembed__hideContentCheckBoxValue);
            formData.append('postAuthor', __tagembed__showAuthorDetailsCheckBoxValue);
            formData.append('postTime', __tagembed__showDataCheckBoxValue);
            formData.append('lineTrim', __tagembed__linetrim);
            formData.append('aspectImageRatio', __tagembed__aspectImageRatio);
            formData.append('textAlignment', __tagembed__textAlignment);
            formData.append('cardCurve', __tagembed__cardCurve);
            formData.append('colorType', __tagembed__themeOption);
            break;
        case 'other':
            let __tagembed__customCss = document.querySelector("#__tagembed__custom_css").value;
            /*Manage Form Data*/
            formData.append('css', __tagembed__customCss);
            break;
        default:
            return __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
            break;
    }
    /*Get And Manage Widget Id*/
    let widgetId = document.querySelector("#__tagembed__widgets").selectedOptions[0];
    widgetId = widgetId.value.split('#')[0];
    formData.append('action', 'data');
    formData.append('widgetId', widgetId);
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
    formData.append('__tagembed__ajax_action', '__tagembed__update_' + __tagembed__optionType + '_customization_option');
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
            if (response.data.hasOwnProperty("message"))
                __tagembed__toast.success({message: response.data.message, position: '__tagembed__is-top-right'});
        } else {
            if (response.hasOwnProperty("message")) {
                __tagembed__toast.danger({message: response.message, position: '__tagembed__is-top-right'});
            } else {
                __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
            }
        }
    }).catch((error) => {
        console.log(error);
        __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
    });
}
/*--End--Update Customization Option*/

/*--Start--Manage Customize Menue Hide Show*/
function __tagembed__manageCustomizeMenueHideShow(__tagembed__customize_menue) {
    /*Section*/
    let __tagembed__layoutSettings = document.querySelector("#__tagembed__layout_settings");
    let __tagembed__cardSettings = document.querySelector("#__tagembed__card_settings");
    let __tagembed__otherSettings = document.querySelector("#__tagembed__other_settings");
    let __tagembed__footer_settings = document.querySelector("#__tagembed__footer_settings");
    /*Menue*/
    let __tagembed__layoutSettingsMenue = document.querySelector("#__tagembed__layout_settings_menue");
    let __tagembed__cardSettingsMenue = document.querySelector("#__tagembed__card_settings_menue");
    let __tagembed__otherSettingsMenue = document.querySelector("#__tagembed__other_settings_menue");
    let __tagembed__footer_settings_menue = document.querySelector("#__tagembed__footer_settings_menue");
    switch (__tagembed__customize_menue) {
        case 'ls':
            __tagembed__cardSettingsMenue.classList.remove("__tagembed__active");
            __tagembed__cardSettings.style.display = "none";

            __tagembed__otherSettingsMenue.classList.remove("__tagembed__active");
            __tagembed__otherSettings.style.display = "none";

            __tagembed__footer_settings_menue.classList.remove("__tagembed__active");
            __tagembed__footer_settings.style.display = "none";

            __tagembed__layoutSettingsMenue.classList.add("__tagembed__active");
            __tagembed__layoutSettings.style.display = "block";
            break;
        case 'cs':
            __tagembed__layoutSettingsMenue.classList.remove("__tagembed__active");
            __tagembed__layoutSettings.style.display = "none";

            __tagembed__otherSettingsMenue.classList.remove("__tagembed__active");
            __tagembed__otherSettings.style.display = "none";

            __tagembed__footer_settings_menue.classList.remove("__tagembed__active");
            __tagembed__footer_settings.style.display = "none";

            __tagembed__cardSettingsMenue.classList.add("__tagembed__active");
            __tagembed__cardSettings.style.display = "block";
            break;
        case 'os':
            __tagembed__layoutSettingsMenue.classList.remove("__tagembed__active");
            __tagembed__layoutSettings.style.display = "none";

            __tagembed__cardSettingsMenue.classList.remove("__tagembed__active");
            __tagembed__cardSettings.style.display = "none";

            __tagembed__footer_settings_menue.classList.remove("__tagembed__active");
            __tagembed__footer_settings.style.display = "none";

            __tagembed__otherSettingsMenue.classList.add("__tagembed__active");
            __tagembed__otherSettings.style.display = "block";
            break;
        case 'fo':
            __tagembed__layoutSettingsMenue.classList.remove("__tagembed__active");
            __tagembed__layoutSettings.style.display = "none";

            __tagembed__cardSettingsMenue.classList.remove("__tagembed__active");
            __tagembed__cardSettings.style.display = "none";

            __tagembed__otherSettingsMenue.classList.remove("__tagembed__active");
            __tagembed__otherSettings.style.display = "none";

            __tagembed__footer_settings_menue.classList.add("__tagembed__active");
            __tagembed__footer_settings.style.display = "block";
            break;
        default:
            let __tagembed__toast = new TagembedToast;
            __tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
            break;
    }
}
/*--End--Manage Customize Menue Hide Show*/
/*--Start-- Show Range Input Value*/
function __tagembed__showRangeInputValue(__tagembed__range_val, __tagembed__range_value_Show_section_id) {
    let __tagembed__rangeValueShowSection = document.getElementById(__tagembed__range_value_Show_section_id);
    if (__tagembed__rangeValueShowSection)
        __tagembed__rangeValueShowSection.innerHTML = __tagembed__range_val;
}
/*--End-- Show Range Input Value*/
/*--Start-- Show Range Input Value*/
function __tagembed__showColorInputValue(__tagembed__color_val, __tagembed__color_value_Show_section_id) {
    let __tagembed__colorValueShowSection = document.getElementById(__tagembed__color_value_Show_section_id);
    if (__tagembed__colorValueShowSection)
        __tagembed__colorValueShowSection.innerHTML = __tagembed__color_val;
}
/*--End-- Show Range Input Value*/
/*--Start-- Show Theme Type*/
let __tagembed__light_theme_option = document.querySelector("#__tagembed__light_theme");
if (__tagembed__light_theme_option) {
    __tagembed__light_theme_option.addEventListener('click', function (event) {
        let cardColor = document.getElementById("__tagembed__cardColor").value = '#fafafa';
        __tagembed__showColorInputValue(cardColor, '__tagembed__card_color_value_section');
        let fontColor = document.getElementById("__tagembed__fontColor").value = '#000000';
        __tagembed__showColorInputValue(fontColor, '__tagembed__post_font_color_value_section');
        let authorColor = document.getElementById("__tagembed__authorFontColor").value = '#000000';
        __tagembed__showColorInputValue(authorColor, '__tagembed__author_font_color_value_section');
    });
}
let __tagembed__dark_theme_option = document.querySelector("#__tagembed__dark_theme");
if (__tagembed__dark_theme_option) {
    __tagembed__dark_theme_option.addEventListener('click', function (event) {
        let cardColor = document.getElementById("__tagembed__cardColor").value = '#000000';
        __tagembed__showColorInputValue('#000000', '__tagembed__card_color_value_section');
        let fontColor = document.getElementById("__tagembed__fontColor").value = '#fafafa';
        __tagembed__showColorInputValue(fontColor, '__tagembed__post_font_color_value_section');
        let authorColor = document.getElementById("__tagembed__authorFontColor").value = '#fafafa';
        __tagembed__showColorInputValue(authorColor, '__tagembed__author_font_color_value_section');
    });
}
/*--End-- Show Theme Type*/

/*--Start-- Mange Show More Text Section Hide Show*/
function __tagembed__manageShowMoreTextSectionHideShow(status) {
    document.querySelector("#__tagembed__show_more_text_sectction").style.display = "none";
    if (status == "show")
        document.querySelector("#__tagembed__show_more_text_sectction").style.display = "block";
}
/*--End-- Mange Show More Text Section Hide Show*/