<!--Start-- Call Tagembed Chat And Plugin Version Script After Login And Register-->
<?php if (!empty($__tagembed__user_details)) : ?>
	<script type="text/javascript">
		/*--Start-- Manage Intercom Chat And Setting Data */
		window.addEventListener ? window.addEventListener("load", __tagembed__getAndManageIntercomSetting, false) : window.attachEvent && window.attachEvent("onload", __tagembed__getAndManageIntercomSetting);
		function __tagembed__getAndManageIntercomSetting() { 
			let formData = new FormData();
			formData.append('action', 'data');
			formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
			formData.append('__tagembed__ajax_action', '__tagembed__get_and_manage_intercom_chat_setting');
			fetch(__tagembed__ajax_url, {method: 'POST', headers: {'x-requested-with': 'XMLHttpRequest'}, body: formData,
			}).then(response => {
				return response.json();
			}).then(response => {
				if (response.status == true) {
					/*--Start--Manage Intercom Setting Data*/
					window.intercomSettings = {
						api_base: "https://api-iam.intercom.io",
						app_id: "t8e1b7uq",
						email: response.data.email,
						user_id: response.data.userId,
						user_hash: response.data.userHash,
						billing_email: response.data.billingEmail,
						name: response.data.name,
						created_at: response.data.created,
						user_type: response.data.type,
						plan: response.data.plan,
						active_plan: response.data.activePlan,
						product: response.data.product,
						active_product: response.data.activeProduct
					};
					/*--End--Manage Intercom Setting Data*/
					/*--Start--Manage Intercom Calling Script*/
					var w = window;
					var ic = w.Intercom;
					if (typeof ic === "function") {
						ic('reattach_activator');
						ic('update', w.intercomSettings);
					} else {
						var d = document;
						var i = function () {
							i.c(arguments);
						};
						i.q = [];
						i.c = function (args) {
							i.q.push(args);
						};
						w.Intercom = i;
						var l = function () {
							var s = d.createElement('script');
							s.type = 'text/javascript';
							s.async = true;
							s.src = 'https://widget.intercom.io/widget/t8e1b7uq';
							var x = d.getElementsByTagName('script')[0];
							x.parentNode.insertBefore(s, x);
						};
						if (document.readyState === 'complete') {
							l();
						} else if (w.attachEvent) {
							w.attachEvent('onload', l);
						} else {
							w.addEventListener('load', l, false);
						}
					}
					/*--End--Manage Intercom Calling Script*/
				}
			}).catch((error) => {
				console.log(error);
			});
		}
		/*--End-- Manage Intercom Chat And Setting Data */
		/*--Start-- Manage Hide And Show plugin Upgrade Message*/
		window.addEventListener ? window.addEventListener("load", __tagembed__plugin_version, false) : window.attachEvent && window.attachEvent("onload", __tagembed__plugin_version);
		function __tagembed__plugin_version() {
			let __tagembed__toast = new TagembedToast;
			let formData = new FormData();
			formData.append('action', 'data');
			formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
			formData.append('__tagembed__ajax_action', '__tagembed__plugin_version');
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
					if (response.data.installedPluginVersion != response.data.livePluginVersion) {
						let elemHTML = `<div class="__tagembed__popupwrap __tagembed__popup_md">`;
						elemHTML = `${elemHTML}<button onclick="__tagembed__hide_plugin_upgrade_message();" type="button" class="__tagembed__closebtn"></button>`;
						elemHTML = `${elemHTML}<div class="__tagembed__popupinn">`;
						elemHTML = `${elemHTML}<div class="__tagembed__header"><h2>Update Plugin For Free</h2></div>`;
						elemHTML = `${elemHTML}<hr class="__tagembed__horizontaborder">`;
						elemHTML = `${elemHTML}<div class="__tagembed__formwbody">`;
						elemHTML = `${elemHTML}<div class="__tagembed__formwrow">`;
						elemHTML = `${elemHTML}<p><strong> Note : </strong> There is a new version of Tagembed Widget available. <strong> ${response.data.livePluginVersion} </strong> is a recommended Update For Performance Improvements. </p>`;
						elemHTML = `${elemHTML}</div></div>`;
						elemHTML = `${elemHTML}<div class = "__tagembed__btnwrap text-center">`;
						elemHTML = `${elemHTML}<a style="background: #d63638;" href="${response.data.pluginUpgradeURL}" class="__tagembed__okaybtn">Update Plugin</a>`;
						elemHTML = `${elemHTML}</div></div></div>`;
						document.getElementById("__tagembed__plugin_upgrade_message").innerHTML = elemHTML;
					}
				} else {
					__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
				}
			}).catch((error) => {
				console.log(error);
				__tagembed__toast.danger({message: "Something went wrong. Please try after sometime", position: '__tagembed__is-top-right'});
			});
		}
		function __tagembed__hide_plugin_upgrade_message() {
			let __tagembed__plugin_upgrade_message = document.querySelector("#__tagembed__plugin_upgrade_message")
			__tagembed__plugin_upgrade_message.style.display = "none";
		}
		/*--End-- Manage Hide And Show plugin Upgrade Message*/
	</script>
<?php endif; ?>
<!--End-- Call Tagembed Chat And Plugin Version Script After Login And Register-->
</div>
</div>
<!--Start-- Manage Next And Back Button On All Pages  -->
<div id="__tagembed__next_and_back_link_main_section"></div>
<!--End-- Manage Next And Back Button On All Pages  -->
</div>
</div>
<!-- Other Default WordPress Css -->
<style> #footer-thankyou {font-style: normal !important;}</style>
<?php if (4	!=	$__tagembed__active_menue_id) : ?>
	<style> body{min-height: auto!important;} </style>
