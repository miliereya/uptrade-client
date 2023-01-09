# Full-stack todolist

In this project I used React + Redux as a root for the frontend and react-dnd library for the drag and drop mechanic for the tasks. For mobiles I made "custom arrows" which allows you to move tasks directly to the chosen column. Also I used JWT authorization as a security for the users. Backend was made on Express js and as a database I used Mongo DB.

Warning! Sometimes heroku apps don't upload immediatly, so you'll need to reload the page

Deployed - https://uptrade-to-do-list.herokuapp.com

Server - https://github.com/miliereya/uptrade-server

 
# #Note

This project was made in 3 days

# Realized Features

User:

  - JWT Authorization
  - Registration

Search:

  - By title
  - By num
	
Tasks:

  - Mobile verison of drag and drop
  - Development time
  - Expiration date
  - Subtasks
  - Cascade comments

Column:

  - Column filter
  - Paggination
	
# Features to do

Tasks:

  - Work with files
	
Project:

  - Work with files

# Bugs

  - Can't create project after registration, can't get storaged access token (now working with reloading page after registration)
