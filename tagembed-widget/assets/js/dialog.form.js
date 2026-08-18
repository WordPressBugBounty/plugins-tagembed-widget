/*--Start--Attach A Plugin Defined Handler Without Using An Inline Event Attribute*/
/* The callers pass a fixed, plugin authored string such as onkeyup="__tagembed__searchGoogleLocation();".
   It never contains user data. It is resolved to the real function and bound with addEventListener,
   so no inline event attribute and no eval is used. */
function __tagembed__dialogBindHandler(element, handlerString) {
    if (!element || !handlerString) return;
    let __tagembed__matched = String(handlerString).match(/^\s*on([a-zA-Z]+)\s*=\s*"\s*([A-Za-z0-9_$]+)\s*\(\s*\)\s*;?\s*"\s*$/);
    if (__tagembed__matched) {
        let __tagembed__eventName = __tagembed__matched[1].toLowerCase();
        let __tagembed__functionName = __tagembed__matched[2];
        element.addEventListener(__tagembed__eventName, function (event) {
            if (typeof window[__tagembed__functionName] === "function") {
                window[__tagembed__functionName].call(this, event);
            }
        });
    }
}
/*--End--Attach A Plugin Defined Handler Without Using An Inline Event Attribute*/
function __tagembed__dialog_form(option = { popupSize: "__tagembed__popup_sm", title: "Action", form: { method: '', cancelButtonText: '', cancelButtonClass: '', buttonText: '', buttonClass: '' }, inputs: [], action: null, cancelAction: null }) {
    let elemId = '__tagembed__dialog_form_id_';
    let method = (option.form.method) ? option.form.method : 'post';
    let cancelButtonText = (option.form.cancelButtonText) ? option.form.cancelButtonText : 'Cancel';
    let cancelButtonClass = (option.form.cancelButtonClass) ? option.form.cancelButtonClass : '';
    let buttonText = (option.form.buttonText) ? option.form.buttonText : 'Submit';
    let buttonClass = (option.form.buttonClass) ? option.form.buttonClass : '';

    /* The whole dialog is built with DOM methods. Every untrusted value is assigned through
       textContent or setAttribute, so no markup is ever produced from it. */
    let overlay = document.createElement('div');
    overlay.setAttribute('id', elemId);
    overlay.className = '__tagembed__overlay';

    let popupWrap = document.createElement('div');
    popupWrap.className = '__tagembed__popupwrap ' + (option.popupSize ? option.popupSize : '');
    overlay.appendChild(popupWrap);

    let popupInn = document.createElement('div');
    popupInn.className = '__tagembed__popupinn';
    popupWrap.appendChild(popupInn);

    let header = document.createElement('div');
    header.className = '__tagembed__header';
    let heading = document.createElement('h2');
    heading.textContent = (option.title === undefined || option.title === null) ? '' : String(option.title);
    header.appendChild(heading);
    popupInn.appendChild(header);

    let hasInputs = (option.inputs instanceof Array && option.inputs.length > 0);
    if (hasInputs) {
        let horizontalBorder = document.createElement('hr');
        horizontalBorder.className = '__tagembed__horizontaborder';
        popupInn.appendChild(horizontalBorder);
    }

    let formEl = document.createElement('form');
    formEl.setAttribute('method', method);
    formEl.setAttribute('autocomplete', 'off');
    popupInn.appendChild(formEl);

    let formBody = document.createElement('div');
    formBody.className = '__tagembed__formwbody';
    formEl.appendChild(formBody);

    if (hasInputs) {
        for (let input of option.inputs) {
            let id = (input.id) ? input.id : '';
            let label = (input.label) ? input.label : '';
            let name = (input.name) ? input.name : '';
            let type = (input.type) ? input.type : '';
            let value = (input.value) ? input.value : '';
            let otherClass = (input.type === 'checkbox' || input.type === 'radio') ? ' __tagembed__checkboxrow' : '';
            let placeholder = (input.placeholder) ? input.placeholder : '';
            let jsFunction = (input.jsFunction) ? input.jsFunction : '';
            let jsSearchBtnFunction = (input.jsSearchBtnFunction) ? input.jsSearchBtnFunction : '';
            let extraTag = (input.extraTag) ? input.extraTag : '';
            let searchBtn = (input.searchBtn) ? input.searchBtn : '';
            let inputLoader = (input.inputLoader) ? input.inputLoader : '';
            let tagembedformwrowId = (input.tagembedformwrowId) ? input.tagembedformwrowId : '';

            let row = document.createElement('div');
            row.setAttribute('id', tagembedformwrowId);
            row.className = '__tagembed__formwrow ' + otherClass;
            row.setAttribute('style', type == "hidden" ? "margin-bottom:0px" : '');
            formBody.appendChild(row);

            if (label) {
                let labelEl = document.createElement('label');
                labelEl.textContent = label + ' ';
                row.appendChild(labelEl);
            }

            if (!["textarea", "file", "select", "checkbox", "radio"].includes(type)) {
                let field = document.createElement('input');
                field.setAttribute('id', id);
                field.setAttribute('name', name);
                field.setAttribute('value', value);
                field.setAttribute('type', type);
                field.setAttribute('placeholder', placeholder);
                __tagembed__dialogBindHandler(field, jsFunction);
                row.appendChild(field);
            } else if (["textarea"].includes(type)) {
                let field = document.createElement('textarea');
                field.setAttribute('id', id);
                field.setAttribute('name', name);
                field.setAttribute('value', value);
                field.setAttribute('type', type);
                field.setAttribute('placeholder', placeholder);
                field.setAttribute('rows', '5');
                __tagembed__dialogBindHandler(field, jsFunction);
                row.appendChild(field);
            } else if (["select"].includes(type)) {
                let field = document.createElement('select');
                field.setAttribute('id', id);
                field.setAttribute('name', name);
                __tagembed__dialogBindHandler(field, jsFunction);
                for (let index in input.options) {
                    let optionEl = document.createElement('option');
                    optionEl.setAttribute('value', input.options[index].value);
                    optionEl.textContent = ' ' + input.options[index].name + ' ';
                    field.appendChild(optionEl);
                }
                row.appendChild(field);
            } else if (["checkbox"].includes(type)) {
                let field = document.createElement('input');
                field.setAttribute('id', id);
                field.setAttribute('type', type);
                field.setAttribute('name', name);
                field.setAttribute('value', value);
                __tagembed__dialogBindHandler(field, jsFunction);
                row.appendChild(field);
            } else if (["radio"].includes(type)) {
                for (let index in input.options) {
                    let optionWrap = document.createElement('div');
                    row.appendChild(optionWrap);
                    if (input.options[index].label) {
                        let optionLabel = document.createElement('label');
                        optionLabel.setAttribute('style', 'margin-right:5px;margin-left: 5px;');
                        optionLabel.textContent = input.options[index].label + ' ';
                        optionWrap.appendChild(optionLabel);
                    }
                    let field = document.createElement('input');
                    field.setAttribute('id', id);
                    field.setAttribute('name', name);
                    field.setAttribute('type', type);
                    field.setAttribute('value', input.options[index].value);
                    if (input.options[index].checked) field.setAttribute('checked', 'checked');
                    __tagembed__dialogBindHandler(field, jsFunction);
                    row.appendChild(field);
                }
            }

            if (searchBtn) {
                let searchIcon = document.createElement('i');
                searchIcon.className = 'fas fa-search';
                searchIcon.setAttribute('id', '__tagembed__input_search_' + searchBtn);
                searchIcon.setAttribute('aria-hidden', 'true');
                __tagembed__dialogBindHandler(searchIcon, jsSearchBtnFunction);
                row.appendChild(searchIcon);
            }

            if (extraTag) {
                let extraTagEl = document.createElement('span');
                extraTagEl.className = '__tagembed__extratag';
                extraTagEl.setAttribute('id', '__tagembed__' + extraTag);
                row.appendChild(extraTagEl);
            }

            if (inputLoader) {
                let loaderSpan = document.createElement('span');
                loaderSpan.setAttribute('id', '__tagembed__' + inputLoader);
                loaderSpan.className = '__tagembed__inputLoader';
                let loaderImg = document.createElement('img');
                loaderImg.setAttribute('src', __tagembed__plugin_url_for_js + 'assets/images/loader.gif');
                loaderImg.setAttribute('alt', 'loader');
                loaderSpan.appendChild(loaderImg);
                row.appendChild(loaderSpan);
            }

            let errorSpan = document.createElement('span');
            errorSpan.setAttribute('id', '__tagembed__' + name + '_error');
            errorSpan.className = '__tagembed__error';
            row.appendChild(errorSpan);
        }
    }

    let btnWrap = document.createElement('div');
    btnWrap.className = '__tagembed__btnwrap';
    formEl.appendChild(btnWrap);

    let okayButton = document.createElement('button');
    okayButton.setAttribute('type', 'submit');
    okayButton.className = '__tagembed__okaybtn ' + buttonClass;
    okayButton.setAttribute('id', elemId + 'OkayButton');
    okayButton.textContent = buttonText;
    btnWrap.appendChild(okayButton);

    let cancelButton = document.createElement('button');
    cancelButton.className = '__tagembed__cancelbtn ' + cancelButtonClass;
    cancelButton.setAttribute('id', elemId + 'CancelButton');
    cancelButton.textContent = cancelButtonText;
    btnWrap.appendChild(cancelButton);

    cancelButton.onclick = function () {
        if (option["cancelAction"])
            option["cancelAction"]();
        document.querySelector('#' + elemId).remove();
    };
    formEl.addEventListener("submit", function (event) {
        event.preventDefault();
        option["action"](event, new FormData(formEl));
    });
    document.body.appendChild(overlay);
}
