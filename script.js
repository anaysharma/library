const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");
const form = document.querySelector(".form");
const bookCards = document.querySelector(".books");
const show = document.querySelector(".show");


let myLibrary = [];
var globalIdx = 0;

class book {
  constructor (
    name = "unknown", 
    author = "unknown", 
    pages = "0", 
    readStatus = false
    ) {
    this.bookName = name;
    this.author = author;
    this.pageCount = pages;
    this.readStatus = readStatus
    this.index = ++globalIdx;
  }

  getName () { return this.name; }
  getAuthor () { return this.author; }
  getPageCount () { return this.pageCount; }
  isRead () { return this.readStatus; }
  getIndex () { return this.index; }

  toggleReadStatus () {
    if (this.readStatus === true) {
      this.readStatus = false;
    } else {
      this.readStatus = true;
    }
  }
};

function addBook () {
  let bookName = form.elements[0].value;
  let author = form.elements[1].value;
  let pages = form.elements[2].value;
  let read = form.elements[3].checked;

  let newBook = new book(
    bookName,
    author,
    pages,
    read
  );

  myLibrary.push(newBook);
  showBooks(newBook);

  form.reset();
}

function showBooks (item) {
  bookCards.innerHTML += 
  `<div class="book-card" index="${item.index}">
    <h4>Book Name : ${item.bookName}</h4>
    <p>Author Name : ${item.author}</p>
    <p>No. of pages : ${item.pageCount}</p>
    <button class="delete-book" value="${item.index}">delete</button>
  </div>`;
}

if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
} else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}

function handleClick(event) {
    event = event || window.event;
    event.target = event.target || event.srcElement;
    var element = event.target;
    while (element) {
        if (element.nodeName === "BUTTON" && /delete-book/.test(element.className)) {
            // The user clicked on a <button> or clicked on an element inside a <button>
            // with a class name called "foo"
            deleteBook(element);
            break;
        }

        element = element.parentNode;
    }
}

function deleteBook (button) {
  console.log(button.value)
}

form.addEventListener("submit", addBook);
openModal.addEventListener("click", () => { modal.showModal();});
closeModal.addEventListener("click", () => { modal.close();});