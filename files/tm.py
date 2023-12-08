import sys

# Class containing the rules for the TM. 
class Rules:
    def __init__(self, str):
        self.state = str[0]
        self.val = str[1]
        self.newState = str[3]
        self.newval = str[4]
        self.direction = str[5].strip()
        
    def get_state(self):
        return self.state
    
    def get_val(self):
        return self.val
    
    def get_newstate(self):
        return self.newState
    
    def get_newval(self):
        return self.newval
    
    def get_dir(self):
        return self.direction
        
    def __str__(self):
        str =  self.state + " " + self.val + " " + self.newState + " " + self.newval + " " + self.direction
        return str
    
# Class to hold the string w and display it as 
class Tape:
    def __init__(self, values):
        self.tape = {}
        index = 0
        for x in values:
            self.tape.update({index : x})
            index = index+1
        if self.tape == {}:
            self.tape.update({0 : '_'})

    def __get_item__(self, index):
        if index in self.tape:
            return self.tape[index]
        else:
            self.tape.update({index : '_'})
            return self.tape[index]
        
    def __set_item__(self, index, value):
        if index in self.tape:
            self.tape[index] = value
        else:
            self.tape.update({index : value})
    
    def str(self, index):
        sort = sorted(self.tape.keys())
        # Not sure why I named it yarn, but goes through and 
        # finds the item at index (I use turing machine's head)
        # and highlights it with the parentheses
        yarn = ""
        for item in sort:
            if item == index:
                yarn = yarn + "(" + self.tape[item] + ")"
            else:
                yarn = yarn + self.tape[item]
        return yarn

# Turing Machine class that holds the current state, and where the head is
# No need for a set head as it can only move one space at a time.
class TMachine:
    def __init__(self):
        self.state = 0
        self.head = 0
        
    def set_state(self, newstate):
            self.state = newstate
        
    def get_state(self):
        return self.state
    
    def get_head(self):
        return self.head
        
    def move(self, dir):
        if dir == '>':
            self.head = self.head + 1
        elif dir == '<':
            self.head = self.head - 1  

# Provide a File
if len(sys.argv) < 2:
    print("Please provide a file")
    exit()
    
# Read File and split based on format
file = open(sys.argv[1])
states = file.readline().split(':')[1].strip()
alphabet = file.readline().split(':')[1].strip()
rulestring = file.read().split('\n')
file.close()

# empty list for rules
rules = []

# iterate through rulestring and make rules for each line
for counter in range(len(rulestring)):
    rules.append(Rules(rulestring[counter].split()))
    
# Helper Function for output: hedge
# Trims the extra blanks off the tape before printing
def hedge(str):
    start = 0
    end = len(str)
    while str[start] == '_':
        start = start + 1
    while str[end - 1] == '_':
        end = end - 1
    return str[start:end:1]

# Function to print the current calculation of the Turing Machine
def output(tape, state):
    printstr = ""
    if int(state) < 10:
        printstr = " " + str(state) + ":"
    else:
        printstr = str(state) + ":"
    printstr = printstr + hedge(tape.str(t.get_head()))
    print(printstr)
    
# Ruling is a function that finds the rule that corresponds to the current state 
# and value for the TM. Returns true when a rule is found, otherwise false 
def ruling(rules, state, val):
    for item in rules:
        if item.get_state() == str(state):
            if item.get_val() == str(val):
                t.set_state(int(item.get_newstate()))
                tape.__set_item__(t.get_head(), item.get_newval())
                t.move(item.get_dir())
                return True
        
    return False

while 1:
    # Fresh Turing Machine and Tape for each input
    t = TMachine()
    w = input()
    tape = Tape(w)
    while 1:
        state = t.get_state()
        val = tape.__get_item__(t.get_head())
        
        # print status of TM
        output(tape, state)

        # checks for accepting state
        if state == int(states):
            print("accept")
            break

        # Uses ruling function to determine if there is a corresponding rule
        # for the current state and value.
        found = ruling(rules, state, val)
                
        # reject if no rule.
        if found == False:
            print("reject")
            break