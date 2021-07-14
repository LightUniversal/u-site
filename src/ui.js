import { getPosts } from "./app";
import { http } from "./http";

class Ui {
    constructor() {
        this.postDisplay = document.querySelector('.news p');
        this.notify = document.querySelector('a.notification').lastElementChild;
    }
    showPost(posts) {
        this.notify.textContent = posts.length;
        let date = new Date();
        let output = '';
        posts.forEach((post)=> {
            output += `
                    <div class="postbox">
                        <small class="userp"><i class="fa fa-user-circle-o"></i></small><span class="name">${post.name}</span>
                        <br>    
                        <small class="userpost">${post.post.trim()}
                        </small>
                        <span class="date"><span class="posted">Posted <i class="fa fa-pencil" id="${post.id}"></i> : <small>${dateFns.distanceInWords(date, new Date(post.date), {addSuffix:true})} <span class="cancel"><i class="fa fa-trash-o" id="${post.id}"></i></span></small>
                        </span>
                        <div class="posts">
                            <span class="like"><i class="fa fa-thumbs-up" id="${post.id}"></i><small>${post.likes}</small></span>
                            <span class="dislike"><i class="fa fa-thumbs-down" id="${post.id}"></i><small>${post.dislikes}</small></span>
                            
                        </div>
                    </div>
            `;
        });
        this.postDisplay.innerHTML = output;
    }
    actions(e) {
        let likeAct;
        // on clicking like
        if(e.target.classList.contains('fa-thumbs-up') || e.target.classList.contains('fa-thumbs-down')) {
            e.target.classList.toggle('do');
            e.target.nextElementSibling.classList.toggle('do');
            likeAct = Number(e.target.nextElementSibling.textContent);
            if(e.target.classList.contains('fa-thumbs-up')) {
               if(e.target.classList.contains('do') && likeAct >= 0) {
                    likeAct++;
                    e.target.nextElementSibling.textContent = likeAct;
                    if(document.querySelector('input[type="hidden"]').id !== "") {
                        const obj = {};
                        obj.email = document.querySelector('input[type="hidden"]').id;
                        const idval = Number(e.target.id);
                        // make http get request
                        http.get('http://localhost:3004/dbPosts')
                            .then((data)=> {
                                data.forEach((datum)=> {
                                    if(datum.email === obj.email && datum.id === idval) {
                                        obj.name = datum.name;
                                        obj.post = datum.post;
                                        obj.comments = ['ok'];
                                        obj.date = datum.date;
                                        obj.dislikes = 0;
                                        obj.likes = Number(likeAct);
                                        http.put(`http://localhost:3004/dbPosts/${idval}`, obj)
                                        .then((updata)=> {
                                            console.log(updata);
                                            getPosts();
                                        }).catch((err)=> {
                                            console.log(err);
                                        })
                                    }
                                })
                            })
                    }
 
               } else {
                   likeAct--;
                   e.target.nextElementSibling.textContent = likeAct;
                   if(document.querySelector('input[type="hidden"]').id !== "") {
                    const obj = {};
                    obj.email = document.querySelector('input[type="hidden"]').id;
                    const idval = Number(e.target.id);
                    // make http get request
                    http.get('http://localhost:3004/dbPosts')
                        .then((data)=> {
                            data.forEach((datum)=> {
                                if(datum.email === obj.email && datum.id === idval) {
                                    obj.name = datum.name;
                                    obj.post = datum.post;
                                    obj.comments = ['ok'];
                                    obj.date = datum.date;
                                    obj.dislikes = 0;
                                    obj.likes = Number(likeAct);
                                    http.put(`http://localhost:3004/dbPosts/${idval}`, obj)
                                    .then((updata)=> {
                                        console.log(updata);
                                        getPosts();
                                    }).catch((err)=> {
                                        console.log(err);
                                    })
                                }
                            })
                        })
                }
               }
           }
            if(e.target.classList.contains('fa-thumbs-down')) {
                if(e.target.classList.contains('do') && likeAct >= 0) {
                    likeAct++;
                    e.target.nextElementSibling.textContent = likeAct;
                    if(document.querySelector('input[type="hidden"]').id !== "") {
                        const obj = {};
                        obj.email = document.querySelector('input[type="hidden"]').id;
                        const idval = Number(e.target.id);
                        // make http get request
                        http.get('http://localhost:3004/dbPosts')
                            .then((data)=> {
                                data.forEach((datum)=> {
                                    if(datum.email === obj.email && datum.id === idval) {
                                        obj.name = datum.name;
                                        obj.post = datum.post;
                                        obj.comments = ['ok'];
                                        obj.date = datum.date;
                                        obj.dislikes = 0;
                                        obj.likes = Number(likeAct);
                                        http.put(`http://localhost:3004/dbPosts/${idval}`, obj)
                                        .then((updata)=> {
                                            console.log(updata);
                                            getPosts();
                                        }).catch((err)=> {
                                            console.log(err);
                                        })
                                    }
                                })
                            })
                    }

                } else {
                    likeAct--;
                    e.target.nextElementSibling.textContent = likeAct;
                    if(document.querySelector('input[type="hidden"]').id !== "") {
                        const obj = {};
                        obj.email = document.querySelector('input[type="hidden"]').id;
                        const idval = Number(e.target.id);
                        // make http get request
                        http.get('http://localhost:3004/dbPosts')
                            .then((data)=> {
                                data.forEach((datum)=> {
                                    if(datum.email === obj.email && datum.id === idval) {
                                        obj.name = datum.name;
                                        obj.post = datum.post;
                                        obj.comments = ['ok'];
                                        obj.date = datum.date;
                                        obj.dislikes = 0;
                                        obj.likes = Number(likeAct);
                                        http.put(`http://localhost:3004/dbPosts/${idval}`, obj)
                                        .then((updata)=> {
                                            console.log(updata);
                                            getPosts();
                                        }).catch((err)=> {
                                            console.log(err);
                                        })
                                    }
                                })
                            })
                    }
                }
            }
            if(e.target.classList.contains('fa-thumbs-up') && e.target.parentElement.nextElementSibling.firstElementChild.classList.contains('do')) {
                e.target.parentElement.nextElementSibling.firstElementChild.classList.remove('do');
                e.target.parentElement.nextElementSibling.firstElementChild.nextElementSibling.classList.toggle('do')
                // e.target.nextElementSibling.classList.remove('do');
                likeAct = Number(e.target.parentElement.nextElementSibling.firstElementChild.nextElementSibling.textContent);
                likeAct--;
                
                e.target.parentElement.nextElementSibling.firstElementChild.nextElementSibling.textContent = likeAct;
                    if(document.querySelector('input[type="hidden"]').id !== "") {
                        const obj = {};
                        obj.email = document.querySelector('input[type="hidden"]').id;
                        const idval = Number(e.target.id);
                        // make http get request
                        http.get('http://localhost:3004/dbPosts')
                            .then((data)=> {
                                data.forEach((datum)=> {
                                    if(datum.email === obj.email && datum.id === idval) {
                                        obj.name = datum.name;
                                        obj.post = datum.post;
                                        obj.comments = ['ok'];
                                        obj.date = datum.date;
                                        obj.dislikes = 0;
                                        obj.likes = Number(likeAct);
                                        http.put(`http://localhost:3004/dbPosts/${idval}`, obj)
                                        .then((updata)=> {
                                            console.log(updata);
                                            getPosts();
                                        }).catch((err)=> {
                                            console.log(err);
                                        })
                                    }
                                })
                            })
                    }
                } else if(e.target.classList.contains('fa-thumbs-down') && e.target.parentElement.previousElementSibling.firstElementChild.classList.contains('do')) {
                e.target.parentElement.previousElementSibling.firstElementChild.classList.remove('do');
                e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.classList.toggle('do');
                // e.target.nextElementSibling.classList.remove('do');
                likeAct = Number(e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.textContent);
                likeAct--;
                    
                e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.textContent = likeAct;
                if(document.querySelector('input[type="hidden"]').id !== "") {
                    const obj = {};
                    obj.email = document.querySelector('input[type="hidden"]').id;
                    const idval = Number(e.target.id);
                    // make http get request
                    http.get('http://localhost:3004/dbPosts')
                        .then((data)=> {
                            data.forEach((datum)=> {
                                if(datum.email === obj.email && datum.id === idval) {
                                    obj.name = datum.name;
                                    obj.post = datum.post;
                                    obj.comments = ['ok'];
                                    obj.date = datum.date;
                                    obj.dislikes = 0;
                                    obj.likes = Number(likeAct);
                                    http.put(`http://localhost:3004/dbPosts/${idval}`, obj)
                                    .then((updata)=> {
                                        getPosts();
                                    }).catch((err)=> {
                                        console.log(err);
                                    })
                                }
                            })
                        })
                }
            }
        }
    }
    startNow(e) {
        const mainEl = document.querySelector('article.sts');
        if(e.target.classList.contains('start-now') || e.target.classList.contains('started')) {
            mainEl.classList.add('slideInLeft');
           if( mainEl.classList.contains('slideOutLeft')) {
            mainEl.classList.remove('slideOutLeft');
           }
            const html = `
                <div class="start">
                    <h4 id="offer"> What We Offer </h4>
                    <ul id="offers">
                        <li> <span><i class="fa fa-youtube-play"></i>   Dynamic Web Development</span> <a href="https://www.youtube.com/channel/UCzfVI96oDcsRwkzwwhxu5dw" class="youtube-play"><i class="fa fa-youtube-play"></i></a> <a href = "tel:+2347058032078" class="call"><i class="fa fa-phone"></i></a> <a href="mailto:lightsinfp78@gmail.com"><i class="fa fa-envelope"></i></a></li>
                        <li> <span><i class="fa fa-graduation-cap"></i> Website Tutorials</span> <a href = "tel:+2347058032078" class="call"><i class="fa fa-phone"></i></a> <a href="mailto:lightsinfp78@gmail.com"><i class="fa fa-envelope"></i></a> <a href="https://www.youtube.com/channel/UCzfVI96oDcsRwkzwwhxu5dw" class="youtube-play"><i class="fa fa-youtube-play"></i></a></li>
                        <li><span><i class="fa fa-microchip"></i> Electronic accessories</span> <a href = "tel:+2347058032078" class="call"><i class="fa fa-phone"></i></a> <a href="mailto:lightsinfp78@gmail.com"><i class="fa fa-envelope"></i></a></li>
                        <li><span><i class="fa fa-book"></i> Frontend Materials</span> <a href = "tel:+2347058032078" class="call"><i class="fa fa-phone"></i></a> <a href="mailto:lightsinfp78@gmail.com"><i class="fa fa-envelope"></i></a></li>
                    </ul>
            `;
            mainEl.innerHTML = html;
            mainEl.style.display = 'block';
            
           
        } else  {
            if(document.querySelector('article.sts').classList.contains('sts')) {
                if(mainEl.classList.contains('slideInLeft')) {
                    mainEl.classList.remove('slideInLeft');
                    mainEl.classList.add('slideOutLeft');
                    setTimeout(()=> {
                        mainEl.style.display = 'none';
                    },1000)
                }
                
            }
        }
    }
    
