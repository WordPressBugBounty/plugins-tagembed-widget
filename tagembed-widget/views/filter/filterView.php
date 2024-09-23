<?php
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__script-filter-js', TAGEMBED_PLUGIN_URL . '/assets/js/filter/tagembed.filter.script.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
?>
<div class="__tagembed__filter">
	<div class="" id="__tagembed__widget_filter_section_id"></div>
</div>
<?php include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/footerView.php';	?>
