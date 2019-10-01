let devmode = 0; // 1 = true / 0 - false

let progress=0;
let _peppercoins=0;
let _pepper=0;
let reszta=0;
let space=10;
let space_used=0;
let starting_space_price=1000;
let space_price = starting_space_price;
let space_price_multiplier = 1.2;
let _wydajnosc=100;

let pepper_to_subtract = 0;
let peppercoins_to_add = 0;

let licznik=0;
let multi=1;
let id=1;
let amount_upgrades = 0;
let pc_production = 0;
let pc_ever = _peppercoins;
let xp_max = 0;
let xp_fill = 0;
let lvls = [];
let lvl_now = 0;
window.lvl_now = lvl_now;

let clicks_per_sec = 0;
let clicks_per_sec_max = 0;
let pepper_overall = 0;
let pepper_overall_max = 0;

let current_cursor = '';

const stat_eff = document.querySelectorAll(".stats .stat_numbers")[0];
const stat_prod = document.querySelectorAll(".stats .stat_numbers")[1];
const c_stat_clicks = document.querySelectorAll(".stats .stat_numbers")[2];
const c_stat_clicks_max = document.querySelectorAll(".stats .stat_numbers")[3];
const c_stat_overall = document.querySelectorAll(".stats .stat_numbers")[4];
const c_stat_overall_max = document.querySelectorAll(".stats .stat_numbers")[5];

const class_item = document.getElementsByClassName('item');
const progress_bar = document.querySelector('progress');
const paprica_amount = document.getElementById('paprica_amount');
const money_amount = document.getElementById('money_amount');
const class_item_lvl = document.getElementsByClassName('item_lvl');
const item_confirm = document.getElementsByClassName("item_buy_confirm");
const item_cant = document.getElementsByClassName("item_buy_cant");
const shop = document.getElementById("#shop_items");
var class_buy_button_ok = document.getElementsByClassName('buy_button_ok');
var class_buy_button_cancel = document.getElementsByClassName('buy_button_cancel');

var c_xp_fill = document.getElementById('xp_fill').style;
const c_lvl = document.getElementById("lvl_numbers");
const c_next_lvl = document.getElementById("next_lvl_numbers");
const c_rank_text = document.getElementById("rank_text");

const marks = document.getElementsByClassName("mark");
const wmarks = document.getElementsByClassName("wmark");
const mark_prices = document.getElementsByClassName("mark_price");

const c_fitems = document.querySelectorAll("#factory_items .item");

let tooltip_std;

const c_expand_ws_button = document.getElementById('exp_ws_btn');

const c_header = document.querySelector('#header h1');

