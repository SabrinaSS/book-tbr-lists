import { Link} from "react-router-dom/cjs/react-router-dom.min";


const BookList = ({lists}) => {
    

    const handleDelete = (listId) => {
        fetch('http://localhost:8001/lists/'+listId, {
          method: 'DELETE'
        }).then(() => {
          window.location.reload();
        })
      }

    return (
        
        <div className="book-list">
            <h2>All Lists!</h2>
            {lists.map((list) => (
                
                <div className="book-preview" key={list.id}> 
                 <Link to={`/lists/${list.title}/${list.id}`}>
                 <h2>{ list.title }</h2>
                 <p>Created by: { list.creator }</p>
                 {list.description && <p>Description: {list.description} </p> }
                </Link>
                <button onClick={() => handleDelete(list.id)}>delete</button>
                </div>
            ))}
        </div>
      );
}
 
export default BookList;