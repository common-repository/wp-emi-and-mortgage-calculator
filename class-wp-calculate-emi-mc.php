<?php
/**
 * Plugin Name: WP EMI AND MORTGAGE CALCULATOR
 * Description: WP EMI AND MORTGAGE CALCULATOR- is a plugin to calculate EMI for entered amount
 * Version: 1.0.0
 * Author: Midnay
 * Author URI: https://midnay.com
 */
class WP_Calculate_EMI_MC {
	/**
	 * Function to enqueue frontend style and script
	 *
	 * @return void
	 * @author Anjali,Anogh
	 */
	public function wp_emi_mc_enqueue_script() {
		$wp_emi_mc_plugin_url = plugin_dir_url( __FILE__ );
		wp_enqueue_style( 'wp_emi_mc_frontend_css', $wp_emi_mc_plugin_url . 'css/wp-emi-mc-frontend.css', array(), '1.0.16', false );
		wp_enqueue_script( 'wp_emi_mc_emi_script', $wp_emi_mc_plugin_url . 'js/wp-emi-mc-frontend.js', array( 'jquery' ), '1.0.47' );
		wp_localize_script(
			'wp_emi_mc_emi_script',
			'ajaxscript',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
			)
		);
	}
	/**
	 * Function to enqueue backend style and script
	 *
	 * @return void
	 * @author Anjali
	 */
	public function wp_emi_mc_enqueue_backend_script() {
		$wp_emi_mc_plugin_url = plugin_dir_url( __FILE__ );
		wp_enqueue_script( 'wp_emi_mc_calc_script', $wp_emi_mc_plugin_url . 'js/wp-emi-mc-backend.js', array( 'jquery' ), '1.0.47', false );
		wp_enqueue_style( 'wp_emi_mc_backend_css', $wp_emi_mc_plugin_url . 'css/wp-emi-mc-backend.css', array(), '1.0.16' );
		wp_enqueue_style( 'wp-emi-mc-font-family', $wp_emi_mc_plugin_url . '/font/css/wp-emi-font.css', false, '1.0.0' );

	}
	/**
	 * Function to Initializes a new instance of the class WPCalculateEMIMC
	 *
	 * @return void
	 * @author Anjali,Anogh
	 */
	public function __construct() {
		add_shortcode( 'wp_emi_mortgage_calculator', array( $this, 'shortcode_emi_calculator' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'wp_emi_mc_enqueue_script' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'wp_emi_mc_enqueue_backend_script' ) );
		include 'class-wp-emi-mc-admin-settings.php';
		include 'class-wp-emi-mc-create-db.php';
		register_activation_hook( __FILE__, array( 'WPEMIcreateDB', 'wp_emi_mc_install_tables' ) );
	}
	/**
	 * Function to calculate and display EMI details
	 *
	 * @return string
	 * @author Anjali,Anogh
	 */
	public function shortcode_emi_calculator() {
		ob_start();
		global $wpdb;
		$wp_emi_mc_loan_term_table       = $wpdb->prefix . 'loan_term_rates';
		$wp_emi_mc_fetch_loan_term_rates = $wpdb->get_results( "SELECT * FROM $wp_emi_mc_loan_term_table", ARRAY_A );
		$wp_emi_mc_fetch_radio_val       = get_option( 'radio_val_array' );
		$wp_emi_mc_result                = end( $wp_emi_mc_fetch_loan_term_rates );
		$wp_emi_mc_rate                  = $wp_emi_mc_result['rate_per_annum'];
		if ( in_array( 'fixed', $wp_emi_mc_fetch_radio_val ) ) {
			?>
		<h2 class="wp_emi_mc_header">Fixed Repayment Calculator</h2>
		<form method="post" class="wp-emi-mc-calculate-form">
		<table class="wp_emi_mc_table">
		<tr><td><label>Total Amount</label><span>£ &nbsp;</span></td><td><input type="number" name="wp_emi_mc_total_cost" id="wp_emi_mc_fixed_total_cost" class="wp_emi_mc_text"/></td></tr>     
		<tr><td><label>Down Payment</label><span>£ &nbsp;</span></td><td><input type="number" name="wp_emi_mc_deposit" id="wp_emi_mc_fixed_deposit" class="wp_emi_mc_text" /></td></tr>       
		<tr><td><label>Loan Amount</label><span>£ &nbsp;</span></td><td><input type="number" name="wp_emi_mc_finance" readonly="readonly" id="wp_emi_mc_fixed_finance" class="wp_emi_mc_text" /> </td></tr>
		<tr><td><label>Loan Term</label><span> &nbsp;</span></td>
		<td><label><input type="radio" name="wp_emi_mc_emicalc" value="month" id="wp_emi_mc_fixed_month" checked>Month</label>
		<label><input type="radio" name="wp_emi_mc_emicalc" value="year" id="fixed_year"> Year</label></td></tr>
		<tr><td><span class="wp_emi_mc_loan_term_span"> &nbsp;</span></td><td><input type="number" name="wp_emi_mc_loan_term"  id="wp_emi_mc_fixed_loan_term" class="wp_emi_mc_text"/></td></tr>		
		<tr><td><label>Rate Of Interest</label><span>%  &nbsp;</span></td><td><input type="number" name="wp_emi_mc_fixed_rate"  id="wp_emi_mc_fixed_rate" class="wp_emi_mc_text" readonly="readonly"  value="<?php echo esc_attr( $wp_emi_mc_rate ); ?>"  step="0.01" min="0.00" max="99.90"/></td></tr> 
		</table> 		
		</form><br/>
	<!-- Show result table of fixed calculator -->	 
			<table id="wp_emi_mc_show_emi_value" class="wp-list-table widefat fixed striped pages"> 
				<thead>
					<tr><th>Loan Term</th><th>Monthly Repayment</th><th>Total Repayment</th> <th>Rate per annum</th> </tr>
				</thead>
				<tbody>			
					<tr>
					<td><span id="wp_emi_mc_fixed_loan_term_result" > </span><span class="wp_emi_mc_loan_term_result"> Months</span></td>                       
					<td>£<span id="wp_emi_mc_fixed_monthly_repayment_result">0</span></td> 
					<td>£<span id="wp_emi_mc_fixed_total_repayment_result">0</span></td> 
					<td><span id="wp_emi_mc_fixed_rate_result">%</span></td>
					</tr>
		</tbody>
			</table>
		   
			<?php
		} else {
			?>
	<h2 class="wp_emi_mc_header">Dynamic Repayment Calculator</h2>
		<form method="post" class="wp-emi-mc-calculate-form">
		<table class="wp_emi_mc_table">
		<tr><td><label>Total Amount</label><span>£ &nbsp;</span></td><td><input type="number" name="wp_emi_mc_total_cost" id="wp_emi_mc_dynamic_total_cost" class="wp_emi_mc_text"/></td></tr>        
		<tr><td><label>Down Payment</label><span>£ &nbsp;</span></td><td><input type="number" name="wp_emi_mc_deposit" id="wp_emi_mc_dynamic_deposit" class="wp_emi_mc_text" /></td></tr>          
		<tr><td><label>Loan Amount</label><span>£ &nbsp;</span></td><td><input type="number" name="wp_emi_mc_finance" readonly="readonly" id="wp_emi_mc_dynamic_finance" class="wp_emi_mc_text" /></td></tr>   
		<tr><td><label>Loan Term</label><span>&nbsp;</span></td>
		<td><label><input type="radio" name="wp_emi_mc_emicalc" value="month" id="wp_emi_mc_dynamic_month" checked >Month</label>
		<label><input type="radio" name="wp_emi_mc_emicalc" value="year" id="wp_emi_mc_dynamic_year"> Year</label></td></tr>
		<tr><td><span class="wp_emi_mc_loan_term_span"> &nbsp;</span></td><td><input type="number" name="wp_emi_mc_loan_term"  id="wp_emi_mc_dynamic_loan_term" class="wp_emi_mc_text"/></td></tr>	
		<tr><td><label>Rate Of Interest</label><span>%  &nbsp;</span></td><td><input type="number" name="wp_emi_mc_rate"  step="0.01" min="0.00" max="99.90" id="wp_emi_mc_dynamic_rate" class="wp_emi_mc_text" value="<?php echo esc_attr( $wp_emi_mc_rate ); ?>"/></td></tr> 
		</table>		
		</form><br/> 
		<!-- Show result table of dynamic calculator -->
			<table id="wp_emi_mc_show_emi_value" class="wp-list-table widefat fixed striped pages"> 
				<thead>
					<tr><th>Loan Term</th><th>Monthly Repayment</th><th>Total Repayment</th> <th>Rate per annum</th> </tr>
				</thead>
				<tbody>
					<tr>
					<td><span id="wp_emi_mc_dynamic_loan_term_result"></span><span class="wp_emi_mc_loan_term_result"> Months</span></td>                       
					<td>£<span id="wp_emi_mc_dynamic_monthly_repayment_result">0</span></td> 
					<td>£<span id="wp_emi_mc_dynamic_total_repayment_result">0</span></td> 
					<td><span id="wp_emi_mc_dynamic_rate_result">%</span></td>
					</tr>						
				</tbody>
			</table>		
			<?php  }
		return ob_get_clean();
	}
}
$wpcalculateemimc = new WP_Calculate_EMI_MC();
?>