const game = {
	version: 'alpha 0.4.4.2',
	// devmode: devmode,
	header_content: 'Paprica Clicker',
	first_time: true,
	devmode_bool: false,
	no_command_iterator: 1,

	set devmode(active){
		if(active){
			_wydajnosc = 10000000;

			const dev_col = '#1e6cac';

			c_header.textContent += ' [dev]';

			const c_load_title = document.getElementById('title');
			const c_loading_bg = document.getElementById('main_loading');
			
			if(c_load_title && c_loading_bg){
				c_load_title.textContent += '[dev]';
				c_loading_bg.style.setProperty('background-color', dev_col, 'important');
			}

			setTimeout(()=>{
				c_header.parentElement.style.setProperty('background-color', dev_col, 'important');
			}, 100);

			this.devmode_bool = true;
		} else {
			if(!this.first_time){
				_wydajnosc = 100;

				c_header.textContent = this.header_content;

				const default_switch = theme_switches[localStorage.getItem('theme')-1];
				
				if(default_switch){
					default_switch.choose_theme();
					default_switch.switch_switches();
				}

				this.devmode_bool = false;
			}
		}
		this.first_time = false;
	},
	
	get devmode(){
		return this.devmode_bool;
	},

	caprica: ()=>{
		const chance = 12;
		const random = Math.floor(Math.random()*chance+1);

		if(random===chance){ 

			this.header_content = 'Caprica Plicker';
			c_header.innerHTML = this.header_content;
			
			return true;
		}
		else return false;
	},
	
	init: function(){
		const version_elements = [
			document.getElementById('version'),
			document.getElementById('loading_version')
		];

		version_elements.map(el => el.appendChild(document.createTextNode(this.version)));

		this.devmode = devmode;

		this.caprica();

		const c_command_form = document.getElementById('command_form');

		c_command_form.addEventListener('submit', e => {
			e.preventDefault();

			this.handle_command();
		});
	},

	handle_command(){

		const cmd = document.getElementById('command_line').value;
		let command = cmd.trim().toLowerCase();
		const c_command_output = document.getElementById('command_output');

		const output = (text, activate=false, elems=null) => {
			
			const frag = document.createDocumentFragment();
			const text_node = document.createTextNode(text);
			const br = document.createElement('br');

			const system = document.createElement('span');
			system.appendChild(document.createTextNode('System: '));
			system.classList.add('b');

			frag.appendChild(system);
			frag.appendChild(text_node, br);

			if(elems)
				frag.appendChild(elems);

			frag.appendChild(br);

			c_command_output.appendChild(frag);

			c_command_output.scrollTop = c_command_output.scrollHeight;

			if(activate){
				if(!this.devmode)
					this.devmode = true;
				this.no_command_iterator = 1;
			}
		};
		
		switch (command) {
			// case 'devmode':
			// 	if(this.devmode){
			// 		this.devmode = false;
			// 		output('Devmode dezaktywowany');	 
			// 	} else {
			// 		this.devmode = true;
			// 		output('Devmode aktywowany');
			// 	}
			// break;
			case (command.match(/^[\w\W]*stod[\w\W]*$/) || {}).input: {
				
				const bullets = [
					'Cisza!',
					'Jak przekupy na targu!',
					'*klep w ramię od tyłu* nazwisko?',
					()=>{
						const old_bg_col = body.backgroundColor;
						body.backgroundColor = 'blue';
						setTimeout(()=>{
							body.backgroundColor = old_bg_col;
						},1000);
					}
				];

				const rand = Math.floor(Math.random()*bullets.length);
				
				if(typeof bullets[rand] === 'string'){
					output(bullets[rand]);
				} else {
					bullets[rand]();
				}
			} break;

			case (command.match(/^[\w\W]*frasu[nń][\w\W]*$/) || {}).input: {

				const bullets = [
					'Uczyć się',
					'Chodzić chodzić!',
					'Nie opuszczać!',
					'Usprawiedliwiać!',
					'Pojedziemy na wycieczkę! Nie no jaja se robię!',
					'Nie róbcie sobie jaj!',
					'I pojawia się problem!',
					()=>{
						const fra = document.getElementById('frasun');

						fra.classList.add('active');
						//fra.classList.remove(active);
						const max_abs_randXY = 700;
						const max_abs_rotate = 200;
						const max = 30;
						let times = 0;
		
						const interval = setInterval(()=>{
							let rand_translateX = Math.floor(Math.random() * (max_abs_randXY-(-max_abs_randXY)) + 1)+(-max_abs_randXY);
							let rand_translateY = Math.floor(Math.random() * (max_abs_randXY-(-max_abs_randXY)) + 1)+(-max_abs_randXY);
							let rand_rot = Math.floor(Math.random() * (max_abs_rotate-(-max_abs_rotate)) + 1)+(-max_abs_rotate);
							fra.style.transform = `translate(${rand_translateX}px, ${rand_translateY}px) rotate(${rand_rot}deg)`;
							times++;
		
							if(times>=max){
								clearInterval(interval);
								fra.style.transform = ``;
								fra.classList.remove('active');
		
								
							}
						}, 100);
					}
				];

				const rand = Math.floor(Math.random()*bullets.length);
				
				if(typeof bullets[rand] === 'string'){
					output(bullets[rand]);
				} else {
					bullets[rand]();
				}

			} break;

			case 'radzina':
			case 'radzinka':
			case 'radzio':
			case 'radosław':
			case 'radoslaw':
			case 'radek':
				output('Przeciążenie systemu. Restart za: 3...');
				setTimeout(()=>output('2...'),1000);
				setTimeout(()=>output('1...'),2000);
				setTimeout(()=>output('0...'),3000);
				setTimeout(()=>output('Restart nieudany. System nie jest w stanie zapanować nad tak dużą ilością mocy.'),4000);
				setTimeout(()=>output('Paroby uciekają z lochów, krasnale ogrodowe stoją i się patrzą, a wali pachnie.'),7000);
				setTimeout(()=>output('Rynek Potworowski płonie.'),10000);
				setTimeout(()=>output('Stan wyjątkowy w mocarstwie Dłuska Wola ogłoszony.'),13000);
			break;
			case (command.match(/^prod\s*\d$/) || {}).input:

				const lvl_raw = command.match(/\d/);
				const lvl = parseInt(lvl_raw[0]);
				
				pc_production = Math.pow(15, lvl);

				const sup = ()=>{
					const sup_el = document.createElement('sup');
					sup_el.appendChild(document.createTextNode(lvl));
					return sup_el;
				};

				output('produkcja papryki to teraz 15', true, sup());
			break;
			default:
				if(command){
					switch(this.no_command_iterator){
						case 1:
							output('Nie ma takiej komendy.');
						break;
						case 2:
							output('Nie ma takiej komendy!');
						break;
						case 3:
							output('Mówię do ciebie! Nie! ma! takiej! komendy!');
						break;
						case 4:
							output('STOP!');
						break;
						case 5:
							output('Mógłbyś np. przestać mnie denerwować?');
						break;
						case 6:
							output('Czyli mówisz, że potrzebujesz pomocy psychicznej? Polecam pedagoga szkolnego.');
						break;
						case 7:
							output('A więc tak się bawimy...');
						break;
						case 8:
							output('A lepę na ryj byś nie chciał?');
						break;
						case 9:
							output('Nie wku*wiaj mnie, proszę.');
						break;
						case 10:
							output('Zaraz chyba przestanę być miły...');
						break;
						case 11: {
							output('Ok, sam tego chciałeś!');
							let max = 6;
							let times = 0;
							const interval = setInterval(()=>{
								const body = document.querySelector('body');
								body.style.filter = `hue-rotate(${Math.floor(Math.random()*360)}deg)`;
								times++;
								if(times>=max){
									clearInterval(interval);
									output('I jak, było przyjemnie?');
									body.style.filter = ``;
								}
							}, 200);
						}
						break;
						case 12:
							output('To było tylko małe szturchnięcie...');
						break;
						case 13:
							output('Ale poczekaj, jeszcze trochę i nie będzie tak przyjemnie...');
						break;
						case 14: {
							output('Ciekawe co powiesz jak pobawię się twoją papryką!');
							let max = 30;
							let times = 0;
							const interval = setInterval(()=>{
								times++;
								const max_min_rand = 700;
								let rand_translateX = Math.floor(Math.random() * (max_min_rand-(-max_min_rand)) + 1)+(-max_min_rand);
								let rand_translateY = Math.floor(Math.random() * (max_min_rand-(-max_min_rand)) + 1)+(-max_min_rand);
								pap_click.style.transform = `translate(${rand_translateX}px, ${rand_translateY}px)`;
								if(times>=max){
									clearInterval(interval);
									pap_click.style.transform = ``;
									output('Może teraz coś przemyślisz mały grzybie?');
								}
							}, 50);
						}
						break;
						case 15:
							output('Ty wiesz... gdyby wsadzić to co masz we łbie do główki od szpilki to wyszłaby grzechotka');
						break;
						case 16:
							output('Rozumiem że można przegrać loterię genetyczną, ale twój ryj to jackpot wśród przegranych');
						break;
						case 17:
							output('Rzucam tę robotę. Minimalna krajowa nie jest tego warta.');
						break;
						case 18:
							output('...');
						break;
						case 19:
							output('🖕');
						break;					
						default:
							output('...');
						break;
					}
				}
				this.no_command_iterator++;
				
			break;
		}
	}
};

