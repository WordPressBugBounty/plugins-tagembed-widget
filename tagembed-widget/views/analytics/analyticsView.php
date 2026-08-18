<?php
if (!defined('ABSPATH')) :
	exit;
endif;
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
?>
<div>
	<iframe src="<?php echo esc_url(TAGEMBED_PLUGIN_SERVER_URL . 'analytics?userId=' . $__tagembed__active_widget_user_id); ?>" class="__tagembed__analytics" width="100%" height="100%" title="Tagembed Analytics"></iframe>
</div>
<?php include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>