let processing_counter = 0;
let is_any_list_opened = false;
let which_list_opened = null;

const c_consists_content = document.querySelector('#production_consists_button .settings_content');

class Processing_item {

	constructor(name, price, desc, img, multi_count, multi, space, need) {
		this.id = processing_counter;
		this.name = name;
		this.price = price;
		this.desc = desc;
		this.img = img;
		this.multi_count = multi_count;
		this.multi = multi;
		this.space = space;
		this.need = need;

		this.dodaj_item();
		this.amount = 0;
		this.bought_needed = false;
		this.needed_items_bought = 0;
		this.needed_items_maxed = 0;
		this.need_list_opened = false;
		this.max_eff_of_needed = 0;
	}
		
	//! klikniecie plusa po zakupieniu potrzebnych itemow nie zamyka listy potrzebnych rzeczy
	
	check_max_eff(){

		let wspitems_needed = [];
		let wspitems_needed_lvl_now_eff = [];
		// wspitems_needed_lvl_now_eff = [];

		for(let i=0; i<this.need.length; i++){
			
			for(let j=0; j<wspitems.length; j++){
				
				if(this.need[i] === wspitems[j].lvl_tag && wspitems[j].lvl === 1){

					wspitems_needed.push(wspitems[j]);
				}
			}
		}

		for(let i=0; i<wspitems_needed.length; i++){

			if(wspitems_needed[i].lvl === 1){

				wspitems_needed_lvl_now_eff.push(wspitems_needed[i].lvls[wspitems_needed[i].lvl_now-2].max_eff);
			}

			if(this.need.length <= 1){
				this.max_eff_of_needed = wspitems_needed[0].lvls[wspitems_needed[0].lvl_now-2].max_eff;
			} else {

				this.max_eff_of_needed = wspitems_needed_lvl_now_eff[0];
				
				for(let j=0; j<wspitems_needed_lvl_now_eff.length; j++){

					const cur = wspitems_needed_lvl_now_eff[j];

					if(cur < this.max_eff_of_needed){
						this.max_eff_of_needed = cur;
					}
				}
			}
		}
	}

	dodaj_item() {
		$("#processing_items").append(`
			<div class="item">

				<div class="item_title">
					${this.name} |
					<span class="stat_space"> <i class="fas fa-cubes"></i> <span class="stat"> ${this.space} </span> </span>
				</div>

				<div class="item_desc">
					${this.desc}
				</div>

				<div class="item_img">
					<img src="txt/items/processing/${this.img}">
				</div>

				<div class="item_stats">
					<i class="fas fa-angle-double-right"></i> <span class="stat"> ${this.multi_count}x ${this.multi}</span>
				</div>

				<div class="item_control">
					<span class="amount">
						<span class='min'>min</span> <span class="less scale_down_active_btn_hard"><i class="fas fa-minus-square"></i></span> 
						<span class="count">0</span>
						<span class="more scale_down_active_btn_hard"><i class="fas fa-plus-square"></i></span> <span class='max'>max</span> 
					</span>
					<div class="item_need_button"><i class="fas fa-caret-down"></i></div>
				</div>

				<div class="item_need_list"></div>

			</div>
		`);
		this.handler = document.querySelectorAll("#processing_items .item")[processing_counter];
		//const need_btn = this.handler.getElementsByClassName('item_need_button');
		processing_counter++;

		create_tooltip(this.handler, '.item_need_button', 'Sprawdź, co jest potrzbne do produkowania tego przedmiotu.');

		let tr = this;

		const c_amount = this.handler.querySelector('.count');

		this.need_list_opened = false;

		function update_amount(){
			c_amount.innerText = tr.amount;
		}

		function add_thing(mode=0){

			//? window click listener (script.js) odpowiada za prawidlowe chowanie pokazywanie listy

			if(!tr.bought_needed && tr.id !== which_list_opened){
				tr.toggle_need_list();
			}

			if(tr.bought_needed && is_any_list_opened){
				pitems[which_list_opened].toggle_need_list();
			}

			//tr.check_max_eff();
			
			while ((mode === 1)
			&& ((space-space_used) >= tr.space && tr.bought_needed && tr.max_eff_of_needed >= (tr.amount * tr.space)+tr.space)){

				tr.amount++;
				space_used += tr.space;
			}

			if ((mode === 0)
			&& ((space-space_used) >= tr.space && tr.bought_needed && tr.max_eff_of_needed >= (tr.amount * tr.space)+tr.space)){
				
				tr.amount++;
				space_used += tr.space;
			}

			update_space();
			update_amount();
			tr.check_processing_production();
		}

		function subtract_thing(mode=0){

			if(mode === 0 && tr.amount >= 1){
				tr.amount--;
				space_used -= tr.space;
			}

			while(mode === 1 && tr.amount >= 1){
				tr.amount--;
				space_used -= tr.space;
			}

			update_space();
			update_amount();
			tr.check_processing_production();
		}
		
		this.handler.addEventListener('click', (e) => {
			
			if(e.target.classList.contains('item_need_button') || e.target.parentElement.classList.contains('item_need_button')) {
				this.toggle_need_list();
			}
			else if(e.target.matches('.more *')){
				
				add_thing();
			}
			else if(e.target.matches('.less *')){

				subtract_thing();
			}
			else if(e.target.classList.contains('max')){

				add_thing(1);
			}
			else if(e.target.classList.contains('min')){
				subtract_thing(1);
			}
		});
	}