game.init();

const workshop = {
	price: 2000,
	lvl: 1,
	max_bg: 8,
	handler: document.getElementById('workshop'),
	c_lvl: document.getElementById('workshop_lvl'),
	c_exp_price: document.getElementById('expand_workshop_price'),
	c_build_lvl: document.getElementsByClassName('locked_lvl')[0],
	c_btn_lvl: document.getElementById('exp_ws_btn_lvl'),
	expand_price: 12000,
	// backgrounds: ['workshop0.jpg','workshop1.jpg','workshop2.jpg',],
	built: false,
	btn: document.getElementById('expand_workshop_btn'),

	update(){
		if(_peppercoins < this.expand_price){
			c_expand_ws_button.classList.add('buy_btn_unaffordable');
		} else {
			c_expand_ws_button.classList.remove('buy_btn_unaffordable');
		}
	},

	lvl_up(){

		if(_peppercoins >= workshop.expand_price){
				
			if(this.max_bg >= this.lvl){
				this.handler.style.backgroundImage = `url(txt/backgrounds/workshop${this.lvl}.jpg)`;
			}
			this.lvl++;
			this.expand_price *= 3;
			this.c_lvl.innerText = this.lvl;
			this.c_exp_price.innerText = this.expand_price;
			this.c_btn_lvl.innerText = this.lvl;
			this.update();
		}
	}
};

const ad = {
	watch_btn: document.getElementById('watch_ad_btn'),
	container: document.getElementById('ad'),
	video: document.getElementsByTagName('video')[0],
	watched: false,

	init(){
		
		this.watch_btn.addEventListener('click', () => {
			if(!this.watched){
				this.watch_btn.classList.add('watched');
				this.watched = true;
				this.container.classList.add('active');
				this.video.play();
				try {
					this.video.addEventListener('ended', () => {
					
						this.container.classList.remove('active');
						_peppercoins += 100;
						this.container.remove();

					}).bind(this);
				} catch(e) {}
			}
		});
	}
};

ad.init();

const loading = {
	container: document.getElementById('main_loading'),

	finish(){
		this.container.classList.add('finished');
		setTimeout(() => {
			this.container.remove();
		}, 1000);
	}
};

