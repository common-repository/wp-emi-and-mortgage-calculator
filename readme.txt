=== WP EMI and mortgage calculator ===
Contributors: ekanath,ajay-aravind,anogh,webrust,swethabc9,anjaliwporg,anusha95,keerthanak,midnayws
Plugin Name: WP EMI and mortgage calculator
Tags: calculator, emi calculator plugin,EMI,emi calculator,emi and mortgage calculator,wp emi and mortgage calculator
Author: Midnay
Author URI: https://midnay.com
Requires at least: 4.8
Tested up to: 5.3
Stable tag: 1.0.0
Version: 1.0.0 

== Description ==
WP EMI and mortgage calculator is an easy to use WordPress EMI calculator plugin. It allows users to calculate EMI for entered amount with fixed or dynamic interest ratio year wise or month wise. With fixed EMI calculator rate of interest is fixed user can't change it from frontend but with dynamic EMI  calculator user can change the rate of interest.

== Features == 
* Calculate EMI yearly or monthly.
* Calculate EMI for entered amount with fixed or dynamic interest ratio.
* Using shortcode you can display the calculator where ever you want.
* Display both EMI and total repayment amount.  

== Installation ==
1. Extract the plugin archive file.
2. Upload the 'WP EMI and mortgage calculator' folder to the '/wp-content/plugins/' directory.
3. Activate the plugin through the 'Plugins' menu in WordPress
4. Use shortcode [wp_emi_mortgage_calculator] in page to display the calculator
 
== Changelog ==


== Upgrade Notice == 

== Frequently Asked Questions == 
= Does this plugin work with newest WP version and also older versions? =
Yes, this plugin works really fine with WordPress 5.3!
It also works great with previous wordpress versions.The best practice is to run the latest WordPress version for a lot of reasons.

= Is this plugin be always available free of cost?
Yes WP EMI and mortgage calculator is available free of cost.

= Does this plugin calculate EMI month wise or year wise?
Yes, you have option to select month or year from front end.

= Will I be able to know the total repayment amount?
Yes, we will calculate and display the EMI and total repayment amount.


== Version ==
1.0.0

== Additional info ==
add_menu_page( 'EMI Settings', 'EMI Calculator', 'manage_options', 'emi-settings-page', array( $this, 'wp_emi_mc_settings_page_func' ), 'dashicons-wp_emi_mc_icon', 6 );
Use ‘dashicons-wp-emi-mc-icon’  font-family for plugin dashicon
