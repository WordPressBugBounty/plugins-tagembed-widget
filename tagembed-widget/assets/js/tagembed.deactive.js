window.onload = function () {
    var __tagembed__plugin_deactivate_btn = document.querySelector('[data-slug="tagembed-widget"] .deactivate a');
    if (__tagembed__plugin_deactivate_btn) {
        __tagembed__plugin_deactivate_btn.addEventListener('click', function (event) {
            event.preventDefault();
            let elemHTML = `<div class="__tagembed__popupwrap __tagembed__popup_md">`;
            elemHTML = `${elemHTML} <button onclick="__tagembed__hidePluginDeactivePopup();" type="button" class="__tagembed__closebtn"></button>`;
            elemHTML = `${elemHTML} <div class="__tagembed__popupinn">`;
            elemHTML = `${elemHTML} <div class="__tagembed__header"><h2>Feedback</h2></div>`;
            elemHTML = `${elemHTML} <hr class="__tagembed__horizontaborder">`;
            elemHTML = `${elemHTML} <div class="__tagembed__formwbody">`;
            elemHTML = `${elemHTML} <div class="__tagembed__formwrow">`;
            elemHTML = `${elemHTML} <div class="__tagembed__formwrow  __tagembed__checkboxrow __tagembed__mbzero" >`;
            elemHTML = `${elemHTML} <label for="__tagembed__pluginDeactivateReason1">I found a better plugin</label> `;
            elemHTML = `${elemHTML} <input id="__tagembed__pluginDeactivateReason1" onclick="__tagembed__pluginDeactivateReason(1);"  type="radio" name="__tagembed__pluginDeactivateReason" value="I found a better plugin"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div id="__tagembed__betterPluginDiv" class="__tagembed__formwrow" style="display:none;margin-left: 25px;">`;
            elemHTML = `${elemHTML} <input  type="text" id="__tagembed__better_plugin_input" name="__tagembed__betterPluginInputInput"  placeholder="What's the plugin's name?"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div class="__tagembed__formwrow  __tagembed__checkboxrow __tagembed__mbzero">`;
            elemHTML = `${elemHTML} <label for="__tagembed__pluginDeactivateReason2">I only needed the plugin for a short period</label> `;
            elemHTML = `${elemHTML} <input id="__tagembed__pluginDeactivateReason2" onclick="__tagembed__pluginDeactivateReason(2);"  type="radio" name="__tagembed__pluginDeactivateReason" value="I only needed the plugin for a short period"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div  class="__tagembed__formwrow  __tagembed__checkboxrow __tagembed__mbzero">`;
            elemHTML = `${elemHTML} <label for="__tagembed__pluginDeactivateReason3">The plugin broke my site</label> `;
            elemHTML = `${elemHTML} <input id="__tagembed__pluginDeactivateReason3" onclick="__tagembed__pluginDeactivateReason(3);"  type="radio" name="__tagembed__pluginDeactivateReason" value="The plugin broke my site"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div class="__tagembed__formwrow  __tagembed__checkboxrow __tagembed__mbzero">`;
            elemHTML = `${elemHTML} <label for="__tagembed__pluginDeactivateReason4">I no longer need the plugin</label> `;
            elemHTML = `${elemHTML} <input id="__tagembed__pluginDeactivateReason4" onclick="__tagembed__pluginDeactivateReason(4);"  type="radio" name="__tagembed__pluginDeactivateReason" value="I no longer need the plugin"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div  class="__tagembed__formwrow  __tagembed__checkboxrow __tagembed__mbzero">`;
            elemHTML = `${elemHTML} <label for="__tagembed__pluginDeactivateReason5">The plugin suddenly stopped working</label> `;
            elemHTML = `${elemHTML} <input id="__tagembed__pluginDeactivateReason5" onclick="__tagembed__pluginDeactivateReason(5);"  type="radio" name="__tagembed__pluginDeactivateReason" value="The plugin suddenly stopped working"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div  class="__tagembed__formwrow  __tagembed__checkboxrow __tagembed__mbzero">`;
            elemHTML = `${elemHTML} <label for="__tagembed__pluginDeactivateReason6">It's a temporary deactivation. I'm just debugging an issue</label> `;
            elemHTML = `${elemHTML} <input id="__tagembed__pluginDeactivateReason6" onclick="__tagembed__pluginDeactivateReason(6);"  type="radio" name="__tagembed__pluginDeactivateReason" value="It is a temporary deactivation. I am just debugging an issue"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div class="__tagembed__formwrow  __tagembed__checkboxrow __tagembed__mbzero">`;
            elemHTML = `${elemHTML} <label for="__tagembed__pluginDeactivateReason7">Other</label> `;
            elemHTML = `${elemHTML} <input id="__tagembed__pluginDeactivateReason7" onclick="__tagembed__pluginDeactivateReason(7);" type="radio" name="__tagembed__pluginDeactivateReason" value="Other"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div id="__tagembed__otherReasonDiv" class="__tagembed__formwrow" style="display:none;margin-left: 25px;">`;
            elemHTML = `${elemHTML} <input id="__tagembed__other_reason_input"  type="text" name="__tagembed__OtherReasonInput"  placeholder="Kindly Tell Us The Reason So We Can Improve"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} </div></div>`;
            elemHTML = `${elemHTML} <div class = "__tagembed__btnwrap text-center">`;
            elemHTML = `${elemHTML} <button id="__tagembed__pluginDeactivateBtn" onclick="__tagembed__deactivatePlugin();" class="__tagembed__okaybtn __tagembed__bg-danger">Skip & Deactivate</button>`;
            elemHTML = `${elemHTML} <button class="__tagembed__okaybtn" onclick="__tagembed__hidePluginDeactivePopup();">Cencel</button>`;
            elemHTML = `${elemHTML} </div></div></div>`;
            let __tagembed__deactivatePopupNode = document.createElement('div');
            __tagembed__deactivatePopupNode.setAttribute("id", "__tagembed__plugin_deactivate_popup");
            __tagembed__deactivatePopupNode.setAttribute("class", "__tagembed__overlay");
            __tagembed__deactivatePopupNode.innerHTML = elemHTML;
            document.body.appendChild(__tagembed__deactivatePopupNode);
        });
    }
}
function __tagembed__hidePluginDeactivePopup() {
    let __tagembed__plugin_deactivate_popup = document.querySelector("#__tagembed__plugin_deactivate_popup");
    __tagembed__plugin_deactivate_popup.remove();
}
function __tagembed__pluginDeactivateReason(__tagembed__pluginDeactivateReason) {
    document.querySelector("#__tagembed__other_reason_input").value = "";
    document.querySelector("#__tagembed__better_plugin_input").value = "";
    let __tagembed__pluginDeactivateBtn = document.querySelector("#__tagembed__pluginDeactivateBtn");
    __tagembed__pluginDeactivateBtn.innerHTML = "Submit & Deactivate";
    let __tagembed__betterPluginDiv = document.querySelector("#__tagembed__betterPluginDiv");
    __tagembed__betterPluginDiv.style.display = "none";
    let __tagembed__otherReasonDiv = document.querySelector("#__tagembed__otherReasonDiv");
    __tagembed__otherReasonDiv.style.display = "none";
    if (__tagembed__pluginDeactivateReason == 7)
        __tagembed__otherReasonDiv.style.display = "block";
    if (__tagembed__pluginDeactivateReason == 1)
        __tagembed__betterPluginDiv.style.display = "block";
}
function __tagembed__deactivatePlugin() {
    __tagembed__open_loader();
    let __tagembed__ajax_call_url = window.location.href;
    __tagembed__ajax_call_url = __tagembed__ajax_call_url.replace("plugins.php", "admin-ajax.php");
    let __tagembed__other_reason_input = document.querySelector("#__tagembed__other_reason_input").value;
    let __tagembed__better_plugin_input = document.querySelector("#__tagembed__better_plugin_input").value;
    let __tagembed__pluginDeactivateReason = document.querySelector('input[name="__tagembed__pluginDeactivateReason"]:checked');
    if (__tagembed__pluginDeactivateReason) {
        __tagembed__pluginDeactivateReason = __tagembed__pluginDeactivateReason.value;
    } else {
        __tagembed__pluginDeactivateReason = "";
    }
    let formData = new FormData();
    formData.append('action', 'data');
    formData.append('__tagembed__ajax_action', '__tagembed__plugin_deactivate');
    formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_security_nones_object.__tagembed__ajax_call_security_nones);
    formData.append('betterPlugin', __tagembed__better_plugin_input);
    formData.append('otherReason', __tagembed__other_reason_input);
    formData.append('pluginDeactivateReason', __tagembed__pluginDeactivateReason);
    fetch(__tagembed__ajax_call_url, {
        method: 'POST',
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        if (response.status == true) {
            location.reload();
        } else {
            __tagembed__close_loader();
            console.log(error);
        }
    }).catch((error) => {
        __tagembed__close_loader();
        console.log(error);
    });
}
