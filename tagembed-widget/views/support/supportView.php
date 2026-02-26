<?php
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__script-support-js', TAGEMBED_PLUGIN_URL . '/assets/js/support/tagembed.support.script.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
?>
<div class="__tagembed__support">
	<h3><span style="font-size: 12px;">🔗</span> <a href="https://tagembed.com/support/" target="_blank">We’re Here to Help You Succeed -</a></h3>
	<p>Whether you’re setting up your social media feeds, customizing layouts, or troubleshooting an issue, our team is here to help you get the most out of your social media feeds!</p>
	</br>
	<a style="display: none;" class="__tagembed__btn" href="https://meetings.hubspot.com/ankur35/meeting-with-tagbox" target="_blank" id="__tagembed__book_demo_free_btn"> Book a Demo</a>
	<a style="display: none;" class="__tagembed__btn" href="https://calendly.com/taggbox/csm" target="_blank" id="__tagembed__book_demo_paid_btn"> Book a Demo</a>
	<a class="__tagembed__btn __tagembed__intercom_chat_btn" href="javascript:void(0);"> Chat with Us</a>
</div>

<div class="__tagembed__support">
	<h3><span style="font-size: 12px;">🔗</span> <a href="https://wordpress.org/support/plugin/tagembed-widget/" target="_blank">Tagembed WordPress.org Support -</a></h3>
	<p>We actively monitor and answer all questions posted on WordPress.org</p>
</div>

<?php include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>