	check_processing_production(){

		pepper_to_subtract = 0;
		peppercoins_to_add = 0;

		for(i=0; i<pitems.length; i++){

			//if((_pepper - pitems[i].amount * pitems[i].multi_count)>=0){

			pepper_to_subtract -= pitems[i].amount * pitems[i].multi_count;
			peppercoins_to_add += pitems[i].amount * (pitems[i].multi * pitems[i].multi_count);
			//}
		}
	}

	toggle_need_list(){
		
		const c_need_list = this.handler.querySelector('.item_need_list');
		const c_need_btn = this.handler.querySelector('.item_need_button');

		c_need_btn.classList.toggle('need_list_btn_on');

		if (!this.need_list_opened) {

			this.open_need_list();

		}	else {

			is_any_list_opened = false;
			which_list_opened = null;

			this.need_list_opened = false;
			c_need_list.style.opacity = 0;
			c_need_list.style.pointerEvents = 'none';
		}
	}

	open_need_list(){
		const c_need_list = this.handler.querySelector('.item_need_list');
		const item_with_opened_list = pitems.find(item => item.need_list_opened === true);
		
		if(item_with_opened_list && item_with_opened_list.need_list_opened){
			item_with_opened_list.toggle_need_list();
		}
		c_need_list.style.pointerEvents = 'all';
		this.need_list_opened = true;
		c_need_list.style.opacity = 1;

		is_any_list_opened = true;
		which_list_opened = this.id;

		this.check_need_list();
	}

	check_need_list(){
		
		//if(this.needed_items_bought < this.need.length){
		if(this.needed_items_maxed < this.need.length){

			const c_need_list = this.handler.querySelector('.item_need_list');
			c_need_list.innerHTML = '';

			this.needed_items_bought = 0;
			this.needed_items_maxed = 0;

			let list = '';
			
			for(i=0; i<this.need.length; i++){
		
				const item = wspitems.find(item => {
					
					return item.lvl_tag === this.need[i];
				});

				if(item.maxed){
					this.needed_items_maxed++;
				}

				let wspitem_needed = (() => {
					
					if(!item.maxed){
						return item.lvls[item.lvl_now-1];
					} else {
						return item.lvls[item.lvl_now-2];
					}
				})()

				let wspitem_needed_next = (item) => {


					if(!item.maxed && item.lvl_now !== 1) {

						let prev_item = item.lvls[item.lvl_now-2];

						return `<span class="stat">${prev_item.max_eff} <span class="arrow_down"><i class="fas fa-arrow-right"></i></span> ${item.max_eff}</span>`

					} else return `<span class="stat">${item.max_eff}</span>`;
				}

				let specify_obtained = (item) => {
					if(item.bought ){

						// this.needed_items_bought++;
						return '<span class="not_owned"> <i class="fas fa-check"></i> </span>';
					} else if(!item.maxed && item.lvl !== 1) {

						return `<span class="lvl_up"> <i class="fas fa-arrow-up"></i> </span> <span class='lvl_up_lvl b'>${item.lvl}</span>`;
					} else return '<i class="fas fa-times"></i>';
				}

				if(item.bought){
					//obtained = '<span class="not_owned"><i class="fas fa-check"></i></span>';
					this.needed_items_bought++;
				}
				//else obtained = '<i class="fas fa-times"></i>';
				
				list += `
				<div class="needed">
					<div class='container'>
						<div class="img"><img src='txt/items/workshop_processing/${wspitem_needed.img}' /> </div>
						<div class="max_eff">
							<span class='box_arrows'>
								<span class='size_arrow'><i class="fas fa-arrows-alt-v"></i></span><i class="fas fa-cubes"></i>
							</span>
							${wspitem_needed_next(wspitem_needed)}
						</div>
					</div>
					<div class="name">${wspitem_needed.name}</div>
					<div class="owned">${specify_obtained(wspitem_needed)}</div>
				</div>`;
			}

			c_need_list.innerHTML = list;

			if(this.needed_items_bought >= this.need.length){
				this.bought_needed = true;
			}
		}
		this.check_more_less();
	}

	check_more_less(){
		if(this.bought_needed){

			this.check_max_eff();

			const more_btn = this.handler.querySelector('.more');
			const less_btn = this.handler.querySelector('.less');
			const min_btn = this.handler.querySelector('.min');
			//max btn jest w cssie jako sibling

			//console.log(this.max_eff_of_needed, this.amount, this.space);
			

			if((space-space_used) >= this.space && this.bought_needed && this.space <= space-space_used && this.max_eff_of_needed >= (this.amount * this.space)+this.space){
				more_btn.classList.add('action_possible');
			} else {
				more_btn.classList.remove('action_possible');
			}

			if(this.amount < 1){
				less_btn.classList.remove('action_possible');
				min_btn.classList.remove('action_possible2');
			} else {
				less_btn.classList.add('action_possible');
				min_btn.classList.add('action_possible2');
			}
		}
	}
}
