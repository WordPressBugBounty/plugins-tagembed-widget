<?php
if (!defined('ABSPATH')) :
	exit;
endif;
wp_enqueue_script('jquery');
/* --Start-- DOMPurify : Third Party HTML Sanitizer. Loaded only on this plugin's own screen. */
wp_enqueue_script('__tagembed__domPurifyJs', TAGEMBED_PLUGIN_URL . '/assets/js/vendor/purify.js', [], '3.4.13', true);
/* DOMPurify 3.4.13. Official release, used unmodified and byte for byte
   identical to https://github.com/cure53/DOMPurify/blob/3.4.13/dist/purify.js
   The sanitizer is a UMD bundle. If another plugin has left an AMD or CommonJS loader on
   the page, the bundle would register there instead of on window, so those globals are
   hidden for the moment it runs and restored immediately afterwards. */
wp_add_inline_script('__tagembed__domPurifyJs', '(function(w){w.__tagembed__umd={d:w.define,m:w.module,e:w.exports};try{delete w.define;delete w.module;delete w.exports;}catch(e){w.define=undefined;w.module=undefined;w.exports=undefined;}})(window);', 'before');
wp_add_inline_script('__tagembed__domPurifyJs', '(function(w){w.__tagembed__DOMPurify=w.DOMPurify;var s=w.__tagembed__umd;if(s){if(s.d!==undefined){w.define=s.d;}if(s.m!==undefined){w.module=s.m;}if(s.e!==undefined){w.exports=s.e;}delete w.__tagembed__umd;}})(window);', 'after');
/* --End-- DOMPurify */
wp_enqueue_script('__tagembed__custom-js', TAGEMBED_PLUGIN_URL . '/assets/js/tagembed.common.js', ['jquery', 'wp-escape-html', '__tagembed__domPurifyJs'], TAGEMBED_PLUGIN_VERSION, true);
wp_enqueue_script('__tagembed__script-widget-js', TAGEMBED_PLUGIN_URL . '/assets/js/widget/tagembed.widget.script.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
$__tagembed__account_page = true; /* Use : Check User Token Valid Or Not */
$__tagembed__user_details = ___tagembed__user();
$__tagembed__active_widget_user_id = ___tagembed__activeWidgetUser();
$__tagembed__active_widget_user_name = !empty($__tagembed__user_details->name) ? $__tagembed__user_details->name : '';
$__tagembed__active_widget_user_email_id = !empty($__tagembed__user_details->email) ? $__tagembed__user_details->email : '';
$__tagembed__menus = ___tagembed__menus();
$__tagembed__active_menue_id = null;
$__tagembed__active_widget_id = ___tagembed__activeWidget();
$__tagembed__active_widget_id = !empty($__tagembed__active_widget_id) ? $__tagembed__active_widget_id : 0;
$__tagembed__widgets = ___tagembed__widgets();
$__tagembed__widgets_count = count($__tagembed__widgets); /* Use In Next And Back Button */
/* $__tagembed__collaborators = __tagembed__collaborator($__tagembed__user_details->userId); */
?>
<script type="text/javascript">
	var __tagembed__ajax_call_nones = <?php echo wp_json_encode((string) wp_create_nonce('__tagembed__ajax_call_security_nones')); ?>;
	var __tagembed__ajax_url = <?php echo wp_json_encode((string) admin_url('admin-ajax.php')); ?>;
	var __tagembed__plugin_server_url = <?php echo wp_json_encode((string) TAGEMBED_PLUGIN_SERVER_URL); ?>;
	var __tagembed__network_already_exist_auth = [];
	var __tagembed__plugin_url_for_js = <?php echo wp_json_encode((string) TAGEMBED_PLUGIN_URL); ?>;
	var __tagembed__plugin_react_url = <?php echo wp_json_encode((string) TAGEMBED_PLUGIN_REACT_URL); ?>;
	var __tagembed__user_id = <?php echo wp_json_encode(!empty($__tagembed__user_details->userId) ? (string) $__tagembed__user_details->userId : ''); ?>;
</script>
<!--Start--Check User Access Token-->
<?php if (!empty($__tagembed__user_details)) : ?>
	<script>
		window.addEventListener ? window.addEventListener("load", __tagembed__check_user_token, false) : window.attachEvent && window.attachEvent("onload", __tagembed__check_user_token);

		function __tagembed__check_user_token() {
			let __tagembed__toast = new TagembedToast;
			__tagembed__open_loader();
			let formData = new FormData();
			formData.append('action', 'tagembed_data');
			formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
			formData.append('__tagembed__ajax_action', '__tagembed__check_user_token');
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
				if (response.status === true) {
					if (!response.data.head.status && response.data.head.code == 401)
						location.reload();
				} else {
					if (response.hasOwnProperty("message")) {
						__tagembed__toast.danger({
							message: response.message,
							position: '__tagembed__is-top-right'
						});
					} else {
						__tagembed__toast.danger({
							message: "Something went wrong. Please try after sometime",
							position: '__tagembed__is-top-right'
						});
					}
				}
			}).catch((error) => {
				console.log(error);
				__tagembed__close_loader();
				__tagembed__toast.danger({
					message: "Something went wrong. Please try after sometime",
					position: '__tagembed__is-top-right'
				});
			});
		}
		/*--End-- Check User Token*/
	</script>
