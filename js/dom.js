const UNCOMPLETED = document.querySelector("#bookItemUnCompleted");
const COMPLETED = document.querySelector("#bookItemCompleted");
const BOOKSHELF_ITEMID = "bookId";

function checkBook() {
    const addBook = document.getElementById("addBook");

    if (bookIsComplete.checked == true) {
        addBook.innerText = "Bawah";
        return true;
    } else {
        addBook.innerText = "Atas";
        return false;
    }
}

function createListBook(title, author, year, isCompleted) {
    const content = `
        <h4 class="bookItemTitle">${title}</h4>
        <p>Kategori : <span class="bookItemAuthor">${author}</span></p>
        <p>Deadline : <span class="bookItemYear">${year}</span></p>`;

    const button = document.createElement("div");
    button.classList.add("action");

    if (isCompleted) {
        button.append(
            createUndoButton(),
            createDeleteButton()
        );
        const container = document.createElement("div");
        container.classList.add("itemCompleted");
        container.innerHTML = content;
        container.append(button);
        return container;
    } else {
        button.append(
            createCheckButton(),
            createEditButton(),
            createDeleteButton()
        );
        const container = document.createElement("div");
        container.classList.add("itemUnCompleted");
        container.innerHTML = content;
        container.append(button);
        return container;
    }
}

function createButton(buttonTypeClass, text, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = text;
    button.addEventListener("click", function(event) {
        eventListener(event);
        countTasks();
    });
    return button;
}

function createCheckButton() {
    return createButton("green", "Tugas Selesai", function(event) {
        addToListBookCompleted(event.target.parentElement.parentElement);
    });
}

function createUndoButton() {
    return createButton("orange", "Batalkan", function(event) {
        addToListBookUnCompleted(event.target.parentElement.parentElement);
    });
}

function createDeleteButton() {
    return createButton("red", "Hapus", function(event) {
        deleteListBook(event.target.parentElement.parentElement);
    });
}

function createEditButton() {
    return createButton("orange", "Edit", function(event) {
        editListBook(event.target.parentElement.parentElement);
    });
}

function addToListBook() {
    const bookTitle = document.querySelector("#bookTitle").value;
    const bookAuthor = document.querySelector("#bookAuthor").value;
    const bookYear = document.querySelector("#bookYear").value;

    const create = createListBook(bookTitle, bookAuthor, bookYear, checkBook());
    const listBookObject = composeListBookObject(bookTitle, bookAuthor, bookYear, checkBook());
    create[BOOKSHELF_ITEMID] = listBookObject.id;
    listBook.push(listBookObject);

    if (checkBook()) {
        COMPLETED.append(create);
    } else {
        UNCOMPLETED.append(create);
    }

    updateDataToStorage();
}

function addToListBookCompleted(taskElement) {
    const title = taskElement.querySelector(".bookItemTitle").innerText;
    const author = taskElement.querySelector(".bookItemAuthor").innerText;
    const year = taskElement.querySelector(".bookItemYear").innerText;

    const create = createListBook(title, author, year, true);
    const findBook = findListBook(taskElement[BOOKSHELF_ITEMID]);
    findBook.isCompleted = true;
    create[BOOKSHELF_ITEMID] = findBook.id;

    COMPLETED.append(create);
    taskElement.remove();

    updateDataToStorage();
}

function addToListBookUnCompleted(taskElement) {
    const title = taskElement.querySelector(".bookItemTitle").innerText;
    const author = taskElement.querySelector(".bookItemAuthor").innerText;
    const year = taskElement.querySelector(".bookItemYear").innerText;

    const create = createListBook(title, author, year, false);
    const findBook = findListBook(taskElement[BOOKSHELF_ITEMID]);
    findBook.isCompleted = false;
    create[BOOKSHELF_ITEMID] = findBook.id;

    UNCOMPLETED.append(create);
    taskElement.remove();

    updateDataToStorage();
}

function editListBook(taskElement) {
    const title = taskElement.querySelector(".bookItemTitle").innerText;
    const author = taskElement.querySelector(".bookItemAuthor").innerText;
    const year = taskElement.querySelector(".bookItemYear").innerText;

    const editTitle = prompt("Nama Tugas", title);
    const editAuthor = prompt("Kategori", author);
    const editYear = prompt("Deadline", year);

    const create = createListBook(editTitle || title, editAuthor || author, editYear || year, false);
    const listBookObject = composeListBookObject(editTitle || title, editAuthor || author, editYear || year, false);
    const listBookPosition = findListBookIndex(taskElement[BOOKSHELF_ITEMID]);
    create[BOOKSHELF_ITEMID] = listBookObject.id;
    listBook.splice(listBookPosition, 1);
    listBook.push(listBookObject);

    UNCOMPLETED.append(create);
    taskElement.remove();

    updateDataToStorage();
}

function deleteListBook(taskElement) {
    const listBookPosition = findListBookIndex(taskElement[BOOKSHELF_ITEMID]);
    listBook.splice(listBookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function searchListBook() {
    const searchBook = document.querySelector("#search").value.toLowerCase();
    const byCategori = document.querySelector("#byCategori");
    let bookItemTitle = document.querySelectorAll(".bookItemTitle");
    let bookItemAuthor = document.querySelectorAll(".bookItemAuthor");

    if (byCategori.checked == false) {
        for (book of bookItemTitle) {
            const bookItem = book.firstChild.textContent.toLowerCase();
            if (bookItem.indexOf(searchBook) != -1) {
                book.parentElement.setAttribute("style", "display: block;");
            } else {
                book.parentElement.setAttribute("style", "display: none !important;");
            }
        }
    } else {
        for (book of bookItemAuthor) {
            const bookItem = book.firstChild.textContent.toLowerCase();
            if (bookItem.indexOf(searchBook) != -1) {
                book.parentElement.parentElement.setAttribute("style", "display: block;");
            } else {
                book.parentElement.parentElement.setAttribute("style", "display: none !important;");
            }
        }
    }
}

function countTasks() {
    const countUncompleted = document.getElementById("countUncompleted");
    const countCompleted = document.getElementById("countCompleted");
    countUncompleted.innerText = UNCOMPLETED.childElementCount;
    countCompleted.innerText = COMPLETED.childElementCount;
}

function refreshData() {
    for (book of listBook) {
        const create = createListBook(book.title, book.author, book.year, book.isCompleted);
        create[BOOKSHELF_ITEMID] = book.id;

        if (book.isCompleted) {
            COMPLETED.append(create);
        } else {
            UNCOMPLETED.append(create);
        }
    }
}