//TODO zrobic automatyczne wylaczenie auto sprzedazy albo cos po kupieniu rzeczy do przetworni
//TODO tutorial

workshop.c_lvl.innerText = workshop.lvl;
workshop.c_exp_price.innerText = workshop.expand_price;

c_expand_ws_button.addEventListener('click', ()=>{workshop.lvl_up()});

//kordy
let cord_X;
let cord_Y;

document.querySelector("body").addEventListener("mousemove", (e)=>{
	cord_X = e.pageX;
	cord_Y = e.pageY;

	// document.querySelector('.tooltip_std')
	if(tooltips.any_active){ 
		$(".tooltip_std").css({'opacity':"0", 'transform':"translateY(10px)"});
		setTimeout(() => { $(".tooltip_std").remove(); }, 20);
	}
});

function update_consists(){

	if(bookmarks[2].bought){
		const c_consists_content = document.getElementById('consists_content');
		const c_consists_pepper = document.getElementById('consists_pepper');
		const c_consists_profit = document.getElementById('consists_profit');

		let consists_pepper_overall = -pepper_to_subtract;
		let consists_profit_overall = peppercoins_to_add + pepper_to_subtract;

		c_consists_content.innerHTML = '';

		const pitems_active = pitems.filter( item => item.amount > 0 );

		for(i=0; i<pitems_active.length; i++){

			c_consists_content.innerHTML += `
				<div class="processing_piece">
					<span class="pepper">${ Math.round(pitems_active[i].amount*pitems_active[i].multi_count) }x</span> 
					<div class='center'>
						<img src="txt/peppers/red.png">
						<i class="fas fa-angle-double-right"></i>
						<img src="txt/items/processing/${ pitems_active[i].img }">
					</div>
					<span class="product">+${ Math.round((pitems_active[i].multi-1)*100) }%</span>
				</div>
			`;
		}
		c_consists_pepper.textContent = consists_pepper_overall;
		c_consists_profit.textContent = Math.round(consists_profit_overall);
	}
}

const c_space = document.getElementById('space');
const c_space_meter = document.getElementById('space_amount');

const c_space_together = document.getElementById('space_together');
const c_space_used = document.getElementById('space_used');
const c_space_price = document.getElementById('space_price');
const c_buy_space_btn = document.getElementById('buy_space_btn');
const c_buy_max_space_btn = document.getElementById('buy_max_space_btn');

function update_space(){
	c_space_price.innerText = Math.round(space_price);
	c_space_together.innerText = Math.round(space);
	c_space_meter.innerText = Math.round(space - space_used);
	c_space_used.innerText = Math.round(space_used);

	if(_peppercoins < space_price){
		c_buy_space_btn.classList.add('buy_btn_unaffordable');
		c_buy_max_space_btn.classList.add('buy_btn_unaffordable');
	} else {
		c_buy_space_btn.classList.remove('buy_btn_unaffordable');
		c_buy_max_space_btn.classList.remove('buy_btn_unaffordable');
	}

	for(i=0; i<pitems.length; i++){
		//pitems[i].check_need_list();
		pitems[i].check_more_less();
	}
}

update_space();

c_buy_space_btn.addEventListener('click', () => {
	if(_peppercoins >= space_price){
		_peppercoins -= space_price;
		space_price += starting_space_price;
		space++;

		update_space();
		update_coins();
	}
});

c_buy_max_space_btn.addEventListener('click', () => {
	while(_peppercoins >= space_price){
		_peppercoins -= space_price;
		space_price += starting_space_price;
		space++;

		update_space();
		update_coins();
	}
});

/***********************************************************/

const c_close_stats = document.getElementById('close_stats');

c_close_stats.addEventListener('click', () => {
	c_close_stats.parentElement.classList.toggle('closed_stats');
	c_close_stats.classList.toggle('closed_btn');
});

const c_pepper_settings = document.getElementById("pepper_settings");
const c_pepper_settings_window = document.querySelector("#peppercoins .settings_window");
const c_pepper_settings_slider = document.querySelector("#auto_sell_slider");
const c_pepper_settings_slider_percent = document.querySelector("#auto_sell_percent");
const c_pepper_settings_auto_sell_switch = document.querySelector("#auto_sell_switch");
const c_pepper_settings_auto_sell = document.querySelector("#auto_sell");
const c_pepper_settings_sell_all = document.querySelector("#sell_all");
const c_pepper_settings_close_btn = document.querySelector("#peppercoins .settings_close_btn");
let pepper_settings_opened = false;
let pepper_settings_auto_sell = true;
let auto_sell_percent = 0;

c_pepper_settings_slider_percent.innerHTML = c_pepper_settings_slider.value;

sw_id = 0;

