# Generate genre file locally instead of through an api call
# This is how we got genres stored locally
# Remove later if you'd like
import requests
import json


def callApi(link, file_name):
    f = open(file_name, "a")
    session = requests.Session()
    print("Beginning API transfer...")
    for i in range(0, 999):
        print(str(i/10) + "%", end="\r")  # Progress
        r = session.post(
            link, data="fields name; where id = {};".format(i))
        if r.json() != []:
            f.write(json.dumps(r.json()[0])+"\n")

    print("File closed and finished!")
    f.close()


api_link = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/genres"

callApi(api_link, "genres.JSON")
