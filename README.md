# GitEmployed
Predict how many stars a future worker should have based on the langauge they code in, the size of their repos, the quantity of followers and the quantity of following.

- I do play on hosting this soon, but with Christmas Exams and other matters before Christmas, it will probably be after Christmas when it gets deployed.

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

# To Install
- run the ./install.sh
- After you have your virtual env ready to go with all modules, then just go to scraper folder, add your credentials to the credentials.py, then run scraperpy(outputting the csv of the sample data), can also run linearregression.py afterwards to train a model and output the json.

- Go run the frontend and the frontend api, go the react folder. "npm i" to install all packages.
- Then just do "npm run dev"