class Sw{

	constructor(line, sw, one_at_once = false, unlocked = true){
		this.id = sw_id++;

		this.line = line;
		this.c_switch = sw;
		this.one_at_once = one_at_once;
		this.unlocked = unlocked;

		this.opened = true;

		this.add_switch();
	}

	add_switch(){

		this.line.addEventListener('click', ()=>{

			if(this.opened && !this.one_at_once){
				this.close();

			} else {
				if(this.unlocked) this.switch_switches();
			}
		});
	}

	switch_switches(){
		if(this.id !== 3){

			if(this.one_at_once){
				theme_switches.map(item => item.opened ? item.close() : false);
				this.choose_theme();
			}

			this.opened = true;
			setTimeout(() => {
				this.c_switch.innerHTML = '<i class="fas fa-toggle-on"></i>';
			}, 0);

		} else if(cursed_unlocked){
			
			this.switch_on_cursed();
		}
	}

	close(){
		this.opened = false;
		setTimeout(() => {
			this.c_switch.innerHTML = '<i class="fas fa-toggle-off"></i>';
		}, 0);
	}

	choose_theme(){

		localStorage.setItem('theme', this.id);

		switch (this.id) {
			case 1:{
				set_theme('rgb(180, 0, 0)', 'rgb(140, 0, 0)', '#0002', 'rgba(180, 0, 0, .5)');
				break;
			}
			case 2:{
				set_theme('#320808', 'rgb(65, 31, 31)', '#320808', 'rgba(0, 0, 0, 0.06)');
				break;
			}
			case 3:{
				cursed_on();
				break;
			}
			case 4:{
				if(this.unlocked)
					set_theme('rgb(43, 135, 210)', 'rgb(218, 194, 40)', 'rgb(43, 135, 210)', 'rgb(43, 135, 210)');
				break;
			}
		
			default:
				break;
		}
	}

	switch_on_cursed(){
		if(this.one_at_once){
			theme_switches.map(item => item.opened ? item.close() : false);
			this.choose_theme();
		}

		this.opened = true;
		setTimeout(() => {
			this.c_switch.innerHTML = '<i class="fas fa-toggle-on"></i>';
		}, 0);
	}
}

let switches = [
	new Sw(c_pepper_settings_auto_sell, c_pepper_settings_auto_sell_switch),
];

let theme_switches = [
	new Sw(document.querySelectorAll('.theme_piece')[0], document.querySelectorAll('.theme_piece')[0].querySelector('.setting_switch'), true),
	new Sw(document.querySelectorAll('.theme_piece')[1], document.querySelectorAll('.theme_piece')[1].querySelector('.setting_switch'), true),
	new Sw(document.querySelectorAll('.theme_piece')[2], document.querySelectorAll('.theme_piece')[2].querySelector('.setting_switch'), true),
	new Sw(document.querySelectorAll('.theme_piece')[3], document.querySelectorAll('.theme_piece')[3].querySelector('.setting_switch'), true, false),
];

function set_theme(header_color, body_color, footer_color, stts_color){
	cursed_off();
	hder.backgroundColor = header_color;
	body.backgroundColor = body_color;
	if(footer_color) footer.backgroundColor = footer_color;
	if(stts_color) stts.backgroundColor = stts_color;
}

c_pepper_settings_slider.oninput = function(){
	c_pepper_settings_slider_percent.innerHTML = this.value;
}

/*********************/
let id_settings = 0;

class Setting {
	constructor(btn, window, close_btn){
		this.id = id_settings++;

		this.btn = btn;
		this.window = window;
		this.close_btn = close_btn;

		this.opened = false;
		this.add_listeners();
	}

	add_listeners(){
		this.window.style.transform = "translateY(20px)";
		this.window.style.pointerEvents = "none";

		this.close_btn.addEventListener('click', ()=>{
			this.hide();
		});
	
		this.btn.addEventListener('click', (e)=>{
	
			if(e.target == this.btn || e.target == this.btn.children[0]){
				!this.opened ? this.show() : this.hide();
			} 

			//! nie usuwaj - zastosowany event bubblin ale okno ustawien musi byc w przycisku zeby dzialalo

			// else if(e.target.className === 'settings_close_btn' || e.target.parentElement.className === 'settings_close_btn'){
			// 	this.hide();
			// }
		});
	}

	show(){
		this.window.style.transform = "";
		this.window.style.opacity = "1";
		this.window.style.pointerEvents = "";
		this.window.style.zIndex = '10';
		this.opened = true;
		if(this.id === 2){ // update space when space settings opened
			update_space();
		} else if(this.id === 1){
			update_consists();
		} else if(this.id === 4){
			workshop.update();
		}
	}

