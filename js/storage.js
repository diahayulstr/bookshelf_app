let books = [];
const STORAGE_KEY = 'BOOKSHELF_APPS';
const RENDER_EVENT = 'ondataloaded';
const SAVED_EVENT = 'ondatasaved';

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year: parseInt(year),
        isComplete
    };
}

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
});

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert("Browser Anda Telah Mendukung Fitur Local Storage!");
        return false
    }
    return true;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

document.addEventListener(SAVED_EVENT, function () {
    console.log("Data Berhasil Disimpan.")
});


function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
    for (const createBook of books) {
        if (createBook.id === bookId) {
            return createBook;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

document.addEventListener(RENDER_EVENT, function () {
    const uncompleteBook = document.getElementById('listUncompleted');
    uncompleteBook.innerHTML = '';
    const completeBook = document.getElementById('listCompleted');
    completeBook.innerHTML = '';

    for (const book_shelf of books) {
        const bookElement = createBook(book_shelf);
        if (book_shelf.isComplete) {
            completeBook.append(bookElement);
        } else {
            uncompleteBook.append(bookElement);
        }
    }
    return 1
});


