<?php
/**
 * Function to display Emi settings
 *
 * @author Anjali
 */
class WP_EMI_MC_Admin_Settings {
	/**
	 * Function to Initializes a new instance of the class WP_EMI_MC_Admin_Settings
	 *
	 * @return void
	 * @author Anjali
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'wp_emi_mc_options_menu' ) );

	}
	/**
	 * Function to create plugin menu EMI Settings
	 *
	 * @return void
	 * @author Anjali
	 */
	public function wp_emi_mc_options_menu() {
		add_menu_page( 'EMI Settings', 'EMI Calculator', 'manage_options', 'emi-settings-page', array( $this, 'wp_emi_mc_settings_page_func' ), 'dashicons-wp_emi_mc_icon', 6 );
	}
	/**
	 * Function to create page for emi settings
	 *
	 * @return void
	 * @author Anjali
	 */
	public function wp_emi_mc_settings_page_func(){?>
	<div class="wp_emi_mc_wrap"> <h1 class="wp_emi_mc_heading_inline">Emi Calculator Settings</h1> </div>
		<?php
		wp_nonce_field( basename( __FILE__ ), 'wp_emi_mc_nonce' );
		$wp_emi_mc_save_fixed = filter_input( INPUT_POST,'wp_emi_mc_save_fixed' );
		if ( isset( $wp_emi_mc_save_fixed ) ) {
			$metabox_nonce = wp_kses( filter_input( INPUT_POST, 'wp_emi_mc_nonce' ),array() );
			$wp_emi_mc_fetch_radio_value = filter_input( INPUT_POST, 'wp_emi_mc_radio', FILTER_SANITIZE_STRING );
			$wp_emi_mc_radio_val_array   = array( 'radio_value' => $wp_emi_mc_fetch_radio_value );
			update_option( 'radio_val_array', $wp_emi_mc_radio_val_array );
			$wp_emi_mc_get_radio_val = get_option( 'radio_val_array' );
			global $wpdb;
			$wp_emi_mc_table_name = $wpdb->prefix . 'loan_term_rates';
			$wp_emi_mc_table_val  = $wpdb->insert(
				$wp_emi_mc_table_name,
				array(
					'rate_per_annum' => filter_input( INPUT_POST, 'wp_emi_mc_rate_per_annum' ),
				),
				array( '%f' )
			);
				echo "<div class='wp_emi_mc_components_notice__content'>New Interest rate is Added</div>";
				session_start();
			if ( ! empty( $wp_emi_mc_fetch_radio_value ) ) {
				$_SESSION['wp_emi_mc_radio'] = filter_input( INPUT_POST, 'wp_emi_mc_radio', FILTER_SANITIZE_STRING );
			}
		}
		?>
		<div class="wp_emi_mc_calc" >
			<form method="post" action="">
				<div class="wp_emi_mc_option">
					<label><input type="radio" name="wp_emi_mc_radio" value="fixed" checked="checked"
					<?php
					$wp_emi_mc_radio_value = filter_input( INPUT_POST,'wp_emi_mc_radio' , FILTER_SANITIZE_STRING);
					if ( isset( $wp_emi_mc_radio_value ) && $wp_emi_mc_radio_value === 'fixed' ) {
						echo 'checked';}
					?>
						> Fixed Calculator </label>
					<label><input type="radio" name="wp_emi_mc_radio" value="dynamic" 
					<?php
					if ( isset( $wp_emi_mc_radio_value ) && $wp_emi_mc_radio_value === 'dynamic' ) {
						echo 'checked';}
					?>
						> Dynamic Calculator</label>
					<p class = "wp_emi_mc_label">Rate of Interest is Fixed, user can't change from frontend.</p>
				</div>
				<div class="wp_emi_mc_div">
					<p><label for="rate">Rate Per Annum (%) </label>
					<input name="wp_emi_mc_rate_per_annum" type="number" id="wp_emi_mc_rate_per_annum" step="0.01" min="0.00" max="99.90" value="<?php echo esc_attr( filter_input( INPUT_POST, 'wp_emi_mc_rate_per_annum' ) ); ?>" class="wp_emi_mc_regular-text" required />
					<input type="submit" name="wp_emi_mc_save_fixed" value="Save" class="wp_emi_mc_button"></p>
					<p class="wp_emi_mc_text">Using  [wp_emi_mortgage_calculator]  shortcode you can display the calculator in frontend</p>
				</div>
			</form>
		</div>
		<?php

	}
}

$wp_emi_mc_admin_settings = new WP_EMI_MC_Admin_Settings();
?>
