let scrolled = false;
let cps_old = 0;
let peppers_to_unlock_call = false;
let pepper_overall_old = 0;

setInterval(() => {
	// if (window.innerWidth >= 1206 && !scrolled) {
	// 	$("html, body").animate({ scrollTop: 0 }, "slow"); //OFF SCROLLING
	// 	scrolled = true;
	// }
	// else {
	// 	scrolled = false;
	// }
	window.lvl_now = lvl_now;

	c_next_lvl.innerHTML = Math.round(lvls[lvl_now] - (xp_fill * 10));

	//next lvl
	if (xp_fill * 10 >= lvls[lvl_now]) {
		while (xp_fill * 10 >= lvls[lvl_now]) {
			lvl_now++;
			c_xp_fill.width = "0%";
			xp_fill -= lvls[lvl_now - 1] / 10;
			xp_needed *= xp_need_multiplier;
			lvls[lvl_now] = xp_needed;
		}
		
		c_lvl.innerHTML = lvl_now + 1;
		c_next_lvl.innerHTML = Math.round(lvls[lvl_now] - (xp_fill * 10));
		c_rank_text.innerHTML = (lvls_ranks[lvl_now]) ? lvls_ranks[lvl_now] : lvls_ranks[lvls_ranks.length - 1];
		peppers_to_unlock_call = true;
	}
	else {
		c_xp_fill.width = (xp_fill * 1000 / lvls[lvl_now]) + "%";
	}
	c_xp_fill.width = (xp_fill * 1000 / lvls[lvl_now]) + "%";
	
	_pepper += pc_production;
	pc_ever += pc_production;
	xp_fill += pc_production;
	auto_sell_pepper(pc_production);

	//przetwornia - operacje na coinach i papryce
	if(_pepper + pepper_to_subtract >= 0){
		_pepper += pepper_to_subtract;
		_peppercoins += peppercoins_to_add;
	}

	update_coins();

	c_stat_clicks.innerHTML = clicks_per_sec;

	if(clicks_per_sec > clicks_per_sec_max && (cps_old !== clicks_per_sec_max || cps_old === 0)){
		cps_old = clicks_per_sec_max;
		clicks_per_sec_max = clicks_per_sec;
		c_stat_clicks_max.innerHTML = clicks_per_sec_max;
	}

	if(pepper_overall > pepper_overall_max && (pepper_overall_old !== pepper_overall_max || pepper_overall_old === 0)){
		pepper_overall_old = pepper_overall_max;
		pepper_overall_max = pepper_overall;
		c_stat_overall_max.innerHTML = pepper_overall_max;
	}

	c_stat_overall.innerHTML = Math.round(pepper_overall);

	clicks_per_sec = 0;
	pepper_overall = 0;
	pepper_overall += pc_production;

	if(peppers_to_unlock_call) peppers_to_unlock();

}, 1000);
