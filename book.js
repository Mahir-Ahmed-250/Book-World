// Spiner & Book Result Handeler
const spineerHandler = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const searchResultHandler = displayStyle => {
    document.getElementById('book-result').style.display = displayStyle;
}
// Search Handeler
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    spineerHandler('block');
    searchResultHandler('none');
    searchField.value = "";
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data));

}
// Display Search Result Handeler
const displaySearchResult = (bookData) => {
    const totalBook = bookData.docs.length;
    if (totalBook === 0) {
        document.getElementById("error").style.display = "block";
    }
    else {
        document.getElementById("error").style.display = "none";
    }
    const totalBooks = `${bookData.numFound}`;
    const totalResult = document.getElementById('total-result');
    totalResult.innerText = "";
    totalResult.innerText = `Search Result: ${totalBooks} Books`;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = "";
    bookData.docs.slice(0, 30).forEach(book => {
        const div = document.createElement('div');
        div.innerHTML = `           
        <div class="card h-100 all-cards">
        <img src=https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : '10909258'}-M.jpg class="card-img-top" alt="..." />
        <div class="card-body">
        <h5 class="card-title"><span>Book Name:</span> ${book.title ? book.title : 'Name Not Found'}</h5>
        <h5 class="card-title"><span>Author:</span> ${book.author_name ? book.author_name : 'Name Not Found'}</h5>
          <h5 class="card-text"><span>Publisher:</span> ${book.publisher ? book.publisher : 'Not Found'}</h5>
          <h5 class="card-text"><span>Publishing Year:</span> ${book.first_publish_year ? book.first_publish_year : 'Not Found'}</h5>
        </div>        
`;
        searchResult.appendChild(div);
    });
    spineerHandler('none');
    searchResultHandler('block');
};
