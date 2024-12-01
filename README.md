# Phishing URL Detection 

![image2](https://github.com/asrith-reddy/Phishing-detector/assets/76733972/da226de9-dfe6-4f0c-a8bc-b92d4cc08e53)

![image1](https://github.com/asrith-reddy/Phishing-detector/assets/76733972/fe706a06-84fe-493f-abb8-34d3fbc594b5)

# Problem Statement <img src="https://user-images.githubusercontent.com/130077430/230730194-a7389fed-f5fd-48d3-856a-0212057f2500.png" width="90" height="80">

Phishing attacks pose a significant threat to online users, compromising their privacy, financial security, and trust in online interactions. Detecting and mitigating phishing sites remains challenging, requiring effective techniques to identify and differentiate between legitimate and malicious websites accurately.

Therefore, a critical need is to develop an improved system combining advanced machine learning techniques, feature engineering, and behavioural analysis to detect phishing sites accurately and efficiently. By addressing these challenges, the proposed methodology aims to improve the security of online users, protect their sensitive information, and foster a safer digital environment.

# Introduction <img src="https://user-images.githubusercontent.com/72274851/152814876-73362bcc-bde6-411f-ba80-235e911f276f.gif" width="90" height="90">

A phishing website is a common social engineering method that mimics trustful uniform resource locators (URLs) and webpages. The objective of this project is to train machine learning models and deep neural nets on the dataset created to predict phishing websites. Both phishing and benign URLs of websites are gathered to form a dataset and from them required URL and website content-based features are extracted. The performance level of each model is measures and compared.

# Procedure <img src="https://th.bing.com/th/id/R.02832177b40b49d50674126476f980c3?rik=aXibwvpQe645bg&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fjcx%2f6rb%2fjcx6rbngi.png&ehk=xllVkMLnEE%2fEXx%2fnWbpceiVVfvTNGJmODcZ9fEBJVGA%3d&risl=&pid=ImgRaw&r=0" width="120" height="100"> 

## 1️⃣ Installation
To install the required packages and libraries, run this command in the project directory after Forking and cloning this repository:
```bash
pip install -r requirements.txt
```

## 2️⃣ Technologies Used

![](https://forthebadge.com/images/badges/made-with-python.svg)

[<img target="_blank" src="https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg" width=200>](https://numpy.org/doc/) [<img target="_blank" src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg" width=200>](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html)
[<img target="_blank" src="https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg" width=100>](https://matplotlib.org/)
[<img target="_blank" src="https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png" width=200>](https://scikit-learn.org/stable/) 
[<img target="_blank" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScq-xocLctL07Jy0tpR_p9w0Q42_rK1aAkNfW6sm3ucjFKWML39aaJPgdhadyCnEiK7vw&usqp=CAU" width=200>](https://flask.palletsprojects.com/en/2.0.x/) 

## 3️⃣ Feature Extraction
The system starts by retrieving URLs to be checked for phishing. These URLs can be collected from user input in the webpage created. Once the URLs are obtained, the system extracts relevant features from the web pages. These features are essential for training and evaluating the machine learning models. Various features were extracted from the URL database based on Domain, HTML and Address bar of the URLs. 

## 4️⃣ Machine Learning Models

Various machine learning models are compared and The machine learning model with high accuracy is selected which predicts whether the URL is a phishing site or not. It provides a probability score or a binary classification (phishing or not phishing) based on the trained model's decision boundary. The system categorize URLs into "phishing" or "legitimate" and the result is finally displayed on the webpage. 
#### Refer Phishingproject.ipynb for more details.

# Result <img src="https://cdn4.iconfinder.com/data/icons/business-startup-36/64/552-512.png" width="90" height="80">

Accuracy of various model used for URL detection
<br>

<br>

||ML Model|	Accuracy|  	f1_score|	Recall|	Precision|
|---|---|---|---|---|---|
0|	Gradient Boosting Classifier|	0.974|	0.977|	0.994|	0.986|
1|	CatBoost Classifier|	        0.972|	0.975|	0.994|	0.989|
2|	Multi-layer Perceptron|	        0.969|	0.973|	0.995|	0.981|
3|	Random Forest|	                0.967|	0.971|	0.993|	0.990|
4|	Support Vector Machine|	        0.964|	0.968|	0.980|	0.965|
5|	Decision Tree|      	        0.960|	0.964|	0.991|	0.993|
6|	K-Nearest Neighbors|        	0.956|	0.961|	0.991|	0.989|
7|	Logistic Regression|        	0.934|	0.941|	0.943|	0.927|
8|	Naive Bayes Classifier|     	0.605|	0.454|	0.292|	0.997|

## Conclusion
1. The final take away form this project is to explore various machine learning models, perform Exploratory Data Analysis on phishing dataset and understanding their features. 
2. Creating this notebook helped me to learn a lot about the features affecting the models to detect whether URL is safe or not, also I came to know how to tuned model and how they affect the model performance.
3. The final conclusion on the Phishing dataset is that the some feature like "HTTTPS", "AnchorURL", "WebsiteTraffic" have more importance to classify URL is phishing URL or not.
4. Gradient Boosting Classifier currectly classify URL upto 97.4% respective classes and hence reduces the chance of malicious attachments.
