// Menu odmian papryki

;(function(global){

    const c_skins_content = document.getElementById('skins_content');
    const c_skins_btn = document.getElementById('skins_button');

    ///////////////////////////////////////////////////////////////////////////
    // class
    
    const Pepper = function(name, desc, img, bonus, from_lvl){
        return new Pepper.init(name, desc, img, bonus, from_lvl);
    };

    let id = 0;
    Pepper.init = function(name, desc, img, bonus, from_lvl){
        this.id = id++;
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.img_path = `txt/peppers/${img}`;
        this.bonus = bonus;
        this.from_lvl = from_lvl;
        this.locked = true;
        this.active = false;
    };

    Pepper.prototype = {

        get bonus_percentage(){
            return this.bonus!==1 ? `+${Math.round((this.bonus-1)*100)}%` : '';
        },

        get handler(){
            return c_skins_content.querySelector(`.setting[data-index="${this.id}"]`);
        },

        get c_locked(){
            return this.handler.querySelector('.item_locked');
        },

        get object_arr(){
            return peppers;
        },

        activate(){
            //console.log(this.handler);
            if(!this.active && !this.locked){
                this.handler.classList.add('active');
                
                const active_item = this.object_arr.find(item => item.active);
                if(active_item) active_item.deactivate();
                this.active = true;
                global.pepper.set_skin(this.img);
                global.pepper.bonus = this.bonus;
                update_consists();
                pitems[0].check_processing_production();
            }
        },

        deactivate(){
            this.handler.classList.remove('active');
            this.active = false;
        },

        unlock(){
            if(this.locked){
                this.c_locked.remove();
                this.locked = false;
                this.activate();
                
                c_skins_btn.style.backgroundColor = '#f33';
                //c_skins_btn.style.transform = 'scale(0.9)';
                setTimeout(()=>{
                    c_skins_btn.style.backgroundColor = '#ff0000a1';
                    //c_skins_btn.style.transform = '';
                }, 800);
            }
        }
    };

    Pepper.init.prototype = Pepper.prototype;

    ///////////////////////////////////////////////////////////////////////////
    // objects creating

    const peppers = window.peppers(Pepper);
    
    // functions

    const classes = ['item_locked', 'img','name','bonus','desc'];
    
    const divs_content = (item) => {

        const plain_text = (text) => {
            return (el) => {
                el.appendChild(document.createTextNode(text));
            }
        };

        return [
            (el) => {
                let fr = document.createDocumentFragment();
                const i = document.createElement('i');
                i.className = 'fas fa-lock';
                fr.appendChild(i);

                const span = document.createElement('span');
                span.className = 'locked_lvl';
                span.appendChild(document.createTextNode(item.from_lvl));
                fr.appendChild(span);

                el.appendChild(fr);              
                //<i class="fas fa-lock"></i><span class='locked_lvl'>${this.avail}</span>
            },
            (el) => {
                const img = document.createElement('img');
                img.src = item.img_path;
                
                el.appendChild(img)
            },
            plain_text(item.name),
            plain_text(item.bonus_percentage),
            plain_text(item.desc),
        ]
    };

    // create SINGLE item //? ofc / classes for nested divs / content in functions stored in array / object from which info will be taken
    const print_content = (main_class, classes, divs_content, item) => {

        const div = document.createElement('div');
        div.className = main_class;
        div.dataset.index = item.id;

        const content = divs_content(item);

        for(i=0; i<classes.length; i++){

            // create and append divs (eg. img, name), then give them classes
            const child_div = div.appendChild(document.createElement('div'));
            child_div.className = classes[i];

            // execute function which fills divs with content
            content[i](child_div);
        }
        
        return div;
    };

    const print_content_adjusted = print_content.bind(this, 'setting', classes, divs_content);

    ///////////////////////////////////////////////////////////////////////////
    // finalizing

    // creating & appending skins to skins window
    c_skins_content.appendChild((()=>{

        // empty document fragment
        const frag = document.createDocumentFragment();

        for(let i=0; i<peppers.length; i++){

            // creating items
            const item_element = print_content_adjusted(peppers[i]);

            // appending each item to the fragment
            frag.appendChild(item_element);
        }
        
        return frag;
    })());
    
    c_skins_content.addEventListener('click', (e) => {
        const c_closest_setting = e.target.closest('.setting');
        if(c_closest_setting){
            
            const index = parseInt(c_closest_setting.dataset.index);

            const clicked_item = peppers.find((item) => item.id === index);

            clicked_item.activate();
        }
    });
    
    peppers[0].unlock();
    
    global.peppers_to_unlock = () => {

        let unlockable_pepper;

        do {
            unlockable_pepper = peppers.find(pepper => {
                return (global.lvl_now+1 >= pepper.from_lvl) && pepper.locked
            });

            if(typeof unlockable_pepper !== 'undefined'){
                unlockable_pepper.unlock();
            }

        } while (unlockable_pepper)
    }

}(window))