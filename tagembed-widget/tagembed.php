<?php

/**
 * Plugin Name:       Tagembed Widget
 * Plugin URI:        https://tagembed.com/
 * Description:       Display Facebook feed, Instagram feed, Twitter feed, YouTube Videos and more social feeds from 15+ social networks on any page, posts or widgets using shortcode. Beautifully clean, customizable, and responsive Social Media Feed Widget Plugin for WordPress.
 * Version:           6.1
 * Author:            Tagembed
 * Author URI:        https://tagembed.com/
 */
if (!defined('WPINC')) :
	die;
endif;
/* --Start-- Create Constant */
!defined('TAGEMBED_PLUGIN_VERSION') && define('TAGEMBED_PLUGIN_VERSION', '6.1');
!defined('TAGEMBED_PLUGIN_DIR_PATH') && define('TAGEMBED_PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));
!defined('TAGEMBED_PLUGIN_URL') && define('TAGEMBED_PLUGIN_URL', plugin_dir_url(__FILE__));
!defined('TAGEMBED_PLUGIN_REDIRECT_URL') && define('TAGEMBED_PLUGIN_REDIRECT_URL', get_admin_url(null, 'admin.php?page='));

!defined('TAGEMBED_PLUGIN_API_URL') && define('TAGEMBED_PLUGIN_API_URL', 'https://api.tagembed.com/app/');
!defined('TAGEMBED_PLUGIN_SERVER_URL') && define('TAGEMBED_PLUGIN_SERVER_URL', 'https://api.tagembed.com/app/');

!defined('TAGEMBED_PLUGIN_REACT_URL') && define('TAGEMBED_PLUGIN_REACT_URL', 'https://widget.tagembed.com/');
!defined('TAGEMBED_PLUGIN_CALL_BACK_URL') && define('TAGEMBED_PLUGIN_CALL_BACK_URL', admin_url() . 'admin.php?page=tagembed');
/* --End-- Create Constant */
/* --Start--Include Files */
require_once TAGEMBED_PLUGIN_DIR_PATH . 'helper/helper.php';
/* --End--Include Files */
/* --Start-- Add Js And Css */
function tagembed_plugin_scripts_css()
{
	wp_enqueue_script('__tagembed__embbedJs', TAGEMBED_PLUGIN_REACT_URL . 'embed.min.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
	if (is_admin()) :
		/* CSS */
		wp_enqueue_style('__tagembed__commonCss', TAGEMBED_PLUGIN_URL . '/assets/css/common.css', '', TAGEMBED_PLUGIN_VERSION);
		wp_enqueue_style('__tagembed__toastCss', TAGEMBED_PLUGIN_URL . '/assets/css/toast.css', '', TAGEMBED_PLUGIN_VERSION);
		wp_enqueue_style('__tagembed__confirmDialogCss', TAGEMBED_PLUGIN_URL . '/assets/css/confirm_dialog.css', '', TAGEMBED_PLUGIN_VERSION);
		wp_enqueue_style('__tagembed__tagembedloaderCss', TAGEMBED_PLUGIN_URL . '/assets/css/loader.css', '', TAGEMBED_PLUGIN_VERSION);
		wp_enqueue_style('__tagembed__popupCss', TAGEMBED_PLUGIN_URL . '/assets/css/styles.css', '', TAGEMBED_PLUGIN_VERSION);
		wp_enqueue_style('__tagembed__editorCss', TAGEMBED_PLUGIN_URL . '/assets/css/editor/editor.css', '', TAGEMBED_PLUGIN_VERSION);
		/* JS */
		wp_enqueue_script('__tagembed__toastJs', TAGEMBED_PLUGIN_URL . '/assets/js/toast.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
		wp_enqueue_script('__tagembed__confirmDialogJs', TAGEMBED_PLUGIN_URL . '/assets/js/confirm_dialog.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
		wp_enqueue_script('__tagembed__tagemedLoaderJs', TAGEMBED_PLUGIN_URL . '/assets/js/loader.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
		wp_localize_script('__tagembed__tagemedLoaderJs', '__tagembed__pluginLoaderImageUrlObj', ['__tagembed__pluginLoaderImageUrl' => TAGEMBED_PLUGIN_URL]);
		wp_enqueue_script('__tagembed__deactive-js', TAGEMBED_PLUGIN_URL . '/assets/js/tagembed.deactive.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
		$__tagembed__ajax_call_security_nones = wp_create_nonce('__tagembed__ajax_call_security_nones');
		wp_localize_script('__tagembed__deactive-js', '__tagembed__ajax_call_security_nones_object', ['__tagembed__ajax_call_security_nones' => $__tagembed__ajax_call_security_nones]);
		wp_enqueue_script('__tagembed__tagembedDialogFormJs', TAGEMBED_PLUGIN_URL . '/assets/js/dialog.form.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
		/* --Start-- Gutenberge */
		if (!function_exists('register_block_type')) :
			return;
		else :
			wp_register_script('__editor-js', TAGEMBED_PLUGIN_URL . '/assets/js/editor/editor.js', ['wp-block-editor', 'wp-blocks', 'wp-element', 'wp-components', 'wp-i18n', 'wp-data', 'wp-compose'], TAGEMBED_PLUGIN_VERSION);
			register_block_type('tagembed-block/tagembed', ['editor_script' => '__editor-js', 'editor_style' => '__editor-css', 'style' => '__editor-style-css']);
		endif;
	/* --End-- Gutenberge */
	endif;
}
add_action('init', 'tagembed_plugin_scripts_css');
add_filter(
	'script_loader_tag',
	function ($tag, $handle) {
		if ('embbedJs' !== $handle) :
			return $tag;
		else :
			return str_replace(' src', ' defer src', $tag);
		endif;
	},
	10,
	2
);
/* --End-- Add Js And Css */
/* --Start-- Add Menus */
function ___tagembed__plugin_menus()
{
	ob_start();
?>
	<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 200 200' style='enable-background:new 0 0 200 200;' xml:space='preserve'>
		<title>Tagembed Icon</title>
		<g transform='translate(-211 -31)'>
			<g id='Group_3576' transform='translate(211 31)'>
				<path id='Path_5098' fill='#00E9FF' d='M64.3,119.1c5.4-25.2,10.2-49.2,15.6-73.8c0.6-3.6,1.2-7.2,1.8-10.8c0.6-10.8-6.6-19.8-17.4-21.6c-10.8-2.4-21,4.2-23.4,15C33,63.3,25.2,99.3,18,134.7c-3,14.4,7.2,25.2,22.8,25.2c32.4,1.2,65.4,1.8,97.8,2.4c6.6,0,12.6-0.6,18.6-3c7.8-4.2,12-13.2,9.6-22.2c-2.4-9.6-10.8-16.2-20.4-16.2c-21-0.6-42.6-1.2-63.6-1.8C76.9,119.1,70.9,119.1,64.3,119.1z' />
				<path id='Path_5099' fill='#4179FF' d='M136.9,81.9c-25.8,0-50.4,0-75,0c-3.6,0-7.2,0-10.8-0.6c-10.8-1.8-18-10.8-18-21.6s9-19.8,19.8-19.8c36,0,72.6,0,109.2,0c14.4,0,22.8,12,19.8,27.6c-6,31.8-12,64.2-18,96c-1.2,6.6-3.6,12.6-7.2,17.4c-6,6.6-15.6,8.4-23.4,4.8c-9-4.2-13.2-13.8-11.4-23.4c3.6-21,7.8-41.4,11.4-62.4C134.5,94.5,135.7,87.9,136.9,81.9z' />
				<g id='Group_3575' transform='translate(16.61 16.942)'>
					<g>
						<g>
							<defs>
								<polygon id='SVGID_1_' points='113.1,97 101.1,148.7 147.3,148.7 158.1,103.6' />
							</defs>
							<clipPath id='SVGID_2_'>
								<use xlink:href='#SVGID_1_' style='overflow:visible;' />
							</clipPath>
							<g id='Group_3574' class='st2' clip-path='url(#SVGID_2_)'>
								<path id='Path_5100' fill='#00E9FF' d='M47.7,101.8C53.1,76.6,57.9,52.6,63.3,28c0.6-3.6,1.2-7.2,1.8-10.8C65.7,6.4,58.5-2.6,47.7-4.4c-10.8-1.8-21,4.8-23.4,15.6C16.5,46.6,8.7,82,1.5,118.1c-3,14.4,7.2,25.2,22.8,25.2c33,0.6,65.4,1.8,98.4,2.4c6.6,0,12.6-0.6,18.6-3c7.8-4.2,12-13.2,9.6-22.2c-2.4-9.6-10.8-16.2-21-16.2c-21-0.6-42-1.2-63-1.8C60.3,102.4,54.3,102.4,47.7,101.8z' />
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
	</svg>
<?php
	$svg = ob_get_clean();
	add_menu_page('Tagembed', 'Tagembed', 'manage_options', 'tagembed', '___tagembed__view', 'data:image/svg+xml;base64,' . base64_encode($svg));
}
add_action('admin_menu', '___tagembed__plugin_menus');
/* --End-- Add Menus */
/* --Start-- Add & Manage Views */
function ___tagembed__view()
{
	if (!empty(___tagembed__user()->isLogin) && ___tagembed__user()->isLogin == 'yes') :
		/* Remove This */ /* $__tagembed__menus = ___tagembed__menus(['__tagembed__menu_condation' => 'STATUS = 1']); */
		$__tagembed__menus = ___tagembed__menus(['__tagembed__menu_condation' => 1]);
		if (empty($__tagembed__menus)) :
			include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/widget/widgetView.php';
		else :
			include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/' . $__tagembed__menus[0]->path . '.php';
		endif;
	else :
		include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/account/accountView.php';
	endif;
}
/* --End-- Add & Manage Views */
/* --Start-- Feed Count For First Time Create */
function ___tagembed__get_feed_count_information($userDetails, $networkId)
{
	$param['networkId'] = sanitize_key($networkId);
	$param['userId'] = sanitize_key($userDetails->userId);
	$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/getFeedCountForFirstTimeFeed', $param, ['Authorization:' . $userDetails->accessToken]);
	if (200 == $response->head->code || !empty($response->body) || $response->body || $response->head->status) :
		return $response->body;
	endif;
}
/* --End-- Feed Count For First Time Create */
/* --Start-- Manage Ajax Calls */
add_action('wp_ajax_data', '___tagembed__dataAjaxHandler');
function ___tagembed__dataAjaxHandler()
{
	if (!current_user_can('manage_options')) :
		return ___tagembed__exitWithDanger('You do not have sufficient permissions to access this page.');
	endif;
	if (empty($_REQUEST['__tagembed__ajax_action'])) :
		return false;
	endif;
	$data = ___tagembed__sanitizeRequestData($_REQUEST);
	$data = (object)$data;
	/* --Start-- Manage Ajax call Request Security */
	$__tagembed__ajaxCallSecurityNones = isset($data->__tagembed__ajax_call_nones) ? sanitize_text_field($data->__tagembed__ajax_call_nones) : '';
	if (!wp_verify_nonce($__tagembed__ajaxCallSecurityNones, '__tagembed__ajax_call_security_nones')) :
		return ___tagembed__exitWithDanger();
	endif;
	/* --End-- Manage Ajax call Request Security */
	/* --Start__ Sanetize All Input */
	foreach ($data as $key => $value) :
		if (!in_array($key, ['emailId', 'password', 'youtubePlaylist'])) :
			___tagembed__inputSanetize($value);
		endif;
	endforeach;
	/* --End__ Sanetize All Input */
	$param = [];
	global $wpdb;
	$action = $data->__tagembed__ajax_action;
	$__tagembed__user_details = ___tagembed__user();
	switch ($action):
		case '__tagembed__register':
			if (empty($data->emailId) || empty($data->password) || empty($data->fullName)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['fullName'] = sanitize_text_field($data->fullName);
			$param['emailId'] = sanitize_email($data->emailId);
			$param['password'] = $data->password;
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/register', $param, []);
			$response = ___tagembed__manageApiResponse($response);
			unset($param);
			$param = ['userId' => sanitize_key($response->userId), 'inheritStyles' => 1];
			___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiwidget/create', $param, ['Authorization:' . $response->access_token]);
			if (___tagembed__login($response) == true) :
				return ___tagembed__exitWithSuccess(['redirectUrl' => TAGEMBED_PLUGIN_CALL_BACK_URL]);
			else :
				return ___tagembed__exitWithDanger();
			endif;
			break;
		case '__tagembed__login':
			if (empty($data->emailId) || empty($data->password)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['emailId'] = sanitize_email($data->emailId);
			$param['password'] = $data->password;
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/login', $param, []);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			if (___tagembed__login($response) == true) :
				return ___tagembed__exitWithSuccess(['redirectUrl' => TAGEMBED_PLUGIN_CALL_BACK_URL]);
			else :
				return ___tagembed__exitWithDanger();
			endif;
			break;
		case '__tagembed__logout':
			if (tagembed_logout()) :
				return ___tagembed__exitWithSuccess(['redirectUrl' => TAGEMBED_PLUGIN_REDIRECT_URL . 'tagembed']);
			else :
				return ___tagembed__exitWithDanger();
			endif;
			break;
		case '__tagembed__get_account_details':
			$data->auth = !empty($data->auth) ? 1 : 0;
			if (empty($__tagembed__user_details)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/getdetails', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__manage_active_widget':
			if (empty($data->widgetId)) :
				return ___tagembed__exitWithDanger();
			endif;
			if (___tagembed__manageActiveWidget($data->widgetId)) :
				return ___tagembed__exitWithSuccess();
			else :
				return ___tagembed__exitWithDanger();
			endif;
			break;
		case '__tagembed__menue':
			if (empty($data->menueId)) :
				return ___tagembed__exitWithDanger();
			endif;
			if (___tagembed__menus(['__tagembed__menu_id' => $data->menueId])) :
				return ___tagembed__exitWithSuccess(['redirectUrl' => TAGEMBED_PLUGIN_REDIRECT_URL . 'tagembed']);
			else :
				return ___tagembed__exitWithDanger();
			endif;
			break;
		case '__tagembed__create_widget':
			if (empty($__tagembed__user_details) || empty($data->name)) :
				return ___tagembed__exitWithDanger('Validation Error', ['name' => 'Widget name is required']);
			endif;
			$data->profanity = (isset($data->profanity)) ? 0 : 1;
			/* --Start-- Manage Param Data */
			$param['name'] = sanitize_text_field($data->name);
			$param['profanity'] = sanitize_key($data->profanity);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['inheritStyles'] = 1;
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiwidget/create', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response, 'redirectUrl' => TAGEMBED_PLUGIN_CALL_BACK_URL]);
			break;
		case '__tagembed__edit_widget':
			if (empty($__tagembed__user_details) || empty($data->name) || empty($data->widgetId)) :
				return ___tagembed__exitWithDanger('Validation Error', ['name' => 'Widget name is required']);
			endif;
			/* --Start-- Manage Param Data */
			$param['name'] = sanitize_text_field($data->name);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiwidget/edit', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			echo '<pre>';
			print_r($response);
			die;
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response, 'redirectUrl' => TAGEMBED_PLUGIN_CALL_BACK_URL]);
			break;
		case '__tagembed__update_widget_status':
			if (empty($__tagembed__user_details) || empty($data->widgetId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['status'] = sanitize_key($data->status);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiwidget/status', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response]);
			break;
		case '__tagembed__delete_widget':
			if (empty($__tagembed__user_details) || empty($data->widgetId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiwidget/delete', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response]);
			break;
		case '__tagembed__source_networks':
			$data->auth = !empty($data->auth) ? 1 : 0;
			if (empty($__tagembed__user_details)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['auth'] = sanitize_key($data->auth);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apinetwork/get', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__get_themes':
			if (empty($__tagembed__user_details) || empty($data->widgetId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'Apitheme/get', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__edit_themes':
			if (empty($__tagembed__user_details) || empty($data->widgetId) || empty($data->themeId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['themeId'] = sanitize_key($data->themeId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'Apitheme/edit', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__get_network_filter':
			if (empty($__tagembed__user_details) || empty($data->networkId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['networkId'] = sanitize_key($data->networkId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apinetwork/filter', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__get_already_exist_accounts':
			if (empty($__tagembed__user_details)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiauth/getalreadyexistaccounts', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__add_or_update_account':
			if (empty($__tagembed__user_details) || empty($data->networkId) || empty($data->type)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['connectedAccountId'] = $data->connectedAccountId;
			$param['feedId'] = sanitize_key($data->feedId);
			$param['type'] = sanitize_text_field($data->type);
			$param['networkId'] = sanitize_key($data->networkId);
			$param['filterId'] = sanitize_key($data->filterId);
			$param['otherData'] = $data->otherData;
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiauth/addorupdate', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess(['__tagembed__requestCallBackUrl' => TAGEMBED_PLUGIN_CALL_BACK_URL, 'redirectUrl' => TAGEMBED_PLUGIN_API_URL . 'apiauth/getauth', '__tagembed__feedData' => $response->__tagembed__feedData]);
			break;
		case '__tagembed__delete_account':
			if (empty($__tagembed__user_details) || empty($data->networkId) || empty($data->parentId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['parentId'] = sanitize_key($data->parentId);
			$param['networkId'] = sanitize_key($data->networkId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiauth/delete', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response]);
			break;
		case '__tagembed__get_already_exist_auth':
			if (empty($__tagembed__user_details) || empty($data->networkId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['networkId'] = sanitize_key($data->networkId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiauth/get', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__search_google_location':
			if (empty($__tagembed__user_details) || empty($data->googleLocationName)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['googleLocationName'] = $data->googleLocationName;
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/searchgooglelocation', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__search_vk_communities':
			if (empty($__tagembed__user_details) || empty($data->vkCommunitiesName)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['vkCommunitiesName'] = $data->vkCommunitiesName;
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/searchVkCommunities', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__search_facebook_page':
			if (empty($data->facebookPageData)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['facebookPageData'] = $data->facebookPageData;
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			/* --Start-- Call And Manage Api Call */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/searchfacebookpage', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__get_facebook_page_albums':
			if (empty($__tagembed__user_details) || empty($data->connectedAccountsId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['connectedAccountsId'] = sanitize_key($data->connectedAccountsId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiauth/apiauthfacebookpagealbums', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__search_youtube_channel':
			if (empty($__tagembed__user_details) || empty($data->youtubeChannelData)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['youtubeChannelData'] = $data->youtubeChannelData;
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/searchyoutubechannel', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__get_youtube_playlist':
			if (empty($__tagembed__user_details) || empty($data->youtubeId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['youtubeId'] = $data->youtubeId;
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/getyoutubeplaylist', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__get_slack_channel_list':
			if (empty($data->connectedAccountsId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['connectedAccountsId'] = $data->connectedAccountsId;
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/getslackchannellist', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__get_feed':
			if (empty($__tagembed__user_details) || empty($data->widgetId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/get', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__update_feed_status':
			if (empty($__tagembed__user_details) || empty($data->widgetId) || empty($data->feedId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['feedId'] = sanitize_key($data->feedId);
			$param['status'] = sanitize_key($data->status);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/status', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response]);
			break;
		case '__tagembed__delete_feed':
			if (empty($__tagembed__user_details) || empty($data->widgetId) || empty($data->feedId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['feedId'] = sanitize_key($data->feedId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/delete', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response]);
			break;
		case '__tagembed__create_feed':
			if (empty($__tagembed__user_details) || empty($data->widgetName) || empty($data->networkName) || empty($data->filterName) || empty($data->widgetId) || empty($data->networkId) || empty($data->filterId)) :
				return ___tagembed__exitWithDanger();
			endif;
			$__tagembed__feed_input_data = ['feed' => sanitize_text_field($data->feed), 'userId' => sanitize_key($__tagembed__user_details->userId), 'moderation' => sanitize_key(isset($data->moderation) ? 1 : 0), 'widgetName' => sanitize_text_field($data->widgetName), 'networkName' => sanitize_text_field($data->networkName), 'filterName' => sanitize_text_field($data->filterName), 'widgetId' => sanitize_key($data->widgetId), 'networkId' => sanitize_key($data->networkId), 'filterId' => sanitize_key($data->filterId), 'auth' => 0, 'authId' => isset($data->authId) ? sanitize_key($data->authId) : 0];
			$__tagembed__feed_input_data['feed'] = !empty($data->feed) ? sanitize_text_field($data->feed) : '__tagembed__feed';
			$__tagembed__feed_filter_id = $data->filterId;
			switch ($__tagembed__feed_input_data['networkId']):
				case 1:
					$__tagembed__feed_input_data['auth'] = 1;
					$__tagembed__feed_input_data['multiplePhoto'] = sanitize_key(isset($data->multiplePhoto) ? 1 : 0);
					$__tagembed__feed_input_data['excludeRetweet'] = sanitize_key(isset($data->excludeRetweet) ? 1 : 0);
					if (!empty($data->list)) :
						$__tagembed__feed_input_data['list'] = sanitize_key($data->list);
					endif;
					break;
				case 2:
					$__tagembed__feed_input_data['auth'] = 1;
					break;
				case 3:
					$__tagembed__feed_input_data['auth'] = 1;
					switch ($__tagembed__feed_filter_id):
						case 65:
							$__tagembed__feed_input_data['accountAlbumType'] = sanitize_key(isset($data->accountAlbumType) ? $data->accountAlbumType : '');
							$__tagembed__feed_input_data['accountAlbumData'] = sanitize_text_field(isset($data->accountAlbumData) ? $data->accountAlbumData : '');
							break;
					endswitch;
					break;
				case 4:
					if ($__tagembed__feed_filter_id == 29) :
						$__tagembed__feed_input_data['auth'] = 1;
					else :
						$__tagembed__feed_input_data['placeId'] = $data->placeId;
						$__tagembed__feed_input_data['placeName'] = $data->placeName;
					endif;
					break;
				case 5:
					switch ($__tagembed__feed_filter_id):
						case 1:
						case 71:
							break;
						case 12:
							if (!preg_match('/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
								return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
							endif;
							$pintrestHeaders = explode('/', parse_url($data->feed)['path']);
							$__tagembed__feed_input_data['value1'] = strtolower($pintrestHeaders[1]);
							$__tagembed__feed_input_data['value2'] = strtolower($pintrestHeaders[2]);
							break;
					endswitch;
					break;
				case 6:
					switch ($__tagembed__feed_filter_id):
						case 1:
						case 2:
							$__tagembed__feed_input_data['feed'] = $__tagembed__feed_input_data['name'] = $data->feed;
							break;
					endswitch;
					break;
				case 7:
					if (in_array($__tagembed__feed_filter_id, [1, 71])) :
						$isUrl = false;
						if (preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
							$isUrl = true;
						endif;
						if ((empty($data->youtubeId) || empty($data->youtubeName)) && !$isUrl) :
							return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid Channel URL Or Tab On Search Icon']);
						endif;
						if ($isUrl) :
							$data->youtubeId = explode('/', $data->feed);
							$data->youtubeId = $data->youtubeId[4];
							$data->youtubeName = 'youtube';
							if (empty($data->youtubeId) || empty($data->youtubeName)) :
								return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid Channel URL']);
							endif;
						endif;
					endif;
					switch ($__tagembed__feed_filter_id):
						case 1:
						case 75:
							$__tagembed__feed_input_data['youtubeId'] = $data->youtubeId;
							$__tagembed__feed_input_data['youtubeName'] = $data->youtubeName;
							break;
						case 11:
							if (empty($data->youtubePlaylist) && empty($data->youtubeId)) :
								return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid Channel URL Or Tab On Search Icon']);
							elseif (empty($data->youtubePlaylist) && !empty($data->youtubeId)) :
								return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Play List Not Found']);
							endif;
							$data->youtubePlaylist = explode('#', $data->youtubePlaylist);
							$__tagembed__feed_input_data['youtubeId'] = $data->youtubePlaylist[0];
							$__tagembed__feed_input_data['youtubeName'] = $data->youtubePlaylist[1];
							$__tagembed__feed_input_data['feed'] = $data->youtubePlaylist[1];
							unset($data->youtubePlaylist);
							break;
					endswitch;
					break;
				case 8:
					switch ($__tagembed__feed_filter_id):
						case 1:
						case 2:
							$__tagembed__feed_input_data['auth'] = 1;
							break;
					endswitch;
					break;
				case 10:
					if (in_array($__tagembed__feed_filter_id, [1, 16, 17])) :
						if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
							return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
						endif;
					endif;
					switch ($__tagembed__feed_filter_id):
						case 16:
							$postUrl = parse_url($data->feed);
							if (!strstr($postUrl['host'], 'linkedin')) :
								return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Linkedin Post Url']);
							endif;
							$postUrl = $data->feed;
							$postUrl = rtrim($postUrl, '/');
							preg_match('/[^\/]+$/', $postUrl, $postId);
							$postId = $postId[0];
							$postId = (explode('?', $postId)[0]);
							$value1 = 'LinkedIn';
							if (stripos($postId, 'activity') !== false) :
								$postId = (explode('activity', $postId)[1]);
								$value2 = 'activity';
							elseif (stripos($postId, 'ugcPost') !== false) :
								$postId = (explode('ugcPost', $postId)[1]);
								$value2 = 'ugcPost';
							else :
								return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Linkedin Post Url']);
							endif;
							preg_match_all('!\d+!', $postId, $postId);
							if (isset($postId[0][0]) && empty($postId[0][0])) :
								return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Linkedin Post Url']);
							endif;
							$value3 = $postId[0][0];
							if (empty($value1) || empty($value2) || empty($value3)) :
								return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Linkedin Post Url']);
							endif;
							$__tagembed__feed_input_data['value1'] = $value1;
							$__tagembed__feed_input_data['value2'] = $value2;
							$__tagembed__feed_input_data['value3'] = $value3;
							break;
						case 1:
						case 17:
							$url = parse_url($data->feed);
							$companyPageUrl = $url['scheme'] . '://' . $url['host'];
							$url = explode('/', $url['path']);
							$companyPageUrl = $companyPageUrl . '/' . $url[1] . '/' . $url[2] . '/';
							$__tagembed__feed_input_data['feed'] = $companyPageUrl;
							$url[2] = str_replace('-', ' ', '$url[2]');
							$__tagembed__feed_input_data['page'] = ucwords($url[2], ' ');
							break;
						case 2:
							$__tagembed__feed_input_data['feed'] = $__tagembed__feed_input_data['name'] = $data->feed;
							break;
					endswitch;
					break;
				case 11:
					switch ($__tagembed__feed_filter_id):
						case 1:
						case 2:
							$__tagembed__feed_input_data['feed'] = $__tagembed__feed_input_data['name'] = $data->feed;
							break;
					endswitch;
					break;
				case 12:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$__tagembed__feed_input_data['name'] = $data->name;
					break;
				case 18:
					switch ($__tagembed__feed_filter_id):
						case 23:
							if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
								return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
							endif;
							break;
						case 26:
							$__tagembed__feed_input_data['hashtagCaption'] = sanitize_key(isset($data->hashtagCaption) ? 1 : 0);
							$__tagembed__feed_input_data['hashtagOlder'] = sanitize_key(isset($data->hashtagOlder) ? 1 : 0);
							break;
					endswitch;
					$__tagembed__feed_input_data['auth'] = 1;
					break;
				case 19:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$yelpBusinessUrl = parse_url($data->feed);
					if (!strstr($yelpBusinessUrl['host'], 'yelp')) :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter	Yelp	Business	Url']);
					endif;
					$yelpBusinessPath = explode('/', $yelpBusinessUrl['path']);
					$__tagembed__feed_input_data['feed'] = $yelpBusinessPath[2];
					$__tagembed__feed_input_data['name'] = $yelpBusinessPath[2];
					break;
				case 20:
					$__tagembed__feed_input_data['auth'] = 1;
					$slackData = isset($data->slackChannelList) ? $data->slackChannelList : '';
					if (!empty($slackData)) :
						$slackData = explode('#', $slackData);
						$__tagembed__feed_input_data['name'] = $slackData[1];
						$__tagembed__feed_input_data['feed'] = $slackData[0];
					endif;
					break;
				case 23:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$airbnbListUrl = parse_url($data->feed);
					if (strstr($airbnbListUrl['host'], 'airbnb')) :
						preg_match('/[^\/]+$/', $data->feed, $matches);
						$__tagembed__feed_input_data['listId'] = explode('?', $matches[0])[0];
					else :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter	Airbnb	Url']);
					endif;
					$__tagembed__feed_input_data['name'] = $data->name;
					break;
				case 36:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$etsyShopUrl = parse_url($data->feed);
					if (!strstr($etsyShopUrl['host'], 'etsy')) :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter	Etsy	Shop	Url']);
					endif;
					$__tagembed__feed_input_data['feed'] = $__tagembed__feed_input_data['name'] = explode('/shop/', $etsyShopUrl['path'])[1];
					break;
				case 28:
					switch ($__tagembed__feed_filter_id):
						case 72:
							$__tagembed__feed_input_data['feed'] = $data->feed;
							$__tagembed__feed_input_data['name'] = $data->feed;
							break;
					endswitch;
					if (!in_array($__tagembed__feed_filter_id, [72])) :
						$__tagembed__feed_input_data['auth'] = 1;
					endif;
					break;
				case 30:
					switch ($__tagembed__feed_filter_id):
						case 2:
							$__tagembed__feed_input_data['feed'] = $data->feed;
							$__tagembed__feed_input_data['name'] = $data->feed;
							break;
						case 75:
							$__tagembed__feed_input_data['communitiesName'] = $data->communitiesName;
							$__tagembed__feed_input_data['communitiesId'] = $data->communitiesId;
							break;
					endswitch;
					if (!in_array($__tagembed__feed_filter_id, [2, 75])) :
						$__tagembed__feed_input_data['auth'] = 1;
					endif;
					break;
				case 33:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					preg_match('/[^\/]+$/', '$data->feed', $matches);
					$__tagembed__feed_input_data['feed'] = $matches[0];
					$__tagembed__feed_input_data['name'] = $matches[0];
					break;
				case 34:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$__tagembed__feed_input_data['name'] = explode('/', $data->feed)[3];
					$__tagembed__feed_input_data['feed'] = $data->feed;
					break;
				case 35:
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$__tagembed__feed_input_data['name'] = explode('Reviews-', $data->feed)[1];
					$__tagembed__feed_input_data['name'] = explode('.html', $__tagembed__feed_input_data['name'])[0];
					$__tagembed__feed_input_data['feed'] = $data->feed;
					break;
				case 37:
					$data->feed = explode('.html', $data->feed)[0];
					if (!preg_match('/\b(?:(?:https?|ftp) :\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $data->feed)) :
						return ___tagembed__exitWithDanger('Validation Error', ['feed' => 'Enter Valid URL']);
					endif;
					$__tagembed__feed_input_data['name'] = $data->feed;
					$__tagembed__feed_input_data['feed'] = explode('item/', $data->feed)[1];
					break;
			endswitch;
			unset($data);

			/* --Start-- Manage Api Calling */
			$byApiCall = 0;
			if (empty($__tagembed__feed_input_data['authId'])) :
				switch ($__tagembed__feed_input_data['networkId']):
					case 4:
						if (33 == $__tagembed__feed_filter_id) :
							$byApiCall = 1;
							$__tagembed__feed_input_data['byApiCall'] = 1;
						endif;
						break;
						/*
						case 3:
			            case 18:
						if (23 == $__tagembed__feed_filter_id || 26 == $__tagembed__feed_filter_id || 8 == $__tagembed__feed_filter_id) :
						$__tagembed__get_feed_count_information = ___tagembed__get_feed_count_information($__tagembed__user_details, $__tagembed__feed_input_data['networkId']);
						if (empty($__tagembed__get_feed_count_information)) :
						$byApiCall = 1;
						$__tagembed__feed_input_data['byApiCall'] = 1;
						endif;
						endif;
						break;
						case 1:
						$__tagembed__get_feed_count_information = ___tagembed__get_feed_count_information($__tagembed__user_details, $__tagembed__feed_input_data['networkId']);
						if (empty($__tagembed__get_feed_count_information)) :
						$byApiCall = 1;
						$__tagembed__feed_input_data['byApiCall'] = 1;
						endif;
						break;
						*/
					case 5:
					case 7:
					case 6:
					case 10:
					case 11:
					case 12:
					case 19:
					case 23:
					case 28:
					case 29:
					case 33:
					case 34:
					case 35:
					case 37:
						$byApiCall = 1;
						$__tagembed__feed_input_data['byApiCall'] = 1;
						break;
					case 31:
						if (2 == $__tagembed__feed_filter_id) :
							$byApiCall = 1;
							$__tagembed__feed_input_data['byApiCall'] = 1;
						endif;
						break;
					case 32:
						if (in_array($__tagembed__feed_filter_id, [2, 75])) :
							$byApiCall = 1;
							$__tagembed__feed_input_data['byApiCall'] = 1;
						endif;
						break;
				endswitch;
			else :
				$byApiCall = 1;
				$__tagembed__feed_input_data['byApiCall'] = 1;
			endif;
			$__tagembed__feed_input_data['appUser'] = 1;
			/* --End-- Manage Api Calling */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifeed/create', ['feedData' => $__tagembed__feed_input_data], ['Authorization:' . $__tagembed__user_details->accessToken]);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess(['byapiCall' => $byApiCall, '__tagembed__requestCallBackUrl' => TAGEMBED_PLUGIN_CALL_BACK_URL, 'redirectUrl' => TAGEMBED_PLUGIN_API_URL . 'apiauth/getauth', '__tagembed__feedData' => $response->__tagembed__feedData]);
			break;
		case '__tagembed__make_payment':
			if (empty($__tagembed__user_details) || empty($data->planId) || empty($data->priceCode)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['planId'] = sanitize_key($data->planId);
			$param['priceCode'] = $data->priceCode;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['email'] = $__tagembed__user_details->email;
			$param['name'] = $__tagembed__user_details->name;
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/getpaymentdetails', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess(['__tagembed__requestCallBackUrl' => TAGEMBED_PLUGIN_CALL_BACK_URL, 'redirectUrl' => TAGEMBED_PLUGIN_API_URL . 'apiaccount/makepayment', '__tagembed__paymentData' => $response->__tagembed__paymentData]);
			break;
		case '__tagembed__cancel_subscription':
			if (empty($__tagembed__user_details) || empty($data->planId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['planId'] = sanitize_key($data->planId);
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['email'] = $__tagembed__user_details->email;
			$param['name'] = $__tagembed__user_details->name;
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/cancelsubscription', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response]);
			break;
		case '__tagembed__get_post':
			if (empty($__tagembed__user_details) || empty($data->widgetId) || !isset($data->perPage) || !isset($data->offset) || !isset($data->postStatus)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['perPage'] = sanitize_key($data->perPage);
			$param['offset'] = sanitize_key($data->offset);
			$param['postStatus'] = sanitize_key($data->postStatus);
			$param['feedIds'] = $data->feedIds;
			$param['postType'] = $data->postType;
			$param['highlightFilter'] = sanitize_key($data->highlightFilter);
			$param['pinFilter'] = sanitize_key($data->pinFilter);
			$param['recentFilter'] = sanitize_key($data->recentFilter);
			$param['retweetFilter'] = sanitize_key($data->retweetFilter);
			$param['searchText'] = sanitize_text_field($data->searchText);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifilter/get', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__manage_post_status':
			if (empty($__tagembed__user_details) || empty($data->widgetId) || empty($data->postIds) || empty($data->postStatus)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['postIds'] = $data->postIds;
			$param['postStatus'] = sanitize_key($data->postStatus);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifilter/status', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response]);
			break;
		case '__tagembed__feed_for_search':
			if (empty($__tagembed__user_details) || empty($data->widgetId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifilter/getfeeds', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__manage_post_pin':
			if (empty($__tagembed__user_details) || empty($data->widgetId) || empty($data->postId) || !isset($data->pin)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['postId'] = $data->postId;
			$param['pin'] = sanitize_key($data->pin);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifilter/pin', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response]);
			break;
		case '__tagembed__manage_post_highlight':
			if (empty($__tagembed__user_details) || empty($data->widgetId) || empty($data->postId) || !isset($data->highlight)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['postId'] = $data->postId;
			$param['highlight'] = sanitize_key($data->highlight);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apifilter/highlight', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			$response = !empty($response->message) ? $response->message : 'Done';
			return ___tagembed__exitWithSuccess(['message' => $response]);
			break;
		case '__tagembed__plugin_version':
			/* --Start-- Manage Param Data */
			$param = [];
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/pluginversion', $param, []);
			$response = ___tagembed__manageApiResponse($response);
			unset($param);
			$installedPluginVersion = get_file_data(__FILE__, ['Version' => 'Version'], false);
			$installedPluginVersion = $installedPluginVersion['Version'];
			$response->installedPluginVersion = $installedPluginVersion;
			$response->pluginUpgradeURL = admin_url() . 'plugins.php';
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__check_user_token':
			if (empty($__tagembed__user_details)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/checkusertoken', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			if (401 == $response->head->code && !$response->head->status) :
				tagembed_logout();
			endif;
			unset($param);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__plugin_deactivate':
			/* --Start-- Manage Param Data */
			$__tagembed__user_details = ___tagembed__userData();
			$param = [];
			$param['userId'] = !empty($__tagembed__user_details) ? sanitize_key($__tagembed__user_details->userId) : '';
			$param['userName'] = !empty($__tagembed__user_details) ? sanitize_text_field($__tagembed__user_details->name) : '';
			$param['userEmail'] = !empty($__tagembed__user_details) ? sanitize_email($__tagembed__user_details->email) : '';
			$param['pluginDeactivateReason'] = sanitize_text_field($data->pluginDeactivateReason);
			$param['otherReason'] = sanitize_text_field($data->otherReason);
			$param['betterPlugin'] = sanitize_text_field($data->betterPlugin);
			$param['userWebsiteUrl'] = get_site_url();
			/* --End-- Manage Param Data */
			___tagembed__dropDatabaseTablesForPlugin();
			deactivate_plugins(plugin_basename(__FILE__), true);
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/deactivateuserdata', $param, []);
			$response = ___tagembed__manageApiResponse($response);
			unset($param);
			return ___tagembed__exitWithSuccess();
			break;
		case '__tagembed__get_customization_option':
			if (empty($__tagembed__user_details) || empty($data->widgetId)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apicustomization/get', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__update_footer_customization_option':
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['personalizationId'] = sanitize_key($data->personalizationId);
			$param['themeRuleId'] = sanitize_key($data->themeRuleId);
			$param['loadMoreStatus'] = sanitize_key($data->loadMoreStatus);
			$param['autoScrollStatus'] = sanitize_key($data->autoScrollStatus);
			$param['showMoreTxt'] = $data->showMoreTxt;
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apicustomization/footer', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__update_layout_customization_option':
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['personalizationId'] = sanitize_key($data->personalizationId);
			$param['themeRuleId'] = sanitize_key($data->themeRuleId);
			$param['numberOfPosts'] = sanitize_key($data->numberOfPosts);
			$param['padding'] = sanitize_key($data->padding);
			$param['minimumPostWidth'] = sanitize_key($data->minimumPostWidth);
			$param['columnCount'] = sanitize_key($data->columnCount);
			$param['columnCountMobile'] = sanitize_key($data->columnCountMobile);
			$param['postText'] = sanitize_key($data->postText);
			$param['mobilePopup'] = sanitize_key($data->mobilePopup);
			$param['postFeatured'] = sanitize_key($data->postFeatured);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apicustomization/layout', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__update_card_customization_option':
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['personalizationId'] = sanitize_key($data->personalizationId);
			$param['inheritStyles'] = sanitize_key($data->inheritStyles);
			$param['themeRuleId'] = sanitize_key($data->themeRuleId);
			$param['fontColor'] = $data->fontColor;
			$param['authorColor'] = $data->authorColor;
			$param['cardColor'] = $data->cardColor;
			$param['fontSize'] = sanitize_key($data->fontSize);
			$param['font'] = sanitize_key($data->font);
			$param['shareOption'] = sanitize_key($data->shareOption);
			$param['hideContent'] = sanitize_key($data->hideContent);
			$param['postAuthor'] = sanitize_key($data->postAuthor);
			$param['postTime'] = sanitize_key($data->postTime);
			$param['lineTrim'] = sanitize_key($data->lineTrim);
			$param['aspectImageRatio'] = $data->aspectImageRatio;
			$param['textAlignment'] = $data->textAlignment;
			$param['borderRadius'] = $data->borderRadius;
			//	    $param['colorType'] = $data->colorType;
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apicustomization/card', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__update_other_customization_option':
			/* --Start-- Manage Param Data */
			$param['widgetId'] = sanitize_key($data->widgetId);
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			$param['personalizationId'] = sanitize_key($data->personalizationId);
			$param['themeRuleId'] = sanitize_key($data->themeRuleId);
			$param['css'] = $data->css;
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apicustomization/other', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		case '__tagembed__get_and_manage_intercom_chat_setting':
			if (empty($__tagembed__user_details)) :
				return ___tagembed__exitWithDanger();
			endif;
			/* --Start-- Manage Param Data */
			$param['userId'] = sanitize_key($__tagembed__user_details->userId);
			/* --End-- Manage Param Data */
			$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/getIntercomSettingData', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
			unset($param);
			$response = ___tagembed__manageApiResponse($response);
			return ___tagembed__exitWithSuccess($response);
			break;
		default:
			return ___tagembed__exitWithDanger();
	endswitch;
}
/* --End-- Manage Ajax Calls */
/* --Start-- Manage Login And Register On Plugin Activate */
function ___tagembed__manageLoginAndRegisterOnPluginActivate()
{
	global $wpdb;
	$__tagembed__activeUserData = wp_get_current_user();
	if (empty($__tagembed__activeUserData->roles) || 'administrator' != $__tagembed__activeUserData->roles[0]) :
		return false;
	endif;
	if (!empty($__tagembed__activeUserData->data->user_email) && !empty($__tagembed__activeUserData->data->display_name)) :
		$__tagembed__activeUserName = $__tagembed__activeUserData->data->display_name;
		$__tagembed__activeUserEmail = $__tagembed__activeUserData->data->user_email;
		$__tagembed__activeOptions = ___tagembed__getActiveOptions();
		if (!empty($__tagembed__activeOptions[0]->email)) :
			if (empty($__tagembed__activeOptions[0]->isLogin) || 'no' == $__tagembed__activeOptions[0]->isLogin) :
				return false;
			endif;
			$__tagembed__activeUserEmail = $__tagembed__activeOptions[0]->email;
		endif;
		$__tagembed__user_details = ___tagembed__user($__tagembed__activeUserEmail);
		$accessTocken = (isset($__tagembed__user_details->accessToken) && !empty($__tagembed__user_details->accessToken)) ? $__tagembed__user_details->accessToken : '';
		$param = [];
		$param['emailId'] = sanitize_email($__tagembed__activeUserEmail);
		$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/checkUserExistOrNotAndGetData', $param, ['Authorization:' . $accessTocken]);
		unset($param);
		if (!empty($response->body->userId)) :
			___tagembed__login($response->body);
		endif;
	endif;
}
/* --End-- Manage Login And Register On Plugin Activate */
/* --Start-- Login */
function ___tagembed__login($response)
{
	global $wpdb;
	$return = false;
	$user = ___tagembed__user($response->emailId);
	if (empty($user->email)) :
		if ($wpdb->query($wpdb->prepare('INSERT INTO wp_tagembed_user (userId, name, email, accessToken, isLogin) VALUES (%d, %s, %s, %s, %s)', $response->userId, $response->name, $response->emailId, $response->access_token, 'yes'))) :
			$return = true;
		endif;
	else :
		if ($wpdb->query($wpdb->prepare('UPDATE wp_tagembed_user SET userId = %d, name = %s, email = %s, accessToken = %s, isLogin = %s WHERE email = %s', $response->userId, $response->name, $response->emailId, $response->access_token, 'yes', $response->emailId))) :
			$return = true;
		endif;
	endif;
	___tagembed__manageActiveOptions($response->emailId, 'yes'); /* Manage Active Options */
	if ($return) :
		___tagembed__manageActiveWidgetsUser($response->userId);
	endif;
	return $return;
}
/* --End-- Login */
/* --Start-- Manage Active Options */
function ___tagembed__manageActiveOptions($email = null, $other = null)
{
	global $wpdb;
	if (null == $email && null != $other) :
		$wpdb->query($wpdb->prepare('UPDATE wp_tagembed_active_options SET isLogin = %s WHERE id = %d', $other, 1));
	else :
		$__tagembed__activeOptions = $wpdb->get_results($wpdb->prepare('SELECT email FROM wp_tagembed_active_options WHERE id = %d', 1));
		if (empty($__tagembed__activeOptions[0]->email)) :
			$wpdb->query($wpdb->prepare('INSERT INTO wp_tagembed_active_options (email, isLogin) VALUES (%s, %s)', $email, $other));
		else :
			$wpdb->query($wpdb->prepare('UPDATE wp_tagembed_active_options SET email = %s, isLogin = %s WHERE id = %d', $email, $other, 1));
		endif;
	endif;
}
/* --End-- Manage Active Options */
/* --Start--Get User Last Login Email Id */
function ___tagembed__getActiveOptions()
{
	global $wpdb;
	$__tagembed__activeOptions = $wpdb->get_results($wpdb->prepare('SELECT email, isLogin FROM wp_tagembed_active_options WHERE id = %d', 1));
	return $__tagembed__activeOptions;
}
/* --End--Get User last Login Email Id */
/* --Start-- Logout */
function tagembed_logout()
{
	global $wpdb;
	if ($wpdb->query($wpdb->prepare('UPDATE wp_tagembed_user SET isLogin = %s  WHERE isLogin = %s', 'no', 'yes'))) :
		___tagembed__manageActiveOptions(null, 'no'); /* Manage Active Options */
		return true;
	endif;
	return false;
}
/* --End-- Logout */
/* --Start--Manage Menues */
function ___tagembed__menus($__tagembed__menu_condatation = [])
{
	global $wpdb;
	if (empty($__tagembed__menu_condatation)) :
		return $wpdb->get_results('SELECT * FROM wp_tagembed_menus');
	endif;
	if (array_key_exists('__tagembed__menu_condation', $__tagembed__menu_condatation)) :
		return $wpdb->get_results($wpdb->prepare('SELECT * FROM wp_tagembed_menus WHERE status = %s', $__tagembed__menu_condatation['__tagembed__menu_condation']));
	endif;
	if (array_key_exists('__tagembed__menu_id', $__tagembed__menu_condatation)) :
		if ($wpdb->query($wpdb->prepare('UPDATE wp_tagembed_menus SET status = %d WHERE status = %d', 0, 1)) && $wpdb->query($wpdb->prepare('UPDATE wp_tagembed_menus SET status = %d WHERE id = %d', 1, $__tagembed__menu_condatation['__tagembed__menu_id']))) :
			return true;
		else :
			return false;
		endif;
	endif;
}
/* --End--Manage Menues */
/* --Start-- Get User Details */
function ___tagembed__user($email = null)
{
	global $wpdb;
	$__tagembed__userResponse = '';
	if (empty($email)) :
		$__tagembed__userResponse = $wpdb->get_results($wpdb->prepare('SELECT * FROM wp_tagembed_user WHERE isLogin = %s', 'yes'));
	else :
		$__tagembed__userResponse = $wpdb->get_results($wpdb->prepare('SELECT * FROM wp_tagembed_user WHERE email = %s', $email));
	endif;
	if (!empty($__tagembed__userResponse)) :
		return $__tagembed__userResponse[0];
	else :
		return;
	endif;
}
function ___tagembed__userData()
{
	global $wpdb;
	$__tagembed__user_dataResponse = '';
	$__tagembed__user_dataResponse = $wpdb->get_results('SELECT * FROM wp_tagembed_user');
	if (!empty($__tagembed__user_dataResponse)) :
		return $__tagembed__user_dataResponse[0];
	else :
		return;
	endif;
}
/* --End-- Get User Details */
/* --Start-- Get Widget */
function ___tagembed__widgets()
{
	$returnWidgetData = [];
	$__tagembed__user_details = ___tagembed__user();
	if (!empty($__tagembed__user_details)) :
		$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiwidget/get', ['userId' => sanitize_key($__tagembed__user_details->userId)], ['Authorization:' . $__tagembed__user_details->accessToken]);
		if (!isset($response->head->status)) :
			return $returnWidgetData;
		endif;
		if (false == $response->head->status || 200 != $response->head->code || false == $response->body || empty($response->body)) :
			return $returnWidgetData;
		endif;
		$returnWidgetData = $response->body;
	endif;
	return $returnWidgetData;
}
/* --End-- Get Widget */
/* --Start-- Get Active Widget */
function ___tagembed__activeWidget()
{
	global $wpdb;
	$__tagembed__activeWidgetResponse = '';
	$__tagembed__activeWidgetResponse = $wpdb->get_results('SELECT * FROM wp_tagembed_active_widget');
	if (!empty($__tagembed__activeWidgetResponse)) :
		return $__tagembed__activeWidgetResponse[0]->widgetId;
	else :
		return;
	endif;
}
/* --End-- Get Active Widget */
/* --Start-- Manage Active Widget User */
function ___tagembed__manageActiveWidget($widgetId)
{
	global $wpdb;
	$return = '';
	$activeWidgetUserId = ___tagembed__activeWidget();
	if ($activeWidgetUserId == $widgetId) :
		return true;
	endif;
	if (empty($activeWidgetUserId)) :
		$wpdb->query($wpdb->prepare('INSERT INTO wp_tagembed_active_widget (widgetId) VALUES (%s)', $widgetId));
		return true;
	else :
		$wpdb->query($wpdb->prepare('UPDATE wp_tagembed_active_widget SET widgetId = %s  WHERE id = %d', $widgetId, 1));
		return true;
	endif;
	return false;
}
/* --End-- Manage Active Widget User */
/* --Start-- Get Active Widget User */
function ___tagembed__activeWidgetUser()
{
	global $wpdb;
	$__tagembed__activeWidgetUserResponse = '';
	$__tagembed__activeWidgetUserResponse = $wpdb->get_results('SELECT * FROM wp_tagembed_active_widget_user');
	if (!empty($__tagembed__activeWidgetUserResponse)) :
		return $__tagembed__activeWidgetUserResponse[0]->userId;
	endif;
	return;
}
/* --End-- Get Active Widget User */
/* --Start-- Manage Active Widget User */
function ___tagembed__manageActiveWidgetsUser($userId)
{
	global $wpdb;
	$return = '';
	$activeWidgetUserId = ___tagembed__activeWidgetUser();
	if ($activeWidgetUserId == $userId) :
		return true;
	endif;
	if (empty($activeWidgetUserId)) :
		$wpdb->query($wpdb->prepare('INSERT INTO wp_tagembed_active_widget_user (userId) VALUES (%d)', $userId));
		return true;
	else :
		$wpdb->query($wpdb->prepare('UPDATE wp_tagembed_active_widget_user SET userId = %d WHERE id = %d', $userId, 1));
		return true;
	endif;
	return false;
}
/* --End-- Manage Active Widget User */
/* * ** DATABASE *** */
/* --Start-- Manage Database */
function ___tagembed__createDatabaseTableForPlugin()
{
	global $wpdb;
	include_once ABSPATH . 'wp-admin/includes/upgrade.php';
	$wpdb->query('CREATE TABLE  IF NOT EXISTS `wp_tagembed_user` (`id` int(11) NOT NULL AUTO_INCREMENT,`userId` varchar(100) NOT NULL,`name` varchar(100) NOT NULL,`email` varchar(100) NOT NULL,`accessToken` varchar(255) NOT NULL,`isLogin` enum(\'no\', \'yes\') NOT NULL,PRIMARY KEY(`id`)) ENGINE = InnoDB DEFAULT CHARSET = latin1');
	$wpdb->query('CREATE TABLE  IF NOT EXISTS `wp_tagembed_active_widget_user` (`id` int(11) NOT NULL AUTO_INCREMENT,`userId` varchar(100) NOT NULL,PRIMARY KEY(`id`)) ENGINE = InnoDB DEFAULT CHARSET = latin1');
	$wpdb->query('CREATE TABLE  IF NOT EXISTS `wp_tagembed_menus` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(100) NOT NULL,`status` tinyint(2) NOT NULL,`path` varchar(255) NOT NULL,PRIMARY KEY(`id`)) ENGINE = InnoDB DEFAULT CHARSET = latin1');
	$wpdb->query('CREATE TABLE  IF NOT EXISTS `wp_tagembed_active_widget` (`id` int(11) NOT NULL AUTO_INCREMENT,`widgetId` varchar(100) NOT NULL,PRIMARY KEY(`id`)) ENGINE = InnoDB DEFAULT CHARSET = latin1');
	$wpdb->query('CREATE TABLE  IF NOT EXISTS `wp_tagembed_active_options` (`id` int(11) NOT NULL AUTO_INCREMENT,`email` varchar(500) NOT NULL,`isLogin` enum(\'no\', \'yes\'),PRIMARY KEY(`id`)) ENGINE = InnoDB DEFAULT CHARSET = latin1');
	/* --Start-- Manage Tagembed Plugin Menus */
	$__tagembed__checkAlreadyExistMenusDataExistOrNot = $wpdb->get_results('SELECT id FROM wp_tagembed_menus');
	if (empty($__tagembed__checkAlreadyExistMenusDataExistOrNot)) :
		$__tagembed__menus = [['name' => 'Widget', 'status' => 0, 'path' => 'widget/widgetView'], ['name' => 'Feed', 'status' => 1, 'path' => 'feed/addView'], ['name' => 'Choose Theme', 'status' => 0, 'path' => 'theme/themeView'], ['name' => 'Filter', 'status' => 0, 'path' => 'filter/filterView'], ['name' => 'Customize', 'status' => 0, 'path' => 'customize/customizeView'], ['name' => 'Display', 'status' => 0, 'path' => 'display/displayView'], ['name' => 'Social Accounts', 'status' => 0, 'path' => 'socialAccount/socialAccountView'], ['name' => 'Support', 'status' => 0, 'path' => 'support/supportView'], ['name' => 'Upgrade', 'status' => 0, 'path' => 'upgrade/upgradeView'], ['name' => 'Analytics', 'status' => 0, 'path' => 'analytics/analyticsView']];
		foreach ($__tagembed__menus as $__tagembed__menu) :
			$wpdb->query($wpdb->prepare('INSERT INTO wp_tagembed_menus (name, status, path) VALUES (%s, %s, %s)', $__tagembed__menu['name'], $__tagembed__menu['status'], $__tagembed__menu['path']));
		endforeach;
	endif;
	/* --End-- Manage Tagembed Plugin Menus */
}
function ___tagembed__dropDatabaseTablesForPlugin()
{
	global $wpdb;
	$wpdb->query('DROP table IF EXISTS  wp_tagembed_active_widget_user');
	$wpdb->query('DROP table IF EXISTS  wp_tagembed_active_widget');
	$wpdb->query('DROP table IF EXISTS  wp_tagembed_menus');
}
/* --End-- Manage Database */
/* --Start-- Manage Active Deactive And Uninstall Webhook */
register_activation_hook(__FILE__, '___tagembed__pluginActivate');
function ___tagembed__pluginActivate()
{
	___tagembed__createDatabaseTableForPlugin();
	___tagembed__manageLoginAndRegisterOnPluginActivate();
	add_action('activated_plugin', '___tagembed__plginActivationRedirect');
}
register_uninstall_hook(__FILE__, '___tagembed__pluginUnistall');
function ___tagembed__pluginUnistall()
{
	___tagembed__dropDatabaseTablesForPlugin();
	global $wpdb;
	$wpdb->query('DROP table IF EXISTS  wp_tagembed_active_options');
	$wpdb->query('DROP table IF EXISTS  wp_tagembed_user');
}
/* register_deactivation_hook(__FILE__,	'__tagembed__pluginDeactivate');
  function	__tagembed__pluginDeactivate()	{
  ___tagembed__dropDatabaseTablesForPlugin();
  $wpdb->query('DROP table IF EXISTS  wp_tagembed_user');
  } */
/* --End-- Manage Active Deactive And Uninstall Webhook */
/* --Start--Manage Redirect After Plugin Activate */
function ___tagembed__plginActivationRedirect()
{
	$__tagembed__activeUserData = wp_get_current_user();
	if (empty($__tagembed__activeUserData->roles)) :
		return false;
	endif;
	$__tagembed__pluginCallbackUrl = esc_url(TAGEMBED_PLUGIN_CALL_BACK_URL);
	wp_safe_redirect($__tagembed__pluginCallbackUrl);
	exit;
	/* exit(wp_redirect(TAGEMBED_PLUGIN_CALL_BACK_URL)); */
}
/* --End--Manage Redirect After Plugin Activate */
/* --Start--Manage Setting Link */
function ___tagembed__settingsLink($links)
{
	array_unshift($links, '<a href=' . TAGEMBED_PLUGIN_CALL_BACK_URL . '>Settings</a>');
	return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), '___tagembed__settingsLink');
/* --End--Manage Setting Link */
/* --Start--Manage Database On Plugin Update Time */
function ___tagembed__manageDatabaseOnPluginUpdateTime()
{
	$__tagembed__userTableDropStatus = false;
	___tagembed__dropDatabaseTablesForPlugin();
	___tagembed__createDatabaseTableForPlugin();
	___tagembed__manageLoginAndRegisterOnPluginActivate();
}
add_action('upgrader_process_complete', '___tagembed__manageDatabaseOnPluginUpdateTime', 10, 2);
/* --End--Manage Database On Plugin Update Time */
/* --Sart--Get And Manage Social Accout Id */
function ___tagembed__get_user_social_account_id()
{
	$__tagembed__user_details = ___tagembed__user();
	$param['userId'] = $__tagembed__user_details->userId;
	$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/getsocialaccountid', $param, ['Authorization:' . $__tagembed__user_details->accessToken]);
	if (isset($response->head->status)) :
		if ($response->head->status) :
			$response = ___tagembed__manageApiResponse($response);
			if (!empty($response->userId)) :
				return $response->userId;
			endif;
		endif;
	endif;
	return false;
}
/* --End--Manage Chat Hide And Show */
/* --Start-- Show Admin General Notification After Login And Register */
function ___tagembed__generalAdminNotice()
{
	$__tagmebed__page_name = '';
	if (!empty($_GET['page'])) :
		$__tagmebed__page_name = ___tagembed__sanitizeRequestData($_GET);
		$__tagmebed__page_name = $__tagmebed__page_name['page'];
	endif;
	$response = ___tagembed__wpApiCall(TAGEMBED_PLUGIN_API_URL . 'apiaccount/notification', ['callBy' => 'wordpress'], []);
	if (!is_wp_error($response)) :
		if (isset($response->head->status)) :
			$response = ___tagembed__manageApiResponse($response);
			if (!empty($response->notifications) && is_array($response->notifications)) :
				$htmlData = '';
				foreach ($response->notifications as $notifications) :
					if ('tagembed' == $notifications->location || 'inner' == $notifications->location) :
						if ('tagembed' != $__tagmebed__page_name) :
							continue;
						endif;
						$htmlData .= '<div class=\'notice notice-' . esc_html($notifications->type) . 'is-dismissible\'>';
						$htmlData .= '<p>' . $notifications->message . '</p>';
						$htmlData .= '</div>';
					elseif ('all' == $notifications->location) :
						$htmlData .= '<div class=\'notice	notice-' . esc_html($notifications->type) . 'is-dismissible\'>';
						$htmlData .= '<p>' . $notifications->message . '</p>';
						$htmlData .= '</div>';
					endif;
				endforeach;
				echo wp_kses_post($htmlData);
			endif;
		endif;
	endif;
}
add_action('in_admin_header', '___tagembed__hideGeneralAdminNotice');
function ___tagembed__hideGeneralAdminNotice()
{
	$__tagmebed__page_name = '';
	if (!empty($_GET['page'])) :
		$__tagmebed__page_name = ___tagembed__sanitizeRequestData($_GET);
		$__tagmebed__page_name = $__tagmebed__page_name['page'];
	endif;
	if ('tagembed' == $__tagmebed__page_name) :
		remove_all_actions('admin_notices');
		remove_all_actions('all_admin_notices');
	endif;
	if (!empty(___tagembed__user())) :
		add_action('admin_notices', '___tagembed__generalAdminNotice');
	endif;
}
/* --End-- Show Admin General Notification After Login And Register */
/* --End-- Drop Database Table */
/* --Start-- Create Short Code */
function ___tagembed__PluginShortCode($__tagembed__shortCodeAttr)
{
	/* extract(shortcode_atts(['width' => '', 'height' => '',], $attr, 'tagembed'));
      $widgetId = isset($attr[1]) ? $attr[1] : ''; */
	$__tagembed__shortCodeDefaultAttr = ['width' => '', 'height' => '', 1 => ''];
	$__tagembed__shortCodeAttr = shortcode_atts($__tagembed__shortCodeDefaultAttr, $__tagembed__shortCodeAttr, 'tagembed');
	$width = isset($__tagembed__shortCodeAttr['width']) ? sanitize_text_field($__tagembed__shortCodeAttr['width']) : '';
	$height = isset($__tagembed__shortCodeAttr['height']) ? sanitize_text_field($__tagembed__shortCodeAttr['height']) : '';
	$widgetId = isset($__tagembed__shortCodeAttr[1]) ? sanitize_text_field($__tagembed__shortCodeAttr[1]) : '';
	if (!empty($widgetId) && is_numeric($widgetId) && (('' === $width || preg_match('/^\d+(px|%|)$/', $width)) && ('' === $height || preg_match('/^\d+(px|%|)$/', $height)))) :
		$output = '<div class=\'tagembed-widget\' style=\'width:' . esc_attr($width) . '; height:' . esc_attr($height) . ';\' data-widget-id=\'' . esc_attr($widgetId) . '\' view-url=\'https://widget.tagembed.com/' . esc_attr($widgetId) . '\'></div>';
	else :
		$output = '<span style=\'display: block; text-align: center; border: 1px solid #eee; padding: 5px 15px; background-color: #fafafa;\'>Invalid Parameters Provided In The Tagembed Shortcode.</span>';
	endif;
	return $output;
}
add_shortcode('tagembed', '___tagembed__PluginShortCode');
/* --End-- Create Short Code */
