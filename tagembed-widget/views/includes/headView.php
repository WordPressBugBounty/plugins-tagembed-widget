<?php
wp_enqueue_script('__jquery');
wp_enqueue_script('__tagembed__custom-js', TAGEMBED_PLUGIN_URL . '/assets/js/tagembed.common.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
wp_enqueue_script('__script-widget-js', TAGEMBED_PLUGIN_URL . '/assets/js/widget/tagembed.widget.script.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
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
    var __tagembed__ajax_call_nones = "<?php echo esc_html(wp_create_nonce('__tagembed__ajax_call_security_nones'));?>";
    var __tagembed__ajax_url = "<?php echo esc_html(admin_url('admin-ajax.php'));?>";
    var __tagembed__plugin_server_url = "<?php echo esc_html(TAGEMBED_PLUGIN_SERVER_URL);?>";
    var __tagembed__network_already_exist_auth = [];
    var __tagembed__plugin_url_for_js = "<?php echo esc_html(TAGEMBED_PLUGIN_URL);?>";
    var __tagembed__plugin_react_url = "<?php echo esc_html(TAGEMBED_PLUGIN_REACT_URL);?>";
    var __tagembed__user_id = "<?php echo esc_html(!empty($__tagembed__user_details->userId) ? $__tagembed__user_details->userId : '');?>";
</script>
<!--Start--Check User Access Token-->
<?php if (!empty($__tagembed__user_details)) :?>
    <script>
        window.addEventListener ? window.addEventListener("load", __tagembed__check_user_token, false) : window.attachEvent && window.attachEvent("onload", __tagembed__check_user_token);
        function __tagembed__check_user_token() {
    	let __tagembed__toast = new TagembedToast;
    	__tagembed__open_loader();
    	let formData = new FormData();
    	formData.append('action', 'data');
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
        /*--End-- Check User Token*/
    </script>
<?php endif;?>
<!--End--Check User Access Token-->
<div id="__tagembed__plugin_upgrade_message"></div>
<div class="__tagembed__container">
    <div class="__tagembed__row">
	<div class="__tagembed__col __tagembed__col_12 __tagembed__widget">
	    <div class="__tagembed__widget_inn">