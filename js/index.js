document.addEventListener('DOMContentLoaded', function () {
    const inputForm = document.getElementById('inputBook');
    inputForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
        clearForm();

        function clearForm () {
            document.getElementById('inputTitle').value = "";
            document.getElementById('inputAuthor').value = "";
            document.getElementById('inputYear').value = "";
        }
    });

    if(isStorageExist()) {
        loadDataFromStorage();
    }
});


const checkType = document.getElementById('inputBookIsComplete');
checkType.addEventListener("click", () => {
    if(checkType.checked) {
        document.getElementById('typeBook').innerHTML = "<strong>Selesai Dibaca</strong>";
    } else {
        document.getElementById('typeBook').innerHTML = "<strong>Belum Selesai Dibaca</strong>";
    }
});