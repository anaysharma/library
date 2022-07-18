const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");
const form = document.querySelector(".form");
const bookCards = document.querySelector(".books");
const show = document.querySelector(".show");


let myLibrary = [];
var globalIdx = 0;

class Book {
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
  const name = bookName.charAt(0).toUpperCase() + bookName.slice(1);
  const authorName = author.charAt(0).toUpperCase() + author.slice(1);
  let newBook = new Book( name, authorName, pages, read );
  myLibrary.push(newBook);
  showBooks();
  form.reset();
}

function cardHTML (name, author, noOfPages, index, read) {
  let html = `<div class="book-container ${read}">
      <div class="decor"></div>
      <div class="book-card" index="${index}">
        <h4>${name}</h4>
        <p>Author : ${author}</p>
        <p>No. of pages : ${noOfPages}</p>
        <div class="card-buttons">
          <button class="delete-book" value="${index}"><img src="/logos/trash.svg"></button>
          <label for="read">Read Status</label>
          <input type="checkbox" value="${index}" name="read" class="read" ${read}>
        </div>
      </div>
    </div>`;
    return html;
}

function showBooks () {
  bookCards.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let read;
    if (myLibrary[i].readStatus === true) {
      read = "checked";
    } else {
      read = ""
    }
    bookCards.innerHTML += cardHTML(
      myLibrary[i].bookName,
      myLibrary[i].author,
      myLibrary[i].pageCount,
      myLibrary[i].index,
      read
    );
  }
  navStatus();
}

if (document.addEventListener) {
  document.addEventListener("click", handleClick, false);
} else if (document.attachEvent) {
  document.attachEvent("onclick", handleClick);
}

function handleClick (event) {
  event = event || window.event;
  event.target = event.target || event.srcElement;
  var element = event.target;
  while (element) {
    if ((element.nodeName === "BUTTON" && /delete-book/.test(element.className))
      || (element.nodeName === "INPUT" && /read/.test(element.className))) {
      if (element.nodeName === "BUTTON") {
        deleteBook(element);
        break;
      } else if (element.nodeName === "INPUT") {
        changeReadStatus(element);
        break;
      }      
    }
    element = element.parentNode;
  }
}

function deleteBook (button) {
  let idx = button.value;
  for (var i = myLibrary.length - 1; i >= 0; i--) {
    if (myLibrary[i].index == idx) {
      myLibrary.splice(i, 1);
      showBooks();
    }
  }
}

function changeReadStatus (element) {
  let idx = element.value;
  for (var i = myLibrary.length - 1; i >= 0; i--) {
    if (myLibrary[i].index == idx) {
      myLibrary[i].toggleReadStatus();
      document.querySelector(".book-container").classList.toggle("checked");
      showBooks();
    }
  }
}

function navStatus () {
  let bookCount = myLibrary.length;
  let readBooks = 0;
  for (let i = 0; i < bookCount; i++) {
    if (myLibrary[i].readStatus === true) {
      readBooks++;
    }
  }
  document.querySelector(".status").innerHTML = `
    <img src="/logos/books.svg"> Total Books : ${bookCount}
    <img src="/logos/eye.svg"> Read Books : ${readBooks}
    <img src="/logos/eye-crossed.svg"> Unread Books: ${bookCount - readBooks}`
}

window.onload = showBooks();
form.addEventListener("submit", addBook);
openModal.addEventListener("click", () => { modal.showModal() });
closeModal.addEventListener("click", () => { modal.close() });