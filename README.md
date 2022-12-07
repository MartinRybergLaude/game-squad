# GameSquad
The app is used by groups to browse and decide upon which games to play together. Depending on the size and interests of the group, different games with different multiplayer modes are suggested. Members of the group are able to add games to a list of "possible games". The members can then choose and vote between the games to decide on one to play together.

## What we have done
We have created a general layout and a few pages, so far with limited functionality. We have data from an API call showing in our dashboard. Users can also log in to the service, complete with an email verification system.

## What we will do next
We will work on improving the pages to add functionality to them, especially core functionality of the app like game search and voting systems.

## Project file structure
We use the Model-View-Presenter pattern so all components and pages have a presenter and a view. Pages are top level components directly bound to the router, and have their own directory to visualize this. Components contain all other types of components. Config files used in production and state stores reside in the src folder along with all other code folders and assets. Environment configs reside in the root folder.

### Assets
The assets used that are not otherwise downloaded from a database, like images and logos.

### Components
Components used for pages:
gameCard: Information about one game
gameCollection: a collection of games
loaderScreen: loading screen while loading
requireAuth: component that reroutes to /login if the user is not logged in
resetPassword: component that allows a user to change their password
search: pop-up that allows the user to search for games
sidebar: sidebar with options for seeing the different squads a user is part of, finding settings, and logging out.
settings: settings option in the sidebar that opens up a model in the dashboard. Will add functionality for changing password, name, removing account, change theme, etc

### Pages
Presenters and views for different pages of the website:
Auth: Presenter for any email-triggered authentication mechanisms
Dashboard: Shows the sidebar and game collection
Login: Login-in page
NotFound: 404 error, shown when page doesn’t exist
Register: A page for users to register an account
RequestResetPassword: When the user needs to reset their password
Verification: Sends a verification email when creating new user

### api
A collection of fetch calls for certain data to be used with Tanstack Query in components.

### App
The application.

### FirebaseConfig
Configuration with firebase.

### Main
Main file. Calls the app

### Store, Types, & Vite-Env
Not used at the moment.
