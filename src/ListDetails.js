import { useParams,  useLocation } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from 'react';
import {handleDelete} from "./handleDelete";

const ListDetails = () => {
    const { title, listId } = useParams();
    const { data: list, error, isPending } = useFetch(`http://localhost:8001/lists/${listId}`);
   

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteButtonClick = async (bookId) => {
      try {
         await handleDelete(bookId, list, listId);
        window.location.reload();
      } catch (error) {
        console.error('could not delete book');
      }
     };
      
      

    return (
        <div className="list-details">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {list && (
          <article>
            <h2>{title}</h2>
            
            {list.books && list.books.length > 0 ? (
                list.books.map((book) => (
                    <div className="book-preview" key={book.id}>
                        <Link
                            to={{
                                pathname: `/lists/${list.title}/${listId}/books/${book.id}`,
                                state: { book, listId, title:list.title, list }
                            }}
                        >
                            <h2>{book.title}</h2>
                        </Link>
                        <div className="book-container"> 
                        <img src={book.image} alt={book.title} />  
                        <p className="book-description">{book.description.substring(0, 100)}...</p>
                      </div>
                        <button onClick={() => handleDeleteButtonClick(book.id)} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>


                    </div>
                    
                    
                ))
            ) : (
                <div>No books added yet.</div>
            )}
          </article>

        )}

        <Link
            to={{
                pathname: '/new-book',
                state: { listId: listId }  
            }}
        >   
            <button>Add Book</button>
        </Link>
      </div>
    );
}
 
export default ListDetails;