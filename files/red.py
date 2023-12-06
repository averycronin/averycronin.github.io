#! /usr/bin/env python

import sys

mydict = {}

for line in sys.stdin:
   line = line.strip()
   key, value = line.split("\t")

   value = float(value)

    # value : count : min : max
   # if this is the first iteration
   if key not in mydict:
       mydict.update({key : str(value) + ":1:" + str(value) + ":" + str(value)})

   else: 
        temp = mydict[key].split(":")
        if value < temp[2]:
            mydict[key] = str(float(temp[0]) + value) + ":" + str(float(temp[1]) + 1 + ":" + str(value) + ":" + temp[3])
        elif value > temp[3]:
            mydict[key] = str(float(temp[0]) + value) + ":" + str(float(temp[1]) + 1 + ":" + temp[2] + ":" + str(value))
        else:
            mydict[key] = str(float(temp[0]) + value) + ":" + str(float(temp[1]) + 1 + ":" + temp[2] + ":" + temp[3])

# Airline-Origin    Min     Max     Average
for key in mydict:
    ave = mydict[key].split(":")
    aver = float(ave[0]) / float(ave[1])
    print(key + "\t" + ave[2] + "\t" + ave[3] + "\t" + str(aver))