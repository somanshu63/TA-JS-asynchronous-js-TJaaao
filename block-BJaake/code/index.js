let root = document.querySelector(".news-list");

function createBasicUI() {
    root.innerHTML = "";
    fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
    .then((res) => res.json())
    .then((value) => {
        value.forEach(elm => {
            createUI(elm);
        });
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
        fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
        .then((res) => res.json())
        .then((value) => {
            value.filter((elm) => elm.newsSite.toLowerCase() == search).forEach(elm => {
                createUI(elm);
            });
        });
    }else{
        createBasicUI();
    }
}

let input = document.querySelector("select");
input.addEventListener("change", () => {
    handleChange();
    });