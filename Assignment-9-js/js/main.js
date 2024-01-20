let bookNameInput = document.getElementById('nameInput');
let bookUrlInput = document.getElementById('urlInput');
let nameRagex = /^[a-zA-Z\-]+$/;
let urlRagex = /^(ftp|http|https):\/\/[^ "]+$/;
let vaildationName = '';
let vaildationUrl = '';
let books = [];

function isItVaild(value, regex, targetId) {
  if (regex.test(value) == true) {
    document.getElementById(targetId).classList.add('is-valid')
    document.getElementById(targetId).classList.remove('is-invalid')
    vaildationName = true;
    vaildationUrl = true;
  } else {
    document.getElementById(targetId).classList.add('is-invalid')
    document.getElementById(targetId).classList.remove('is-valid')
  }
}

document.getElementById('nameInput').addEventListener('keypress', function (event) {
  let target = event.target.getAttribute('id');  
  isItVaild(bookNameInput.value, nameRagex, target)
  console.log('hi')
})
document.getElementById('urlInput').addEventListener('keypress', function (event) {
  let target = event.target.getAttribute('id');
  isItVaild(bookUrlInput.value,urlRagex , target)
  console.log ('hi')
})

document.getElementById('submit-btn').addEventListener('click', function () {
  if (vaildationUrl == true && vaildationName == true) {
  let book = {
    bookName: bookNameInput.value,
    bookUrl: bookUrlInput.value
  }
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  console.log('as');
  displayData()
  }
})

document.getElementById('clear-form').addEventListener('click', function () {
  bookNameInput.value = ''
  bookUrlInput.value = ''
})


function visitUrl(index) {
  let url = books[index].bookUrl;
  window.open(url , "_self" )
}

function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(books));
  displayData()
}

function displayData() {
  let temp = '';
  for (let i = 0; i < books.length; i++) {
    temp += `<tr>
                <td class="text-center">${i}</td>
                <td class="text-center">${books[i].bookName}</td>
                <td class="text-center"><button type="button" onclick="visitUrl(${i})" class="btn btn-success"><i class="fas fa-eye me-1"></i> visit</button></td>
                <td class="text-center"><button type="button" onclick="deleteBook(${i})" class="btn btn-danger"><i class="fas fa-trash-alt"></i> Delete</button></td>
              </tr>`
  }

  document.getElementById('tableBody').innerHTML = temp;
}