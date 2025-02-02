
import sys
sys.stdin = open(0)
input_value = "Rana"

def custom_input(prompt=""):
    print(prompt, end="")
    return input_value

input = custom_input

def greet(name):
    return f"Hello, {name}!"

name = input("Enter your name: ")
print(greet(name))

    