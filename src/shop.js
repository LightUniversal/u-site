class Shop {
    constructor() {
        this.image = document.querySelector('div.card-body');
        this.services = document.querySelector('form a.special-services');
        this.city = 'Anambra';
        this.key = 'TU4Yhsj1wEAwVsdMUhQt6iq6CxzUL4tV';
        this.display = document.querySelector('div.display');
        this.dets = document.querySelector('div.weather');
    }
    async getWeather() {
        const id = await this.weather()
        .then((data)=> {
            return data.Key;
        })
        const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
        const query = `${id}?apikey=${this.key}`;
        const res = await fetch(base + query);
        const data = await res.json();
        return data[0];
    }
    async weather() {
        const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        const query = `?apikey=${this.key}&q=${this.city}`;

        const res = await fetch(base + query);
        const data = await res.json();
        return data[0];
    }
    changeState() {
        let lists = Array.from(document.querySelectorAll('form ul li a'));
        console.log(lists);
        lists.forEach((an, i)=> {
            an.addEventListener('click', (e)=> {
                if(i === 0) {
                    scrollTo({
                        top : 50,
                        left:0,
                        behavior:"smooth"
                    })
                    an.parentElement.parentElement.classList.toggle('toggle');
                    this.services.classList.toggle('show-services');   
                } else if( i === 1) {
                    scrollTo({
                        top : 3000,
                        left:0,
                        behavior:"smooth"
                    })
                    an.parentElement.parentElement.classList.toggle('toggle');
                    this.services.classList.toggle('show-services');  
                }
                else if( i === 2) {
                    scrollTo({
                        top : 1000,
                        left:0,
                        behavior:"smooth"
                    })
                    an.parentElement.parentElement.classList.toggle('toggle');
                    this.services.classList.toggle('show-services');  
                }else if( i === 3) {
                    scrollTo({
                        top : 2000,
                        left:0,
                        behavior:"smooth"
                    })
                    an.parentElement.parentElement.classList.toggle('toggle');
                    this.services.classList.toggle('show-services');  
                }
            })
        });
    }
    social_icons(e) {
        if(e.target.className === "fa fa-facebook") {
            location.href = "https://www.facebook.com/display.codigy";
        }
        if(e.target.className === 'fa fa-instagram') {
            location.href = "https://www.instagram.com/ifezulumbaemmanueluchenna";
        } if(e.target.className === "callus" ) {
            location.href = `${e.target.href}`;
        } if(e.target.className === "emailus") {
            location.href = `${e.target.href}`;
        } if(e.target.id === "order") {
            location.href = `${e.target.href}`;
        } if(e.target.id === "call") {
            location.href = `${e.target.href}`;
        } if(e.target.className === "started") {
            location.href = `tracker.html`;
        }
    }
    toggle(e) {
        if(e.target.classList.contains('fa-bars')) {
            document.querySelector('div.top-box form#shop ul').classList.toggle('toggle');
            this.services.classList.toggle('show-services');
        }
    }
    special_service(e) {
        if(e.target.classList.contains('special-services')) {
            document.querySelector('div.top-box div').classList.remove('fadeOutLeft');
            document.querySelector('div.top-box div').classList.add('fadeInLeft')
            document.querySelector('div.top-box div').style.display = 'block';
        } if(e.target.classList.contains('slash')) {
            document.querySelector('div.top-box div').classList.add('fadeOutLeft');
        }
    }
    clickBuy(e) {
        let html = "";
        if(e.target.className === "buying") {
            console.log('Yes');
            html = `
                <div class="animated slideInLeft" id="buy">
                <h4 class="det"> Delivery Details <i class="fa fa-tag"></i></h4>
                <p class="loc"> Delivery Address : Digital Library NAU<img src="imgs/nau.png" alt="nau-logo" class="nau"></p>
                <br>
                <p class="lo">Sub-Delivery Address : Basil Oil Hostel <i class="fa fa-building"></i></p>
                <br>
                <p class="lo">Side-Delivery Address : Engineering Block B <i class="fa fa-building"></i></p>
                <br>
                <p class="care">Costomer Care: <a href="tel:+2347058032078" id="call"><i class="fa fa-phone"></i> 07058032078</a></p>
                <a href="tel:+2347058032078" id="order">Order <i class="fa fa-shopping-cart"></i></a>
                <button class="shift">Close</button>
                </div>
            `;
            document.querySelector('.order').innerHTML = html;
        } else if (e.target.classList.contains('shift')) {
           if(document.querySelector('div#buy').classList.contains('slideInLeft')) {
            document.querySelector('div#buy').classList.add('slideOutLeft');
           } 
        }
    }
    clickImage(e) {
        this.display.style.display = "block";
        let html = '';
        if(e.target.classList.contains('card-body')) {
            scrollTo({
                top : 0,
                left : 0,
                behavior : "smooth"
            });
            const src = e.target.firstElementChild.src.substr(22,);
            const name = e.target.nextElementSibling.firstElementChild.textContent;
            const name_des = e.target.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.textContent;
            const amount = e.target.nextElementSibling.lastElementChild.lastElementChild.textContent;
            console.log(src, name, name_des, amount);
            html = `
                <div class="body">
                    <div class="img-body animated fadeInDown">
                        <img src="${src}" alt="" class="product">
                    </div>
                    <div id="title-des">
                        <h5><i class="fa fa-tag"></i> ${name}</h5>
                        <div>
                        <h3>${name_des}</h3>
                        </div>
                        <h6 class="overview">Overview <i class="fa fa-feed"></i> </h6><span class="rate"><small class="star"><i class="fa fa-star"></i></small><small class="star"><i class="fa fa-star"></i></small><small class="star"><i class="fa fa-star"></i></small><small class="star"><i class="fa fa-star"></i></small><small class="star"><i class="fa fa-star"></i></small></span>
                        <br>
                        <span class="like"><i class="fa fa-thumbs-up"></i><small> 950</small></span>
                    <div class="act"><small class="amount">${amount}</small> <small class="buying">Buy <i class="fa fa-shopping-cart"></i></small></div>
                    </div>
                </div>
            `;
            document.querySelector('div.display').innerHTML = html;
            document.querySelector('.like').lastElementChild.textContent = Math.floor(Math.random()*parseInt(document.querySelector('.like').lastElementChild.textContent) + 9500);
        } else if (e.target.tagName === "IMG"){
            scrollTo({
                top : 0,
                left : 0,
                behavior : "smooth"
            });
            const src = e.target.src.substr(22,);
            const name = e.target.parentElement.nextElementSibling.firstElementChild.textContent;
            const name_des = e.target.parentElement.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.textContent;
            const amount = e.target.parentElement.nextElementSibling.lastElementChild.lastElementChild.textContent;
            console.log(src, name, name_des, amount);
            html = `
                <div class="body animated  fadeInDown">
                    <i class="fa fa-arrow-up fadeout"></i>
                    <div class="img-body animated">
                        <img src="${src}" alt="" class="product">
                    </div>
                    <div id="title-des">
                        <h5><i class="fa fa-tag"></i> ${name}</h5>
                        <div>
                        <h3>${name_des}</h3>
                        </div>
                        <h6 class="overview">Overview <i class="fa fa-feed"></i> </h6><span class="rate"><small class="star"><i class="fa fa-star"></i></small><small class="star"><i class="fa fa-star"></i></small><small class="star"><i class="fa fa-star"></i></small><small class="star"><i class="fa fa-star"></i></small><small class="star"><i class="fa fa-star"></i></small></span>
                        <br>
                        <span class="like"><i class="fa fa-thumbs-up"></i><small> 950</small></span>
                    <div class="act"><small class="amount">${amount}</small> <small class="buying">Buy <i class="fa fa-shopping-cart"></i></small></div>
                    </div>
                </div>
            `;
            document.querySelector('div.display').innerHTML = html;
            document.querySelector('.like').lastElementChild.textContent = Math.floor(Math.random()*parseInt(document.querySelector('.like').lastElementChild.textContent) + 9500)
        }
        
    }
}
const shop = new Shop();
document.body.addEventListener('click', (e)=> {
    e.preventDefault();
    shop.clickImage(e);
    shop.clickBuy(e);
    shop.special_service(e);
    shop.toggle(e);
    shop.social_icons(e);
    if(e.target.className === "fa fa-arrow-up") {
        scrollTo({
            top : 0,
            left : 0,
            behavior : "smooth"
        });
    }
    if(e.target.classList.contains('fadeout')) {
        e.target.parentElement.classList.remove('fadeInDown');
        e.target.parentElement.classList.add('fadeOutUp');
        setTimeout(()=> {
            e.target.parentElement.style.display = 'none';
        }, 1500);
    }
}, 0);
shop.changeState();

let val = document.querySelector('img');
console.log(val.src.substr(22,));
document.addEventListener('DOMContentLoaded', ()=> {
    shop.weather()
    .then(data=> console.log(data));
    shop.getWeather()
    .then((data)=> {
        console.log(data);
        if(data.IsDayTime) {
            shop.dets.innerHTML = `<span><i class="fa fa-cloud"></i><i class="fa fa-sun-o state-weather"></i></span>
            <br>
            ${data.WeatherText} ${data.Temperature.Metric.Value}&deg;C`;
        } else {
            shop.dets.innerHTML = `<span><i class="fa fa-cloud"></i><i class="fa fa-moon-o state-weather"></i></span>
            <br>
            ${data.WeatherText} ${data.Temperature.Metric.Value}&deg;C`;
        }
    });
})