    toggle(e) {
        if(e.target.parentElement.classList.contains('toggle')) {
           document.querySelector('nav ul').classList.toggle('show');
    }
}
    about(e) {
        if(e.target.classList.contains('us')) {
            // console.log(e);
            window.scrollTo({
                top : `${document.querySelector('.abouts p').offsetTop}`,
                left : `${document.querySelector('.abouts p').offsetWidth}`,
                behavior : "smooth"
            })
        }
    }
    toggleEffect(e) {
        if(e.target.classList.contains('toggles') && e.target.parentElement.style.display === "block") {
            if(document.querySelector('nav ol').style.display === "none") {
                document.querySelector('nav ol').style.display = "block";
            }
        }
    }
    contact(e) {
        let innerVal = "";
        if(e.target.id === 'cont' || e.target.parentElement.classList.contains('contacting')) {
            document.querySelector('#contacter').classList.remove('fadeOutRight');
            document.querySelector('#contacter').classList.add('fadeInRight');
            innerVal = `
                <h3 id="contactus"><i class="fa fa-book"></i> X-Tech </h3>
                <ul class="contacts-link">
                    <li><a href = "tel:+2347058032078"><i class="fa fa-phone"></i> call us now.</a></li>
                    <li><a href = "tel:+2347058032078"><i class="fa fa-envelope"></i> mail us now.</a></li>
                </ul>
                <span>&copy; U-Technology 2021</span>
            `;
            
            document.querySelector('#contacter').style.display = "block";
            document.querySelector('#contacter').innerHTML = innerVal;
        } else {
            document.querySelector('#contacter').classList.remove('fadeInRight');
            document.querySelector('#contacter').classList.add('fadeOutRight');
        }
    }
}
export const ui = new Ui();