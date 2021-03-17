import './App.css';
import NewsArticle from './components/newsArticle';
import Login from './components/login';
import Blog from './components/blog';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import {Provider} from "react-redux";
import { createStore } from 'redux';


function reducer(state = {user:[]}, action){


  switch(action.type){
    case "REGISTERED" :{
      return {
        user : [...state.user, action.user] 
      
      }

    }
    default:
      return state;
      
  }


}

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <Router history={useHistory}>
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/blog" component={Blog}></Route>
          <Route exact path="/news" component={NewsArticle}></Route>
        </Switch>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
