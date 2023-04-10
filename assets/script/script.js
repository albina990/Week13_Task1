let showname = document.getElementById("yes");
let hidename = document.getElementById("no");
let labelName = document.querySelector('label[for="name"]');
let member = document.getElementById("name");
let avatar = document.getElementById("avatar");
let chat = document.querySelector(".chat");
let comment = document.getElementById("comment");
let submit = document.getElementById("submit");
let stansardAvatars = [
    'https://i.pinimg.com/564x/c1/53/28/c153281dd54afa86a1d651fc4a08b016.jpg',
    'https://i.pinimg.com/564x/b5/61/a6/b561a65ed688d9b0b7280030d71e43f9.jpg',
    'https://i.pinimg.com/564x/90/9d/7b/909d7b753f1614d86a2985cf85233c84.jpg',
    'https://i.pinimg.com/564x/63/53/d1/6353d184b669ac9bebdd30ec14f3634c.jpg',
    'https://i.pinimg.com/564x/81/b5/9a/81b59a173b2c5a2f302c45488e0db27d.jpg',
    'https://i.pinimg.com/564x/6b/b0/15/6bb015ad8ed7ad6a25d161576d8bdc4f.jpg',
    'https://i.pinimg.com/564x/84/b5/7d/84b57dbcd80c1eb7fdffe0063640b9cd.jpg',
    'https://i.pinimg.com/564x/82/8f/68/828f6805529705e34a4171ffd1d0f99e.jpg'
];

submit.addEventListener("click", sendPost);
hidename.addEventListener('click', setUnChecked);
showname.addEventListener('click', setChecked);

function checkSpam(str) {
    let newStr = str.replace(/viagra/gi, "***").replace(/виагра/gi, "***").replace(/XXX/gi, "***");
    return newStr;
}
function checkMember(str) {
    let fullName = str.value.toLowerCase().trim().split(/\s+/).map(val => val[0].toUpperCase() + val.substring(1)).join(' ');
    return fullName;
}
function setUnChecked(){
    labelName.style.display = 'none';
    member.style.display = 'none';
}

function setChecked(){
    labelName.style.display = 'block';
    member.style.display = 'block';
}
function sendPost(event) {
    event.preventDefault()
    let fullName;
    let avatarLink;

    if(member.value === ''){
        fullName = 'username';
    } else {
        fullName = checkMember(member);
    }

    if(avatar.value != ''){
        avatarLink = avatar.value;
    } else {
        let i = Math.floor(Math.random() * 8);
        avatarLink = stansardAvatars[i];
    }

    let date = new Date();
    let options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    let datePost = date.toLocaleString("ru", options);

    let commentContent = checkSpam(comment.value);
    chat.innerHTML =
        chat.innerHTML +
        `<div class="chat__item">
<div class="chat__member">
    <img
        src="${avatarLink}"
        alt="avatar"
    />
    <p class="name">${fullName}</p>
    <p class="date">${datePost}</p>
</div>
<p class="comment">${commentContent}</p>
</div>`;
}
