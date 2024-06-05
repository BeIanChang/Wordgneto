import json

filename = "CET6_T.json"

with open(filename, "r") as file:
    data = json.load(file)
    object_count = len(data)

print("Number of objects:", object_count)