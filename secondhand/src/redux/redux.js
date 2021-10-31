import { useDispatch } from 'react-redux';
import { signIn, signOut } from '../actions/LoginActions.js';
import {LoggedSelector} from '../reducers/LoginReducer'

function Redux() {
   
    const isLogged = LoggedSelector();
    const dispatch = useDispatch();

    return (
      <div>
        {isLogged ? <h1>You are logged in!</h1> : <h1>You are logged out!</h1>}
        <button className="btn btn-primary" onClick={() => dispatch(signIn())}>Login</button>
        <button className="btn btn-primary" onClick={() => dispatch(signOut())}>Log out</button>
      </div>
    )
  }

export default Redux;