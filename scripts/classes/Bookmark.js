class Bookmark {
	constructor(id, name, price, desc, shop_handler, active = false, avail = 1, unlocked = false) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.desc = desc;
		this.shop_handler = shop_handler;
		this.active = active;
		this.avail = avail;
		this.unlocked = unlocked;
		this.locked = false;
		this.bought = false;
	}
	color() {
		const tr = this;
		if (this.bought) {
			setTimeout(function () {
				marks[tr.id].style.boxShadow = "none";
				switch (tr.id) {
					case 1:
						marks[tr.id].style.backgroundColor = "#acdcff";
						break;
					case 2:
						marks[tr.id].style.backgroundColor = "rgb(255, 110, 110)";
						break;
					case 3:
						marks[tr.id].style.backgroundColor = "#b35ac9";
						break;
				}
			}, 1000);
		}
	}
	bookmark_activation() {
		//console.log(this);
		for (i = 0; i < bookmarks.length; i++) {
			bookmarks[i].shop_handler.style.display = "none";
			bookmarks[i].active = false;
			marks[bookmarks[i].id].style.height = "80%";
			marks[bookmarks[i].id].style.marginTop = "7px";
			marks[bookmarks[i].id].style.color = "rgba(0, 0, 0, 0.3)";
		}
		this.active = true;
		this.shop_handler.style.display = "block";
		//console.log(this.shop_handler);
		marks[this.id].style.height = "100%";
		marks[this.id].style.marginTop = "0";
		marks[this.id].style.color = "rgba(0, 0, 0, 0.6)";
	}
	dodaj_listenery(nr) {
		const tr = this;
		let timer_mark_tip = [bookmarks.length];
		let timer_mark = [bookmarks.length];
		let tip_buy_tip = "<span class='tip_buy_tip'> Aby budować kliknij w zakładkę </span>";
		let tip_price = "<span class='tip_price'>" + tr.price + " <i class='fas fa-coins'></span></i>";
		let tip_lvl = "<span class='tip_lvl'>Dostępne od " + tr.avail + " lvla</span>";
		if (tr.bought) {
			tip_price = "";
			tip_buy_tip = "";
		}
		marks[this.id].addEventListener("click", function () {
			if (tr.bought) { //gdy zakladka kupiona
				if (!(tr.active)) {
					tr.bookmark_activation();
				}
			}
			else if (_peppercoins >= tr.price && lvl_now + 1 >= tr.avail) { //gdy stac na zakup zakladki
				tr.bought = true;
				tr.bookmark_activation();
				_peppercoins -= tr.price;
				this.style.backgroundColor = "#6f6";
				this.style.boxShadow = "0 0 40px #6f6";
				tr.color(); //czasami nie odpala settimeout za pierwszym razem
				tr.color();
				update_coins();
			}
			else { //gdy nie stac
				this.style.backgroundColor = "#f66";
				timer_mark[tr.id] = setTimeout(() => {
					this.style.backgroundColor = "#bdbdbd";
				}, 400);
			}
		});
		$(".mark").eq(tr.id).on('mouseover', function () {
			if (lvl_now + 1 >= tr.avail) {
				marks[tr.id].style.height = "100%";
				marks[tr.id].style.marginTop = "0";
			}
			for (i = 0; i < timer_mark_tip.length; i++) {
				clearTimeout(timer_mark_tip[i]);
			}
			$(".mark .tip").css("opacity", "0");
			timer_mark_tip[tr.id] = setTimeout(function () {
				if (tr.bought) {
					tip_price = "";
					tip_buy_tip = "";
				}
				$(".mark .tip").css("opacity", "0");
				// $(".mark .tip").css("display", "none");
				// $(".mark .tip").eq(tr.id).css("display", "inline-block");
				$(".mark .tip").eq(tr.id).css("opacity", "1");

				if (lvl_now + 1 >= tr.avail) {
					$(".mark .tip").eq(tr.id).html(tip_price + "<span class='tip_name'>" + tr.name + "</span>" + " - " + tr.desc + tip_buy_tip);
				}
				else {
					$(".mark .tip").eq(tr.id).html(tip_lvl + "<span class='tip_name'>" + tr.name + "</span>" + " - " + tr.desc);
				}
				if(tr.id === 3){
					$(".mark .tip").eq(tr.id).html('coming soon...');
				}
			}, 800);
		});
		$(".mark").eq(tr.id).on("mouseleave", function () {
			// 	//console.log(tr);
			if (!(bookmarks[tr.id].active)) {
				marks[tr.id].style.height = "80%";
				marks[tr.id].style.marginTop = "7px";
			}
			for (i = 0; i < timer_mark_tip.length; i++) {
				clearTimeout(timer_mark_tip[i]);
			}
			$(".mark .tip").css("opacity", "0");
		});
	}
}
let bookmarks = [
	new Bookmark(0, "Sklep", 0, "Sklep z przedmiotami przyśpieszającymi zbieranie papryki.", document.getElementById("shop"), true, 1, true),
	new Bookmark(1, "Fabryka", 500, "Automatyczne zbieranie papryki!", document.getElementById("factory"), false, 10),
	new Bookmark(2, "Przetwórnia", 5000, "Pozwala zwiększać wartość papryki poprzez przetwarzanie jej na różne produkty. Aby ją używać musisz posiadać wytwórnię.", document.getElementById("processing"), false, 25),
	new Bookmark(3, "Coming soon...", 10000, "", document.getElementById("lab"), false, 9999),
	//new Bookmark(3, "Laboratorium", 10000, "Umożliwia zaawansowane modyfikacje genetyczne. ", document.getElementById("lab"), false, 50),
];
class Workshop_bookmark {
	constructor(id, name, price, desc, shop_handler, active = false, avail = 1, unlocked = false) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.desc = desc;
		this.shop_handler = shop_handler;
		this.handler = document.querySelectorAll('#workshop .mark')[this.id];
		this.active = active;
		this.avail = avail;
		this.unlocked = unlocked;
		this.locked = false;
		this.bought = false;
		this.dodaj_listenery();
	}
	color() {
		const tr = this;
		if (this.bought) {
			setTimeout(function () {
				tr.handler.style.boxShadow = "none";
				switch (tr.id) {
					//case 0: tr.handler.style.backgroundColor = "#acdcff"; break;
					case 1:
						tr.handler.style.backgroundColor = "#ff8800";
						break;
				}
			}, 1000);
		}
	}
	bookmark_activation() {
		const active_mark = wbookmarks.find(bm => bm.active === true);
		active_mark.shop_handler.style.display = "none";
		active_mark.active = false;
		active_mark.handler.style.height = "80%";
		active_mark.handler.style.marginTop = "7px";
		active_mark.handler.style.color = "rgba(0, 0, 0, 0.3)";
		this.active = true;
		this.shop_handler.style.display = "block";
		this.handler.style.height = "100%";
		this.handler.style.marginTop = "0";
		this.handler.style.color = "rgba(0, 0, 0, 0.6)";
	}
	dodaj_listenery() {
		const tr = this;
		let timer_mark_tip = [bookmarks.length];
		let timer_mark = [bookmarks.length];
		let tip_buy_tip = "<span class='tip_buy_tip'> Aby budować kliknij w zakładkę </span>";
		let tip_price = "<span class='tip_price'>" + tr.price + " <i class='fas fa-coins'></span></i>";
		let tip_lvl = "<span class='tip_lvl'>Dostępne od " + tr.avail + " lvla</span>";
		if (tr.bought || tr.id === 0) {
			tip_price = "";
			tip_buy_tip = "";
		}
		this.handler.addEventListener("click", function () {
			if (tr.bought) { //gdy zakladka kupiona
				if (!(tr.active)) {
					tr.bookmark_activation();
				}
			}
			else if (_peppercoins >= tr.price && lvl_now + 1 >= tr.avail) { //gdy stac na zakup zakladki
				tr.bought = true;
				tr.bookmark_activation();
				_peppercoins -= tr.price;
				if (tr.id !== 0) {
					tr.handler.style.backgroundColor = "#6f6";
					tr.handler.style.boxShadow = "0 0 40px #6f6";
				}
				tr.color(); //czasami nie odpala settimeout za pierwszym razem
				tr.color();
				update_coins();
			}
			else { //gdy nie stac
				this.style.backgroundColor = "#f66";
				timer_mark[tr.id] = setTimeout(() => {
					this.style.backgroundColor = "#bdbdbd";
				}, 400);
			}
		});
		$(this.handler).on('mouseover', function () {
			if (lvl_now + 1 >= tr.avail) {
				tr.handler.style.height = "100%";
				tr.handler.style.marginTop = "0";
			}
			for (i = 0; i < timer_mark_tip.length; i++) {
				clearTimeout(timer_mark_tip[i]);
			}
			$("#workshop .mark .tip").css("opacity", "0");
			timer_mark_tip[tr.id] = setTimeout(function () {
				if (tr.bought) {
					tip_price = "";
					tip_buy_tip = "";
				}
				$("#workshop .mark .tip").css({ "opacity": "0"/*, "display": "none" */});
				$("#workshop .mark .tip").eq(tr.id).css({ /*"display": "inline-block",*/ "opacity": "1" });
				if (lvl_now + 1 >= tr.avail) {
					$("#workshop .mark .tip").eq(tr.id).html(tip_price + "<span class='tip_name'>" + tr.name + "</span>" + " - " + tr.desc + tip_buy_tip);
				}
				else {
					$("#workshop .mark .tip").eq(tr.id).html(tip_lvl + "<span class='tip_name'>" + tr.name + "</span>" + " - " + tr.desc);
				}
			}, 800);
		});
		$(this.handler).on("mouseleave", function () {
			if (!tr.active) {
				tr.handler.style.height = "80%";
				tr.handler.style.marginTop = "7px";
			}
			for (i = 0; i < timer_mark_tip.length; i++) {
				clearTimeout(timer_mark_tip[i]);
			}
			$("#workshop .mark .tip").css("opacity", "0");
		});
	}
}
//---------------------------------------
let wbookmarks = [
	new Workshop_bookmark(0, "Warsztat", 0, "Ulepszenia do przedmiotów w fabryce. Zakupione ulepszenia są automatycznie aplikowane do każdego obiektu w fabryce.", document.getElementById("workshop_factory"), true, 1, true),
	new Workshop_bookmark(1, "Wytwórnia", 2000, "Przedmioty potrzebne do przetwarzania papryki na rozmaite produkty. Bez wytwórni przetwórnia jest bezużyteczna.", document.getElementById("workshop_processing"), false, 25)
];
