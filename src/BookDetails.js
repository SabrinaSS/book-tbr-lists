import { useLocation, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {handleDelete} from "./handleDelete";

const BookDetails = () => {
  const location = useLocation();
  const history = useHistory();
  const book = location.state.book;
  const id = location.state.listId;
  const title = location.state.title;
  const list = location.state.list;

const handleDeleteButtonClick = async (bookId) => {
  try {
    await handleDelete(bookId, list, id);
    history.push(`/lists/${title}/${id}`);
  } catch (error) {
    // Handle error, show error message, etc.
  }
};


  if (!location || !book) {
    return <div>No book data available.</div>;
  }

  return (
    <div className="book-details">
      <article>
        <h2>{book.title} </h2>
        <p>Written by {book.author}</p>
        <img src={book.image} alt={book.title} /> 
        <div>{book.description}</div>
        <button onClick={() => handleDeleteButtonClick(book.id)}>delete</button>
        <div>
          <Link to={`/lists/${title}/${id}/`}>Back to List</Link>
        </div>
        
      </article>
    </div>
  );
};

export default BookDetails;
