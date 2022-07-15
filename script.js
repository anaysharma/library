const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");
const form = document.querySelector(".form");
const bookCards = document.querySelector(".books");
const show = document.querySelector(".show")

let myLibrary = [];
let index = 0;

function Book (
  bookName = "Unknown",
  author = "Unknown",
  pageCount = 0,
  readStatus = false
  ) {
  index += 1;
  this.index = index;
	this.name = bookName;
  this.auth = author; 
  this.page = pageCount;
  this.read = readStatus;
}

function addBookToLibrary () {
  let bookName = document.getElementById("book-name").value;
  let bookAuthor = document.getElementById("book-author").value;
  let pageCount = document.getElementById("page-number").value;
  let read = document.getElementById("read-status").checked;
  readStatus = read ? true : false;
  let book = new Book(bookName, bookAuthor, pageCount, readStatus);
  myLibrary.push(book);
  showBook();
}

function showBook () {
  for(let i = 0; i < myLibrary.length; i++) {
    bookCards.innerHTML += `<div class="card">
      ${myLibrary[i].name} 
      \n${myLibrary[i].index}
      \n${myLibrary[i].auth}
      \n${myLibrary[i].page}
      \n${myLibrary[i].read}
    </div>`;
  }
}


form.addEventListener("submit", addBookToLibrary());
show.addEventListener("click", showBook());
openModal.addEventListener("click", () => { modal.showModal();});
closeModal.addEventListener("click", () => { modal.close();});