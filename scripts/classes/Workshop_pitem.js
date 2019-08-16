let wsp_counter = 0;

class Workshop_pitem {
	constructor(name, price, desc, img, lvl_tag, max_eff, lvl=1, avail=1) {
		this.name = name;
		this.price = price;
		this.desc = desc;
		this.img = img;
		this.lvl_tag = lvl_tag;
		this.lvl = lvl;
		this.avail = avail;
		this.max_eff = max_eff;
		this.lvl_now = 1;
		setTimeout(() => {
            //console.log(this.tag);
			this.lvls = wspitems.filter(item => item.lvl_tag === tr.lvl_tag);
			this.lvl_max = wspitems.filter(item => item.lvl_tag === tr.lvl_tag).length;
			if (this.lvl === 1) {
				this.id = wsp_counter;
			}
			else {
				this.id = this.lvls[0].id;
				this.handler = this.lvls[0].handler;
			}
		}, 0);
		let tr = this;
		this.dodaj_item();
		this.bought = false;
		this.aff = 0;
		this.maxed = false;

		this.locked = false;
		this.unlocked = false;
	}
	update_lvl() {
		const c_item_lvl = this.handler.querySelector('.item_lvl');
        c_item_lvl.innerHTML = "";
        
		if (!this.bought) {
			for (let i = 1; i < this.lvl; i++) {
				c_item_lvl.innerHTML += "<i class='fas fa-circle'></i> ";
			}
			for (let i = this.lvl; i <= this.lvl_max; i++) {
				c_item_lvl.innerHTML += "<i class='far fa-circle'></i> ";
			}
		}
		else {
			for (let i = 1; i <= this.lvl_max; i++) {
				c_item_lvl.innerHTML += "<i class='fas fa-circle'></i> ";
			}
		}
	}
	dodaj_item() {

		if (this.lvl === 1) { //(this.bought && this.lvl_max === this.lvl)
			$("#workshop_processing_items").append(`
				<div class="item">
					<div class="item_locked"> <i class="fas fa-lock"></i><span class='locked_lvl'>${this.avail}</span> </div>

					<div class="item_buy_cant"> Za mało PepperCoins! </div>

					<div class="item_buy_confirm">
						<div class="buy_button_ok"><i class="fas fa-check"></i></div>
						<div class="buy_button_cancel"><i class="fas fa-times"></i></div>
					</div>

					<div class="item_title">
						${this.name} | <span class="item_price">${this.price}</span><i class="fas fa-coins"></i>
					</div>

					<div class="item_desc">
						${this.desc}
					</div>

					<div class="item_img">
						<img src="txt/items/workshop_processing/${this.img}">
					</div>

					<div class="item_stats">
						<span class='size_arrow'><i class="fas fa-arrows-alt-v"></i></span><i class="fas fa-cubes"></i> <span class="stat">${this.max_eff}</span>
					</div>

					<div class="item_lvl"></div>
				</div>
			`);
			this.handler = document.querySelectorAll("#workshop_processing_items .item")[wsp_counter];
			wsp_counter++;
			this.add_listeners();
		}
	}
	add_listeners() {

		const buy_cant = this.handler.children[1];
		this.buy_confirm_open = false;
		let buy_cant_timer = 0;
		let tr = this;
        setTimeout(() => this.update_lvl(), 0);
        
        //create_tooltip(this.handler, '.item_img_refers', `Ulepszenie do ${this.refers().name}`, 'tt_left');
        
		this.handler.addEventListener('click', handle);

		function handle(e){

			if (!tr.bought && workshop.lvl >= tr.avail) {

				if (e.target.matches('.buy_button_ok *') && _peppercoins >= tr.price && tr.buy_confirm_open) {

					tr.handler.removeEventListener('click', handle);
                    
					if (tr.lvl_max === tr.lvl) {
						tr.handler.classList.add('item_bought');
						setTimeout(() => tr.update_lvl(), 0);

						tr.lvls.map(item => {
							item.maxed = true;
						});
					}
					else {
						tr.handler.style.transform = "rotateX(90deg)";
						setTimeout(function () {
							tr.handler.style.transform = "rotateX(0deg)";
							tr.handler.style.transition = "transform 0.2s cubic-bezier(.14,.57,.28,.99)";
							tr.update_lvl();
							tr.lvls[tr.lvl].replace_by_lvl.call(tr.lvls[tr.lvl]);
						}, 250);
						setTimeout(function () { tr.handler.style.transition = "transform 0.2s cubic-bezier(.59,.17,.8,.27)"; }, 500);
					}

					//znajdz pitem z otwarta lista i zamknij
					const item_with_opened_list = pitems.find(item => item.need_list_opened === true);
	
					if(item_with_opened_list && item_with_opened_list.need_list_opened){
						item_with_opened_list.toggle_need_list();
					}

					tr.close_buy_confirm();
					tr.bought = true;
					_peppercoins -= tr.price;
					update_coins();

					tr.lvls.map(item => {
						item.lvl_now++;
					});

					for(let i=0; i<pitems.length; i++){

						pitems[i].check_need_list();
					}
				}
				else {
					if (_peppercoins >= tr.price) {
						if (!tr.buy_confirm_open) {
							const items_opened = wspitems.filter(item => item.buy_confirm_open === true);
							if (items_opened.length)
								items_opened[0].close_buy_confirm();
							tr.close_buy_confirm();
						}
						else {
							tr.close_buy_confirm();
						}
					} else {
                        if(tr.buy_confirm_open){
                            tr.close_buy_confirm();
                        }
						buy_cant.classList.toggle('buy_cant_active');
						clearTimeout(buy_cant_timer);
						buy_cant_timer = setTimeout(() => buy_cant.classList.remove('buy_cant_active'), 1000);
					}
				}
			}
		}
	}
	replace_by_lvl() {
        
		this.handler.innerHTML = `
		<div class="item_locked"> <i class="fas fa-lock"></i><span class='locked_lvl'>${this.avail}</span> </div>

		<div class="item_buy_cant"> Za mało PepperCoins! </div>

		<div class="item_buy_confirm">
			<div class="buy_button_ok"><i class="fas fa-check"></i></div>
			<div class="buy_button_cancel"><i class="fas fa-times"></i></div>
		</div>

		<div class="item_title">
			${this.name} | <span class="item_price">${this.price}</span><i class="fas fa-coins"></i>
		</div>

		<div class="item_desc">
			${this.desc}
		</div>

		<div class="item_img">
			<img src="txt/items/workshop_processing/${this.img}">
		</div>

		<div class="item_stats">
			<span class='size_arrow'><i class="fas fa-arrows-alt-v"></i></span><i class="fas fa-cubes"></i> <span class="stat">${this.max_eff}</span>
		</div>

		<div class="item_lvl"></div>`;
		this.add_listeners();
	}
	close_buy_confirm() {
		const buy_cant = this.handler.children[1];
		const buy_confirm = this.handler.children[2];
		buy_confirm.classList.toggle('buy_confirm_active');
		buy_cant.classList.remove('buy_cant_active');
		this.buy_confirm_open = !this.buy_confirm_open;
	}
}

