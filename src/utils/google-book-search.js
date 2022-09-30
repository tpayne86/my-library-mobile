var API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export default function searchBook(isbn, callback) {
  fetch(`${API_BASE_URL}?q=${isbn}`).then(res => {
    res.json().then(json => {
      callback(json.items[0].volumeInfo);
    });
  });
}
