from __future__ import absolute_import, division, print_function
from github import Github
import credentials
import requests
import json
import math
import time
import datetime
import pandas as pd
import numpy as np

import tensorflow as tf
from tensorflow import keras

# Takes username,password and token and tries to give back an authenticated github account
# With whichever of those details are correct

PRIMARY_LANGUAGES = ["JavaScript", "Python", "Java", "Ruby","PHP", "C++", "CSS", "C#", "Go", "C", "TypeScript","Shell","Swift","Scala","Objective-C"]

TIME_STARTED = time.time()
def auth_github_account(username,password,token):
    git_user_and_pass_ac = auth_user_password_login(username,password)
    git_token_ac = auth_token_login(token)
    if(git_user_and_pass_ac==None and git_token_ac == None):
        print("Invalid Credentials, please enter your credentials into credentials.py to run")
        return None
    else:
        if(git_user_and_pass_ac!=None): 
            return git_user_and_pass_ac
        if(git_token_ac!=None):
            return git_token_ac

        
# Takes github username and password and tries to authenticate it

def auth_user_password_login(username,password):
    try:
        git_account = Github(username,password)
        git_account.get_user().name
        return git_account
    except Exception as e:
        return None


# Takes github token and tries to authenticate it

def auth_token_login(token):
    try:
        git_account = Github(token)
        git_account.get_user().name
        return git_account
    except Exception as e:
        return None


# Returns the sample size 

def get_sample_size(population_size, confidence_level, confidence_interval):
    Z = 0.0
    p = 0.5
    e = confidence_interval/100.0
    N = population_size
    rough_sample_size = 0.0
    sample_size = 0.0
    confidence_level_constant = [95,1.96],[99,2.57]
    for i in confidence_level_constant:
        if i[0] == confidence_level:
           Z = i[1]
 
    if Z == 0.0:
        return -1

    rough_sample_size = ((Z**2) * p * (1-p)) / (e**2)

    sample_size = rough_sample_size / (1 + ((rough_sample_size - 1) / float(N)) )
 
    return int(math.ceil(sample_size))


# Returns all the sample repositories in an array for a given langauge


def get_sample_for_language(language,sample_size_of_repositories,interval_between_repositories,personal_access_token):
    sample_repos = []
    star_amount=0
    double_star_amount=0
    repos_collected = 0
    repo_remainder = 0
    repo_total_search_counter=0
    while repos_collected <sample_size_of_repositories:
        request_unsuccessful = True
        while request_unsuccessful:           
            r = requests.get('https://api.github.com/search/repositories?q=stars%3A'+str(star_amount)+'..'+str(double_star_amount)+'+language%3A'+language+"&per_page=100&page=0",headers={'Authorization': 'token '+personal_access_token})
            if(r.ok):
                request_unsuccessful=False
                repoItem = json.loads(r.text or r.content)
                print("Total Amount of "+language+" Repositories in the range"+str(star_amount)+'..'+str(double_star_amount)+': ' + str(repoItem['total_count']))

                amount_to_sample_here=int(math.ceil(((repo_total_search_counter+int(repoItem['total_count']))-(repos_collected*interval_between_repositories))/interval_between_repositories))
                print(amount_to_sample_here)
                amount_to_sample_here_copy=amount_to_sample_here
                number_of_requests_needed = int(math.ceil(amount_to_sample_here/100))
                print(number_of_requests_needed)
                repo_total_search_counter+=repoItem['total_count']
                for x in range(1,number_of_requests_needed+1):
                    if(x!=1):
                        request_unsuccessful = True
                        while request_unsuccessful:
                            print("down here")
                            r = requests.get('https://api.github.com/search/repositories?q=stars%3A'+str(star_amount)+'..'+str(double_star_amount)+'+language%3A'+language+"&per_page=100&page="+str(x),headers={'Authorization': 'token '+personal_access_token})
                            if(r.ok):
                                repoItem = json.loads(r.text or r.content)
                                request_unsuccessful=False
                    grab_count = 0
                    if(amount_to_sample_here_copy>100):
                        grab_count = 100
                        amount_to_sample_here_copy-=100
                    else:
                        grab_count = amount_to_sample_here_copy
                        print(grab_count)
                    for amount in range(grab_count):
                        sample_repos.append(repoItem['items'][amount]['full_name'])
                        repos_collected+=1
                        print(str(repos_collected)+"   "+str(sample_size_of_repositories))
                        print(repoItem['items'][amount]['full_name'])
                      
            if(star_amount==0 and double_star_amount==0):
                star_amount=1
                double_star_amount=1
            else:
                star_amount = double_star_amount
                double_star_amount=double_star_amount*2
                if repos_collected <sample_size_of_repositories:
                    break
    print(sample_repos)
    return sample_repos

