const STORAGE_KEY = "YOURTASKS_APPS";

let listBook = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(listBook);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        listBook = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeListBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

function findListBook(bookId) {
    for (book of listBook) {
        if (book.id === bookId)
            return book;
    }

    return null;
}

function findListBookIndex(bookId) {
    let index = 0
    for (book of listBook) {
        if (book.id === bookId)
            return index;

        index++;
    }

    return -1;
}