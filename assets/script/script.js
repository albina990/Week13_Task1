let showname = document.querySelector("input#yes");
let hidename = document.querySelector("input#no");
let labelName = document.querySelector('label[for="name"]');
let member = document.querySelector("input#name");
let avatar = document.querySelector("input#avatar");
let chat = document.querySelector(".chat");
let comment = document.querySelector("textarea#comment");
let submit = document.querySelector("input#submit");
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

function checkSpam(str) {
    let str1 = str.replace(/viagra/gi, "***");
    let str2 = str1.replace(/виагра/gi, "***");
    let str3 = str2.replace(/XXX/gi, "***");
    return str3;
}
function checkMember(str) {
    let memberNameLow = str.value.toLowerCase().trim();
    let firstSpacePosition = memberNameLow.indexOf(" ");
    let lastSpacePosition = memberNameLow.lastIndexOf(" ");

    let memberNameSpace = memberNameLow.slice(firstSpacePosition + 1, lastSpacePosition);
    let memberName;
    let memberSirname;
    let memberLastname;
    let memberSirnameLow;

    if (
        firstSpacePosition !== -1 &&
        lastSpacePosition !== -1 &&
        lastSpacePosition !== firstSpacePosition &&
        !memberNameSpace.includes(' ')
    ) {
        memberName =
            memberNameLow[0].toUpperCase() +
            memberNameLow.slice(1, firstSpacePosition);
        memberSirnameLow = memberNameLow
            .slice(firstSpacePosition + 1, lastSpacePosition)
            .trim();
        memberSirname =
            memberSirnameLow[0].toUpperCase() +
            memberSirnameLow.slice(1, lastSpacePosition).trim();
        let memberLastnameLow = memberNameLow.slice(lastSpacePosition + 1);
        memberLastname =
            memberLastnameLow[0].toUpperCase() + memberLastnameLow.slice(1);
    } else if (
        lastSpacePosition == firstSpacePosition &&
        firstSpacePosition !== -1
    ) {
        memberName =
            memberNameLow[0].toUpperCase() +
            memberNameLow.slice(1, firstSpacePosition);
        memberSirnameLow = memberNameLow.slice(firstSpacePosition + 1);
        memberSirname =
            memberSirnameLow[0].toUpperCase() + memberSirnameLow.slice(1).trim();
        memberLastname = "";
    } else {
        memberName = memberNameLow[0].toUpperCase() + memberNameLow.slice(1);
        memberSirname = "";
        memberLastname = "";
    }
    return `${memberName} ${memberSirname} ${memberLastname}`;
}

hidename.addEventListener('click', setUnChecked);
showname.addEventListener('click', setChecked);

function setUnChecked(){
    hidename.setAttribute('checked', 'checked');
    labelName.style.display = 'none';
    member.style.display = 'none';
    showname.removeAttribute('checked');
}

function setChecked(){
    showname.setAttribute('checked', 'checked');
    labelName.style.display = 'block';
    member.style.display = 'block';
    hidename.removeAttribute('checked');
}

function sendPost(event) {
    event.preventDefault()
    let vullName;
    let avatarLink;

    if(member.value === ''){
        vullName = 'username';
    } else {
        vullName = checkMember(member);
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
    <p class="name">${vullName}</p>
    <p class="date">${datePost}</p>
</div>
<p class="comment">${commentContent}</p>
</div>`;
}
