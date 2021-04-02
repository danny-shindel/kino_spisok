<img src="https://i.imgur.com/XknR10L.png" width="100%">&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;BY: DANIEL SHINDEL

&nbsp;&nbsp;&nbsp;&nbsp;``General Assembly Cohort SEIR-02-22-21 Project 2``

## Project Description

- Project Requirements
    - Build a full-stack Node/Express/MongoDB web app from the ground up. App must have atleast 2 data resources in addition to the "User" Model. App must use OAuth authentication. Implement basic authorization for "CUD" data operations. The app must have full "CRUD" data operations. App must be styled and deploted online through Heroku.
- Execution
    - My application is based on the idea of a prospective movie watch list. Users can login through OAuth and begin searching and adding movies to their watch list. Once users watch a movie on their list they can move that movie to their "seen" list and give it a rating. Both users and non-users have access to the home page, which shows the top 5 movies featured on the most user lists, but only users and comment on those top 5 movies. 

## Screenshots
<img  src="https://i.imgur.com/LapcrQz.png" width="450vmin">

> Home Screen: The 5 movies on the home screen are the top 5 saved movies by user of Kino Spisok. Hovering over the movie poster reveals how many "spiske" or lists, they are saved to. All movies IMDB page is linked in any view with the "IMDB" link.

<img  src="https://i.imgur.com/rVgM14u.png" width="450vmin">

> Commenting: Commenting is only avalible to users and only on the top 5 movie home screen. By clicking the "comment" button, the input and comments drop down. User can delete their own comments, but hovering over their avatar and clicking the red "x" for that comment. You can also add movies, you dont already have saved, from the top 5.

<img  src="https://i.imgur.com/IN7nKeU.png" width="450vmin">

> Watch List: Movies in your watch list are listed in alphabetical order by director. They provide a link to move that movie to your "seen" list, that movie's IMDB page link, and a delete link.

<img  src="https://i.imgur.com/qDJjh7Z.png" width="450vmin">

> Seen Link: Your "seen" list movies are deliniated by their blue outline. Hovering over a "seen" movie's poster shows the rating a user gave it. That rating can be updated by just clicking on the desired star rating. The "unsee" link will move a movie back into a user's watch list. 

## Technologies Used

- HTML
- CSS
- JavaScript
- Node
- Express
- MongoDB

## Link to Application and Trello Board


[Kino Spisok](https://kinospisok.herokuapp.com/)

[Trello Board](https://trello.com/b/Jo64MYwg/project-2)


## Planned Future Enhancements
``04.01.21``

- Full Mobile Compatibility
    - In its current state the app is able to be used on a mobile browser, however, the interface is not full adjusted for mobile browser use.
- User Data Functionality
    - Similar to the front page, which shows the top 5 most saved movies, I'd like to implement other user data based function to the app like a top 5 "seen" movies pages based on user reviews.
- User to User Functionality
    - Implementing some kind of functionality that allows user to interact with other users movies list to share movie suggestions.
- User List Variety and Search
    - Functionality for a user to search their watch list based on movie title or director. Different list style so user can choose between more or less info per movie.

