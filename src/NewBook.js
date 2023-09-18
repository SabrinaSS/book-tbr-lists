import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import useFetch from './useFetch';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewBook() {
    const history = useHistory();
    const location = useLocation();
    const listId = location.state.listId;
    const { data: list } = useFetch('http://localhost:8001/lists/' + listId);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState({});
    
    const apiKey = ['REACT_APP_API_KEY'];


    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
            );

            const data = await response.json();
            console.log(data);
            setSearchResults(data.items || []);

        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleCheckboxChange = (bookId) => {
        setSelectedBooks((prevSelectedBooks) => {
            const updatedSelectedBooks = {
                ...prevSelectedBooks,
                [bookId]: !prevSelectedBooks[bookId]
            };
            console.log('Updated selectedBooks:', updatedSelectedBooks);
            return updatedSelectedBooks;
        });
    };
    

    const handleAdd = async () => {
    const selectedBookIds = Object.keys(selectedBooks).filter(
      (bookId) => selectedBooks[bookId]
    );
  
    const newBooks = selectedBookIds
      .filter((bookId) => !list.books.some((book) => book.id === bookId))
      .map((bookId) => {
        const selectedBook = searchResults.find((item) => item.id === bookId);
  
        return {
          id: selectedBook.id,
          title: selectedBook.volumeInfo.title,
          author: selectedBook.volumeInfo.authors.join(', '),
          publishedDate: selectedBook.volumeInfo.publishedDate,
          description: selectedBook.volumeInfo.description,
          categories: selectedBook.volumeInfo.categories,
          image: selectedBook.volumeInfo.imageLinks.thumbnail,
        };
      });
  
    if (newBooks.length === 0) {
      toast.error('No new books to add.');
      history.push(`/lists/${list.title}/${listId}`);
      return;
    }
    

    const isDuplicate = selectedBookIds.some((selectedBookId) =>
        list.books.some((book) => book.id === selectedBookId)
    );

    if (isDuplicate) {
        console.log("Duplicate books found.");
        toast.error('One or more books were duplicates and were not added.');
    }
    
    
    const updatedList = {
      ...list,
      books: [...list.books, ...newBooks],
    };
  
    try {
      const response = await fetch(`http://localhost:8001/lists/${listId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedList),
      });
  
      if (response.ok) {
        toast.success('Books added successfully.');
        history.push(`/lists/${list.title}/${listId}`);
      } else {
        toast.error('Failed to update the list.');
        history.push(`/lists/${list.title}/${listId}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the list.');
      history.push(`/lists/${list.title}/${listId}`);
    }
  };
  
    

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            
            <ul className="search-results">
                {searchResults.map((item) => (
                    <li key={item.id}>
                        <label>
                            <input 
                                type="checkbox" 
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                        </label>
                        <img
                            src={item.volumeInfo.imageLinks?.thumbnail || ''}
                            alt={item.volumeInfo.title}
                        />
                        <span>{item.volumeInfo.title}</span>
                    </li>
                ))}
            </ul>

            {searchResults.length > 0 && <button onClick={handleAdd}>Add Books to List</button>}
        </div>
    );
}

export default NewBook;