def read_dataset(filePath,delimiter=','):
    return genfromtxt(filePath, delimiter=delimiter)


def feature_normalize(dataset):
    mu = np.mean(dataset,axis=0)
    sigma = np.std(dataset,axis=0)
    return (dataset - mu)/sigma

def append_bias_reshape(features,labels):
    n_training_samples = features.shape[0]
    n_dim = features.shape[1]
    f = np.reshape(np.c_[np.ones(n_training_samples),features],[n_training_samples,n_dim + 1])
    l = np.reshape(labels,[n_training_samples,1])
    return f, l

def create_model(df):
    features = df.as_matrix()
    labels = numpy.array(['Followers', 'Following', 'Bytes of Code', 'Seconds Since Creation','Stars'])
    n_dim = f.shape[1]

    rnd_indices = np.random.rand(len(f)) < 0.80

    train_x = f[rnd_indices]
    train_y = l[rnd_indices]
    test_x = f[~rnd_indices]
    test_y = l[~rnd_indices]

    learning_rate = 0.01
    training_epochs = 1000
    cost_history = np.empty(shape=[1],dtype=float)

    X = tf.placeholder(tf.float32,[None,n_dim])
    Y = tf.placeholder(tf.float32,[None,1])
    W = tf.Variable(tf.ones([n_dim,1]))

    init = tf.initialize_all_variables()

    y_ = tf.matmul(X, W)
    cost = tf.reduce_mean(tf.square(y_ - Y))
    training_step = tf.train.GradientDescentOptimizer(learning_rate).minimize(cost)


    sess = tf.Session()
    sess.run(init)

    for epoch in range(training_epochs):
        sess.run(training_step,feed_dict={X:train_x,Y:train_y})
        cost_history = np.append(cost_history,sess.run(cost,feed_dict={X: train_x,Y: train_y}))


# Bytes of Code, Amount of Follwers, Amount Following, Days since creation,

def get_all_repo_information(repo_names,git_ac,language):
    df = pd.DataFrame(columns=['Followers', 'Following', 'Bytes of Code', 'Seconds Since Creation','Stars'])
    for index,repo_name in enumerate(repo_names):
        repo = git_ac.get_repo(repo_name)
        unixtime = time.mktime(repo.created_at.timetuple())
        seconds_since_creation = TIME_STARTED - unixtime
        size = repo.size
        user = git_ac.get_user(repo_name.split('/')[0])
        followers = user.followers
        following = user.following
        number_of_stars = repo.stargazers_count
        df.loc[index] = [followers,following,size,seconds_since_creation,number_of_stars]
    print(df)
    return df


def main():
    username = credentials.github_login['username']
    password = credentials.github_login['password']
    personal_access_token = credentials.github_login['personal_access_token']
    amount_of_repositories = {}
    sample_size_of_repositories = {}
    interval_between_repositories ={}

    
    for language in PRIMARY_LANGUAGES:
        request_unsuccessful = True
        while request_unsuccessful:           
            r = requests.get('https://api.github.com/search/repositories?q=language%3A'+language+'&type=Repositories',headers={'Authorization': 'token '+personal_access_token})
            if(r.ok):
                repoItem = json.loads(r.text or r.content)
                print("Total Amount of "+language+" Repositories: " + str(repoItem['total_count']))
                request_unsuccessful=False
                amount_of_repositories[language] = repoItem['total_count']
                sample_size_of_repositories[language]= get_sample_size(amount_of_repositories[language],95,5)
                interval_between_repositories[language]=math.ceil(amount_of_repositories[language]/sample_size_of_repositories[language])
    print("\n")
    print(amount_of_repositories)
    print("\n")
    print(sample_size_of_repositories)
    print("\n")
    print(interval_between_repositories)

    print("Authenticating Login Details inside credentials.py...")
    git_ac = auth_github_account(username,password,personal_access_token)

    for nextlanguage in PRIMARY_LANGUAGES:
        print(nextlanguage)
        sample_repos = get_sample_for_language(nextlanguage,sample_size_of_repositories[nextlanguage],interval_between_repositories[nextlanguage],personal_access_token)     
        get_all_repo_information(sample_repos,git_ac,nextlanguage)


    if(git_ac!=None):
        print("Authentication Passed")
        user = git_ac.get_user("csigildea")
        repositories = git_ac.search_repositories(query='language:python')
        print(repositories)
        #print(len(list(repositories)))
        for repo in repositories:
            print(repo.name)
        print(user.get_followers())
        followers = user.get_followers()
        count = 0
        for follower in followers:
            print(str(count) + str(follower))
            count = count +1
if __name__ == "__main__":
    main()
