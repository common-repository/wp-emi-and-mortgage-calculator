jQuery(document).ready(function() {
/*----- Replace the text on radio button click  -----*/
 	jQuery('input[type="radio"]').click(function(){
		var inputValue = jQuery(this).attr("value");
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		if(radio_value == "month"){
			jQuery(".wp_emi_mc_loan_term_result").replaceWith("<span class='wp_emi_mc_loan_term_result'> Months</span>");
		}
		else{
			
			jQuery(".wp_emi_mc_loan_term_result").replaceWith("<span class='wp_emi_mc_loan_term_result'> Year</span>");
		}
	});
/*----- For Fixed Calculator -----*/
	var rate   =  jQuery('#wp_emi_mc_fixed_rate').val();
	jQuery("#wp_emi_mc_fixed_rate_result").html(rate+' %');	
	jQuery("#wp_emi_mc_fixed_total_cost").keyup(function() {      
		var p = (jQuery(this).val()) - (jQuery("#wp_emi_mc_fixed_deposit").val());
		jQuery("#wp_emi_mc_fixed_finance").val(p);
		var period =  jQuery('#wp_emi_mc_fixed_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_fixed_rate').val();
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		jQuery("#wp_emi_mc_fixed_monthly_repayment_result").html(calculate_emi_fixed(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_fixed_total_repayment_result").html((calculate_emi_fixed(period,rate,p,radio_value)["repayable"]).toFixed(2) );
	});  
          jQuery("#wp_emi_mc_fixed_deposit").keyup(function() { 
		var loan_term = jQuery("#wp_emi_mc_fixed_loan_term").val();
		jQuery("#wp_emi_mc_fixed_loan_term_result").html(loan_term);
		var p = (jQuery("#wp_emi_mc_fixed_total_cost").val()) - (jQuery("#wp_emi_mc_fixed_deposit").val());
		jQuery("#wp_emi_mc_fixed_finance").val(p);
		var period =  jQuery('#wp_emi_mc_fixed_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_dynamic_rate').val();
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		jQuery("#wp_emi_mc_fixed_monthly_repayment_result").html(calculate_emi_fixed(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_fixed_total_repayment_result").html((calculate_emi_fixed(period,rate,p,radio_value)["repayable"]).toFixed(2) );	
		
	});
	 jQuery("input[type='radio']").click(function(){
        	var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		var loan_term = jQuery("#wp_emi_mc_fixed_loan_term").val();
		jQuery("#wp_emi_mc_fixed_loan_term_result").html(loan_term);
		var p = (jQuery("#wp_emi_mc_fixed_total_cost").val()) - (jQuery("#wp_emi_mc_fixed_deposit").val());
		jQuery("#wp_emi_mc_fixed_finance").val(p);
		var period =  jQuery('#wp_emi_mc_fixed_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_fixed_rate').val();
		jQuery("#wp_emi_mc_fixed_rate_result").html(rate+' %');
		jQuery("#wp_emi_mc_fixed_monthly_repayment_result").html(calculate_emi_fixed(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_fixed_total_repayment_result").html( ( calculate_emi_fixed(period,rate,p,radio_value)["repayable"]).toFixed(2) );
	
        });
	jQuery("#wp_emi_mc_fixed_loan_term").keyup(function() {
		var loan_term = jQuery("#wp_emi_mc_fixed_loan_term").val();
		jQuery("#wp_emi_mc_fixed_loan_term_result").html(loan_term);
		var p = (jQuery("#wp_emi_mc_fixed_total_cost").val()) - (jQuery("#wp_emi_mc_fixed_deposit").val());
		jQuery("#wp_emi_mc_fixed_finance").val(p);
		var period =  jQuery('#wp_emi_mc_fixed_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_fixed_rate').val();
		jQuery("#wp_emi_mc_fixed_rate_result").html(rate+' %');
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		jQuery("#wp_emi_mc_fixed_monthly_repayment_result").html(calculate_emi_fixed(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_fixed_total_repayment_result").html((calculate_emi_fixed(period,rate,p,radio_value)["repayable"]).toFixed(2) );
	});  
	jQuery("#wp_emi_mc_fixed_loan_term").mouseup(function() {
		var loan_term = jQuery("#wp_emi_mc_fixed_loan_term").val();
		jQuery("#wp_emi_mc_fixed_loan_term_result").html(loan_term);
		var p = (jQuery("#wp_emi_mc_fixed_total_cost").val()) - (jQuery("#wp_emi_mc_fixed_deposit").val());
		jQuery("#wp_emi_mc_fixed_finance").val(p);
		var period =  jQuery('#wp_emi_mc_fixed_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_fixed_rate').val();
		jQuery("#wp_emi_mc_fixed_rate_result").html(rate+' %');
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		jQuery("#wp_emi_mc_fixed_monthly_repayment_result").html(calculate_emi_fixed(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_fixed_total_repayment_result").html((calculate_emi_fixed(period,rate,p,radio_value)["repayable"]).toFixed(2) );
	});  
/*----- For Dynamic Calculator -----*/
	var rate   =  jQuery('#wp_emi_mc_dynamic_rate').val();
	jQuery("#wp_emi_mc_dynamic_rate_result").html(rate+' %');	
	jQuery("#wp_emi_mc_dynamic_total_cost").keyup(function() {      
		var p = (jQuery(this).val()) - (jQuery("#wp_emi_mc_dynamic_deposit").val());
		jQuery("#wp_emi_mc_dynamic_finance").val(p);
		var period =  jQuery('#wp_emi_mc_dynamic_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_dynamic_rate').val();
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		jQuery("#wp_emi_mc_dynamic_monthly_repayment_result").html(calculate_emi_fixed(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_dynamic_total_repayment_result").html((calculate_emi_fixed(period,rate,p,radio_value)["repayable"]).toFixed(2) );	
 
	});   
        jQuery("#wp_emi_mc_dynamic_deposit").keyup(function() { 
		var loan_term = jQuery("#wp_emi_mc_dynamic_loan_term").val();
		jQuery("#wp_emi_mc_dynamic_loan_term_result").html(loan_term);
		var p = (jQuery("#wp_emi_mc_dynamic_total_cost").val()) - (jQuery("#wp_emi_mc_dynamic_deposit").val());
		jQuery("#wp_emi_mc_dynamic_finance").val(p);
		var period =  jQuery('#wp_emi_mc_dynamic_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_dynamic_rate').val();
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		jQuery("#wp_emi_mc_dynamic_monthly_repayment_result").html(calculate_emi_fixed(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_dynamic_total_repayment_result").html((calculate_emi_fixed(period,rate,p,radio_value)["repayable"]).toFixed(2) );	
	}); 
	jQuery("input[type='radio']").click(function(){
        	var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		var loan_term = jQuery("#wp_emi_mc_dynamic_loan_term").val();
		jQuery("#wp_emi_mc_dynamic_loan_term_result").html(loan_term);
		var p = (jQuery("#wp_emi_mc_dynamic_total_cost").val()) - (jQuery("#wp_emi_mc_dynamic_deposit").val());
		jQuery("#wp_emi_mc_dynamic_finance").val(p);
		var period =  jQuery('#wp_emi_mc_dynamic_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_dynamic_rate').val();
		jQuery("#wp_emi_mc_dynamic_rate_result").html(rate+' %');
		jQuery("#wp_emi_mc_dynamic_monthly_repayment_result").html(calculate_emi_dynamic(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_dynamic_total_repayment_result").html((calculate_emi_dynamic(period,rate,p,radio_value)["repayable"]).toFixed(2) );
	
        });
	jQuery("#wp_emi_mc_dynamic_loan_term").keyup(function() {
		var loan_term = jQuery("#wp_emi_mc_dynamic_loan_term").val();
		jQuery("#wp_emi_mc_dynamic_loan_term_result").html(loan_term);
		var p = (jQuery("#wp_emi_mc_dynamic_total_cost").val()) - (jQuery("#wp_emi_mc_dynamic_deposit").val());
		jQuery("#wp_emi_mc_dynamic_finance").val(p);
		var period =  jQuery('#wp_emi_mc_dynamic_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_dynamic_rate').val();
		jQuery("#wp_emi_mc_dynamic_rate_result").html(rate+' %');
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		jQuery("#wp_emi_mc_dynamic_monthly_repayment_result").html(calculate_emi_dynamic(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_dynamic_total_repayment_result").html((calculate_emi_dynamic(period,rate,p,radio_value)["repayable"]).toFixed(2) );
	}); 
	jQuery("#wp_emi_mc_dynamic_loan_term").mouseup(function() {
		var loan_term = jQuery("#wp_emi_mc_dynamic_loan_term").val();
		jQuery("#wp_emi_mc_dynamic_loan_term_result").html(loan_term);
		var p = (jQuery("#wp_emi_mc_dynamic_total_cost").val()) - (jQuery("#wp_emi_mc_dynamic_deposit").val());
		jQuery("#wp_emi_mc_dynamic_finance").val(p);
		var period =  jQuery('#wp_emi_mc_dynamic_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_dynamic_rate').val();
		jQuery("#wp_emi_mc_dynamic_rate_result").html(rate+' %');
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		jQuery("#wp_emi_mc_dynamic_monthly_repayment_result").html(calculate_emi_dynamic(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_dynamic_total_repayment_result").html((calculate_emi_dynamic(period,rate,p,radio_value)["repayable"]).toFixed(2) );
	}); 
	jQuery("#wp_emi_mc_dynamic_rate").keyup(function() {
		var loan_term = jQuery("#wp_emi_mc_dynamic_loan_term").val();
		jQuery("#wp_emi_mc_dynamic_loan_term_result").html(loan_term);
		var p = (jQuery("#wp_emi_mc_dynamic_total_cost").val()) - (jQuery("#wp_emi_mc_dynamic_deposit").val());
		jQuery("#wp_emi_mc_dynamic_finance").val(p);
		var period =  jQuery('#wp_emi_mc_dynamic_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_dynamic_rate').val();
		jQuery("#wp_emi_mc_dynamic_rate_result").html(rate+' %');
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		jQuery("#wp_emi_mc_dynamic_monthly_repayment_result").html(calculate_emi_dynamic(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_dynamic_total_repayment_result").html((calculate_emi_dynamic(period,rate,p,radio_value)["repayable"]).toFixed(2) );
	}); 
	jQuery("#wp_emi_mc_dynamic_rate").mouseup(function() {
		var loan_term = jQuery("#wp_emi_mc_dynamic_loan_term").val();
		jQuery("#wp_emi_mc_dynamic_loan_term_result").html(loan_term);
		var p = (jQuery("#wp_emi_mc_dynamic_total_cost").val()) - (jQuery("#wp_emi_mc_dynamic_deposit").val());
		jQuery("#wp_emi_mc_dynamic_finance").val(p);
		var period =  jQuery('#wp_emi_mc_dynamic_loan_term').val();
		var rate   =  jQuery('#wp_emi_mc_dynamic_rate').val();
		jQuery("#wp_emi_mc_dynamic_rate_result").html(rate+' %');
		var radio_value = jQuery("input[name='wp_emi_mc_emicalc']:checked").val();
		jQuery("#wp_emi_mc_dynamic_monthly_repayment_result").html(calculate_emi_dynamic(period,rate,p,radio_value)["result"]);
		jQuery("#wp_emi_mc_dynamic_total_repayment_result").html((calculate_emi_dynamic(period,rate,p,radio_value)["repayable"]).toFixed(2) );
	}); 
});

/*----- Function for EMI calculation of fixed calculator -----*/
function calculate_emi_fixed(parm_month,parm_rate,parm_pamt,param_radio_value) {
        var month = parm_month;
        var rate = parm_rate;
        var pamt = parm_pamt ;
        var result = (pamt/month).toFixed(2) ;
        var totalAmount = parm_pamt;
        var hash = {};
        hash["result"]=result;
        hash["repayable"]=  totalAmount;
	var period_value = param_radio_value;
	
	if(period_value =="month"){
		
		if(parseFloat(rate) > 0){
			
		    var monthlyInterestRatio = (rate/100)/12;
		    var monthlyInterest = (monthlyInterestRatio*pamt);
		    var top = Math.pow((1+monthlyInterestRatio),month);
		    var bottom = top -1;
		    var sp = top / bottom;
		    var emi = ((pamt * monthlyInterestRatio) * sp);
		    var result = emi.toFixed(2);
		    var totalAmount = emi*month;
		    var yearlyInteret = totalAmount-pamt;
		    var downPayment = pamt*(20/100);
		    hash["result"]=result;
		    hash["repayable"] =  totalAmount; 
		    
		}
	}
	else{
		if(parseFloat(rate) > 0){
		    var month = parm_month*12;
		    var monthlyInterestRatio = (rate/100)/12;
		    var monthlyInterest = (monthlyInterestRatio*pamt);
		    var top = Math.pow((1+monthlyInterestRatio),month);
		    var bottom = top -1;
		    var sp = top / bottom;
		    var emi = ((pamt * monthlyInterestRatio) * sp);
		    var result = emi.toFixed(2);
		    var totalAmount = emi*month;
		    var yearlyInteret = totalAmount-pamt;
		    var downPayment = pamt*(20/100);
		    hash["result"]=result;
		    hash["repayable"] =  totalAmount; 
		    
		}
	}
        return (hash);
}

/*----- Function for EMI calculation of Dynamic calculator -----*/
function calculate_emi_dynamic(parm_month,parm_rate,parm_pamt,param_radio_value) {
        var month = parm_month;
        var rate = parm_rate;
        var pamt = parm_pamt ;
        var result = (pamt/month).toFixed(2) ;
        var totalAmount = parm_pamt;
        var hash = {};
        hash["result"]=result;
        hash["repayable"]=  totalAmount;
	var period_value = param_radio_value;
	
	if(period_value =="month"){
		
		if(parseFloat(rate) > 0){
			
		    var monthlyInterestRatio = (rate/100)/12;
		    var monthlyInterest = (monthlyInterestRatio*pamt);
		    var top = Math.pow((1+monthlyInterestRatio),month);
		    var bottom = top -1;
		    var sp = top / bottom;
		    var emi = ((pamt * monthlyInterestRatio) * sp);
		    var result = emi.toFixed(2);
		    var totalAmount = emi*month;
		    var yearlyInteret = totalAmount-pamt;
		    var downPayment = pamt*(20/100);
		    hash["result"]=result;
		    hash["repayable"] =  totalAmount; 
		    
		}
	}
	else{
		if(parseFloat(rate) > 0){
		    var month = parm_month*12;
		    var monthlyInterestRatio = (rate/100)/12;
		    var monthlyInterest = (monthlyInterestRatio*pamt);
		    var top = Math.pow((1+monthlyInterestRatio),month);
		    var bottom = top -1;
		    var sp = top / bottom;
		    var emi = ((pamt * monthlyInterestRatio) * sp);
		    var result = emi.toFixed(2);
		    var totalAmount = emi*month;
		    var yearlyInteret = totalAmount-pamt;
		    var downPayment = pamt*(20/100);
		    hash["result"]=result;
		    hash["repayable"] =  totalAmount; 
		    
		}
	}
        return (hash);
}
