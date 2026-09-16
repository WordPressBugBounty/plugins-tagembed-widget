<?php
if (!defined('ABSPATH')) :
	exit;
endif;
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headView.php';
wp_enqueue_script('__tagembed__script-account-js', TAGEMBED_PLUGIN_URL . '/assets/js/account/tagembed.account.script.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
$__tagembed__google_error = get_transient('__tagembed__google_error_' . get_current_user_id());
if (!empty($__tagembed__google_error)) :
	delete_transient('__tagembed__google_error_' . get_current_user_id());
endif;
?>
<!--Start-- Other Plugin Popup-->
<style>
	.__tagembed__okaybtn:hover {
		color: #fff !important;
	}

	.__tagembed__google_divider {
		display: flex;
		align-items: center;
		margin: 18px 0 14px;
		color: #8c8f94;
		font-size: 13px;
	}

	.__tagembed__google_divider::before,
	.__tagembed__google_divider::after {
		content: "";
		flex: 1 1 auto;
		height: 1px;
		background: #dcdcde;
	}

	.__tagembed__google_divider span {
		padding: 0 10px;
	}

	.__tagembed__google_btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 40px;
		padding: 8px 14px;
		background: #fff;
		color: #3c4043;
		border: 1px solid #dadce0;
		border-radius: 0;
		font-size: 14px;
		font-weight: 500;
		line-height: 1.4;
		cursor: pointer;
	}

	.__tagembed__google_btn:hover {
		background: #f7f8f8;
		border-color: #c6c8ca;
	}

	.__tagembed__google_btn svg {
		width: 18px;
		height: 18px;
		display: block;
		margin-right: 10px;
	}
</style>
<div id="__tagembed__other_plugin_popup" class="__tagembed__other_plugin_popup"></div>
<!--End-- Other Plugin Popup-->

<div class="__tagembed__row">
	<div class="__tagembed__col __tagembed__col_12 __tagembed__login_account">
		<!--Error-->
		<div id="__tagembed__account_error" class="__tagembed__acount_error __tagembed__danger"<?php echo !empty($__tagembed__google_error) ? ' style="display:block;"' : ''; ?>> <?php echo !empty($__tagembed__google_error) ? esc_html($__tagembed__google_error) : 'Unknown email. Check again or try your email address.'; ?><br></div>
		<!--Tabbing-->
		<div id="__tagembed__account_tab_view" class="__tagembed__tabarea">
			<ul>
				<li><a id="__tagembed__account_login" onclick="__tagembed__manage_account_view('login')" href="javascript:void(0);" class="active">Login</a></li>
				<li><a id="__tagembed__account_register" onclick="__tagembed__manage_account_view('register')" href="javascript:void(0);">Register</a></li>
			</ul>
		</div>
		<!--Start-- Login View-->
		<div id="__tagembed__account_login_view" class="__tagembed__login_account_inn">
			<div class="__tagembed__login_with">
				<h2>Sign In</h2>
			</div>
			<p>Enter your email and password</p>
			<form action="javascript:void(0);" id="__tagembed__login_form">
				<div class="__tagembed__form_row">
					<input type="email" name="emailId" value="" placeholder="Email" required autofocus>
					<span id="__tagembed__login_email_id_error"></span>
				</div>
				<div class="__tagembed__form_row">
					<input type="password" name="password" value="" placeholder="Password" required>
					<span id="__tagembed__login_password_error"></span>
				</div>
				<div class="__tagembed__submit_sec">
					<a href="https://app.tagembed.com/accounts/forgotpassword/" target="_blank">Forgot Password</a>
					<a href="javascript:void(0);" onclick="__tagembed__manage_account_view('forgotPassword')"></a>
					<button type="submit" class="__tagembed__btn">Sign In</button>
				</div>
			</form>
			<div class="__tagembed__google_divider"><span>or</span></div>
			<button type="button" class="__tagembed__google_btn">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
					<path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
					<path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
					<path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
					<path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
				</svg>
				Continue with Google
			</button>
		</div>
		<!--End-- Login View-->
		<!--Start-- Register View-->
		<div id="__tagembed__account_register_view" class="__tagembed__register_inn">
			<div class="__tagembed__login_with">
				<h2>Sign Up</h2>
			</div>
			<p>Enter your details to create your account</p>
			<form action="javascript:void(0);" id="__tagembed__register_form">
				<div class="__tagembed__form_row">
					<input type="text" name="fullName" value="" placeholder="Full Name" required>
					<span id="__tagembed__register_full_name_error"></span>
				</div>
				<div class="__tagembed__form_row">
					<input type="email" name="emailId" value="" placeholder="Email" required>
					<span id="__tagembed__register_email_id_error"></span>
				</div>
				<div class="__tagembed__form_row">
					<select id="__tagembed__callingCode" name="calling_code" style="padding: 0 8px;line-height: 2; min-height: 30px;width: 100%;border-radius: 0; border: 1px solid #999;background-color: #fff;color: #2c3338;"></select>
					<span id="__tagembed__register_calling_code_error"></span>
				</div>
				<div class="__tagembed__form_row">
					<input type="number" name="contact_no" value="" placeholder="Contact Number">
					<span id="__tagembed__register_contact_no_error"></span>
				</div>
				<div class="__tagembed__form_row">
					<input type="password" name="password" value="" placeholder="Password" required>
					<span id="__tagembed__register_password_error"></span>
					<p style="font-size: 12px;color: #b5b5c3;font-weight: 400;max-width: 300px;margin-top: 10px;line-height: normal;">By clicking Create Account, you agree to our <a href="https://tagembed.com/terms-of-service/" target="_blank" style="cursor: pointer;">Terms of Service</a> and <a href="https://tagembed.com/privacy-policy/" target="_blank" style="cursor: pointer;">Privacy Policy</a></p>
				</div>
				<div class="__tagembed__submit_sec __tagembed__flexend">
					<button type="submit" class="__tagembed__btn">Create Account</button>
				</div>
			</form>
			<div class="__tagembed__google_divider"><span>or</span></div>
			<button type="button" class="__tagembed__google_btn">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
					<path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
					<path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
					<path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
					<path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
				</svg>
				Continue with Google
			</button>
		</div>
	</div>
</div>
<?php include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>