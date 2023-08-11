# [GroupUp](https://groupup-project.onrender.com/) - About
GroupUp is a social media website that functions similar to meetup, but designed specifically for Overwatch players looking to make connections both in game and in real life. Users can search and browse a selection of groups and events, as well as make profiles in order to make and join groups/events. 
To get started, new users can click on the icon in the top right of their screen and sign up for free, then utilize the drop down menu in the top right by clicking on the icon again. The drop down menu provides a general roadmap for how to navigate and use the site, although many groups and events are both clickable and contain buttons to help users execute more specific tasks such as joining groups.

# To Run Locally:
* Open two terminal windows, one for the flask backend, one for the react frontend.
* In the backend terminal, cd into the directory "CAP" and run "pipenv run flask run" to start flask.
* In the frontend terminal, navigate to the "react-app" directory and run "npm start" to start react.

### Optional: Make changes 
* Open a third terminal and cd into "CAP". Then run git commands as normal, making changes to the code and then pushing to github from the appropriate branch.

### Reminder: Common Git Commands To Utilize
* git status: checks the branch and status of your commits 
* git checkout [branch name] and git -b checkout [new branch name]: navigate to new existing branch or navigate to a new branch 
* git add .: add changes
* git commit -m "[name of commit]": commit changes
* git push: push committed change to github. If you're on a new branch that hasn't pushed to github yet, push, then copy and enter the modified push command git gives you so you * can simply use git push from then on.

# To Shut Down Locally:
* ctrl + c in both the backend and frontend terminals

# Resetting the Database
* Delete dev.db, located in the instance folder.
* While in the "CAP" directory, run the following commands:

* flask db init: sets up a migrations directory where the migration scripts will be stored (not techincally neccessary if resetting db instead of making it for first time, but will show prompt informing you you've already initialized db)
* flask db migrate: generates the new updated migrations scripts
* flask db upgrade: runs the migrations to update database schema
* flask seed all: runs the seeders to populate the database

### :hammer_and_wrench: Utilized Tech :
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" title="Python" alt="Python" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="React" alt="React" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" title="Postgresql" alt="Postgresql" width="50" height="50"/>&nbsp;
</div>

# User Stories
 * See UserStories.md or wiki

# Schema
* [Here](https://dbdiagram.io/d/643e24406b31947051c3b277) or see GroupUp-Schema.png
* Note: Interests/Categories/Themes feature incoming, will allow users to select their interests, then be shown recommended groups/events that have matching categories and themes.
* The Specific Interests/Categories/Themes are all the same, interests simply apply to users, categories apply to groups, and themes apply to events.
Examples: Casual, Competitive, Support, DPS, Tank, etc.

# Wireframes
 * See Chris-MacMaster-Wireframe-GroupUp.pdf 

# Target Websites
 * [Meetup](https://www.meetup.com/)
 * (Visual Design) [Blizzard](https://overwatch.blizzard.com/en-us/)

# Core Features
 * See CoreFeatures.md or wiki
