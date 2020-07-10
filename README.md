# Eitri-Site-Journal

## Summary 

This is an app for Eitry Foundry, a solar developer and EPC (Engineering, Procurement and Construction) company. The purpose of the app is to help keep track of reports and photographs taken at each project site. This is to help facilitate this task with our construction manager, who has been, thus far, leaving the photographs in a Dropbox folder for colleagues in the office (away from the job site) to sort through.

Currently, the format is very simple. A user account must be created to use the app, but anyone can view your projects or entries with the right URL. A logged in user can create, edit or delete their own projects. They can also create, edit or delete their own entries. While on an entry, the logged in user can add or delete pictures, which are actually stored via the Imgur API. They can also optionally add their own URL for an image hosted elsewhere.

[Deployed Link](https://eitri-site-journal.surge.sh)

[API Link](https://eitri-site-journal.herokuapp.com/api/)

## Tech Stack 

This app was built using the MERN stack: MongoDB, Express, React, Nodejs. The production backend is a RESTful API which uses Express as a server and a database on Mongo Atlas. In development, the Mongo database is run on the user's computer and the Express server is run on localhost:3000. The signin/signup system uses Bcrypt and JsonWebToken, and currently is written to return a JWT upon successful login. Future expansion would implement a package or tool to further streamline logins.

The frontend is built using React, Axios and React-Router-Dom. Since this is a REST application, the frontend is built using the names of the relevant routes and only needs to send relevant information in the URL or body of the http requests. Please see the section on backend for the available routes.

## Backend Routes 

* GET '/' - root, returns a string
* Routes for User Data
  * POST '/signup' - send username and password in body, get jwt in response if valid 
  * POST '/signin' - send username and password in body, get jwt in response if valid 
  * GET '/verifyuser' - send request with jwt in header with Authorization/Bearer, get username and user._id if valid 
* Routes for Projects 
  * GET '/users/:id' - returns all projects made by a user defined by id 
  * GET '/projects/:id' - returns project info for a project defined by id 
  * POST '/projects' - sends project key/value pairs in body, creates a project and sends back JSON if valid 
  * PUT '/projects/:id' - sends project key/value pairs in body, edits project defined by id and sends back JSON if valid 
  * DELETE '/projects/:id' - deletes project defined by id and sends back success message if valid 
* Routes for Entries 
  * GET '/projects/:id/entries' - returns all entries associated with a project defined by id 
  * GET '/entries/:id' - returns entry info for an entry defined by id 
  * POST '/entries' - sends entry key/value pairs in body, creates a entry and sends back JSON if valid 
  * PUT '/entries/:id' - sends entry key/value pairs in body, edits entry defined by id and sends back JSON if valid 
  * DELETE '/entries/:id' - deletes entry defined by id and sends back success message if valid 
* Routes for Images 
  * PUT '/entries/:id/image' - sends image url in body, this url is added to the array of image urls in the entry defined by id 
  * DELETE '/entries/:id/image/:imgInd' - delete image url of index imgInd within the entry defined by id 
  * POST '/imgur/upload' - send base64 and other image data in body, the Express server sends a request to imgur API and creates a new image upload on imgur, then returns the link of the uploaded image in the response 

## Frontend Component Tree 

Note: This is not the folder structure of the React files, but the parent/child relationships of the different components. It was easiest to have all main components be a child of App.js so they could be routed to directly. Only the ViewEntry component has major child components: AddImage and ToggleSwitch.

```
index.js
  |-- App.js
      |-- /Nav/index.js
      |-- Signup.jsx
      |-- Signin.jsx
      |-- /Project/index.js
      |-- ViewProject.jsx
      |-- AddProject.jsx
      |-- EditProject.jsx
      |-- ViewEntry.jsx
          |-- AddImage.jsx
          |-- ToggleSwitch.jsx
      |-- AddEntry.jsx
      |-- EditEntry.jsx
     
```

