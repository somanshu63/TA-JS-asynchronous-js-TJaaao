let input = document.querySelector("input");
let name = document.querySelector("h2");
let username = document.querySelector("h3");
let allFollowers = Array.from(document.querySelectorAll(".followers-image"));
let allFollowing = Array.from(document.querySelectorAll(".following-image"));
let userImage = document.querySelector(".G-image");
let catImage = document.querySelector(".cat-image");
let button = document.querySelector("button");

function displayUI(data) {
    userImage.src = data.avatar_url;
    name.innerText = data.name;
    username.innerText = `@${data.login}`;
}
function displayUIFR(data) {
    for (let i = 0; i < 5; i++) {
        allFollowers[i].src = data[i].avatar_url;
    }
}
function displayUIFW(data) {
    for (let i = 0; i < 5; i++) {
        allFollowing[i].src = data[i].avatar_url;
    }
}
function handleChange(event) {
    if(event.keyCode == 13){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.github.com/users/${event.target.value}`);
        xhr.onload = function() {
            let userData = JSON.parse(xhr.response);
            displayUI(userData);
        };
        let xhrfr = new XMLHttpRequest();
        xhrfr.open("GET", `https://api.github.com/users/${event.target.value}/followers`);
        xhrfr.onload = function() {
            let userDatafr = JSON.parse(xhrfr.response);
            displayUIFR(userDatafr);
        };
        let xhrfw = new XMLHttpRequest();
        xhrfw.open("GET", `https://api.github.com/users/${event.target.value}/following`);
        xhrfw.onload = function() {
            let userDatafw = JSON.parse(xhrfw.response);
            displayUIFW(userDatafw);
        };
        xhr.onerror = function () {
            console.log("something went wrong");
        }
        xhr.send();
        xhrfr.send();
        xhrfw.send();
        event.target.value = "";
    }
}
input.addEventListener("keyup", handleChange);

button.addEventListener("click", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.thecatapi.com/v1/images/search?limit=1&size=full`);
    xhr.onload = function() {
        let imageData = JSON.parse(xhr.response);
        catImage.src = imageData[0].url;
    };
    xhr.onerror = function () {
        console.log("something went wrong");
    }
    xhr.send();
});
