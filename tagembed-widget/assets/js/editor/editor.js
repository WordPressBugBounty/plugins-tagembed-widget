jQuery(function (editor, blocks, element, components, i18n, data, compose) {
    var El = element.createElement;
    const { RichText, InspectorControls } = editor;
    const { registerBlockType } = blocks;
    const { Fragment } = element;
    const { IconButton, TextControl, ToggleControl, Panel, PanelBody, PanelRow } = components;
    const { select, withSelect, withDispatch } = data;
    const { compos } = compose;
    const iconEl = El("div", {
        className: "__tagembed__editor_logo"
    }, El("img", {
        src: "data:image/png;base64,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",
        alt: "Tagembed",
        height: "28",
        width: "28"
    }));
    registerBlockType('tagembed-block/tagembed', {
        title: 'Tagembed Widget',
        description: 'Embed Tagembed social media aggregator into WordPress posts with just one click!',
        category: 'widgets',
        icon: iconEl,
        keywords: ['tagembed widget'],
        supports: { align: true },
        attributes: {
            __shortCode: { default: null },
            __widgetId: { default: null },
            __height: { default: '500px' },
            __width: { default: '100%' },
            __url: { default: 'https://widget.tagembed.com/' },
            __preview: { default: 'hide' },
            __shortCodeErrorMsg: { default: 'hide' }
        },
        edit:
            function (props) {
                function __updateShortCode(event) {
                    var __tagembed__short_code = document.getElementById("__tagembed__short_code");
                    var __tagembed__shortCodeData = __tagembed__short_code.value.trim();
                    props.setAttributes({ __shortCode: __tagembed__shortCodeData });
                    var widgetData = event.target.value;
                    widgetData = widgetData.trim();
                    widgetData = widgetData.replace('[', "");
                    widgetData = widgetData.replace(']', "");
                    widgetData = widgetData.split(' ');
                    var __widgetId = widgetData[2];
                    props.setAttributes({ __widgetId: __widgetId });
                    if (widgetData[3]) {
                        var ___height = widgetData[3].replace('height=', "");
                        props.setAttributes({ __height: ___height });
                    }
                    if (widgetData[4]) {
                        var ___width = widgetData[4].replace('width=', "");
                        props.setAttributes({ ___width: ___width });
                    }
                    props.setAttributes({ __shortCodeErrorMsg: "hide" });
                    /*var __widgetId = event.target.value.slice(19, -1);*/
                }
                function __hidePreview() {
                    var parent = jQuery(event.target).closest(".is-selected");
                    parent.children(".__tagembed__tagembed-preview").hide();
                    parent.children(".__tagembed__tagembed-editor-main-div").show();
                    props.setAttributes({ __preview: "hide" });
                    props.setAttributes({ __shortCodeErrorMsg: "hide" });
                }
                function __showPreview(event) {
                    let regex = /^\d+(px|%|)$/;
                    let extraParameter = (props.attributes.__width !== '' && !regex.test(props.attributes.__width)) || (props.attributes.__height !== '' && !regex.test(props.attributes.__height));
                    if (!extraParameter && props.attributes.__widgetId !== '' && props.attributes.__widgetId !== null && typeof (props.attributes.__widgetId) != "undefined" && !isNaN(props.attributes.__widgetId)) {
                        var parent = jQuery(event.target).closest(".is-selected");
                        parent.children(".__tagembed__tagembed-preview").show();
                        parent.children(".__tagembed__tagembed-editor-main-div").hide();
                        props.setAttributes({ __preview: "show" });
                        props.setAttributes({ __shortCodeErrorMsg: "hide" });
                    } else {
                        props.setAttributes({ __shortCodeErrorMsg: "show" });
                    }
                }
                return [
                    El(Fragment, {},
                        El(InspectorControls, {},
                            El(PanelBody, { title: 'Widget Settings', initialOpen: true },
                                El(PanelRow, {}, El(TextControl, {
                                    label: 'Height Px (Format : 500px)', type: 'text', onChange: (value) => {
                                        props.setAttributes({ __height: value });
                                    }, value: props.attributes.__height
                                })),
                                El(PanelRow, {}, El(TextControl, {
                                    label: 'Width % (Format : 100%)', type: 'text', onChange: (value) => {
                                        props.setAttributes({ __width: value });
                                    }, value: props.attributes.__width
                                })),
                            ),
                        ),
                    ),
                    El("div", { className: ((props.attributes.__preview == "hide") ? "__tagembed__tagembed-preview-show" : "__tagembed__tagembed-preview-hide") + " container-fluid __tagembed__tagembed-editor-main-div" },
                        El("div", { className: "tagembed-row __tagembed__tagembed-editor-widget-main-div" },
                            El("div", { className: "tagembed-md-12" },
                                El("div", { className: "tagembed-row" },
                                    El("div", { className: "tagembed-md-12 __tagembed__tagembed-editor-heading" },
                                        El("strong", null, "Tagembed Widget")),
                                    El("div", { className: "tagembed-md-12 __tagembed__tagembed-editor-size-section" },
                                        El("div", { className: "__tagembed__form-size-input" },
                                            El(TextControl, {
                                                label: 'Height px (Format : 500px)', class: "__tagembed__form-input", type: 'text', onChange: (value) => {
                                                    props.setAttributes({ __height: value });
                                                }, value: props.attributes.__height
                                            })
                                        ),
                                        El("div", { className: "__tagembed__form-size-input" },
                                            El(TextControl, {
                                                label: 'Width % (Format : 100%)', class: "__tagembed__form-input", type: 'text', onChange: (value) => {
                                                    props.setAttributes({ __width: value });
                                                }, value: props.attributes.__width
                                            })
                                        )),
                                    El("div", { className: "tagembed-12 __tagembed__form-wrap __tagembed__form-inline" },
                                        El("input", { type: "text", id: "__tagembed__short_code", className: "__tagembed__form-input __tagembed__b-0 z-index10", placeholder: "Enter Widget Shortcode", value: props.attributes.__shortCode, onChange: __updateShortCode }),
                                        El("button", { className: "__tagembed__btnStyle __tagembed__tagembed-preview-btn h100", onClick: __showPreview, }, "</> Embed"),
                                        El("span", { className: ((props.attributes.__shortCodeErrorMsg == "hide") ? "__tagembed__short-code-error-hide" : "__tagembed__short-code-error-show") }, "Please Enter Valid Short Code.",),
                                    ),
                                )))),
                    El("button", { className: ((props.attributes.__preview == "show") ? "__tagembed__tagembed-preview-show" : "__tagembed__tagembed-preview-hide") + " __tagembed__tagembed-close-preview-btn tagembed-preview", onClick: __hidePreview },
                        El("svg", { height: '18px', width: '18px', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                            El("path", {
                                d: 'M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z', fill: '#ffffff'
                            }))),
                    El("div", {
                        className: ((props.attributes.__preview == "show") ? "__tagembed__tagembed-preview-show" : "__tagembed__tagembed-preview-hide") + " row __tagembed__tagembed-preview",
                    }, El("div", {
                        className: "tagembed-md-12"
                    }, El("iframe", { className: "__tagembed__tagembed-editor-iframe", src: props.attributes.__url + props.attributes.__widgetId, allowfullscreen: "allowfullscreen", frameborder: "0", title: "Tagembed-widget", border: "0", height: props.attributes.__height, width: props.attributes.__width }
                    ))),
                ]
            },
        save: function (props) {
            if (props.attributes.__widgetId !== '' && props.attributes.__widgetId !== null && typeof (props.attributes.__widgetId) != "undefined") {
                return El("div", { className: "tagembed-widget", style: "width:" + props.attributes.__width + ";height:" + props.attributes.__height + ";overflow: auto;", "data-widget-id": props.attributes.__widgetId, "view-url": "https://widget.tagembed.com/" + props.attributes.__widgetId });
                /*return El("div", {className: "tagembed-container", style: "width:" + props.attributes.__width + ";height:" + props.attributes.__height + " !important;overflow: auto;"},
                 *El("div", {className: "tagembed-socialwall tagembed-analystic", style: "width:100%;height:100%;", "data-wall-id": props.attributes.__widgetId}));
                 */
            } else {
                return;
            }
        },
    });
}(wp.blockEditor, wp.blocks, wp.element, wp.components, wp.i18n, wp.data, wp.compose));