<?php endif; ?>
<!--End--Check User Access Token-->

<!--Start-- Manage Upgrade Plan Popup -->
<script>
	async function __tagembed__upgradePlan() {
		let overlay = document.querySelector("#__tagembed__upgrade_plan_overlay");
		if (overlay) overlay.style.display = 'block';
		let formData = new FormData();
		formData.append('action', 'tagembed_data');
		formData.append('__tagembed__ajax_call_nones', __tagembed__ajax_call_nones);
		formData.append('__tagembed__ajax_action', '__tagembed__check_plan_premium_feature');
		__tagembed__open_loader();
		let toast = new TagembedToast();
		try {
			let response = await fetch(__tagembed__ajax_url, {
				method: 'POST',
				headers: {
					'x-requested-with': 'XMLHttpRequest'
				},
				body: formData,
			});

			let data = await response.json();
			__tagembed__close_loader();
			if (data.status === true) {
				if (data.data.premiumFeatureStatus === false) {
					if (overlay) overlay.style.display = 'none';
					return false;
				}
				let elemHTML = `
			    <div id="__tagembed__upgrade_plan_popup" class="__tagembed__popupwrap __tagembed__popup_xl">
				<button onclick="__tagembed__hide_upgrade_plan_close();" type="button" class="__tagembed__closebtn"></button>
				<div class="__tagembed__popupinn">
				<div class="__tagembed__header">
				<h2>You've Discovered a Premium Feature!</h2>
				</div>
				<hr class="__tagembed__horizontaborder">
				<div class="__tagembed__formwbody">
				<div class="__tagembed__formwrow">
				<p>
				You've created a <strong>premium feed</strong>, which is not available in your free plan.
				To continue displaying content from this network, please upgrade your plan.
				</p>
				</div>
				</div>
				<div class="__tagembed__btnwrap text-center">
				<a style="background:#3b6de5;" onclick="__tagembed__menus('9')" class="__tagembed__okaybtn">
				Upgrade Plan
				</a>
				</div>
				<div style="background:#fdecee; border-top:1px solid #c3c4c7; padding:14px 18px; display:flex; justify-content:space-between; align-items:center;">
				<div style="display:flex; flex-direction:column;">
				<span style="font-size:16px; font-weight:700;">Prefer Not to Upgrade?</span>
				<span style="font-size:14px;">
				You can delete the (<span style="color:#6f42c1;"> Premium Network </span>) feed and choose a network included in the free plan.
				</span>
				</div>
				<button onclick="__tagembed__menus('2')" 
				style="background:#ffffff; border:1px solid #dcdcdc; padding:8px 16px; cursor:pointer;">
				Delete Feed
				</button>
				</div>
				</div>
				</div>
				`;
				document.getElementById("__tagembed__plan_upgrade_message").innerHTML = elemHTML;
				return true;
			} else {
				toast.danger({
					message: data.message || "Something went wrong. Please try after sometime",
					position: '__tagembed__is-top-right'
				});
				return false;
			}
		} catch (error) {
			console.error(error);
			__tagembed__close_loader();
			toast.danger({
				message: "Something went wrong. Please try after sometime",
				position: '__tagembed__is-top-right'
			});
			return false;
		}
	}

	function __tagembed__hide_upgrade_plan_close() {
		let __tagembed__upgrade_plan_popup = document.querySelector("#__tagembed__upgrade_plan_popup");
		if (__tagembed__upgrade_plan_popup) __tagembed__upgrade_plan_popup.style.display = 'none';
		let __tagembed__upgrade_plan_overlay = document.querySelector("#__tagembed__upgrade_plan_overlay");
		if (__tagembed__upgrade_plan_overlay) __tagembed__upgrade_plan_overlay.style.display = 'none';
	}
</script>
<!--End-- Manage Upgrade Plan Popup -->

<div id="__tagembed__plugin_upgrade_message"></div>
<div class="__tagembed__container">
	<div class="__tagembed__row">
		<div class="__tagembed__col __tagembed__col_12 __tagembed__widget">
			<div class="__tagembed__widget_inn">