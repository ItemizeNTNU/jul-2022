import random
f = open("names.txt").readlines()
print("Child,Status")
for line in random.sample(f, 50):
    print(line.strip()+","+random.choice(["nice", "naughty"]))
