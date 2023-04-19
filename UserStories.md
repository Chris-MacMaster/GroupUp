# GroupUp


User Stories


Sign Up

* As an unregisterd and unauthorized user, I want to be able to sign up for the website via form.

 - When on the signup modal
  * I would like to be able to enter email, username, and password via form
  * I would like the website to notify me whether the submission is successful or if my form input has errros.

 - When I enter invalid data on the form:
  * I would like the website to inform me of the validations I failed to pass and repopulate the form with my valid entries (not including password)


Log in
* As a registered and unauthorized user, I want to be able to log in to the website via a log-in modal.

 - When on the login page
  * I would like to be able to enter my email and passord on a clearly laid out form.
  * I would like the website to log me in when the form submission is complete and valid

 - When I enter invalid data on the form:
  * I would like the website to inform me of the validations I failed to pass and repopulate the form with my valid entries (not including password)


Demo User
* As an unregistered and unauthorized user, I would like a button on both the signup and login pages to allow me to visit the site as a guest without signing up or logging in

 - When I'm on either the signup or login pages
  * I can click on a Demo User button to logme in and allow me access as a normal user


Log Out 
* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
 
 - On all pages:
  * I can log out of my account and be redirected to a page displaying groups and events.


GroupUp
-Overwatch Themed Meetup


1)Groups
Create Groups
* As a logged in user, I can post new groups.
 - When on the "/forms/new-group/[1-x]" page(s)
  * I can describe and submit a new group via a single form presented over a few pages.

Viewing Groups
* As a logged out user, I can view a selection of groups.
 - When on the homepage:
  * I can view the currently active groups grouped by interest/category.

* As a logged in user, I can view a selection of suggested groups, as well as my own groups.
 - When I'm on the homepage: 
  * I can view a list of suggested groups based on my category/interest.
 - When I'm on the "/my-groups" page:
  * I can view a list of groups I'm enrolled in.

* As a logged in or logged out user, I can click on a group tile to view its associated details.

Updating Groups:
* As a logged in user, I can edit my group details and theme (if I'm the user who created the group).
 - When on the "/forms/edit-group/[1-x]" page(s):
  * I can edit a group via a pre-populated edit form presented over a few web pages.
 - When on the "/my-groups" page:
  * I can click on an "edit" button on a group tile to edit it.

Delete Groups:
* As a logged in user, I can delete my membership in groups by clicking a "leave" button associated with the group.
 - When I'm on the "/my-groups" page:
  * I can click on "delete" button on a group tile to delete it.


2)Events 
Create Events 
* As a logged in user and member of an group, I can post new events hosted by the group.
 - When I'm on the "/forms/new-event/[1-x]" page(s):
  * I can describe and submit a new group via a single form presented over a few pages.

Viewing Events
* As a logged out user, I can view a selection of groups.
 - When on the homepage:
  * I can view a selection of upcoming events.

* As a logged in user, I can view a selection of suggested upcoming events, as well as my own events.
 - When on the homepage:
  * I can view a list of suggested events based on my category/interest.
 - When on the "/my-events" page:
  * I can view a list of events I've signed up for.

* As a logged in or logged out user, I can click on an event tile to view its associated details.

Updating Events
* As a logged in user and group member, I can update an event's details.
 - When on the "/forms/edit-event/[1-x]" page(s):
  * I can edit an event via a pre-populated edit form presented over a few web pages.
 - When on the "my-events" page:
  * I can click on "edit" button on an event tile to edit it.

Delete Events:
* As a logged in user and group member, I can delete a hosted event by
clicking on a "delete" button associated with the event.
 - When I'm on the "/my-events" page:
  * I can click on "delete" button on an event tile to delete it.

