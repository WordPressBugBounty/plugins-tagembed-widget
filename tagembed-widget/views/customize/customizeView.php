<?php
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headView.php';
include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/headerView.php';
wp_enqueue_script('__script-customize-js', TAGEMBED_PLUGIN_URL . '/assets/js/customize/tagembed.customize.script.js', ['jquery'], TAGEMBED_PLUGIN_VERSION, true);
?>
<!--Start-- Custom Css For Inherit Style-->
<style>
	.__tagembed__inherit_styles_font_color .__tagembed__colorWrap {
		background: #f2f2f2;
		color: #ddd;
		cursor: no-drop;
		box-shadow: 4px 0 0 0 #f2f2f2, -2px 0 0 0 #f2f2f2
	}

	.__tagembed__inherit_styles_font_color .__tagembed__colorWrap .__tagembed__colorSelector {
		opacity: .05;
		pointer-events: none
	}

	.__tagembed__inherit_styles_font_size>input {
		pointer-events: none;
		opacity: .2
	}

	.__tagembed__inherit_styles_font_size .__tagembed__lablename {
		position: relative
	}

	.__tagembed__inherit_styles_font_size .__tagembed__lablename::after {
		content: "";
		position: absolute;
		right: -270px;
		min-width: 270px;
		height: 20px;
		bottom: 4px;
		cursor: no-drop
	}

	.__tagembed__inherit_styles_font_family .__tagembed__ff_dropdwon {
		cursor: no-drop
	}

	.__tagembed__inherit_styles_font_family .__tagembed__ff_dropdwon .__tagembed__dd_first {
		background: #f2f2f2 !important;
		border-color: #f2f2f2 !important;
		pointer-events: none
	}

	.__tagembed__inherit_styles_font_family .__tagembed__ff_dropdwon .__tagembed__dd_first img {
		opacity: .2
	}

	.__tagembed__inherit_styles_font_family .__tagembed__ff_dropdwon .__tagembed__dd_first~ul {
		border-color: #f2f2f2 !important
	}

	.__tagembed_inherit_styles_setting {
		width: 100% !important;
		background: #f4f9ff;
		margin-left: 15px;
		margin-right: 15px;
		padding: 10px;
		display: flex;
		border: 1px solid #ddedff
	}

	.__tagembed_inherit_styles_setting .__tagembed__lablename {
		white-space: nowrap;
		width: auto !important;
		margin-right: 10px;
		position: relative
	}

	.__tagembed_inherit_styles_setting .__tagembed__lablename span {
		font-weight: 500
	}

	.__tagembed_inherit_styles_setting .__tagembed__lablename .__tagembed__tooltip {
		display: none
	}

	.__tagembed_inherit_styles_setting .__tagembed__lablename .fa-info-circle:hover~.__tagembed__tooltip {
		position: absolute;
		background: #fff;
		width: 120px;
		z-index: 9;
		display: block;
		top: -16px;
		right: -130px;
		box-shadow: 0 0 5px #eee;
		padding: 10px;
		font-size: 12px;
		font-weight: 400;
		white-space: normal;
		height: auto
	}
