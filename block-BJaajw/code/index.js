let root = document.querySelector(".news-list");
const loading = document.createElement('img');

function createBasicUI(search = "select a news source") {
    root.innerHTML = "";
    fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
    .then((res) => {
        if(!res.ok){
            throw new Error(`Error happened ${res.status}`);
        }
        loading.src = "file:///home/somanshu/Desktop/altcampus/JAVASCRIPT/TA-JS-asynchronous-js-TJaaao/block-BJaajw/code/loading.jpg";
        loading.classList.add("image");
        root.append(loading);
        return  res.json();
    })
    .then((value) => {
        if(search == "select a news source"){
            value.forEach(elm => {
                createUI(elm);
            });
        }else{
            value.filter((elm) => elm.newsSite.toLowerCase() == search).forEach(elm => {
                createUI(elm);
            });
        }
    }).catch((error) => {
        root.innerText = error;
    }).finally(() => {
        loading.remove();
    });
}
createBasicUI();

function createUI(elm) {
    let newsArticle = document.createElement("div");
    newsArticle.classList.add("flex", "news-article");
    let newsImage = document.createElement("img");
    newsImage.classList.add("news-img");
    let newsDescription = document.createElement("article");
    newsDescription.classList.add("news-description");
    let newsCategory = document.createElement("h5");
    newsCategory.classList.add("news-category");
    let newsHeading = document.createElement("h3");
    newsHeading.classList.add("news-heading");
    let newsLink = document.createElement("a");
    newsLink.classList.add("btn");
    newsLink.innerText = "Read More"
    newsImage.src = elm.imageUrl;
    newsCategory.innerText = elm.newsSite;
    newsHeading.innerText = elm.title;
    newsLink.href = elm.url;
    newsDescription.append(newsCategory, newsHeading, newsLink);
    newsArticle.append(newsImage, newsDescription);
    root.append(newsArticle);
}

function handleChange() {
    if (input.value != "select a news source") {
        let search = input.value;
        search = search.toLowerCase();
        root.innerHTML = "";
        createBasicUI(search);
    }else{
        createBasicUI();
    }
}

let input = document.querySelector("select");
input.addEventListener("change", () => {
    handleChange();
    });