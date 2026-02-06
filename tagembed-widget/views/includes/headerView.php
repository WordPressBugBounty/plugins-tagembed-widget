<div class="__tagembed__tabing">
	<div class="__tagembed__tabingone">
		<div class="__tagembed__menumob">
			<ul>
				<li><span>Menu</span><a href="javascript:void(0)" id="__tagembed__burger" onclick="__tagembed__manageMenueHideShowInMobile();"><i class="fa fa-bars" aria-hidden="true"></i></a></li>
			</ul>
		</div>
		<ul class="__tagembed__mainmenu" id="__tagembed__menulist">
			<?php
			$i = 1;
			foreach ($__tagembed__menus	as	$__tagembed__menu) :
				if ($__tagembed__menu->status) :
					$__tagembed__active_menue_id = $__tagembed__menu->id;
				endif;
				if ($__tagembed__menu->id <= 6) :
			?>
					<li onclick="__tagembed__menus('<?php echo esc_html($__tagembed__menu->id); ?>')" class="__tagembed__tablinks<?php echo esc_html($__tagembed__menu->status) == 1 ? ' __tagembed__active ' : ''; ?>"> <span><?php echo esc_html($i); ?></span> <?php echo esc_html($__tagembed__menu->name); ?></li>
				<?php else : ?>
					<li onclick="__tagembed__menus('<?php echo esc_html($__tagembed__menu->id); ?>')" class="__tagembed__tablinks <?php echo esc_html($__tagembed__menu->status) == 1 ? ' __tagembed__active ' : ''; ?>"><?php echo esc_html($__tagembed__menu->name); ?></li>
			<?php
				endif;
				$i++;
			endforeach;
			?>
		</ul>
		<ul class="__tagembed__branding">
			<li><a href="https://tagembed.com/" target="_blank"><img src="<?php echo esc_html(TAGEMBED_PLUGIN_URL); ?>assets/images/logo.svg" alt="tagembed" /></a></li>
		</ul>
	</div>
	<div class="__tagembed__tabingtwo">
		<div class="__tagembed__tabtwoleft">
			<div class="__tagembed__selectwid">
				<?php if (!empty($__tagembed__widgets)) : ?>
					<?php if (!in_array($__tagembed__active_menue_id, [1,	7,	8,	9,	10])):	?>
						<span class="<?php echo in_array($__tagembed__active_menue_id, [2]) ? 'add-select-widget' : ""; ?> ">Selected Widget</sub></span>
						<select name="__tagembed__widgets" id="__tagembed__widgets">
							<?php foreach ($__tagembed__widgets	as	$__tagembed__widget) : ?>
								<option <?php echo $__tagembed__active_widget_id == $__tagembed__widget->id ? 'selected' : ''; ?> value="<?php echo esc_html($__tagembed__widget->id); ?>#<?php echo esc_html($__tagembed__widget->name); ?>"><?php echo esc_html($__tagembed__widget->name); ?></option>
							<?php endforeach; ?>
						</select>
					<?php endif; ?>
				<?php else: ?>
					<div> <b>NOTE :</b> Create at least one widget </div>
					<a class="__tagembed__btn" href="javascript:void(0);" id="__tagembed__widget_create_form">Create</a>
				<?php endif; ?>
			</div>
		</div>
		<div class="__tagembed__tabtworight">
			<div class="__tagembed__msg">
				<img style="margin-top: -2px;" src="<?php echo esc_html(TAGEMBED_PLUGIN_URL); ?>assets/images/profile.png" />
				<div class="__tagembed__showemail">
					<b>Hi,</b>
					<?php echo esc_html($__tagembed__active_widget_user_name); ?>
					<?php echo '<b style=\'color: #3871b1;\'> ( ' . esc_html($__tagembed__active_widget_user_email_id) . ' )</b>'; ?>
				</div>
			</div>
			<a href="javascript:void(0);" id="__tagembed__logout" class="__tagembed__logout">
				<em>Switch account</em>
				<span>
					<img src="<?php echo esc_html(TAGEMBED_PLUGIN_URL); ?>assets/images/turn-off.png" alt="Sign Out" />
					<i>Sign Out</i>
				</span>
			</a>
		</div>
	</div>
</div>
<!--Start-- Manage Tagembed Loader How OR Not -->
<script>
	var __tagembed__loader_status = <?php echo in_array($__tagembed__active_menue_id, [5]) ? 0 : 1; ?>;
</script>
<!--End-- Manage Tagembed Loader How OR Not -->