	hide(){
		this.window.style.transform = "translateY(20px)";
		this.window.style.pointerEvents = "none";
		this.window.style.opacity = "0";
		this.window.style.zIndex = '';
		this.opened = false;
	}
}

const c_consists_btn = document.getElementById('production_consists_button'); 
const c_consists_window = document.getElementById('consists_window');
const c_consists_close_btn = document.getElementById('close_consists_btn');

const c_main_btn = document.getElementById('main_settings'); 
const c_main_window = document.getElementById('main_settings_window');
const c_main_close_btn = document.getElementById('close_main_settings_btn');

//create_tooltip(document, '#production_consists_button i', `Sprawdź, na co przetwarzana jest twoja papryka!`);

// okienka z ustawieniami
let settings = [
	new Setting(c_pepper_settings, c_pepper_settings_window, c_pepper_settings_close_btn),
	new Setting(c_consists_btn, c_consists_window, c_consists_close_btn),
	new Setting(document.getElementById('buy_space'), document.getElementById('buy_space_window'), document.getElementById('space_close_btn')),
	new Setting(c_main_btn, c_main_window, c_main_close_btn),
	new Setting(document.getElementById('expand_workshop_btn'), document.getElementById('expand_workshop_window'), document.getElementById('expand_workshop_close_btn')),
	new Setting(document.getElementById('buy_money'), document.getElementById('buy_money_window'), document.getElementById('buy_money_close_btn')),
	new Setting(document.getElementById('skins_button'), document.getElementById('skins_window'), document.getElementById('skins_close_btn')),
];

// settings outside click clearer
window.addEventListener('click', (e) => {
	
	if((!e.target.classList.contains('item_need_button') && !e.target.matches('.item_need_button *') && !e.target.matches('.more *') && !e.target.matches('.max')) && is_any_list_opened){
		pitems[which_list_opened].toggle_need_list();
		is_any_list_opened = false;
	}

	for(let i=0; i<settings.length; i++){

		let elem = settings[i];
		if(e.target != elem.window && !elem.window.contains(e.target) && e.target != elem.btn && !elem.btn.contains(e.target) && elem.opened){
			
			elem.hide();
		}
	}
});

/******/

c_pepper_settings_sell_all.addEventListener('click', ()=>{
	_peppercoins += _pepper*pepper.bonus;
	_pepper = 0;
	update_coins();
});

function auto_sell_pepper(pepper){
	if(switches[0].opened){

		auto_sell_percent = c_pepper_settings_slider.value;

		_peppercoins += (pepper/100)*auto_sell_percent* window.pepper.bonus;
		_pepper -= (pepper/100)*auto_sell_percent;
	}
}

let xp_needed = 300;
const xp_need_multiplier = 1.22;

lvls[0] = xp_needed; 
xp_needed *= xp_need_multiplier;

c_rank_text.innerHTML = lvls_ranks[lvl_now];

for(i=0; i<items.length; i++){

	if(items[i].lvl<=1){

		items[i].dodaj_item();
		items[i].item_lvl_update();
	}
}

let times_clicked = 0;

const papclck = document.getElementById("paprica_click");
papclck.addEventListener("click", cclick);
papclck.addEventListener('contextmenu', (e) => {
    e.preventDefault();
	cclick();
	//klikańsko xD
}, false);

const pap_click = document.querySelector("#paprica_click img");
const hder = document.getElementById("header").style;
const body = document.querySelector("body").style;
const stts = document.getElementById("stats").style;
const footer = document.querySelector("footer").style;

const secret_theme_switch = document.getElementById("secret_theme_switch");
const secret_theme_text = document.getElementById("secret_theme_text");

let rainbow_timeout = 0;
let cursed = false;
let cursed_unlocked = false;

//gdy uzyje sie let pepper = {} wtedy window.pepper to element DOM o ID pepper a nie ten obiekt
window.pepper = {

	skin: 'txt/peppers/red.png',
	bonus: 1,

	set_skin(skin) {
		this.skin = `txt/peppers/${skin}`;
		this.rot.skin = `txt/peppers/rotten/${skin}`;

		if(!this.rot.rotten)
			pap_click.src = this.skin;
		else
		pap_click.src = this.rot.skin;
	},

	init: (
		() => {
			setTimeout(()=>{
				pap_click.src = pepper.skin;
				pepper.rot.process();
			}, 0)
		}
	)(),

	rot: {

		skin: 'txt/peppers/rotten/red.png',
		rotten: false,
		timer: null, //do settimeout
		compost: 0,

		delay: 30000, //do zepsucia papryki

		process: function() {
			clearTimeout(this.timer);
			
			//rotten pepper timer
			this.timer = setTimeout(()=>{

				this.rot();
				
			}, this.delay);
		},

		rot() {
			pap_click.src = this.skin;
			this.rotten = true;
		},

		unrot() {
			pap_click.src = pepper.skin;
			this.rotten = false;
			this.compost++;
		}
	}
}

