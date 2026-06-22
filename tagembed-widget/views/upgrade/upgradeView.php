<?php
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__script-upgrade-js', TAGEMBED_PLUGIN_URL . '/assets/js/upgrade/tagembed.upgrade.script.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
?>

<div class="__tagembed__support" id="__tagembed__support_section" style="display: none;">
	<h3><span style="font-size: 12px;">🔗</span> <a href="https://tagembed.com/support/" target="_blank">We’re Here to Help You Succeed -</a></h3>
	<p>You've signed up with Tagembed, and your upgrade will be managed from your Tagembed account.
		To upgrade your plan, manage your subscription, or view billing details, please visit the Tagembed app.</p>
	</br>
	<a class="__tagembed__btn" href="https://app.tagembed.com/price" target="_blank" id="__tagembed__book_demo_free_btn"> Upgrade Now</a>
	<a class="__tagembed__btn __tagembed__intercom_chat_btn" href="javascript:void(0);"> Chat with Us</a>
</div>

<div id="__tagembed__upgrade_plan_section" style="display: none;">
	<div class="__tagembed__sourcerow __tagembed__pricesection">
		<div class="__tagembed__tabheading">
			<h3>Plan Subscriptions</h3>
		</div>
		<div class="__tagembed__priceswitcher">
			<a href="javascript:void(0);" id="__tagembbed__monthely_price_button" onclick="__tagembed__manageSelectPlanPrice('monthely');">Monthly</a>
			<a href="javascript:void(0);" id="__tagembbed__yearly_price_button" onclick="__tagembed__manageSelectPlanPrice('yearly');" class="__tagembed__active">Yearly (Save 20%)</a>
		</div>
		<div class="__tagembed__fourplan" id="__tagembed__plan"></div>
		<!--Start--All Feature Section -->
		<div id="__tagembed__all_feacture_section" class="__tagembed__planfeatures" style="display:none;"></div>
		<div class="__tagembed__showallfeatures">
			<button id="__tagembed__all_feacture_button" onclick="__tagembed__manageAllFeactureHideShow();" class="__tagembed__btn">Show All Features</button>
		</div>
		<!--End--All Feature Section -->
	</div>
	<!--Start--Account Upgrade Popup-->
	<div id="__tagembed__upgrade_account_popup" class="__tagembed__overlay" style="display:none;"></div>
	<!--End--Account Upgrade Popup-->
</div>

<?php include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>