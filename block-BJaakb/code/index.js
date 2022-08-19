function fetch(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            setTimeout(() => {
                resolve(JSON.parse(xhr.response)), 5000
            });
        }
        xhr.onerror = () => {
            setTimeout(() => {
                reject("something went wrong"), 5000
            });
        }
        xhr.send();
    });
}

let data = fetch(`https://api.github.com/users/getify`)
    .then((data) => {
        console.log(data.name);
    })
    .catch((error) => {
        alert(`something went wrong`);
    });


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
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.onerror = () => reject("something went wrong");
        xhr.send();
    });
}
fetch("https://api.unsplash.com/photos/?client_id=Oq9K2jw5HKFVKkX9kdxF7tNDmX2jTwhu_MHlHJB_ZJo&per_page=100")
.then(displayUI)
.catch((error) => {
    alert(`something went wrong`);
});


function handleChange(event) {
    if(event.keyCode == 13){
        search = event.target.value;
        fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=LP1r3vsN-jL9K-1AoGIm8hcbGM95W337bUaMTfaGby4&per_page=100`)
            .then((data) => {
                displayUI(data.results);
            })
            .catch((error) => console.log(error));
        event.target.value = "";
    }
}

input.addEventListener("keyup", handleChange);
