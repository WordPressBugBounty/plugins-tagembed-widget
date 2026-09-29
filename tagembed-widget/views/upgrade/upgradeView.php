<?php
if (!defined('ABSPATH')) :
	exit;
endif;
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__tagembed__script-upgrade-js', TAGEMBED_PLUGIN_URL . '/assets/js/upgrade/tagembed.upgrade.script.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
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
	<div class="__tagembed__billing_head">
		<h2 class="__tagembed__billing_title">Billing &amp; Plans</h2>
		<div class="__tagembed__billing_stats" id="__tagembed__billing_stats" style="display: none;">
			<div class="__tagembed__billing_stat">
				<span>Current Plan</span>
				<strong id="__tagembed__billing_stat_plan">&ndash;</strong>
			</div>
			<div class="__tagembed__billing_stat">
				<span>Renews</span>
				<strong id="__tagembed__billing_stat_renews">&ndash;</strong>
			</div>
			<div class="__tagembed__billing_stat">
				<span>Views Used</span>
				<strong id="__tagembed__billing_stat_views">&ndash;</strong>
			</div>
		</div>
	</div>
	<div class="__tagembed__plan_notice" id="__tagembed__plan_notice" style="display: none;">
		<strong id="__tagembed__plan_notice_title"></strong>
		<span id="__tagembed__plan_notice_message"></span>
	</div>
	<div class="__tagembed__upgrade_tabarea" id="__tagembed__upgrade_tabarea">
		<ul>
			<li><a href="javascript:void(0);" id="__tagembed__upgrade_tab_plan" class="__tagembed__active" onclick="__tagembed__manageUpgradeTab('plan');">Plan Subscriptions</a></li>
			<li id="__tagembed__upgrade_tab_invoice_item"><a href="javascript:void(0);" id="__tagembed__upgrade_tab_invoice" onclick="__tagembed__manageUpgradeTab('invoice');">Billing History<span class="__tagembed__tab_count" id="__tagembed__upgrade_tab_count" style="display: none;"></span></a></li>
		</ul>
	</div>
	<div class="__tagembed__sourcerow __tagembed__pricesection" id="__tagembed__upgrade_plan_panel">
		<div class="__tagembed__priceswitcher">
			<a href="javascript:void(0);" id="__tagembbed__monthely_price_button" onclick="__tagembed__manageSelectPlanPrice('monthely');">Monthly</a>
			<a href="javascript:void(0);" id="__tagembbed__yearly_price_button" onclick="__tagembed__manageSelectPlanPrice('yearly');" class="__tagembed__active">Yearly (Save 20%)</a>
		</div>
		<div class="__tagembed__fourplan" id="__tagembed__plan"></div>
		<!--Start--All Feature Section -->
		<div id="__tagembed__all_feacture_section" class="__tagembed__planfeatures" style="display:none;"></div>
		<div class="__tagembed__showallfeatures">
			<button id="__tagembed__all_feacture_button" onclick="__tagembed__manageAllFeactureHideShow();" class="__tagembed__btn">Compare All Plans</button>
		</div>
		<!--End--All Feature Section -->
	</div>
	<div class="__tagembed__sourcerow __tagembed__pricesection __tagembed__invoicesection" id="__tagembed__invoice_section" style="display: none;">
		<div class="__tagembed__card_wrap" id="__tagembed__card_wrap" style="display: none;"></div>
		<div class="__tagembed__invoice_wrap" id="__tagembed__invoice_wrap"></div>
		<p class="__tagembed__invoice_note" id="__tagembed__invoice_note" style="display: none;"></p>
	</div>
	<!--Start--Account Upgrade Popup-->
	<div id="__tagembed__upgrade_account_popup" class="__tagembed__overlay" style="display:none;"></div>
	<!--End--Account Upgrade Popup-->
</div>

