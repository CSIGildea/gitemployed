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
    <img src="https://raw.githubusercontent.com/CSIGildea/gitemployed/master/pictures/about.png?token=AYSfNXge5DE_SYN-ncOd86JYDwAQNe4Eks5cDgn7wA%3D%3D"/>
  About Page
</p>

# Overall Opinions
- Got to learn a lot more about React.
- Built my first SPA(SPA is very slick).
- Happy to get to do some Machine Learning with Tensorflow (even just a multiple variable linear regression model) at college.
- Happy the models actually turned out fairly realistical.
- Also happy the models didn't tell me I was a terrible programmer...or maybe I just didn't train it well enough so it couldn't :'(

# To Install
- run the ./install.sh
- After you have your virtual env ready to go with all modules, then just go to scraper folder, add your credentials to the credentials.py(enter either username and password OR personal access token).
- Then run scraper.py(outputting the csv of the sample data), can also run linearregression.py afterwards to train a model and output the json.

- Go the react folder. "npm i" to install all packages.
- Edit the token.json file in the react folder and add in your personal access token for github.
- Then just do "npm run dev"

- Enjoy your github adventure (the models seem fairly alright, as long as you aren't a ruby developer...it looks like you have high expectations) Have fun, hope you enjoy!
