import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Home from './Home';
import NotFound from './NotFound';
import ListDetails from './ListDetails';
import BookDetails from './BookDetails';
import Create from './Create';
import NewBook from './NewBook';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar />
    <div className="content">
       <Switch>
       
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/create">
          <Create />
        </Route>
        
        <Route exact path="/lists/:title/:listId">
          <ListDetails />
        </Route>

        <Route path="/lists/:title/:listId/books/:bookId">
          <BookDetails />
        </Route>        

        <Route path="/new-book">
          <NewBook />
        </Route>

        <Route  path="*">
          <NotFound />
        </Route>
        
       </Switch>
       <ToastContainer />
    </div>
    
  </div>
  </Router>
  
  
  );
}

export default App;
