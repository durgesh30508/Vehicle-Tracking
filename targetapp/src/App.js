// import logo from './logo.svg';
// import './App.css';

// function App() {
//   state = {

//   }
//   return (
//     <div className="App">
//     <button >Start Sending Location</button>  
//     </div>
//   );
// }

// export default App;
import React from 'react';
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Mainpage from './Components/Mainpage/mainpage'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path='/' component={Mainpage} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}


export default App;