</style>
<!--End-- Custom Css For Inherit Style-->
<div id="__tagembed__customizesec" class="__tagembed__customization">
	<div class="__tagembed__customization_title">
		<h3>Customize Feeds</h3>
	</div>
	<div id="__tagembed__customization_section" style="display: none;" class="__tagembed___customization_contain">
		<!--Start-- Left Side Bar-->
		<div class="__tagembed__customization_left">
			<div class="__tagembed__customization_left_inn">
				<ul>
					<li onclick="__tagembed__manageCustomizeMenueHideShow('ls');"><a id="__tagembed__layout_settings_menue" href="javascript:void(0);">Layout Settings</a></li>
					<li onclick="__tagembed__manageCustomizeMenueHideShow('cs');"><a id="__tagembed__card_settings_menue" href="javascript:void(0);" class="__tagembed__active">Card Settings</a></li>
					<li onclick="__tagembed__manageCustomizeMenueHideShow('os');"><a id="__tagembed__other_settings_menue" href="javascript:void(0);">Other Settings</a></li>
					<li onclick="__tagembed__manageCustomizeMenueHideShow('fo');"><a id="__tagembed__footer_settings_menue" href="javascript:void(0);">Footer</a></li>
				</ul>
			</div>
		</div>
		<!--End-- Left Side Bar-->

		<!--Start-- Right Side Bar-->
		<div class="__tagembed__customization_right">
			<input type="hidden" id="__tagembed__personalization_id" value="" />
			<input type="hidden" id="__tagembed__themeRule_id" value="" />
			<!--Start-- Layout Settings -->
			<div id="__tagembed__layout_settings" class="__tagembed__container __tagembed__layout_settings" style="display:none; ">
				<div class="__tagembed__row">
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Total Number of Posts to Display</label>
						<input id="__tagembed__total_noptd" class="__tagembed__input" type="number" min="1" max="100" placeholder="25" />
					</div>
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Column Count (Desktop)</label>
						<select id="__tagembed__columnCount">
							<option value="0">Responsive</option>
							<option value="2">2 Columns</option>
							<option value="3">3 Columns</option>
							<option value="4">4 Columns</option>
							<option value="5">5 Columns</option>
						</select>
					</div>
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Column Count (Mobile)</label>
						<select id="__tagembed__columnCountMobile">
							<option value="0">Responsive</option>
							<option value="2">2 Columns</option>
						</select>
					</div>
				</div>
				<div class="__tagembed__row">
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Maximum Post Width (<span id="__tagembed__post_width_range_value_section"></span>Px)</label>
						<input id="__tagembed__post_mw" onchange="__tagembed__showRangeInputValue(this.value, '__tagembed__post_width_range_value_section');" value="" type="range" min="150" max="500" value="" class="__tagembed_range">
					</div>
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Post Spacing (<span id="__tagembed__post_spacing_range_value_section"></span>Px)</label>
						<input id="__tagembed__ps" onchange="__tagembed__showRangeInputValue(this.value, '__tagembed__post_spacing_range_value_section');" type="range" min="0" max="50" value="" class="__tagembed_range">
					</div>
				</div>
				<div class="__tagembed__row">
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Hide Text Only Posts</label>
						<div class="__tagembed__toggleOnBut __tagembed__switch">
							<div class="__tagembed__onoffswitch">
								<input type="checkbox" id="__tagembed__hide_top_ck" class="__tagembed__onoffswitch-checkbox __tagembed__updateStatus">
								<label class="__tagembed__onoffswitch-label" for="__tagembed__hide_top_ck">
									<span class="__tagembed__onoffswitch-inner"></span>
									<span class="__tagembed__onoffswitch-switch" style="background: rgb(152, 152, 152);"></span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="__tagembed__row">
					<div class="__tagembed__col">
						<div class="__tagmebed__layoutQuick_settings">
							<label class="__tagembed__lablename">Action on Post Click</label>
							<ul>
								<li>
									<input type="radio" id="__tagembed__featured_popup" name="__tagembed__popup_option" value="featuredPopup" />
									<img src="<?php echo esc_html(TAGEMBED_PLUGIN_URL); ?>assets/images/customization/featured-popup.svg" alt="Featured Popup" />
									<span>Featured Popup</span>
								</li>
								<li>
									<input type="radio" id="__tagembed__direct_to_source" name="__tagembed__popup_option" value="directToSource" />
									<img src="<?php echo esc_html(TAGEMBED_PLUGIN_URL); ?>assets/images/customization/direct-to-source.svg" alt="Direct to Source" />
									<span>Direct to Source</span>
								</li>
								<li>
									<input type="radio" id="__tagembed__none" name="__tagembed__popup_option" value="none" />
									<img src="<?php echo esc_html(TAGEMBED_PLUGIN_URL); ?>assets/images/customization/none.svg" alt="None" />
									<span>None</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="__tagembed__row">
					<div class="__tagembed__col __tagembed__applyBtn">
						<a class="__tagembed__btn" href="javascript:void(0);" onclick="__tagembed__updateCustomizationOption('layout');">Apply Settings</a>
					</div>
				</div>
			</div>
			<!--End-- Layout Settings -->
			<!--Start-- Card Settings -->
			<div id="__tagembed__card_settings" class="__tagembed__container __tagembed__card_settings" style="display: block;">
				<div class="__tagembed__row">
					<div class="__tagembed__col __tagembed_inherit_styles_setting">
						<label class="__tagembed__lablename"><span>Use Your Website Settings</span> (recommended) <i class="fa fa-info-circle" title="" aria-hidden="true"></i><span class="__tagembed__tooltip">Properties of your websites will be automatically applied on the widget once you embed.</span></label>
						<div class="__tagembed__toggleOnBut __tagembed__switch">
							<div class="__tagembed__onoffswitch">
								<input type="checkbox" id="__tagembed__show_is_ck" onchange="__tagembed__manageInheritStylesCustomizeOptions();" class="__tagembed__onoffswitch-checkbox __tagembed__updateStatus">
								<label class="__tagembed__onoffswitch-label" for="__tagembed__show_is_ck">
									<span class="__tagembed__onoffswitch-inner"></span>
									<span class="__tagembed__onoffswitch-switch" style="background: rgb(152, 152, 152);"></span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="__tagembed__row">
					<div class="__tagembed__col" id="__tagembed__inherit_styles_font_color">
						<label class="__tagembed__lablename">Font Color</label>
						<div class="__tagembed__colorWrap">
							<input id="__tagembed__fontColor" value="#1f1b1b" class="__tagembed__colorSelector" type="color" onchange="__tagembed__showColorInputValue(this.value, '__tagembed__post_font_color_value_section');" style="border:">
							<span id="__tagembed__post_font_color_value_section" class="__tagembed_selected_color_code"></span>
						</div>
					</div>
					<div class="__tagembed__col" id="__tagembed__inherit_styles_font_family">
						<label class="__tagembed__lablename">Font Family</label>
						<div class="__tagembed__ff_dropdwon">
							<div class="__tagembed__dd_first">
								Select Font Family
							</div>
							<ul>
								<?php
								for ($i = 0; $i < 26; $i++) :
									if (in_array($i, [6, 8, 20, 21, 22, 23])) :
										continue;
									endif;
								?>
									<li class="__tagembed__dd_inputoption" data-value="<?php echo esc_html($i); ?>">
										<img src="<?php echo esc_html(TAGEMBED_PLUGIN_URL); ?>assets/images/fonts/<?php echo esc_html($i); ?>.png" alt="" />
									</li>
								<?php
								endfor;
								?>
							</ul>
							<input type="hidden" id="__tagembed__font_family" value="" />
						</div>
					</div>
					<div class="__tagembed__col" id="__tagembed__inherit_styles_auther_font_color">
						<label class="__tagembed__lablename">Author Font Color</label>
						<div class="__tagembed__colorWrap">
							<input class="__tagembed__colorSelector" onchange="__tagembed__showColorInputValue(this.value, '__tagembed__author_font_color_value_section');" type="color" value="" id="__tagembed__authorFontColor" style="border:">
							<span id="__tagembed__author_font_color_value_section" class="__tagembed_selected_color_code"></span>
						</div>
					</div>
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Card Color</label>
						<div class="__tagembed__colorWrap">
							<input onchange="__tagembed__showColorInputValue(this.value, '__tagembed__card_color_value_section');" class="__tagembed__colorSelector" type="color" id="__tagembed__cardColor" style="border:">
							<span id="__tagembed__card_color_value_section" class="__tagembed_selectedColor_code"></span>
						</div>
					</div>
				</div>
				<div class="__tagembed__row">
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Show Share Options</label>
						<div class="__tagembed__toggleOnBut __tagembed__switch">
							<div class="__tagembed__onoffswitch">
								<input type="checkbox" id="__tagembed__show_so_ck" class="__tagembed__onoffswitch-checkbox __tagembed__updateStatus">
								<label class="__tagembed__onoffswitch-label" for="__tagembed__show_so_ck">
									<span class="__tagembed__onoffswitch-inner"></span>
									<span class="__tagembed__onoffswitch-switch" style="background: rgb(152, 152, 152);"></span>
								</label>
							</div>
						</div>
					</div>
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Hide Content</label>
						<div class="__tagembed__toggleOnBut __tagembed__switch">
							<div class="__tagembed__onoffswitch">
								<input type="checkbox" id="__tagembed__hide_c_ck" class="__tagembed__onoffswitch-checkbox __tagembed__updateStatus">
								<label class="__tagembed__onoffswitch-label" for="__tagembed__hide_c_ck">
									<span class="__tagembed__onoffswitch-inner"></span>
									<span class="__tagembed__onoffswitch-switch" style="background: rgb(152, 152, 152);"></span>
								</label>
							</div>
						</div>
					</div>
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Show Author Details</label>
						<div class="__tagembed__toggleOnBut __tagembed__switch">
							<div class="__tagembed__onoffswitch">
								<input type="checkbox" id="__tagembed__show_ad_ck" class="__tagembed__onoffswitch-checkbox __tagembed__updateStatus">
								<label class="__tagembed__onoffswitch-label" for="__tagembed__show_ad_ck">
									<span class="__tagembed__onoffswitch-inner"></span>
									<span class="__tagembed__onoffswitch-switch" style="background: rgb(152, 152, 152);"></span>
								</label>
							</div>
						</div>
					</div>
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Show Date</label>
						<div class="__tagembed__toggleOnBut __tagembed__switch">
							<div class="__tagembed__onoffswitch">
								<input type="checkbox" id="__tagembed__show_date_ck" class="__tagembed__onoffswitch-checkbox __tagembed__updateStatus">
								<label class="__tagembed__onoffswitch-label" for="__tagembed__show_date_ck">
									<span class="__tagembed__onoffswitch-inner"></span>
									<span class="__tagembed__onoffswitch-switch" style="background: rgb(152, 152, 152);"></span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="__tagembed__row">
					<div class="__tagembed__col" id="__tagembed__inherit_styles_font_size">
						<label class="__tagembed__lablename">Font Size (<span id="__tagembed__post_font_size_section"></span>px)</label>
						<input id="__tagembed__post_font_size" onchange="__tagembed__showRangeInputValue(this.value, '__tagembed__post_font_size_section');" type="range" min="10" max="30" value="" class="__tagembed_range" style="max-width:270px">
					</div>
				</div>
				<div class="__tagembed__row">
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Number Of Line Trim</label>
						<select id="__tagembed__linetrim">
							<option value="0">Default</option>
							<option value="2">2 Lines</option>
							<option value="3">3 Lines</option>
							<option value="4">4 Lines</option>
							<option value="5">5 Lines</option>
						</select>
					</div>
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Image Aspect Ratio</label>
						<select id="__tagembed__aspectimageratio">
							<option value="0">Default</option>
							<option value="100">1:1 Square</option>
							<option value="66.66">3:2 Standard</option>
							<option value="150">2:3 Standard (Vertical)</option>
							<option value="75">4:3 Four-Three</option>
							<option value="133.33">3:4 Four Three Vertical</option>
							<option value="56.25">16:9 Widescreen</option>
							<option value="177.77">9:16 Widescreen (Vertical)</option>
						</select>
					</div>
				</div>
				<div class="__tagembed__row">
					<div class="__tagembed__col __tagembed_singlerow">
						<label class="__tagembed__lablename">Text Alignment</label>
						<div class="__tagembed__radio_button">
							<span>
								<input type="radio" id="__tagembed__left_alignment" name="__tagembed__alignment_option" value="left" />
								<label for="__tagembed__left_alignment" title="Left Align">
									<svg width="23" height="23" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
										<rect fill="none" height="256" width="256" />
										<path d="M40,76H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Z" />
										<path d="M40,116H168a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Z" />
										<path d="M216,140H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
										<path d="M168,180H40a8,8,0,0,0,0,16H168a8,8,0,0,0,0-16Z" />
									</svg>
								</label>
							</span>
							<span>
								<input type="radio" id="__tagembed__center_alignment" name="__tagembed__alignment_option" value="center" />
								<label for="__tagembed__center_alignment" title="Center Align">
									<svg width="23" height="23" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
										<rect fill="none" height="256" width="256" />
										<path d="M40,76H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Z" />
										<path d="M64,100a8,8,0,0,0,0,16H192a8,8,0,0,0,0-16Z" />
										<path d="M216,140H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
										<path d="M192,180H64a8,8,0,0,0,0,16H192a8,8,0,0,0,0-16Z" />
									</svg>
								</label>
							</span>
							<span>
								<input type="radio" id="__tagembed__right_alignment" name="__tagembed__alignment_option" value="right" />
								<label for="__tagembed__right_alignment" title="Right Align">
									<svg width="23" height="23" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
										<rect fill="none" height="256" width="256" />
										<path d="M40,76H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Z" />
										<path d="M216,100H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
										<path d="M216,140H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
										<path d="M216,180H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
									</svg>
								</label>
							</span>
						</div>
					</div>
					<div class="__tagembed__col __tagembed_singlerow">
						<label class="__tagembed__lablename">Card Curve</label>
						<div class="__tagembed__radio_button">
							<span>
								<input type="radio" value="0" id="__tagembed__square_curve" name="__tagembed__curve_option" />
								<label for="__tagembed__square_curve" title="Square Curve">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
										<path fill-rule="evenodd" d="M15.833 4.167V17.5h-1.568V5.735H2.5V4.167z"></path>
									</svg>
								</label>
							</span>
							<span>
								<input type="radio" value="8" id="__tagembed__rounded_corner" name="__tagembed__curve_option" />
								<label for="__tagembed__rounded_corner" title="Rounded Corners">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
										<path fill-rule="evenodd" d="M9.82 4.167a6.013 6.013 0 016.01 5.839l.003.174v7.32h-1.568v-7.32a4.445 4.445 0 00-4.289-4.442l-.156-.003H2.5V4.167h7.32z"></path>
									</svg>
								</label>
							</span>
							<span>
								<input type="radio" value="24" id="__tagembed__circular_corner" name="__tagembed__curve_option" />
								<label for="__tagembed__circular_corner" title="Circular Corners">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
										<path fill-rule="evenodd" d="M3.284 4.167c6.856 0 12.428 5.498 12.547 12.326l.002.223v.784h-1.568v-.784c0-5.994-4.803-10.866-10.77-10.979l-.21-.002H2.5V4.167h.784z"></path>
									</svg>
								</label>
							</span>
						</div>
					</div>
				</div>
				<!--
		    <div class="__tagembed__row">
			    <div class="__tagembed__col">
				    <div class="__tagmebed__layoutQuick_settings __tagembed__mt_zero">
					    <label class="__tagembed__lablename __tagembed__mt_zero">Theme Type</label>
					    <ul>
						    <li>
							    <input type="radio" id="__tagembed__light_theme" name="__tagembed__theme_option" value="0" />
							    <img src="< ?php echo esc_html(TAGEMBED_PLUGIN_URL);?>assets/images/customization/light-theme.svg" alt="Featured Popup" />
							    <span>Light Theme</span>
						    </li>
						    <li>
							    <input type="radio" id="__tagembed__dark_theme" name="__tagembed__theme_option" value="1" />
							    <img src="< ?php echo esc_html(TAGEMBED_PLUGIN_URL);?>assets/images/customization/dark-theme.svg" alt="Direct to Source" />
							    <span>Dark Theme</span>
						    </li>
					    </ul>
				    </div>
			    </div>
		    </div>
		-->
				<div class="__tagembed__row">
					<div class="__tagembed__col __tagembed__applyBtn">
						<a class="__tagembed__btn" href="javascript:void(0);" onclick="__tagembed__updateCustomizationOption('card');">Apply Settings</a>
					</div>
				</div>
			</div>
			<!--End-- Card Settings -->
			<!--Start-- Other Settings -->
			<div id="__tagembed__other_settings" class="__tagembed__container __tagembed__layout_settings" style="display:none; ">
				<div class="__tagembed__customtextarea">
					<div class="__tagembed_ct_header">
						<code>Custom Css</code>
					</div>
					<textarea id="__tagembed__custom_css" placeholder="/* Write your custom CSS here */"></textarea>
				</div>
				<div class="__tagembed__row">
					<div class="__tagembed__col __tagembed__applyBtn">
						<a class="__tagembed__btn" href="javascript:void(0);" onclick="__tagembed__updateCustomizationOption('other');">Apply Settings</a>
					</div>
				</div>
			</div>
			<!--End-- Other Settings -->
			<!--Start-- Footer Settings -->
			<div id="__tagembed__footer_settings" class="__tagembed__container __tagembed__layout_settings" style="display:none; ">
				<div class="__tagembed__row">
					<div class="__tagembed__col">
						<div class="__tagmebed__layoutQuick_settings">
							<label class="__tagembed__lablename">Show More</label>
							<ul>
								<li>
									<input type="radio" id="__tagembed__show_more" name="__tagembed__show_option" onclick="__tagembed__manageShowMoreTextSectionHideShow('show');" value="showMore" />
									<img src="<?php echo esc_html(TAGEMBED_PLUGIN_URL); ?>assets/images/customization/showMore.svg" alt="Show More" />
									<span>Show More</span>
								</li>
								<li>
									<input type="radio" id="__tagembed__auto_load" name="__tagembed__show_option" onclick="__tagembed__manageShowMoreTextSectionHideShow('hide');" value="autoScrollStatus" />
									<img src="<?php echo esc_html(TAGEMBED_PLUGIN_URL); ?>assets/images/customization/autoScroll.svg" alt="Auto Load" />
									<span>Auto Load</span>
								</li>
								<li>
									<input type="radio" id="__tagembed__showmore_autoload_none" onclick="__tagembed__manageShowMoreTextSectionHideShow('hide');" name="__tagembed__show_option" value="none" />
									<img src="<?php echo esc_html(TAGEMBED_PLUGIN_URL); ?>assets/images/customization/showMoreAutoLoadNone.svg" alt="None" />
									<span>None</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="__tagembed__row" id="__tagembed__show_more_text_sectction" style="display: none;">
					<div class="__tagembed__col">
						<label class="__tagembed__lablename">Show More Text</label>
						<input id="__tagembed__show_more_txt" class="__tagembed__input" type="text" placeholder="Show More" />
					</div>
				</div>
				<div class="__tagembed__row">
					<div class="__tagembed__col __tagembed__applyBtn">
						<a class="__tagembed__btn" href="javascript:void(0);" onclick="__tagembed__updateCustomizationOption('footer');">Apply Settings</a>
					</div>
				</div>
			</div>
			<!--End-- Footer Settings -->
		</div>
		<!--End-- Right Side Bar-->
	</div>
</div>
<?php include_once TAGEMBED_PLUGIN_DIR_PATH . 'views/includes/footerView.php'; ?>