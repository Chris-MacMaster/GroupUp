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
import CurrentInterestIndex from "./components/Interests/CurrentInterestIndex";
import EditEventForm from "./components/Forms/EditEventForm";
import EventDetail from "./components/Events/EventDetail";
import Footer from "./components/Footer/Footer";
// import CurrentInterestIndex from "./components/Interests/CurrentInterestIndex";
import Landing from "./components/Landing/Landing";
import OwLanding from "./components/Landing/OwLanding";
import UserLanding from "./components/Landing/UserLanding";
import LoggedOut from "./components/Landing/LoggedOut";
import GroupUp from "./components/Landing/GroupUp";
import CurrentGroupsMesage from "./components/Groups/CurrentGroupsMessage";
import CurrentEventsMessage from "./components/Groups/CurrentEventsMessage";
import SearchResults from "./components/SearchBar/SearchResults";

import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentInterestMessage from "./components/Interests/CurrentInterestMessage";


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
            <GroupUp />
            <LoggedOut />
            <UserLanding />
            <GroupsIndex />
            <EventsIndex />
            <Landing />
            {/* test and insert here */}
            {/* <OwLanding /> */}
            <Footer />
          </Route>

          <Route path="/user-groups" exact={true} >
            <GroupUp subtitle="User Groups" />
            <CurrentGroupsMesage />
            <CurrentGroupsIndex />
          </Route>

          <Route path="/user-events" exact={true} >
            <GroupUp subtitle="User Events" />
            <CurrentEventsMessage />
            <CurrentEventsIndex />
          </Route>

          <Route path="/user-details" exact={true} >
            <GroupUp subtitle="User Details" />
            <CurrentGroupsMesage />
            <CurrentGroupsIndex />
            <CurrentEventsMessage />
            <CurrentEventsIndex />
            <CurrentInterestMessage />
            <CurrentInterestIndex />
            {/* Can implement after search and suggested groups are coded in*/}
            {/* <CurrentInterestIndex /> */}
          </Route>

          
          <Route path="/group-details/:groupId" exact={true} >
            <GroupUp subtitle="Group Details" />
            <GroupDetail />
          </Route>

          <Route path="/event-details/:eventId" exact={true} >
            <GroupUp subtitle="Event Details" />
            <EventDetail />
          </Route>

          <Route path="/search/:parameters" exact={true} >
            <GroupUp subtitle="Search Results" />
            <SearchResults />
          </Route>


          <Route path='/forms/create-group' exact={true} >
            <GroupUp subtitle="Create a Group"/>
            <CreateGroupForm />
          </Route>

          <Route path='/forms/create-event/:groupId' >
            <GroupUp subtitle="Create an Event"/>
            <CreateEventForm />
          </Route>

          <Route path='/forms/edit-group/:groupId' exact={true} >
            <GroupUp subtitle="Edit Group"/>
            <EditGroupForm />
          </Route>


          <Route path='/forms/edit-event/:eventId' exact={true} >
            <GroupUp subtitle="Edit Event"/>
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
