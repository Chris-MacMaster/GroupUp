import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GroupsIndex from "./components/Groups/GroupsIndex";
import GroupDetail from "./components/Groups/GroupDetail";
import CreateGroupForm from "./components/Forms/CreateGroupForm";
import EditGroupForm from "./components/Forms/EditGroupForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>


          <Route path="/" exact={true} >
            <GroupsIndex />
          </Route>
          
          <Route path="/group-details/:groupId" exact={true} >
            <GroupDetail />
          </Route>

          <Route path='/forms/create-group/:groupId' exact={true} >
            <CreateGroupForm />
          </Route>

          <Route path='/forms/edit-group/:groupId' exact={true} >
            <EditGroupForm />
          </Route>



          <Route path="/">
            <p >
              Oops! We can't find anything at
              this url. Click the top left icon to navigate
              back to home.
            </p>
          </Route>


        </Switch>
      )}
    </>
  );
}

export default App;