<style>
	#__tagembed__upgrade_plan_section {
		float: left;
		clear: both;
		width: 100%;
		padding: 0 15px 6px;
		box-sizing: border-box;
		height: 100%;
		overflow-y: auto;
		max-height: calc(100% - 80px);
	}

	#__tagembed__upgrade_plan_section::-webkit-scrollbar {
		background-color: #f5f5f5;
		width: 6px;
	}

	#__tagembed__upgrade_plan_section::-webkit-scrollbar-thumb {
		background-color: #4179ff;
		border-radius: 0;
		-moz-border-radius: 0;
		-webkit-border-radius: 0;
	}

	.notice~.__tagembed__container #__tagembed__upgrade_plan_section {
		max-height: calc(100% - 50px);
	}

	.notice+.notice~.__tagembed__container #__tagembed__upgrade_plan_section {
		max-height: calc(100% - 90px);
	}

	#__tagembed__upgrade_plan_section .__tagembed__pricesection {
		height: auto;
		max-height: none;
		overflow-y: visible;
	}

	.__tagembed__billing_head {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: start;
		-ms-flex-align: start;
		align-items: flex-start;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		gap: 12px;
		margin: 14px 0 0;
	}

	.__tagembed__billing_title {
		margin: 0;
		padding: 4px 0 0;
		font-size: 20px;
		font-weight: 700;
		line-height: 1.2;
		color: #1d2327;
	}

	.__tagembed__plan_notice {
		margin: 14px 0 0;
		padding: 11px 16px;
		background: #fff;
		border: 1px solid #e5e5e5;
		border-left: 4px solid #dba617;
		border-radius: 0;
	}

	.__tagembed__plan_notice > strong {
		display: block;
		font-size: 13px;
		font-weight: 600;
		line-height: 1.4;
		color: #1d2327;
		margin: 0 0 2px;
	}

	.__tagembed__plan_notice span strong {
		display: inline;
		font-weight: 600;
		color: #1d2327;
	}

	.__tagembed__plan_notice span {
		display: block;
		font-size: 13px;
		font-weight: 400;
		line-height: 1.5;
		color: #50575e;
	}


	.__tagembed__billing_stats {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		background: #fff;
		border: 1px solid #e5e5e5;
	}

	.__tagembed__billing_stat {
		padding: 6px 14px;
		border-right: 1px solid #e5e5e5;
		min-width: 104px;
	}

	.__tagembed__billing_stat:last-child {
		border-right: 0;
	}

	.__tagembed__billing_stat span {
		display: block;
		font-size: 10px;
		font-weight: 500;
		letter-spacing: .6px;
		text-transform: uppercase;
		line-height: 1.4;
		color: #8c8f94;
		margin-bottom: 1px;
	}

	.__tagembed__billing_stat strong {
		display: block;
		font-size: 14px;
		font-weight: 600;
		line-height: 1.25;
		color: #1d2327;
	}

	.__tagembed__upgrade_tabarea {
		border-bottom: 1px solid #c3c4c7;
		margin: 12px 0 0;
	}

	.__tagembed__upgrade_tabarea ul {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.__tagembed__upgrade_tabarea ul li {
		margin: 0 28px 0 0;
	}

	.__tagembed__upgrade_tabarea ul li a {
		display: block;
		padding: 0 0 9px;
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		color: #8c8f94;
		text-decoration: none;
		border-bottom: 3px solid transparent;
		margin-bottom: -1px;
		-webkit-transition: 0.3s ease-in-out;
		-o-transition: 0.3s ease-in-out;
		transition: 0.3s ease-in-out;
	}

	.__tagembed__upgrade_tabarea ul li a:hover {
		color: #2271b1;
	}

	.__tagembed__upgrade_tabarea ul li a:focus {
		outline: 0;
		-webkit-box-shadow: none;
		box-shadow: none;
	}

	.__tagembed__upgrade_tabarea ul li a.__tagembed__active {
		color: #1d2327;
		border-bottom-color: #2271b1;
	}

	.__tagembed__tab_count {
		display: inline-block;
		margin-left: 7px;
		padding: 1px 7px;
		font-size: 11px;
		font-weight: 600;
		line-height: 17px;
		color: #2271b1;
		background: #eaf2f9;
		vertical-align: middle;
	}

	#__tagembed__upgrade_plan_panel,
	.__tagembed__invoicesection {
		margin-top: 18px;
	}

	.__tagembed__invoicesection {
		margin-bottom: 10px;
	}

	.__tagembed__card_wrap {
		margin-bottom: 14px;
		background: #fff;
		border: 1px solid #e5e5e5;
		padding: 16px 18px;
	}

	.__tagembed__card_head {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: .5px;
		text-transform: uppercase;
		color: #646970;
		margin: 0 0 10px;
	}

	.__tagembed__card_row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		flex-wrap: wrap;
	}

	.__tagembed__card_detail {
		font-size: 13px;
		color: #1d2327;
		line-height: 1.6;
	}

	.__tagembed__card_detail strong {
		font-weight: 600;
	}

	.__tagembed__card_expiry {
		color: #646970;
	}

	.__tagembed__card_expired {
		color: #d63638;
		font-weight: 600;
	}

	a.__tagembed__card_action {
		cursor         : pointer;
		display        : inline-block;
		background     : #2271b1;
		color          : #fff;
		border         : 0;
		border-radius  : 0;
		padding        : 0 14px;
		min-height     : 32px;
		min-width      : 62px;
		line-height    : 2.15;
		font-size      : 13px;
		font-weight    : 600;
		text-align     : center;
		text-decoration: none;
		text-shadow    : none;
		box-shadow     : none;
	}

	a.__tagembed__card_action:hover,
	a.__tagembed__card_action:focus,
	a.__tagembed__card_action:active {
		background     : #3a8dcc;
		color          : #fff;
		text-decoration: none;
	}

	.__tagembed__card_empty {
		font-size: 13px;
		color: #646970;
	}

	.__tagembed__invoice_wrap {
		background: #fff;
		border: 1px solid #e5e5e5;
		border-radius: 0;
		overflow-x: auto;
	}

	.__tagembed__invoice_table {
		width: 100%;
		max-width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		margin-bottom: 0;
	}

	.__tagembed__invoice_table th {
		background-color: #f6f7f7;
		color: #646970;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: .6px;
		text-transform: uppercase;
		text-align: left;
		white-space: nowrap;
		vertical-align: middle;
		padding: 11px 15px;
		border-bottom: 1px solid #e5e5e5;
	}

	.__tagembed__invoice_table td {
		background-color: #fff;
		color: #3f4254;
		font-size: 13px;
		font-weight: 400;
		vertical-align: middle;
		white-space: nowrap;
		padding: 13px 15px;
		border-bottom: 1px solid #f0f0f1;
	}

	.__tagembed__invoice_table tbody tr:last-child td {
		border-bottom: 0;
	}

	.__tagembed__invoice_table tbody tr:hover td {
		background-color: #fafafa;
	}

	.__tagembed__invoice_table .__tagembed__invoice_col_amount,
	.__tagembed__invoice_table .__tagembed__invoice_amount {
		text-align: left;
	}

	.__tagembed__invoice_table .__tagembed__invoice_col_action,
	.__tagembed__invoice_table .__tagembed__invoice_action {
		text-align: right;
	}

	.__tagembed__invoice_table .__tagembed__invoice_number {
		font-weight: 600;
		color: #1d2327;
	}

	.__tagembed__invoice_table .__tagembed__invoice_plan {
		white-space: normal;
	}

	.__tagembed__invoice_table .__tagembed__invoice_muted {
		color: #a1a5b7;
	}

	.__tagembed__invoice_table .__tagembed__invoice_coupon {
		display: block;
		margin-top: 3px;
		font-size: 11px;
		font-weight: 400;
		color: #4fa746;
	}

	.__tagembed__invoice_table .__tagembed__invoice_was {
		display: inline-block;
		margin-right: 6px;
		font-size: 12px;
		font-weight: 400;
		color: #a1a5b7;
		text-decoration: line-through;
	}

	.__tagembed__invoice_state {
		font-size: 13px;
		font-weight: 400;
		color: #3f4254;
	}

	.__tagembed__invoice_state.__tagembed__invoice_state_refunded {
		color: #b32d2e;
	}

	a.__tagembed__invoice_action_link {
		cursor         : pointer;
		display        : inline-block;
		background     : #2271b1;
		color          : #fff;
		border         : 0;
		border-radius  : 0;
		padding        : 0 14px;
		min-height     : 32px;
		min-width      : 62px;
		line-height    : 2.15;
		font-size      : 13px;
		font-weight    : 600;
		text-align     : center;
		text-decoration: none;
		text-shadow    : none;
		box-shadow     : none;
	}

	a.__tagembed__invoice_action_link:hover,
	a.__tagembed__invoice_action_link:focus,
	a.__tagembed__invoice_action_link:active {
		background     : #3a8dcc;
		color          : #fff;
		text-decoration: none;
	}

	.__tagembed__invoice_empty {
		text-align: center;
		color: #646970;
		padding: 30px 15px;
		font-size: 13px;
	}

	.__tagembed__invoice_note {
		margin: 12px 2px 0;
		font-size: 12px;
		color: #a1a5b7;
	}
	.__tagembed__container .__tagembed__row .__tagembed__pricesection .__tagembed__fourplan .__tagembed__planbox span.__tagembed__selectbtn_cancelled {
		background: #f6f7f7;
		color: #8c8f94;
		border: 1px solid #dcdcde;
		cursor: default;
		pointer-events: none;
		user-select: none;
		border-radius: 0;
	}

	.__tagembed__container .__tagembed__row .__tagembed__pricesection .__tagembed__fourplan .__tagembed__planbox span.__tagembed__selectbtn_cancelled:hover {
		background: #f6f7f7;
		color: #8c8f94;
	}
</style>

<?php include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>