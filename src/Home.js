import useFetch from "./useFetch";
import BookList from "./BookList";

const Home = () => {
    const {data:lists, isPending, error} = useFetch('http://localhost:8001/lists');

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { lists && lists.length > 0 ? (<BookList lists={lists} /> ) : 
      (<div>No lists to display.</div>)}
    </div>
  );
}
 
export default Home;
