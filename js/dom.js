/**
 * {
  id: string | number,
  title: string,
  author: string,
  year: number,
  isComplete: boolean,
}
 */

const UNCOMPLETED_LIST_BOOK_ID = "listUncompleted";
const COMPLETED_LIST_BOOK_ID = "listCompleted";
const BOOK_ITEM_ID = "itemId"

function addBook() {
    const uncompleteBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completeBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const checkType = document.getElementById('inputBookIsComplete');

    const generateID = generateId();
    const book_title = document.getElementById('inputTitle').value;
    const book_author = document.getElementById('inputAuthor').value;
    const book_year = document.getElementById('inputYear').value;

    if (!checkType.checked) {
        const book = createBook(book_title, book_author, book_year, false);
        const bookObject = generateBookObject(generateID, book_title, book_author, book_year, false);
        books.push(bookObject);
        uncompleteBookList.append(book);
    } else {
        const book = createBook(book_title, book_author, book_year, true);
        const bookObject = generateBookObject(generateID, book_title, book_author, book_year, true);
        books.push(bookObject);
        completeBookList.append(book);
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function createBook(book_shelf) {
    const { id, title, author, year, isComplete } = book_shelf;

    const textTitle = document.createElement('h2');
    textTitle.innerHTML = title;

    const textAuthor = document.createElement('p');
    textAuthor.innerHTML = "Penulis : " + author;

    const textYear = document.createElement('p');
    textYear.innerHTML = "Tahun : " + year;

    const textContainer = document.createElement('div');
    textContainer.classList.add('book-info');
    textContainer.append(textTitle, textAuthor, textYear);

    const containerInfo = document.createElement('article');
    containerInfo.classList.add('book_info');
    containerInfo.append(textContainer);

    if (isComplete) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('uncompletedButton');
        undoButton.addEventListener('click', function () {
            undoBookIsCompleted(id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', function () {
            removeBookIsCompleted(id);
        });

        containerInfo.append(undoButton, deleteButton);

    } else {
        const completeButton = document.createElement('button');
        completeButton.classList.add('completedButton');
        completeButton.addEventListener('click', function () {
            addBookIsCompleted(id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', function () {
            removeBookIsCompleted(id);
        });

        containerInfo.append(completeButton, deleteButton);
    }
    return containerInfo;
}

function addBookIsCompleted(bookId) {
    const book_target = findBook(bookId);
    if (book_target == null) return;
    book_target.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData(books);
}

function removeBookIsCompleted(bookId) {
    const book_target = findBookIndex(bookId);
    var result = confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (result) {
        books.splice(book_target, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData(books);
    }
}

function undoBookIsCompleted(bookId) {
    const book_target = findBook(bookId);
    if (book_target == null) return;
    book_target.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}