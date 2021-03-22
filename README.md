# My_Blog_Site

My Blog Site

## Description

This repository is a blog app that allows multiple users to access the site and upload their blog posts. The home page has a feed of all posts in the database and a stream of the latest news from NewsAPI. If a user is not logged in this is the only screen they will be able to see. All buttons on the navbar will redirect users to login.

If a user does not have a login they may signup by clicking the signup link on the login page, or if they have forgotten their password there is a page for that as well. By default the user's name and photo are set to anonymous. Once signed up and logged in the user can change their name and photo.

Once logged in the user can click the add post button to create their first blog post. After creating one or more posts the user will be able to view only their posts in their workspace by clicking on the my posts tab in the navbar.

When clicking on individual posts the user can view a single blog post. If the user owns the blog post a button to update and/or delete the post will appear at the bottom of the post.

This site is currently live at: http://justablogblog.com

## Getting Started

Clone down the repo and save inside a local folder. Open the repo in your code editor.

### Dependencies

* Ensure you have the latest version of node.

### Installing

* Install dependencies.
```
npm install
```

### Executing program
*There are several environmental variables used in order to access firebase and the mongodb user will have to create their own keys in order to have full functionality
The keys required:

REACT_APP_FIREBASE_API_KEY=

REACT_APP_FIREBASE_AUTH_DOMAIN=

REACT_APP_FIREBASE_PROJECT_ID=

REACT_APP_FIREBASE_STORAGE_BUCKET=

REACT_APP_FIREBASE_MESSAGING_SENDER_ID=

REACT_APP_FIREBASE_APP_ID=

MONGO_DB_USER=

MONGO_DB_PASSWORD=

MONGO_DB=

NEWS_API_KEY=


* Open a terminal window and connect to server and database.
```
npm start
```
* Open another terminal window and run webpack and build bundle.js.
```
npm run build
```

## Help

Contact author below:

## Authors

Kevin Olson
kevin.m.olson11@gmail.com