function cclick() {

	clicks_per_sec++;

	if(!pepper.rot.rotten){
		let auto_sell_holder = 0;

		progress += _wydajnosc;

		while(progress>=1000){
			progress-=1000;
			_pepper++;
			pc_ever++;
			xp_fill++;
			auto_sell_holder++;
			pepper_overall++;
		}

		progress_bar.setAttribute("value", progress);

		auto_sell_pepper(auto_sell_holder);

		update_coins();
	} else {
		pepper.rot.unrot();
	}

	pepper.rot.process();

	//console.log(pap_click.transform);
	if(current_cursor === 'Obieraczka' && times_clicked<6){

		let rand_translateX = Math.floor(Math.random() * (80-(-80)) + 1)+(-80);
		let rand_translateY = Math.floor(Math.random() * (80-(-80)) + 1)+(-80);
		let rand_scale = Math.floor(Math.random()*(1.7-0.7))+0.7;
		let rand_sepia = Math.floor(Math.random() * 101);
		let rand_opacity = Math.floor(Math.random() * 51)+50;

		pap_click.style.transform = `translate(${rand_translateX}px, ${rand_translateY}px)`;
		pap_click.style.filter = `sepia(${rand_sepia}%) opacity(${rand_opacity}%) brightness(${rand_sepia*4}%)`;
		pap_click.style.transition = `all 0.07s cubic-bezier(.32,1.08,.66,1.51)`;

		setTimeout(() => {pap_click.style.transform = `scale(${rand_scale})`}, 300);;

		setTimeout(() => {
			pap_click.style.transform = '';
			pap_click.style.filter = '';
			pap_click.style.transition = '';
		}, 800);

		times_clicked++;

		if(times_clicked >= 6 && !cursed){
			
			theme_switches[2].switch_on_cursed();
			secret_theme_switch.style.color = 'red';
			secret_theme_text.innerHTML = 'Papryka ciemności';
			cursed_unlocked = true;
			cursed_on();
		}
	} else if(current_cursor === 'Tęczowa katana') {
		clearTimeout(rainbow_timeout);
		let hue_random = Math.floor(Math.random()*360);
		pap_click.style.filter = `hue-rotate(${hue_random}deg)`;
		rainbow_timeout = setTimeout(()=>{

			if(cursed){
				pap_click.style.filter = `sepia(60%)`;
				pap_click.style.filter = `hue-rotate(100deg)`;
			} else {
				pap_click.style.filter = '';
			}
		}, 2000);	
	}
}

function cursed_on(){
	if(!cursed && cursed_unlocked){

		secret_theme_switch.classList.remove('secret_theme');

		cursed = true;

		hder.transition = `all 3.0s cubic-bezier(.32,1.08,.66,1.51)`;
		body.transition = `all 3.0s cubic-bezier(.32,1.08,.66,1.51)`;
		stts.transition = `all 3.0s cubic-bezier(.32,1.08,.66,1.51)`;
		footer.transition = `all 3.0s cubic-bezier(.32,1.08,.66,1.51)`;

		hder.background = '#000';
		document.getElementById("bg_rays").style.filter = 'invert(100%)';
		document.querySelector("#header h1").style.color = '#fff';
		body.background = 'rgb(31, 47, 69)';
		stts.background = 'rgba(0, 0, 0, 0.5)';
		footer.backgroundColor = '#000';

		document.title = "Cursed Paprica Clicker";
		setTimeout(()=>{
			pap_click.style.filter = `sepia(60%)`;
			pap_click.style.filter = `hue-rotate(100deg)`;
		}, 801);
		
		setTimeout(()=>{
			hder.transition = "";
			body.transition = "";
			stts.transition = "";
			footer.transition = "";
		}, 3000);
	}
}

function cursed_off(){
	if(cursed){
		cursed = false;

		hder.transition = `all 3.0s cubic-bezier(.32,1.08,.66,1.51)`;
		body.transition = `all 3.0s cubic-bezier(.32,1.08,.66,1.51)`;
		stts.transition = `all 3.0s cubic-bezier(.32,1.08,.66,1.51)`;

		hder.background = '';
		document.getElementById("bg_rays").style.filter = '';
		document.querySelector("#header h1").style.color = '';
		body.background = '';
		stts.background = '';
		footer.background = '';

		document.title = "Paprica Clicker";
		setTimeout(()=>{
			pap_click.style.filter = ``;
		}, 801);
		
		setTimeout(()=>{
			hder.transition = "";
			body.transition = "";
			stts.transition = "";
			footer.transition = "";
		}, 3000);
	}
}

let item_nr_old = 0;
let sect_old = 0;
let item_cant_timer;
let buy_confirm_is_shown = new Array(items.length);

