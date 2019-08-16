const c_workshop_build_lvl = document.querySelector("#workshop .locked_lvl");
const wsfitems_l1 = wsfitems.filter(item => item.lvl === 1);
const wspitems_l1 = wspitems.filter(item => item.lvl === 1);
const c_locked = document.getElementsByClassName("item_locked");

let pepper_old = 0;
let money_old = 0;

let opt = new Array(items.length);

function update_coins() {

	for(i=0; i<opt.length; i++){
		opt[i] = 0;
	}

	if(money_old !== _peppercoins){
		money_amount.textContent = Math.round(_peppercoins);
		money_old = _peppercoins;
	}

	if(pepper_old !== _pepper){

		paprica_amount.textContent = Math.round(_pepper);
		pepper_old = _pepper;
	}

	// progress_bar.setAttribute("value", progress);

	if(!workshop.built){
		if(lvl_now >= 16 && _peppercoins >= workshop.price){
			workshop.build_btn.style.backgroundColor = '#afa8';
		} else {
			workshop.build_btn.style.backgroundColor = '#fff4'; 
		}

		if(lvl_now>=16){
			workshop.c_build_lvl.style.display = 'none';
		} 
	}

	if (!bookmarks[bookmarks.length-1].unlocked) { //lvl_now < bookmarks[bookmarks.length - 1].avail sprawdzaj czy lvl jest wiekszy niz minimalny dla zakladki tylko dopoki ostatnia nie jest odblokowana
		for (i = 1; i < bookmarks.length; i++) {
			if (lvl_now + 1 >= bookmarks[i].avail && !bookmarks[i].unlocked) {
				const c_mark_lock = document.getElementsByClassName("mark_locked")[i];
				unlock_item(c_mark_lock);
				marks[i].children[1].style.display = "inline";
				bookmarks[i].unlocked = true;
			}
			else if (!bookmarks[i].locked) {
				marks[i].children[1].style.display = "none";
				marks[i].children[0].style.display = "block";
				bookmarks[i].locked = true;
			}
		}
	}
	if (!wbookmarks[wbookmarks.length-1].unlocked) {
		for (i = 1; i < wbookmarks.length; i++) {
			
			if (lvl_now + 1 >= wbookmarks[i].avail && !wbookmarks[i].unlocked) {
				const c_mark_lock = document.querySelectorAll("#workshop .mark_locked")[i];
				unlock_item(c_mark_lock);
				wbookmarks[i].handler.children[1].style.display = "inline";
				wbookmarks[i].unlocked = true;
			}
			else if (!wbookmarks[i].locked) {
				wbookmarks[i].handler.children[1].style.display = "none";
				wbookmarks[i].handler.children[0].style.display = "block";
				wbookmarks[i].locked = true;
			}
		}
	}

	if (bookmarks[0].active) { //gdy aktywny sklep
		//console.log(opt);
		for (let i = 0; i < items.length; i++) {
			//console.log(items[i].avail <= lvl_now+1);
			if (items[i].avail <= lvl_now + 1 && !items[i].bought) {
				//console.log(c_locked[i]);
				if (c_locked[i].style.display != "none" && typeof c_locked[i] !== 'undefined') {
					unlock_item(c_locked[i]);
					//console.log(c_locked[i], i);
				}
				if ((_peppercoins >= items[i].price) && !(items[i].bought) && opt[i] !== 2) {
					//console.log('2');
					class_item[i].style.backgroundColor = "rgba(255, 255, 255, .7)";
					opt[i] = 2;
				}
				else if ((_peppercoins < items[i].price) && !(items[i].bought) && opt[i] !== 3) {
					//console.log('3');
					class_item[i].style.backgroundColor = "rgba(200, 200, 200, .7)";
					opt[i] = 3;
				}
			}
			else if (c_locked[i].style.display != "flex" && !items[i].bought) {
				//console.log('dol');
				c_locked[i].style.display = "flex";
			}
		}
	}
	else if (bookmarks[1].active) { //gdy aktywna fabryka
		for (let i = 0; i < fitems.length; i++) {
			//console.log(fitems[i].price);
			let flock = fitems[i].handler.children[0];
			fitems[i].calc_price10();

			if (lvl_now + 1 < fitems[i].avail && !fitems[i].locked) { //&& !fitems[i].locked){
				flock.style.display = "flex"; //zablokuj factory item
				fitems[i].locked = true;
			}
			if (lvl_now + 1 >= fitems[i].avail && !fitems[i].unlocked) { //odblokuj
				unlock_item(flock);
				fitems[i].unlocked = true;
			}
			(_peppercoins >= fitems[i].price) ? c_add1[i].style.background = "rgba(220, 255, 220, .7)" : c_add1[i].style.background = "#daaa";
			(_peppercoins >= fitems[i].price10) ? c_add10[i].style.background = "rgba(220, 255, 220, .7)" : c_add10[i].style.background = "#daaa";
		}
	}

	if(wbookmarks[0].active){
		affordable_check(wsfitems_l1);

	} else if(wbookmarks[1].active){
		affordable_check(wspitems_l1);
	}
}

//todo sprawdzanie lvla

function affordable_check(to_check){
	
	for(let i=0; i<to_check.length; i++){

		if(!to_check[i].maxed){
		//if(to_check[i]){
			const next_item = to_check[i].lvls[to_check[i].lvl_now-1];
			//console.log(to_check[i]);
			//const next_item = to_check[i].lvls.find(({bought}) => !bought);
			let flock = to_check[i].handler.children[0];

			if (workshop.lvl < to_check[i].avail && !to_check[i].locked) {
				flock.style.display = "flex";
				to_check[i].locked = true;
			}
			if (workshop.lvl >= to_check[i].avail && !to_check[i].unlocked) {
				unlock_item(flock);
				to_check[i].unlocked = true;
			}

			//if(typeof next_item !== 'undefined'){
			if(_peppercoins >= next_item.price && to_check[i].aff !== 1){

				to_check[i].handler.style.backgroundColor = "rgba(255, 255, 255, .7)";
				to_check[i].aff = 1;

			} else if (_peppercoins < next_item.price && to_check[i].aff !== 2){

				to_check[i].handler.style.backgroundColor = 'rgba(200, 200, 200, .7)';
				to_check[i].aff = 2;
			}
			//}
		}
		//}
	}
}