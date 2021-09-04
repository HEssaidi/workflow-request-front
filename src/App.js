import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './pages/LogIn'
import Request from './pages/Request'
import DGRouteRequest from './pages/DGRouteRequest';
import DAFRouteRequest from './pages/DAFRouteRequest';
import AGRouteRequest from './pages/AGRouteRequest';
import History from './pages/History';
import EditorContainer from './components/EditorContainer';
import DraftJS from './components/EditorUpdate';
import Home from './components/Home';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/login' component={LogIn} />
          <Route path='/request' component={Request} />
          <Route path='/requestList' component={DGRouteRequest} />  
          <Route path='/listRequest' component={DAFRouteRequest} /> 
          <Route path='/myRequests' component={AGRouteRequest} /> 
          <Route path='/taskHistory' component={History} /> 
          <Route path='/editor' component={EditorContainer} /> 
          <Route path='/editorUpdate' component={DraftJS} /> 
          <Route path='/' component={Home} /> 
        </Switch>
      </Router>
    </>
  );
}

export default App;
