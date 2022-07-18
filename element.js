// this is something i was trying to do

export function BookCard (name, author, pages, read, index) {
  const box = document.createElement("input")
    .setAttribute("type", "checkbox")
    .setAttribute("name", "read")
    .setAttribute("value", `${index}`)
    .classList.add("read")
    .createAttribute(read)
    .addEventListener("click", changeReadStatus(box));
  const label = document.createElement("label")
    .setAttribute("for", "delete-book")
    .innerHTML = "Read Status";
  const img = document.createElement("img").setAttribute("src", "/logos/trash.svg");
  const delButton = document.createElement("button")
    .classList.add("delete-book")
    .setAttribute("value", `${index}`)
    .append(img)
    .addEventListener("click", deleteBook(delButton));
  const buttonPanel = document.createElement("div")
    .classList.add("card-buttons")
    .append(delButton)
    .append(label)
    .append(box);
  const noOfPages = document.createElement("p").innerHTML = `No. of pages : ${pages}`;
  const authInfo = document.createElement("p").innerHTML = `${author}`;
  const heading = document.createElement("h4").innerHTML = `${name}`;
  const card = document.createElement("div")
    .classList.add("book-card")
    .setAttribute("index", `${index}`)
    .append(heading)
    .append(authInfo)
    .append(noOfPages)
    .append(buttonPanel);
  const decor = document.createElement("div").classList.add("decor");
  const container = document.createElement("div")
    .classList.add(`book-container ${read}`)
    .append(decor)
    .append(card);
  return container;
}