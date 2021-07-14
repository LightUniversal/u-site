import { http } from './http';
import {  getPosts } from './app';
// import chatroom
import { room } from './chartroom';
// document.onscroll = function() {
//     console.log(scrollY, scrollY);
// }
// Chatroom
class Chatroom  {
    constructor() {
        this.parentBox = document.querySelector('.news');
        this.displayBox = document.querySelector('.news p small');
        this.notifyEl = document.querySelector('a.notification');
        this.editEl = document.querySelector('span.date fa-pencil');
        this.dateEl = document.querySelector('.date small');
        this.username = document.querySelector('span.userP').textContent;
        this.alertEl = document.querySelector('.postup');
        this.textArea = document.querySelector('textarea');
    }
    // Alert function
    Alert (msg, classval) {
        this.alertEl.textContent = msg;
        this.alertEl.style.display = "block";
        this.alertEl.classList.add(classval);
        setTimeout(()=> {
            this.alertEl.classList.remove(classval);
            this.alertEl.style.display = 'none';
        }, 3000)
    }
    clearfield() {
        this.textArea.value = "";
    }
    // Using event delegation
    delegateEvent(e) {
        console.log(e.target);
        const time = new Date();
        let timeForm = time.toLocaleString();
        let userObj = {};
        userObj.email = document.querySelector('input[type="hidden"]').id;
        if(e.target.value === "Post...") {
            const textArea = e.target.previousElementSibling;
            console.log(textArea.value);
            // validate
            
            if(textArea.value !== "") {
                console.log('It worked...')
                // Get more information about the user with the email
                http.get('http://localhost:3004/Users')
                .then((data)=> {
                    // check match with email
                    if(Array.isArray(data)) {
                        data.forEach((obj)=> {
                            if(obj.email === userObj.email) {
                                userObj.name = `${obj.firstname + " " + obj.lastname}`;
                                userObj.post = textArea.value.trim();
                                // userObj.id = obj.id;
                                userObj.comments = [];
                                userObj.likes = 0;
                                userObj.date = timeForm;
                                userObj.dislikes = 0;
                                // user created
                                console.log(userObj);
                                this.Alert('Post Added...', 'postright');
                                setTimeout(()=> {
                                    http.post('http://localhost:3004/dbPosts', userObj)
                                    .then((data)=> {
                                        getPosts();
                                        window.scrollTo({
                                            top : 3080,
                                            left:0,
                                            behavior : "smooth"
                                        })
                                        this.clearfield();
                                    }).catch((err)=> {
                                        console.log(err);
                                    })
                                },2000);
                            }
                        });
                    }
                })
            } else {
                this.Alert('Fill in your feedback U-tech news...', 'postwrong');
            }
        }   if(e.target.classList.contains('fa-pencil')) {
                const time = new Date();
                let timeForm = time.toLocaleString();
            //    get the id the of the target
                const id = Number(e.target.id);
                console.log(id);
                if(userObj.email !== "") {
                    // call the http get method
                    http.get(`http://localhost:3004/dbPosts`)
                    .then((users)=> {
                        users.forEach((user)=> {
                            if(user.email === userObj.email && user.id === id) {
                                // working with textarea
                                const textarea = document.querySelector('textarea');
                                const userpost = user.post;
                                textarea.value = userpost;
                                location.href = `#${textarea.id}`;
                                    textarea.nextElementSibling.value = "update";
                                    
                                    // user updated
                                    // call the put request
                                   textarea.nextElementSibling.addEventListener('click', (e)=> {
                                       e.preventDefault();
                                       if(e.target.value === 'update') {
                                        userObj.name = `${user.name}`;
                                        userObj.post = textarea.value.trim();
                                        // userObj.id = obj.id;
                                        userObj.comments = [];
                                        userObj.likes = 0;
                                        userObj.date = timeForm;
                                        userObj.dislikes = 0;
                                        http.put(`http://localhost:3004/dbPosts/${id}`, userObj)
                                        .then((user)=> {
                                            this.clearfield();
                                            this.Alert('Post Updated...', 'postright')
                                            textarea.nextElementSibling.value ="Post..."
                                            console.log("User updated");
                                            setTimeout(()=> {
                                                getPosts();
                                            },2000)
                                           
                                        }).catch((err)=> {
                                            console.log(err);
                                        })
                                       }
                                   })
                                // user created
                            }
                        })
                    })
                }                
            } if(e.target.classList.contains('fa-trash-o') && userObj.email !== "") {
                // call the http get function
                const id = e.target.id;
                console.log(id);
                if(confirm('Are you sure?')) {
                    http.delete(`http://localhost:3004/dbPosts/${id}`)
                    .then((data)=> {
                        this.Alert('Post Deleted...', 'postright');
                        getPosts();
                    }).catch((err)=> {
                        console.log('Something happened along the way')
                    })
                }
            } 
        }
    
}

export const chatroom = new Chatroom();
chatroom.parentBox.addEventListener('click', (e)=> {
    chatroom.delegateEvent(e);
}, 0);