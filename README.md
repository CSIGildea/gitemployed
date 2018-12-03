# GitEmployed
Predict how many stars a github user should have based on the langauge they code in, the size of their repos, the quantity of followers and the quantity they are following.

Stars aren't going to be totally accurate, this isn't trying to enforce that.

It is an example of a metric that can be used to rank a set of people applying for a job, so that maybe if two people are of equal academic background, you would select the one who performs the best in comparison to the rest of the github community, rather than the one github non-active potential hire.

- I do plan on hosting this soon, but with Christmas Exams and other matters before Christmas, it will probably be after Christmas when it gets deployed.

<p align="center">
  <img src="https://raw.githubusercontent.com/CSIGildea/gitemployed/master/pictures/homepage.png?token=AYSfNTMqSDcp4_3NYDZEwkiBYId0kbrQks5cDgiswA%3D%3D"/>
 Homepage
  <img src="https://raw.githubusercontent.com/CSIGildea/gitemployed/master/pictures/myprofile.png?token=AYSfNQVpduUkyews8RZ8jJEP1mHLaSnpks5cDgkowA%3D%3D"/>
  My Profile (note - no reload times due to it being an SPA :D)
  <img src="https://raw.githubusercontent.com/CSIGildea/gitemployed/master/pictures/badprofile.png?token=AYSfNaOKDaX80NjKh-zX04BEYKfkXXc6ks5cDgk6wA%3D%3D"/>
  A random profile who performed badly
  <img src="https://raw.githubusercontent.com/CSIGildea/gitemployed/master/pictures/modelpredictions.png?token=AYSfNYQq41v1mRfF3yxQvoGi5f2Y5GIYks5cDglcwA%3D%3D"/>
  Some Sample Predictions the Model Returned
  <img src="https://raw.githubusercontent.com/CSIGildea/gitemployed/master/pictures/api.png?token=AYSfNVkFnmJD5r3oyMlmSovmi2G6lOUdks5cDgnLwA%3D%3D"/>
  API that serves the React Frontend
    <img src="https://raw.githubusercontent.com/CSIGildea/gitemployed/master/pictures/Screenshot%20from%202018-12-03%2007-13-37.png"/>
  Fetch Request in Process - SPA in Action
 <img src="https://raw.githubusercontent.com/CSIGildea/gitemployed/master/pictures/followers.png"/>
  Also has clickable links to all your followers and who you are following (up to 100) so you can go through your followers/who you are following easily and see how popular their code is.
    <img src="https://raw.githubusercontent.com/CSIGildea/gitemployed/master/pictures/about.png?token=AYSfNXge5DE_SYN-ncOd86JYDwAQNe4Eks5cDgn7wA%3D%3D"/>
  About Page
</p>

# Overall Opinions
- Got to learn a lot more about React.
- Built my first SPA(SPA is very slick).
- Happy to get to do some Machine Learning with Tensorflow (even just a multiple variable linear regression model) at college.
- Happy the models actually turned out fairly realistical.
- Had to experience being at the mercy of github's api limits. Please read my about section in the above screenshot to see how I tried to repesent 31+ million repos, with a 1000 search results cap. I ended up having to totally ignore other github libraries and instead opt for specific requests that gave me greater control and were easier to use. 

- I also used inferential statistics for getting the sample of repositories for each language and also took into account appropriate star distribution. All this helped the quickly trained linear regression model become quite accurate for the amount of data and the timeframe.
- Also happy the models didn't tell me I was a terrible programmer...or maybe I just didn't train it well enough so it couldn't :'(
(Update - After making this repo public because it is so big the model now believes I am performing 15% worse than it expects me to be. This is due to the repo being newly made public and having no stars xD)

# Awesome Resources that helped me build this:
React - Single Page Application Resources
- https://www.youtube.com/watch?v=v0t42xBIYIs
- https://www.youtube.com/watch?v=1iAG6h9ff5s

Tensorflow Linear Regression Model
- https://www.youtube.com/watch?v=23aqYP3jfwU

# To Install
- run the ./install.sh
- After you have your virtual env ready to go with all modules, then just go to scraper folder, add your credentials to the credentials.py(enter either username and password OR personal access token).
- Then run scraper.py(outputting the csv of the sample data), can also run linearregression.py afterwards to train a model and output the json.

- Go the react folder. "npm i" to install all packages.
- Edit the token.json file in the react folder and add in your personal access token for github.
- Then just do "npm run dev"

- Enjoy your github adventure (the models seem fairly alright, as long as you aren't a ruby developer...it looks like you have high expectations) Have fun, hope you enjoy!
