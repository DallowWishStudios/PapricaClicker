

const tooltips = {
	max_escape_cord: 50,
	any_active: false
}

function create_tooltip(handler, hover_loc, tt_text = "", classes="") {
	let tooltip_time;
	let tt_active = false;

	$(handler).find(hover_loc).hover(() => {
		//$(".tooltip_std").remove();
		//console.log(this);
		clearTimeout(tooltip_time);
		if (!tt_active) {
			let cord_X_old = cord_X;
			let cord_Y_old = cord_Y;
			tt_active = true;
			tooltip_time = setTimeout(() => {

				tooltips.any_active = true;
				$(".tooltip_std").remove();
				let offset_X = 0; 

				const tooltip_div = `<div class='tooltip_std ${classes}' style='left: ${cord_X + 20 - offset_X}px; top: ${cord_Y + 20}px;'>${tt_text}</div>`;
				document.querySelector("#tooltips").innerHTML += tooltip_div;
			
				if(window.innerWidth < cord_X+$(".tooltip_std").height()*8){ 
					//console.log(window.innerWidth);
					//$(".tooltip_std").css('left', `${cord_X + 20 - ($(".tooltip_std").height()*5-60)}px`);
					$(".tooltip_std").css({
						'left':'initial',
						'right':window.innerWidth-cord_X-10,
					});
				}

				setTimeout(() => {
					//console.log($(".tooltip_std").width());
					if ((typeof document.querySelector(".tooltip_std") !== 'undefined') && (cord_X_old < cord_X + tooltips.max_escape_cord && cord_X_old > cord_X - tooltips.max_escape_cord) && (cord_Y_old < cord_Y + tooltips.max_escape_cord && cord_Y_old > cord_Y - tooltips.max_escape_cord)) {
						document.querySelector(".tooltip_std").style.opacity = "1";
						document.querySelector(".tooltip_std").style.transform = "translateY(0px)";
						//console.log(document.querySelector(".tooltip_std"));
					}
				}, 20);
			}, 900);
		}
	}, () => {
        /*
        document.querySelector(".tooltip_std").classList.add("tooltip_std_fade");
        document.querySelector(".tooltip_std").classList.remove("tooltip_std");
        */
		clearTimeout(tooltip_time);
		tt_active = false;
		tooltips.any_active = false;
		// $(".tooltip_std").css('opacity', "0");
		// $(".tooltip_std").css('transform', "translateY(10px)");
		setTimeout(() => { $(".tooltip_std").remove(); }, 20);
	});
}

//element.getBoundingClientRect(); left right bottom
create_tooltip(document, '#pepper .tt_canvas', `Papryka jest przydatna głównie na etapie przetwórni. Aby zarządzać auto-sprzedażą kliknij na ikonkę ustawień obok.`);