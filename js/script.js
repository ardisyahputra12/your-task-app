document.addEventListener("DOMContentLoaded", function() {
    const searchBook = document.getElementById("search");
    const bookIsComplete = document.getElementById("bookIsComplete");
    const inputBook = document.getElementById("inputBook");

    searchBook.addEventListener("keyup", searchListBook);
    bookIsComplete.addEventListener("click", checkBook);
    inputBook.addEventListener("submit", function(event) {
        event.preventDefault();
        addToListBook();
        countTasks();
        alert("Tugas berhasil ditambahkan");
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }

    countTasks();
});


document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
    refreshData();
});