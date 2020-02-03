import os
import json
from urllib.parse import parse_qsl

from flask import Flask, jsonify, request
from flask import Flask, render_template
from requests_oauthlib import OAuth1Session

app = Flask(__name__, template_folder="./public")

consumerKey = ""
consumerSercret = ""

baseUrl = "https://api.twitter.com/"

requestTokenUrl = baseUrl + "outh/request_token"
autheticateUrl = baseUrl + "oath/authenticate"
accessTokenUrl = baseUrl + "oauth/access_token"

baseJsonUrl = "https://api.twitter.com/1.1/%s.json"
userTweetUrl = baseJsonUrl % ("/statuses/update")


@app.route("/")
def index():
    return render_template("index.html")
    
# @app.route("/twitter/request_token", methods=["GET"])
# def getTwitterRequestToken():
#     oauth_callback = request.args.get("oauth_callback")
#     twitter = OAuth1Session(consumerKey, consumerSercret)
#     response = twitter.post(
#         requestTokenUrl, 
#         param={"oauth_callback": oauth_callback}
#     )

#     requestToken = dict(parse_qsl(response.content.decode("utf-8")))

#     authenticateEndpoint = "%s?oauth_token=%s" % (autheticateUrl, requestToken["oauth_token"])

#     requestToken.update({"authenticate_endpoint": authenticateEndpoint})

#     return jsonify(requestToken)

# @app.route("/twitter/access_token", methods=["GET"])
# def getTwitterAccessToken():
#     oauthToken = request.args.get("oauth_token")
#     oauthVerifier = request.args.get("oauth_verifier")

#     twitter = OAuth1Session(
#         consumerKey,
#         consumerSercret,
#         oauthToken,
#         oauthVerifier
#     )

#     response = twitter.post(
#         accessTokenUrl,
#         params={"oauth_verifier": oauthVerifier}
#     )

#     accessToken = dict(parse_qsl(response.content.decode("utf-8")))

#     return jsonify(accessToken)

# @app.route("/twitter/update", methods=["POST"])
# def postTweet():

#     accessToken = request.args.get("access_token")
#     params = {"status" : tweet}

#     res = twitter.post(userTweetUrl, params = params)

#     if res.status_code == 200:
#         print("Success.")
#     else:
#         print("Failed: %d"% res.status_code)



if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
    # port = os.environ.get("PORT", 3333)
    # app.run(
    #     host="0.0.0.0",
    #     port=port,
    # )