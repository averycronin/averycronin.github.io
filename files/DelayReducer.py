#! /usr/bin/env python

import sys

mydict = {}

for line in sys.stdin:
   line = line.strip()
   key, value = line.split("\t")

   value = float(value)
   
   if key == "goo":
       break

    # value : count : min : max
   # if this is the first iteration
   if key not in mydict:
       mydict.update({key : str(value) + ":1:" + str(value) + ":" + str(value)})

   else: 
        temp = mydict[key].split(":")
        
        temp = mydict[key].split(":")
        min = str(value) if value < float(temp[2]) else temp[2]
        max = str(value) if value > float(temp[3]) else temp[3]
        mydict[key] = str(float(temp[0]) + value) + ":" + str(float(temp[1]) + 1) + ":" + min + ":" + max

sorted_dict = dict(sorted(mydict.items()))

# Airline-Origin    Min     Max     Average
for key in sorted_dict:
    ave = sorted_dict[key].split(":")
    aver = float(ave[0]) / float(ave[1])
    print(key + "\t" + ave[2] + "\t" + ave[3] + "\t" + str(aver))
    
#temp = mydict[key].split(":")
 #       min = str(value) if value < float(temp[2]) else temp[2]
  #      max = str(value) if value > float(temp[3]) else temp[3]
   #     mydict[key] = str(float(temp[0]) + value) + ":" + str(float(temp[1]) + 1 + ":" + min + ":" + max)