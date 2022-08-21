let root = document.querySelector(".books");
let root2 = document.querySelector(".characters-page");

   

function openCharactersList(arr){
    root.style.display = "none";
    root2.style.display = "block";
    let close = document.createElement("a");
    close.innerText = 'close';
    close.addEventListener("click", (event) => {
        event.preventDefault();
        root.style.display = "grid";
        root2.style.display = "none";
    });
    let characterHeading = document.createElement("h2");
    characterHeading.innerText = "Characters List";
    characterHeading.classList.add("ch");
    let charactersList = document.createElement("ul");
    root2.append(close, characterHeading, charactersList);
    arr.forEach((elem) => {
        fetch(elem)
        .then((res) => res.json())
        .then((data) => {
            data.aliases.forEach((elm) => {
                let characters = document.createElement("li");
                characters.innerText = `${elm} : ()`;
                charactersList.append(characters);
            });
        });
    });
}

function createUI(data) {
    data.forEach(elm => {
        var book = document.createElement('ul');
        book.classList.add('books-list');
        var bookName = document.createElement('h2');
        bookName.innerText = elm.name;
        var bookAuthor = document.createElement('cite');
        bookAuthor.innerText = elm.authors;
        var bookCharacter = document.createElement('button');
        bookCharacter.innerText = `show characters (${elm.povCharacters.length})`;
        bookCharacter.addEventListener("click", () => {
            openCharactersList(elm.povCharacters);
        });
        book.append(bookName, bookAuthor, bookCharacter);
        root.append(book);
    });
}


let data = fetch('https://www.anapioficeandfire.com/api/books')
    .then((res) => res.json())
    .then((data) => {
        createUI(data);
    });

