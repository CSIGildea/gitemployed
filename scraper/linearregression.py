import pandas as pd
import numpy as np
from random import *
import os

import tensorflow as tf
from tensorflow import keras
PRIMARY_LANGUAGES = ["JavaScript", "Python", "Java", "Ruby","PHP", "C++", "CSS","Go", "C", "TypeScript","Shell","Swift","Scala","Objective-C"]
language = 'Objective-C'


path = os.getcwd() + "/"+str(language)+"_Data.csv" 
data2 = pd.read_csv(path, header=1, names=['Followers', 'Following', 'Bytes of Code', 'Seconds Since Creation','Stars'])
data2.describe()

mean = data2.mean()
std = data2.std()

followers_mean = data2[data2.columns[0]].mean()
following_mean = data2[data2.columns[1]].mean()
bytes_of_code_mean = data2[data2.columns[2]].mean()
seconds_since_creation_mean = data2[data2.columns[3]].mean()
stars_mean = data2[data2.columns[4]].mean()


followers_std = data2[data2.columns[0]].std()
following_std = data2[data2.columns[1]].std()
bytes_of_code_std = data2[data2.columns[2]].std()
seconds_since_creation_std = data2[data2.columns[3]].std()
stars_std = data2[data2.columns[4]].std()


data_norm = (data2 - mean)
data_norm = data_norm/std
data_norm.head()

data_x1 = data_norm['Followers']
data_x2 = data_norm['Following']
data_x3 = data_norm['Bytes of Code']
data_x4 = data_norm['Seconds Since Creation']
data_y = data_norm['Stars']

with tf.name_scope('inputs'):
    X1 = tf.placeholder(tf.float32 , name = "input1")
    X2 = tf.placeholder(tf.float32 , name = "input2")
    X3 = tf.placeholder(tf.float32 , name = "input3")
    X4 = tf.placeholder(tf.float32 , name = "input4")
    Y = tf.placeholder(tf.float32 , name = "output")


with tf.name_scope('parameters'):
    w1 = tf.Variable(0.0,name='weights_1')
    w2 = tf.Variable(0.0,name='weights_2')
    w3 = tf.Variable(0.0,name='weights_3')
    w4 = tf.Variable(0.0,name='weights_4')
    #w3 = tf.Variable(0.0,name='weights_3')
    b = tf.Variable(0.0,name='bias')

with tf.name_scope('regression_model'):
    Y_predicted = X1*w1 + X2*w2 +X3*w3 + X4*w4 + b
    #Y_predicted=tf.add(tf.multiply(X1, w1),tf.multiply(X2, w2), b)

with tf.name_scope('loss_function'):
    loss = tf.reduce_mean(tf.square(Y-Y_predicted,name = 'loss'))

optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.001)
train_op = optimizer.minimize(loss)

# Add summary ops to collect data
W1_hist = tf.summary.histogram("weights_1", w1)
W2_hist = tf.summary.histogram("weights_2", w2)
W3_hist = tf.summary.histogram("weights_3", w3)
W4_hist = tf.summary.histogram("weights_4", w4)
b_hist = tf.summary.histogram("biases", b)
y_hist = tf.summary.histogram("y_predicted", Y_predicted)
cost = tf.summary.scalar('loss',loss)
# merge all the summaries
merged_summaries = tf.summary.merge_all()

# Create a Saver object
saver = tf.train.Saver()


cost_history = np.empty(shape=[1],dtype=float)
with tf.Session() as sess:
    # create a summary writer
    summary_writer = tf.summary.FileWriter('./mult_lin_reg_summary',sess.graph)
    # initialize the defined w and b variables
    sess.run(tf.global_variables_initializer())
    
    # Train the model
    for i in range(300): # train the model for 100 iterations
        # for every iteration all the data is passed
        for x1,x2,x3,x4,y in zip(data_x1,data_x2,data_x3,data_x4,data_y):
            # run the trining function to minimize the loss using 
            #defined optimizer
            _,loss_v,summary=sess.run([train_op,loss,merged_summaries],feed_dict={X1:x1,X2:x2,X3:x3,X4:x4,Y:y})
            # for feeding the entire dataset at once into the feed dict
            #_,loss_v,summary=sess.run([train_op,loss,merged_summaries],feed_dict={X1:data_x1,X2:data_x2,Y:data_y})
        cost_history=np.append(cost_history,loss_v)
            #summary_writer.add_summary(summary,i)
        # output the weight and bias value after every iteration
        if i%20==0:
            print ('loss is: ',loss_v)
            summary_writer.add_summary(summary,i)
    w1_value,w2_value,w3_value,w4_value,b_value = sess.run([w1,w2,w3,w4,b])
        #print (w_value,b_value)
        # print the loss function after every iteration
        #loss_value = sess.run(loss)
    saver.save(sess, './saved_model/'+str(language))

summary_writer.close()

x1_test = np.array(data_x1[0:5])
x2_test = np.array(data_x2[0:5])
x3_test = np.array(data_x3[0:5])
x4_test = np.array(data_x4[0:5])
y_test = np.array(data_y[0:5])
y_test_predicted=x1_test*w1_value+x2_test*w2_value+x3_test*w3_value+x4_test*w4_value+b_value
print ('predicted_value: ', y_test_predicted)
print ('true_value: ', y_test)

print(w1_value)
print(w2_value)
print(w3_value)
print(w4_value)
print(b_value)

followers_mean = data2[data2.columns[0]].mean()
following_mean = data2[data2.columns[1]].mean()
bytes_of_code_mean = data2[data2.columns[2]].mean()
seconds_since_creation_mean = data2[data2.columns[3]].mean()
stars_mean = data2[data2.columns[4]].mean()
followers_std = data2[data2.columns[0]].std()
following_std = data2[data2.columns[1]].std()
bytes_of_code_std = data2[data2.columns[2]].std()
seconds_since_creation_std = data2[data2.columns[3]].std()
stars_std = data2[data2.columns[4]].std()

follow_val = ((44-followers_mean)/followers_std)*w1_value
following_val = ((44-following_mean)/following_std)*w2_value
bytes_val =((5000-bytes_of_code_mean)/bytes_of_code_std)*w3_value
seconds_val =((seconds_since_creation_mean-seconds_since_creation_mean)/seconds_since_creation_std)*w4_value
conor_check=follow_val+following_val+bytes_val+seconds_val+b_value

print("Conor"+str(conor_check))
print((conor_check*stars_std)+stars_mean)
y_test_predicted = (y_test_predicted*std)
y_test_predicted = y_test_predicted+mean
print(y_test_predicted['Stars'])
y_test = (y_test*std)
y_test = y_test+mean
print(y_test['Stars'])


import json
data = {}

data['followers_mean'] = str(followers_mean)
data['following_mean'] = str(following_mean)
data['bytes_of_code_mean'] = str(bytes_of_code_mean)
data['seconds_since_creation_mean'] = str(seconds_since_creation_mean)
data['stars_mean'] = str(stars_mean)
data['followers_std'] = str(followers_std)
data['following_std'] = str(following_std)
data['bytes_of_code_std'] = str(bytes_of_code_std)
data['seconds_since_creation_std'] = str(seconds_since_creation_std)
data['stars_std'] = str(stars_std)
data['w1_value'] = str(w1_value)
data['w2_value'] = str(w2_value)
data['w3_value'] = str(w3_value)
data['w4_value'] = str(w4_value)
data['b_value'] = str(b_value)
filePathNameWExt =  os.getcwd() + '/' + language + '.json'
with open(filePathNameWExt, 'w') as fp:
    json.dump(data, fp)


