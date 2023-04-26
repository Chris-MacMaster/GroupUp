import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GroupsIndex from "./components/Groups/GroupsIndex";
import CurrentGroupsIndex from "./components/Groups/CurrentGroupsIndex";
import GroupDetail from "./components/Groups/GroupDetail";
import CreateGroupForm from "./components/Forms/CreateGroupForm";
import CreateEventForm from "./components/Forms/CreateEventForm";
import EditGroupForm from "./components/Forms/EditGroupForm";
import EventsIndex from "./components/Events/EventsIndex";
import CurrentEventsIndex from "./components/Events/CurrentEventsIndex";
import EditEventForm from "./components/Forms/EditEventForm";
import EventDetail from "./components/Events/EventDetail";
import Footer from "./components/Footer/Footer";
import CurrentInterestIndex from "./components/Interests/CurrentInterestIndex";
import Landing from "./components/Landing/Landing";


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
            <EventsIndex />
            <Landing />
            <Footer />
          </Route>

          <Route path="/user-groups" exact={true} >
            <CurrentGroupsIndex />
          </Route>

          <Route path="/user-events" exact={true} >
            <CurrentEventsIndex />
          </Route>

          <Route path="/user-details" exact={true} >
            <CurrentGroupsIndex />
            <CurrentEventsIndex />
            <CurrentInterestIndex />
          </Route>

          
          <Route path="/group-details/:groupId" exact={true} >
            <GroupDetail />
          </Route>

          <Route path="/event-details/:eventId" exact={true} >
            <EventDetail />
          </Route>

          <Route path='/forms/create-group' exact={true} >
            <CreateGroupForm />
          </Route>

          <Route path='/forms/create-event/:groupId' >
            <CreateEventForm />
          </Route>

          <Route path='/forms/edit-group/:groupId' exact={true} >
            <EditGroupForm />
          </Route>


          <Route path='/forms/edit-event/:eventId' exact={true} >
            <EditEventForm />
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
