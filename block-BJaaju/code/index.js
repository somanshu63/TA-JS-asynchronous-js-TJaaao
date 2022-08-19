const image = document.querySelector(".image");
const input = document.querySelector("input");
let search;

function displayUI(data) {
    image.innerHTML = "";
    data.forEach(element => {
        let elementImage = document.createElement("img");
        elementImage.classList.add("images");
        elementImage.src = element.urls.small;
        image.append(elementImage);
    });
}

function fetch(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    if(url.includes(search) && search != ""){
        xhr.onload = function() {
            let userData = JSON.parse(xhr.response);
            displayUI(userData.results);
        };
    }else{
        xhr.onload = function() {
            let userData = JSON.parse(xhr.response);
            displayUI(userData);
        };
    }
    xhr.send();
}
fetch("https://api.unsplash.com/photos/?client_id=Oq9K2jw5HKFVKkX9kdxF7tNDmX2jTwhu_MHlHJB_ZJo&per_page=100");


function handleChange(event) {
    if(event.keyCode == 13){
        search = event.target.value;
        fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=LP1r3vsN-jL9K-1AoGIm8hcbGM95W337bUaMTfaGby4&per_page=100`);
        event.target.value = "";
    }
}

input.addEventListener("keyup", handleChange);
