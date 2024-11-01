<?php
global $transfer_db_version;
$transfer_db_version = '1.0';
/**
 * Function to create datbase
 *
 * @author Anogh,Anjali
 */
class WPEMIcreateDB {
	/**
	 * Function to create table
	 *
	 * @author Anogh,Anjali
	 */
    public function wp_emi_mc_install_tables() {
	global $wpdb;
	global $transfer_db_version;
	$table_loan_term_rates = $wpdb->prefix . 'loan_term_rates';
	$charset_collate = $wpdb->get_charset_collate();
        $sql = "DROP TABLE IF EXISTS $table_loan_term_rates;";
        if ( ! $wpdb->get_var( $query ) == $table_loan_term_rates ) {
		$sql = "CREATE TABLE $table_loan_term_rates (
				id mediumint(9) NOT NULL AUTO_INCREMENT,
		                rate_per_annum DECIMAL(4,2) DEFAULT 0.00,
				PRIMARY KEY  (id)
			) $charset_collate;";

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql );
		$wpdb->insert($table_loan_term_rates  , array(		           
			       'rate_per_annum'        =>  filter_input( INPUT_POST,'wp_emi_mc_rate_per_annum' , FILTER_SANITIZE_STRING),
			   ),
			   array('%f')
			   );
        }
    }
}
?>
