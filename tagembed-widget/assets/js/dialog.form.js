function __tagembed__dialog_form(option = {popupSize:"__tagembed__popup_sm", title:"Action", form:{method:'', cancelButtonText:'', cancelButtonClass:'', buttonText:'', buttonClass:''}, inputs:[], action:null, cancelAction:null}){
    let  elemId = '__tagembed__dialog_form_id_';
    let id = (option.form.id) ? option.form.id : '';
    let name = (option.form.name) ? option.form.name : '';
    let method = (option.form.method) ? option.form.method : 'post';
    let cancelButtonText = (option.form.cancelButtonText) ? option.form.cancelButtonText : 'Cancel';
    let cancelButtonClass = (option.form.cancelButtonClass) ? option.form.cancelButtonClass : '';
    let buttonText = (option.form.buttonText) ? option.form.buttonText : 'Submit';
    let buttonClass = (option.form.buttonClass) ? option.form.buttonClass : '';
    let elemHTML = `<div id="${elemId}" class="__tagembed__overlay">`;
    elemHTML = `${elemHTML}<div  class="__tagembed__popupwrap ${option.popupSize}">`;
    elemHTML = `${elemHTML}<div class="__tagembed__popupinn"><div class="__tagembed__header">`;
    elemHTML = `${elemHTML}<h2>${option.title}</h2>`;
    elemHTML = `${elemHTML}</div>`;
    if (option.inputs instanceof Array && option.inputs.length > 0) {
        elemHTML = `${elemHTML}<hr class="__tagembed__horizontaborder" />`;
    }
    elemHTML = `${elemHTML}<form method="${method}" autocomplete="off"><div class="__tagembed__formwbody">`;
    if (option.inputs instanceof Array && option.inputs.length > 0) {
        let count = 0;
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
            elemHTML = `${elemHTML} <div id="${tagembedformwrowId}" class="__tagembed__formwrow ${otherClass}" style="${type == "hidden" ? "margin-bottom:0px" : ''}">`;
            if (label)
                elemHTML = `${elemHTML}<label>${label} </label>`;
            if (!["textarea", "file", "select", "checkbox", "radio"].includes(type)) {
                elemHTML = `${elemHTML} <input id="${id}" ${jsFunction}  name="${name}" value ="${value}" type ="${type}" placeholder="${placeholder}"/>`;

            } else if (["textarea"].includes(type)) {
                elemHTML = `${elemHTML} <textarea id="${id}" ${jsFunction} name="${name}" value ="${value}" type="${type}" placeholder="${placeholder}" rows="5"></textarea>`;
            } else if (["select"].includes(type)) {
                elemHTML = `${elemHTML} <select id="${id}" ${jsFunction} name="${name}">`;
                for (let index in input.options)
                    elemHTML = `${elemHTML} <option value="${input.options[index].value}"> ${input.options[index].name} </option>`;
                elemHTML = `${elemHTML}'</select>`;
            } else if (["checkbox"].includes(type)) {
                elemHTML = `${elemHTML} <input id="${id}" ${jsFunction} type="${type}" name="${name}" value ="${value}"/>`;
            } else if (["radio"].includes(type)) {
                for (let index in input.options) {
                    elemHTML = `${elemHTML} <div>`;
                    if (input.options[index].label) {
                        elemHTML = `${elemHTML} <label style="margin-right:5px;margin-left: 5px;">${input.options[index].label} </label></div>`;
                    }
                    let checked = (input.options[index].checked) ? 'checked' : '';
                    elemHTML = `${elemHTML} <input id="${id}"  ${jsFunction} name="${name}" type="${type}" value="${input.options[index].value}" ${checked}/>`;
                }
            }

            if (searchBtn)
                elemHTML = `${elemHTML} <i class="fas fa-search" ${jsSearchBtnFunction} id="__tagembed__input_search_${searchBtn}"  aria-hidden="true"></i>`;

            if (extraTag)
                elemHTML = `${elemHTML} <span class="__tagembed__extratag" id="__tagembed__${extraTag}"></span>`;
            if (inputLoader)
                elemHTML = `${elemHTML} <span id="__tagembed__${inputLoader}" class="__tagembed__inputLoader"><img src="${__tagembed__plugin_url_for_js}assets/images/loader.gif" alt="loader"></span>`;
            elemHTML = `${elemHTML} <span id="__tagembed__${name}_error" class = "__tagembed__error" ></span> </div>`;
            count++;
        }
    }
    elemHTML = `${elemHTML}</div>`;
    elemHTML = `${elemHTML}<div class ="__tagembed__btnwrap">`;
    elemHTML = `${elemHTML}<button type="submit" class="__tagembed__okaybtn ${buttonClass}" id="${elemId}OkayButton">${buttonText}</button>`;
    elemHTML = `${elemHTML}<button class="__tagembed__cancelbtn ${cancelButtonClass}" id="${elemId}CancelButton">${cancelButtonText}</button>`;
    elemHTML = `${elemHTML}</form></div></div>`;
    let elem = document.createElement('div');
    elem.innerHTML = elemHTML;
    elem.querySelector('#' + elemId + 'CancelButton').onclick = function () {
        if (option["cancelAction"])
            option["cancelAction"]();
        document.querySelector('#' + elemId).remove();
    };
    let formEl = elem.querySelector('form');
    formEl.addEventListener("submit", function (event) {
        event.preventDefault();
        option["action"](event, new FormData(formEl));
    });
    document.body.appendChild(elem.firstChild);
}

