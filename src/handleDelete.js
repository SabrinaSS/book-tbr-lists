export const handleDelete = async (bookId, list, listId) => {
    try {
      const updatedList = {
        ...list,
        books: list.books.filter(book => book.id !== bookId)
      };
  
      await fetch(`http://localhost:8001/lists/${listId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedList),
      });
  
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error; 
    }
  };
  