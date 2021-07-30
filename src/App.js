import React, {useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useStateValue } from './StateProvider';
function App() {
  // const [user, setUser] = useState(null);
  const [ {user}, dispatch ] = useStateValue();
  return (
    
    // BEM naming convention
    <div className="app">
      
      {!user ? (
        <Login />
      ) : (<div className="app_body">
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/rooms/:roomId">
            <Chat />
          </Route>
          <Route path="/">
            <Chat />
          </Route>
        </Switch>
      </Router>
      </div>
      )
      }
      

        {/* Chat */}
      
    </div>
  );
}

export default App;