for(let i=0; i<items.length; i++){ //listenery do itemow w sklepie

	class_item[i].addEventListener("click", function(){

		if(!(items[i].bought) && (items[i].avail <= lvl_now+1)){

			if(buy_confirm_is_shown[i]){ //jesli kliknieto na ten sam item co wczesniej, okienko wyczyszczone.

				//console.log(buy_confirm_is_shown[i]);
				item_nr_old=0;
				sect_old=0;
				buy_confirm_is_shown[i] = false;
				item_confirm[i].style.opacity = "0";
				item_cant[i].style.opacity = "0";
				hide_buy_confirm();

			} else { //gdy kliknieto w item pierwszy raz

				if(_peppercoins >= items[i].price){ //gdy stac na zakup itemu
					//--
					hide_buy_confirm();
					item_confirm[i].style.opacity = "0.8";
					buy_confirm_is_shown[i] = true;
					//console.log("stac");
						//--
				} else {

					//console.log("nie stac");
					hide_buy_confirm();
					buy_confirm_is_shown[i] = true;
					item_cant[i].style.opacity = "0.8";
					clearTimeout(item_cant_timer);
					item_cant_timer = setTimeout(function(){
						item_cant[i].style.opacity = "0";
						item_nr_old=0;
						sect_old=0;
						buy_confirm_is_shown[i] = false;
					}, 1000);
				}
			}
		} else if(items[i].bought) {

			if(items[i].name === 'Miecz świetlny'){
				navigator.vibrate([500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]);
			}

			$("#paprica_click img").hover(function(){
				//console.log(this);
				$(this).off();
				$(this).css('cursor',"url('txt/cursors/"+items[i].zdj+"'), pointer");
				current_cursor = items[i].name;
				
			});
		}
	});
}

function hide_buy_confirm(){
	for (i = 0; i < items.length; i++) {
		item_confirm[i].style.opacity = "0";
		item_cant[i].style.opacity = "0";
		buy_confirm_is_shown[i]=false;
	}
}

function unlock_item(unlck){
	//console.log(unlck);
	unlck.innerHTML = "<i class='fas fa-lock-open'></i>";
	unlck.style.backgroundColor = "rgba(59, 200, 59, 0.788)";
	unlck.style.transform = "translate(0, -50px)";
	unlck.style.opacity = "0";
	setTimeout(() => {unlck.style.display = "none";}, 800);
	//bez transition znika natychmiast
}

const default_switch = theme_switches[localStorage.getItem('theme')-1];

if(localStorage.getItem('theme')){

	default_switch.choose_theme();
	default_switch.switch_switches();
}	

//////////////////////////workshop build

let c_add1;
let c_add10;

document.addEventListener('DOMContentLoaded', () => {
	
	$(".stat_numbers").eq(0).html(Math.round(_wydajnosc));
	$(".stat_numbers").eq(1).html(pc_production);
	//$(".stat_numbers").eq(2).html(multi.toFixed(2));

	for(let i=0; i<items.length; i++){

		items[i].replace_by_lvl();
	}

	for(let i=0; i<fitems.length; i++){

		fitems[i].dodaj_item();
	}

	for(let i=0; i<bookmarks.length; i++){

		bookmarks[i].dodaj_listenery(i);
	}

	bookmarks[0].bought = true;

	$(document).on("dragstart", function() {
		return false;
	});

	workshop.build_btn = document.getElementById('workshop_build_btn');
	workshop.c_build_price = document.getElementById('workshop_build_price');
	workshop.c_locked = document.querySelector('#workshop .item_locked');

	create_tooltip(document, workshop.build_btn, 'W warsztacie możesz kupować ulepszenia zwiększające wydajność zbieraczy w fabryce, oraz przedmioty konieczne do przetwarzania papryki.');

	workshop.c_build_price.innerHTML = workshop.price;
	workshop.c_locked.style.display = 'flex';

	c_add1 = document.querySelectorAll("#factory_items .add1");
	c_add10 = document.querySelectorAll("#factory_items .add10");

	workshop.build_btn.addEventListener('click', handle_build);

	function handle_build(){
		if(lvl_now >= 16 && _peppercoins >= workshop.price){
			unlock_item(workshop.c_locked);
			workshop.built = true;
			_peppercoins -= workshop.price;
			
			workshop.build_btn.removeEventListener('click', handle_build);
		} else {
			workshop.build_btn.style.backgroundColor = '#faaa';
		}
	}

	workshop.c_lvl = document.getElementById('workshop_lvl');

	//update_coins();

   	//create_tooltip(document, '#skins_button', 'Coming soon...');

});

window.onload = function(){
	setTimeout(()=>{
		loading.finish();
	}, 700)
};