<?php endif; ?>
<?php if (6	==	$__tagembed__active_menue_id) : ?>
	<script>
		/*--Start-- Manage Embed Accordion Section*/
		let __tagembed__accordionItem = document.getElementsByClassName('__tagembed__accordionItem');
		let __tagembed__accordionItemHeading = document.getElementsByClassName('__tagembed__accordionItemHeading');
		for (i = 0; i < __tagembed__accordionItemHeading.length; i++)
			__tagembed__accordionItemHeading[i].addEventListener('click', __tagembed__toggleAccodionSection, false);
		function __tagembed__toggleAccodionSection() {
			let __tagembed__accordionSectionClass = this.parentNode.className;
			for (i = 0; i < __tagembed__accordionItem.length; i++)
				__tagembed__accordionItem[i].className = '__tagembed__accordionItem __tagembed__close';
			if (__tagembed__accordionSectionClass == '__tagembed__accordionItem __tagembed__close')
				this.parentNode.className = '__tagembed__accordionItem __tagembed__open';
		}
		/*--End-- Manage Embed Accordion Section*/
	</script>
<?php endif; ?>
<script>
	/*--Start-- Manage And Generate Next And Back Link In Footer*/
	function __tagembed__manageNextAndBackButon() {
		let __tagembed__nextLink = null;
		let __tagembed__backLink = null;
		let __tagembed__nextAndBackLinkHtml = "";
		let __tagembed__next_and_back_link_main_section = document.querySelector("#__tagembed__next_and_back_link_main_section");
		__tagembed__next_and_back_link_main_section.innerHTML = "";
		let __tagembed__nextAndBackLinkSectionStyle = "block";
		let __tagembed__widgets_count = "<?php	echo	esc_html($__tagembed__widgets_count);	?>";
		let __tagembed__active_menue_id = "<?php	echo	esc_html($__tagembed__active_menue_id);	?>";
		if (__tagembed__widgets_count == 0) {
			__tagembed__nextAndBackLinkSectionStyle = "none";
		}
		switch (__tagembed__active_menue_id) {
			case "1" :
				__tagembed__nextLink = "2";
				__tagembed__backLink = null;
				break;
			case "2" :
				__tagembed__nextLink = "3";
				__tagembed__backLink = "1";
				__tagembed__nextAndBackLinkSectionStyle = "none"; /* Show In tagembed.feed.script.js */
				break;
			case "3" :
				__tagembed__nextLink = "4";
				__tagembed__backLink = "2";
				break;
			case "4" :
				__tagembed__nextLink = "5";
				__tagembed__backLink = "3";
				break;
			case "5" :
				__tagembed__nextLink = "6";
				__tagembed__backLink = "4";
				break;
			case "6" :
				__tagembed__nextLink = null;
				__tagembed__backLink = "5";
				break;
		}
		/* Manage Next And Back */
		if (__tagembed__nextLink != null || __tagembed__backLink != null) {
			__tagembed__nextAndBackLinkHtml = `${__tagembed__nextAndBackLinkHtml}<div class="__tagembed__foot_nextprevious" id="__tagembed__next_and_back_link_section" style="display:${__tagembed__nextAndBackLinkSectionStyle}">`;
			__tagembed__nextAndBackLinkHtml = `${__tagembed__nextAndBackLinkHtml}<div class="__tagembed__footnp_inn">`;
			if (__tagembed__backLink != null) {
				__tagembed__nextAndBackLinkHtml = `${__tagembed__nextAndBackLinkHtml}<button class="__tagembed__btn __tagembed__backbtn" onclick="__tagembed__menus(${__tagembed__backLink});"> <i class="fas fa-angle-left"></i> Back </button>`;
			}
			if (__tagembed__nextLink != null) {
				__tagembed__nextAndBackLinkHtml = `${__tagembed__nextAndBackLinkHtml}<button class="__tagembed__btn" onclick="__tagembed__menus(${__tagembed__nextLink});">Next <i class="fas fa-angle-right"></i> </button>`;
			}
			__tagembed__nextAndBackLinkHtml = `${__tagembed__nextAndBackLinkHtml}</div></div>`;
			__tagembed__next_and_back_link_main_section.innerHTML = __tagembed__nextAndBackLinkHtml;
		}
	}
	window.onload = __tagembed__manageNextAndBackButon();
	/*--End-- Manage And Generate Next And Back Link In Footer*/
</script>
<!--Start--Clarity Tracking Code -->
<script type="text/javascript">
	document.addEventListener('DOMContentLoaded', function () {
		(function (c, l, a, r, i, t, y) {
			c[a] = c[a] || function () {
				(c[a].q = c[a].q || []).push(arguments)
			};
			t = l.createElement(r);
			t.async = 1;
			t.src = "https://www.clarity.ms/tag/" + i;
			y = l.getElementsByTagName(r)[0];
			y.parentNode.insertBefore(t, y);
		})(window, document, "clarity", "script", "jz1bviq7un");
		var __tagembed__userEmailIdForClarity = "<?php	echo	esc_html($__tagembed__active_widget_user_email_id);	?>";
		clarity("set", "userEmail", __tagembed__userEmailIdForClarity);
		clarity("set", "type", "wordpress");
	});
</script>
<!--End--Clarity Tracking Code -->