<?php
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
$__tagembed__social_account_id = ___tagembed__get_user_social_account_id();
?>
<!--Start-- Get And Manage Social Accounts -->
<iframe allow="clipboard-write" name="<?php	echo esc_html(TAGEMBED_PLUGIN_CALL_BACK_URL); ?>" src="<?php echo esc_html(TAGEMBED_PLUGIN_SERVER_URL); ?>socialaccounts/index/<?php echo esc_html($__tagembed__social_account_id); ?>" class="__tagembed__analytics" width="100%" height="100%"></iframe>
<?php include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>