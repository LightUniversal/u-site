// import EasyHttp 
import { http } from './http';
// when the page loads
// import ui class
import { ui } from './ui';
import { chartroom } from './db';
document.addEventListener('DOMContentLoaded', getPosts);
const port = 3004;
export function getPosts() {
  http.get(`http://localhost:${port}/dbPosts`)
  .then((data)=> {
    ui.showPost(data);
  }).catch((err)=> {
    console.log(err);
  })
}
document.querySelector(".news p").addEventListener('click', (e)=> {
    ui.actions(e);
    
});
document.querySelector('body').addEventListener('click', (e)=> {
    ui.startNow(e);
    ui.contact(e);
    ui.toggleEffect(e);
    ui.about(e);
    ui.toggle(e);
})

// userlogged in or registered
const loginEle = document.getElementById('login');
const userProfile = document.querySelector('span.userP');
const hiddenEl = document.querySelector("input[type='hidden']");
// login 
function loginUser(e) {
    setTimeout(()=> {
        location.href = `#${document.querySelector('input[type="email"]').id}`;
    }, 5000)
    e.preventDefault();
    let html;
    html = `
        <form id="login-user" class="animated fadeInLeft">
            <fieldset>
                <legend><i class="fa fa-user-plus"></i> Login</legend>
                <label for="email">Email Account <i class="fa fa-envelope email"></i></label>
                <input type="email" name="email" id="email" class="inputs"  placeholder="email account">
                <input type="submit" value="Login" class='submitted'>
            </fieldset>
        </form>
    `;
    // desctructive variable.
    const cache_container = [container.firstElementChild.innerHTML];
    container.firstElementChild.innerHTML = html;
    // submitting form
    const form = document.querySelector('#login-user form');
    const submit = document.querySelector('.submitted');
    let email;
    submit.addEventListener('click', (e)=> {
        email = submit.previousElementSibling.value.trim().toLowerCase();
        e.preventDefault();
        http.get('http://localhost:3004/Users')
        .then((data)=> {
            if(Array.isArray(data)) {
                data.forEach((obj, i)=> {
                    if(obj.email === email) {
                        console.log(obj);
                        container.firstElementChild.innerHTML = cache_container[0];
                        container.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.lastElementChild.textContent =  `${obj.lastname}`;
                        container.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.value = "Logout";
                        container.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.id="logins";
                        container.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.style.display = "none";
                    }
                });
            }
        });
    hiddenEl.id = email; 
    }, 0);
}
// add event listener
document.body.addEventListener('click', function(e) {
    if(e.target.id === loginEle.id) {
        loginUser(e);
    }
}, 0);
function assignUserVal(validated) {
    if(typeof validated === 'object') {
        return true
    } else {
        return false;
    }
}
function User(fname, lname, gender, email) {
    this.firstname = fname;
    this.lastname = lname;
    this.email = email;
    this.gender = gender;
}
// Get elements to work with
const registerEle = document.getElementById('register');
const container = document.getElementsByClassName('container')[0];
const feedback = document.createElement('p');
let logE;
const toggle = document.getElementsByClassName('toggle')[0];
// login
function registerUser(e) {
    logE = document.createElement('div');
    logE.className = 'log';
    logE.innerHTML = `
    <h3 id = 'title'><i class="fa fa-user-plus"></i> Register</h3>
    <form action='#' id="login-form">
        <label for="fname">First Name <small class="user"><i class="fa fa-user-plus"></i></small></label>
        <input type="text" name="name" id="fname" placeholder="First Name" class="inputs" required="required">
        <label for="lname">Last Name <small class="user"><i class="fa fa-user-plus"></i></small></label>
        <input type="text" name="name"  class="inputs"  id="lname" placeholder="Last Name" required="required">
        <br>
        <label for="Male">Male</label>
        <input type="radio" name="gender" id="Male" class='inlines'>
        <label for="Female">Female</label>
        <input type="radio" name="gender" id="Female" class='inlines'>
        <br>
        <br>
        <label for="email">Account <i class="fa fa-envelope email"></i></label>
        <input type="email" name="email" id="email" class="inputs" required = "required" placeholder="email account">
        <input type="submit" value="DONE" class='inlines'>
    </form>
    `;
    container.prepend(logE);
    const label1 = document.querySelectorAll('label')[0];
    const fname = document.querySelector('#fname');
    const lname = document.querySelector('#lname');
    const email = document.querySelector('input[name="email"]');
    const done = document.querySelector('input[value="DONE"]');
    const form = document.getElementById('login-form');
    const gender = Array.from(document.querySelectorAll('.inlines')).filter((inline)=> {
        return inline.name === 'gender';
    });
    function validateFName(val) {
        val = fname.value.trim();
        let matchPattern = /^[a-z]{3,14}$/i;
        if(matchPattern.test(val)) {
            // form.insertBefore(iRight, fname)
            fname.className = "right";
            return true;
        } else {
            fname.className = 'error';
            return false;
        }
    }
    function validateLName(val) {
        val = lname.value.trim();
        let matchPattern = /^[a-z]{3,14}$/i;
        if(matchPattern.test(val)) {
            lname.className = 'right';
            return true;
        } else {
            lname.className = 'error';
            return false;
        }
    }
    function validateEmail(val) {
        val = email.value.trim();
        let matchPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        if(matchPattern.test(val)) {
            email.className = 'right';
            return true;
        } else {
            email.className = 'error';
            return false;
        }
    }    
    fname.onkeyup = validateFName;
    lname.onkeyup = validateLName;
    email.onkeyup = validateEmail;
    const reduceOpacity = (Array.from(container.children)).filter((child)=> {
        return child.className !== 'log';
    });
    reduceOpacity.forEach(function(ele) {
        ele.classList.add('reduce');
    })
    if(toggle) {
        toggle.classList.remove('toggle');
    }
    done.parentElement.addEventListener('submit', (e)=> {
        e.preventDefault();
        if(validateEmail() === true && validateFName() === true && validateLName() === true && (gender[0].checked || gender[1].checked)) {
            const user = new User(
                (fname.value.trim()).toLowerCase(), (lname.value.trim()).toLowerCase(),
                (function() {
                    if(gender[0].checked) {
                        return gender[0].id;
                    } else if(gender[1].checked) {
                        return gender[1].id;
                    }    
                }())
                ,(email.value.trim()).toLowerCase()
            );
            //get jsondata
            const localDb = (function(url) {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.onload = function() {
                    const arr = JSON.parse(this.responseText);
                    const users = arr.Users; 
                    const newV = users.find((obj)=> {
                        return obj.email === user.email;
                    });
                    if(typeof newV === "object") {
                        feedback.className = 'rightfeed';
                            feedback.textContent = 'User already exist. Login Please.';
                            form.insertBefore(feedback, label1);
                            setTimeout(()=> {
                            form.removeChild(feedback);
                            },5000);
                            assignUserVal(newV);
                            const newLog = document.createElement('button');
                            setTimeout(()=> {
                                newLog.className = 'newlog';
                                newLog.innerHTML = `Login <i class="fa fa-camera">`;
                                form.appendChild(newLog);
                            }, 1000);
                           
                    }
                    if(typeof newV === "undefined" ) {
                        feedback.className = 'rightfeed';
                            feedback.textContent = 'User added to database. You are registered';
                            form.insertBefore(feedback, label1);
                            setTimeout(()=> {
                            form.removeChild(feedback);
                            assignUserVal(newV);
                            http.post('http://localhost:3004/Users', user);
                            location.reload();
                            },5000);
                            document.getElementsByName('login')[0].value = "Logout";                      
                    }
                }
                xhr.send(null);
            }('/api/db.json')); 
        } else {
            feedback.className = 'feedback';
            feedback.textContent = 'Please validate your inputs';
            form.insertBefore(feedback, label1);
            setTimeout(()=> {
                form.removeChild(feedback);
            },3000);
        }
    },0);
    
}
document.body.addEventListener('click', (e)=>{
    if(e.target.id === registerEle.id) {
        registerUser(e);
    }
    if(e.target.value === "Logout") {
        if(confirm("Are You sure?")) {
        document.querySelector('input[type="hidden"]').id = "";
        document.querySelector('#logins').value = "Login";
        document.querySelector('#logins').id = 'login';
        document.querySelector('#register').style.display = "inline-block";
        document.querySelector('.userP').textContent = "";
        }
    }
}, false);
