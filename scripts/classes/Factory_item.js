class Factory_item {
	constructor(id, name, price, desc, img, prod, tag, avail = 1) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.desc = desc;
		this.img = img;
		this.prod = prod;
		this.tag = tag;
		this.avail = avail;

		this.unlocked = false;
		this.locked = false;
		this.handler = 0;
		this.amount = 0;
		this.price10 = 0;
	}
	dodaj_item() {
		$("#factory_items").append(`
			<div class="item">
				<div class="item_locked"> <i class="fas fa-lock"></i><span class='locked_lvl'>${this.avail}</span> </div>

				<div class="item_title">
					${this.name} | <span class="item_price">${this.price}</span><i class="fas fa-coins"></i>
				</div>

				<div class="item_desc">
					${this.desc}
				</div>

				<div class="item_img">
					<img src="txt/items/factory/${this.img}">
				</div>

				<div class="item_stats">
					<i class="fas fa-cog"></i> +<span class="stat">${this.prod}</span>/s
					<span class='upgrades'></span>
				</div>

				<div class="item_control">
					<span class="amount">
						<span class="count">0</span> =
						<span class="production">0</span>/s
					</span>
					<span class="add1">+1</span>
					<span class="add10">+10</span>

				</div>
			</div>
		`);
		//<span class="tip"></span>
		this.handler = document.querySelectorAll("#factory_items .item")[licznik];
		licznik++;
		//document.querySelector("#factory_items").insertBefore(fitems[2].handler, fitems[0].handler)
		const tr = this;

		const c_a1 = $(tr.handler).find(".add1");
		const c_a10 = $(tr.handler).find(".add10");
		this.c_stat = this.handler.querySelector('.stat');

		function buy_a1_a10() {
			stat_prod.innerHTML = Math.round(pc_production * 100) / 100;

			tr.update_meter();
			update_coins();
			c_a10.off();
			tr.calc_price10();
			create_tooltip(tr.handler, ".add10", `Kup <span class="tt_amount">10</span> ${tr.name} za <span class="tt_price">${Math.round(tr.price10)} <i class="fas fa-coins"></i></span> <span class='tt_discount'>(-5%)</span>`);
			//setInterval(()=>{$(".tooltip_std").remove();}, 900);
		}
		this.handler.addEventListener("click", function (e) {
			if (e.target.className == "add1") {
				if (_peppercoins >= tr.price) {
					tr.amount++;
					_peppercoins -= tr.price;
					tr.price *= 1.05;
					tr.calc_price10();
					pc_production += tr.prod;
					setTimeout(() => { buy_a1_a10(); }, 100);
					c_a1[0].style.background = "#7f7b";
				}
				else {
					c_a1[0].style.background = "#f77b";
				}
			}
			else if (e.target.className == "add10") {
				tr.calc_price10();
				if (_peppercoins >= tr.price10) {
					tr.price = tr.calc_price10(1);
					_peppercoins -= tr.price10;
					tr.price *= 1.05;
					tr.amount += 10;
					pc_production += tr.prod * 10;
					//console.log(pc_production, tr.prod*10);
					buy_a1_a10();
					c_a10[0].style.background = "#7f7b";
				}
				else {
					c_a10[0].style.background = "#f77b"; //dzieki clockowi nie trzeba ustawiac z powrotem koloru
				}
			}

		});
		create_tooltip(tr.handler, ".add1", `Kup 1 ${tr.name}`);
		tr.calc_price10();
		create_tooltip(tr.handler, ".add10", `Kup <span class="tt_amount">10</span> ${tr.name} za <span class="tt_price">${Math.round(tr.price10)} <i class="fas fa-coins"></i></span> <span class='tt_discount'>(-5%)</span>`);
	}
	calc_price10(ret = 0) {
		this.price10 = this.price;
		let price = this.price;
		for (i = 1; i <= 9; i++) {
			price *= 1.05; //rabat za 10x
			this.price10 += price;
		} 
        this.price10 *= 0.95;
        price *= 0.95;

		if (ret == 1)
			return price; //zwraca cene po 10x kupnie
	}

	update_meter(wsfitem){
		const c_count = this.handler.querySelector(".count");
		const c_prod = this.handler.querySelector(".production");
		const c_price = this.handler.querySelector(".item_price");

		c_count.innerHTML = this.amount;
		c_prod.innerHTML = Math.round((this.prod * this.amount) * 10) / 10;
		c_price.innerHTML = Math.round(this.price);

		if(this.id === 3 && this.amount >= 10){
			this.ukr_theme_set();
		}

		if(wsfitem){
			const c_upgrades = this.handler.querySelector(".item_stats .upgrades");

			const images = c_upgrades.querySelectorAll('img');
			
			for(let i=0; i<images.length; i++){
				const image = images[i];

				if(image.dataset.tag === wsfitem.tag){
					image.remove();
				}		
			}

			let frag = document.createDocumentFragment();

			const img = document.createElement('img');
			img.src = `txt/items/workshop_factory/${wsfitem.img}`;
			img.dataset.tag = wsfitem.tag;

			frag.appendChild(img)

			c_upgrades.appendChild(frag);
		}
	}

	ukr_theme_set(){
		if(!ukr_theme_unlocked){

			const secret_theme_switch = document.getElementById('secret_theme_ukr');
			const secret_theme_text = secret_theme_switch.querySelector('.secret_theme_text');

			secret_theme_switch.classList.remove('secret_theme');
			ukr_theme_unlocked = true;
			secret_theme_switch.color = 'red';
			secret_theme_text.innerHTML = 'Motyw Ukraińca';
			theme_switches[3].choose_theme();
		}
	}
}

let ukr_theme_unlocked = false;