# Generate genre file locally instead of through an api call
# This is how we got genres and multiplayer stored locally
# Remove later if you'd like
import requests
import json

def writeGenreApi(link, file_name):
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

def removeId(dict):
    del dict["id"]
    return dict

def getMultiplayerApi(link, id=0, previousResponse={}):
    r = requests.post(
            link, data="fields onlinecoopmax, onlinemax; where id > {} & (onlinecoopmax>0 | onlinemax>0); limit 500;".format(id)).json()
    r_dict = {int(r[i]["id"]): removeId(r[i]) for i in range(0, len(r))}
    sorted_dict = dict(sorted(r_dict.items()))
    previousResponse.update(sorted_dict)
    if len(sorted_dict) != 0:
        id = list(previousResponse.keys())[-1]
        print("Current Id: "+str(id))

        return getMultiplayerApi(link, id, previousResponse)
    else:
        return previousResponse

def writeMultiplayerApi(link, file_name):
    r = getMultiplayerApi(link)
    f = open(file_name, "w")
    # f.write()
    json.dump(r, f, indent=4)
    f.close()
    print("File created!")


api_genre_link = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/genres"
api_multiplayer_link = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/multiplayer_modes"

# writeGenreApi(api_link, "genres.JSON")
# writeMultiplayerApi(api_multiplayer_link, "multiplayer.JSON")
