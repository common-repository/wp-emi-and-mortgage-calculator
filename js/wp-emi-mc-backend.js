jQuery(document).ready(function(){
    jQuery('input[type="radio"]').click(function(){
        var inputValue = jQuery(this).attr("value");
	var radio_value = jQuery("input[name='wp_emi_mc_radio']:checked").val();
	if(radio_value == "dynamic"){
		jQuery(".wp_emi_mc_label").replaceWith("<p class='wp_emi_mc_label'>Rate of Interest is Fixed,you can change.</p>");
		jQuery("#wp_emi_mc_rate_per_annum").removeAttr("value");

	}
	else{
		jQuery(".wp_emi_mc_label").replaceWith("<p class='wp_emi_mc_label'>Rate of Interest is Fixed,you can't change.</p>");
		jQuery("#wp_emi_mc_rate_per_annum").removeAttr("value");
	}
    });
});
