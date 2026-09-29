/* The message is still written with text nodes only, so no markup can come out of it.
   `highlight` just wraps those exact substrings in <strong> built the same DOM way. */
function __tagembed__confirmDialogMessage(target, message, highlight) {
    message = String(message);
    let parts = Array.isArray(highlight) ? highlight.filter(function (part) { return part && String(part).length; }) : [];
    if (!parts.length) {
        target.textContent = message;
        return;
    }
    let pattern = parts.map(function (part) { return String(part).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|');
    let pieces = message.split(new RegExp('(' + pattern + ')', 'g'));
    pieces.forEach(function (piece) {
        if (!piece) return;
        if (parts.indexOf(piece) !== -1) {
            let strongEl = document.createElement('strong');
            strongEl.textContent = piece;
            target.appendChild(strongEl);
        } else {
            target.appendChild(document.createTextNode(piece));
        }
    });
}
function __tagembed__confirmDialog(option, action) {
    let title = (option.title) ? option.title : 'Action';
    let message = (option.message) ? option.message : 'Are you sure? '
    let cancelButtonText = (option.cancelButtonText) ? option.cancelButtonText : 'Cancel';
    let cancelButtonClass = (option.cancelButtonClass) ? option.cancelButtonClass : '';
    let buttonText = (option.buttonText) ? option.buttonText : 'Delete';
    let buttonClass = (option.buttonClass) ? option.buttonClass : '';
    let typeClass = '';
    let icon = '';
    let type = (option.type) ? option.type : 'info';
    if (type == 'info') {
        typeClass = '__tagembed__bg-info';
        icon = "fa-info";
    } else if (type == 'warning') {
        typeClass = '__tagembed__bg-warning';
        icon = "fa-exclamation";
    } else if (type == 'success') {
        typeClass = '__tagembed__bg-success';
        icon = "fa-check";
    } else if (type == 'danger') {
        typeClass = '__tagembed__bg-danger';
        icon = "fa-times";
    }

    /* The dialog is built with DOM methods. The title and the message are assigned through
       textContent, so no markup can be produced from them. */
    let elemId = 'tagembedConfirmDialog';
    let overlay = document.createElement('div');
    overlay.setAttribute('id', elemId);
    overlay.className = '__tagembed__overlay';

    let popupWrap = document.createElement('div');
    popupWrap.className = '__tagembed__popupwrap';
    overlay.appendChild(popupWrap);

    let iconArea = document.createElement('div');
    iconArea.className = '__tagembed__iconarea ' + typeClass;
    let iconEl = document.createElement('i');
    iconEl.className = 'fa ' + icon;
    iconEl.setAttribute('aria-hidden', 'true');
    iconArea.appendChild(iconEl);
    popupWrap.appendChild(iconArea);

    let horizontalBorder = document.createElement('hr');
    horizontalBorder.className = '__tagembed__horizontaborder';
    popupWrap.appendChild(horizontalBorder);

    let titleWrap = document.createElement('div');
    titleWrap.className = '__tagembed__title';
    let titleEl = document.createElement('h2');
    titleEl.textContent = title;
    titleWrap.appendChild(titleEl);
    popupWrap.appendChild(titleWrap);

    let descWrap = document.createElement('div');
    descWrap.className = '__tagembed__desc';
    let descEl = document.createElement('p');
    if (option.align) descEl.style.textAlign = option.align;
    __tagembed__confirmDialogMessage(descEl, message, option.highlight);
    descWrap.appendChild(descEl);
    popupWrap.appendChild(descWrap);

    let btnWrap = document.createElement('div');
    btnWrap.className = '__tagembed__btnwrap';
    popupWrap.appendChild(btnWrap);

    let okayButton = document.createElement('button');
    okayButton.className = '__tagembed__okaybtn ' + buttonClass + ' ' + typeClass;
    okayButton.setAttribute('id', elemId + 'OkayButton');
    okayButton.textContent = buttonText;
    btnWrap.appendChild(okayButton);

    let cancelButton = document.createElement('button');
    cancelButton.className = '__tagembed__cancelbtn ' + buttonClass;
    cancelButton.setAttribute('id', elemId + 'CancelButton');
    cancelButton.textContent = 'Cancel';
    btnWrap.appendChild(cancelButton);

    cancelButton.onclick = function () {
        document.querySelector('#' + elemId).remove();
    };
    okayButton.onclick = function () {
        document.querySelector('#' + elemId).remove();
        (action)();
    };
    document.body.appendChild(overlay);
}
