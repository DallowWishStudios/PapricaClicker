let item_object_count=0;

class Item {
	constructor(id, name, price, desc, zdj, eff, lvl_tag = 0, lvl = 0, avail = 1) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.desc = desc;
		this.zdj = zdj;
		this.eff = eff;
		this.lvl_tag = lvl_tag;
		this.lvl = lvl;
		this.avail = avail;
		this.lvl_max = 0;
		this.bought = false;
		item_object_count++; //ilosc obiektow
	}
	dodaj_item() {
		$("#shop_items").append(`
			<div class="item">

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
					<img src="txt/items/${this.zdj}">
				</div>

				<div class="item_stats">
					<i class="far fa-arrow-alt-circle-up"></i> +${Math.round((this.eff - 1) * 100)}%
				</div>

				<div class="item_lvl"></div>
			</div>
		`);
	}
	item_lvl_update() {
		if (this.lvl_tag) {
			class_item_lvl[this.id - 1].innerHTML = "";
			if (!(this.bought)) {
				for (let i = 1; i < this.lvl; i++) {
					class_item_lvl[this.id - 1].innerHTML += "<i class='fas fa-circle'></i> ";
				}
				for (let i = this.lvl; i <= this.lvl_max; i++) {
					class_item_lvl[this.id - 1].innerHTML += "<i class='far fa-circle'></i> ";
				}
			}
		}
	}
	replace_by_lvl() {
		const tr = this; //This Remembered - zapamietany this dla funkcji klik ponizej
		class_item[this.id - 1].innerHTML = `
			<div class="item_locked"> <i class="fas fa-lock"></i><span class='locked_lvl'>${tr.avail}</span> </div>

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
				<img src="txt/items/shop/${this.zdj}">
			</div>

			<div class="item_stats">
				<i class="far fa-arrow-alt-circle-up"></i> +${Math.round((this.eff - 1) * 100)}%
			</div>

			<div class="item_lvl"></div>
		`;
		let max_lvl_holder = 0;
		if (!tr.lvl_max) {
			for (let j = 0; j < item_upgrades.length; j++) {
				if (item_upgrades[j].lvl_tag == tr.lvl_tag) {
					max_lvl_holder++;
				}
			}
		}
		tr.lvl_max = max_lvl_holder; //ustawia max lvl na postawie ilosci upgradow z takim samym tagiem
		tr.item_lvl_update();
		$(".buy_button_ok").eq(this.id - 1).click(function () {

			if ((_peppercoins >= tr.price) && buy_confirm_is_shown[tr.id - 1] && !(tr.bought) && (tr.avail <= lvl_now + 1)) {

				tr.bought = true;
				if ((tr.lvl == tr.lvl_max) && tr.bought) {

					class_item[tr.id - 1].style.backgroundColor = "rgba(200, 255, 200, .8)";
					class_item[tr.id - 1].style.border = "3px solid white";
					class_item_lvl[tr.id - 1].innerHTML = "";
					for (let i = 1; i <= tr.lvl_max; i++) {
						class_item_lvl[tr.id - 1].innerHTML += "<i class='fas fa-circle'></i> ";
					}
					hide_buy_confirm();

					if(tr.name === 'Miecz świetlny'){
						navigator.vibrate([500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]);
					}
				}
				else { //tylko kropki
					class_item[tr.id - 1].style.transform = "rotateX(90deg)";
					setTimeout(function () {
						tr.item_lvl_update();
						class_item[tr.id - 1].style.transform = "rotateX(0deg)";
						class_item[tr.id - 1].style.transition = "transform 0.2s cubic-bezier(.14,.57,.28,.99)";
					}, 250);
					setTimeout(function () { class_item[tr.id - 1].style.transition = "transform 0.2s cubic-bezier(.59,.17,.8,.27)"; }, 500);
				}
				_peppercoins -= tr.price;
				_wydajnosc *= tr.eff;
				$(".stat_numbers").eq(0).html(Math.round(_wydajnosc));

				for (let j = 0; j < item_upgrades.length; j++) {

					if ((tr.lvl_tag == item_upgrades[j].lvl_tag) && (tr.lvl == item_upgrades[j].lvl)) {
						$("#paprica_click img").hover(function () {

							current_cursor = tr.name;
							$(this).off();
							$(this).css('cursor', "url('txt/cursors/" + tr.zdj + "'), pointer");
						});
					}
					if ((item_upgrades[j].lvl_tag == tr.lvl_tag) && (tr.lvl + 1 == item_upgrades[j].lvl)) {

						items[tr.id - 1] = item_upgrades[j];
						break;
					}
				}
				if (tr.lvl != tr.lvl_max) {

					setTimeout(function () { items[tr.id - 1].replace_by_lvl(); }, 250);
				}
				update_coins();
			}
		});
	}
}
