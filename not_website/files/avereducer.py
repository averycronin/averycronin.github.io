#! /usr/bin/env python

import sys

last_key = None
count = 0

# keys come grouped together
# so we need to keep track of state a little bit
# thus when the key changes , we need to reset
# our counter, and write out the count we've accumulated

mydict = {}

for line in sys.stdin:
   line = line.strip()
   key, value = line.split("\t")

   # we have to be able to deal with missing values
   if value =="NA":
       continue

   # if this is the first iteration
   if key not in mydict:
       mydict.update({key : value + ":1"})

   else: 
        temp = mydict[key].split(":")
        mydict[key] = str(int(temp[0]) + int(value)) + ":" + str(int(temp[1]) + 1)

# this is to catch the final value that we output
for key in mydict:
    ave = mydict[key].split(":")
    ave = int(ave[0]) / int(ave[1])
    print(key + "\t" + str(ave))