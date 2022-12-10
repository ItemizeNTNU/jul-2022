#!/usr/bin/env python3
import hashlib
from datetime import date

flag = open("flag.txt").read().encode()
listfile = f"lists/{date.today().year}.csv"
children = open(listfile).read().split("\n")[1:-1]

def help():
  print(open("help.txt").read())

def show():
    print(f' No | {"Child".ljust(13)}| Status')
    print("----+-------------+-------")
    for i in range(len(children)):
      child = children[i].split(",")
      print(f"{str(i).rjust(3)} | {child[0].ljust(13)}| {child[1]}")

def update():
  key = input('Insert key > ')
  if key == hashlib.sha1(flag).hexdigest():
    try:
      index = int(input('Index to update > '))
      status = input('Set naughty or nice > ')
      children[index] = children[index].split(",")[0]+","+status
      with open(listfile, "w") as f:
        f.write("Child,Status\n"+"\n".join(children))
      print("Update successful!")
    except:
      print("Update instruction failed!")
  else:
    print("Access Denied!")

def source():
  print(open(__file__).read())

locals = {}
globals = {'__builtins__': {}, 'help': help, 'show': show, 'update': update, 'source': source, 'exit': exit, 'debug': print}
def main():
  help()
  print()
  try:
    while True:
      data = input('> ')
      print()
      co = compile(data, "main", "eval")
      res = eval(co, globals, locals)
      locals["_"] = res
      print()
      repr(res)
  except KeyboardInterrupt:
    print("Goodbye!")

if __name__ == '__main__':
  main()