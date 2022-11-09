import os

def cls():
    os.system('cls' if os.name=='nt' else 'clear')


childAndStatus = {
    "Jon": "Good",
    "Eline": "Good",
    "Andrea": "Good",
    "Torgeir": "Good",
    "Anders": "Good",
    "Peter": "Good",
    "Christopher": "Good",
    "Itemize": "Bad",
    "Jonny": "Good",
    "Sivert": "Good",
}

available_commands = ["help()", "showChildren()", "updateChildStatus()", "exit()"]


def help():
    """
    Show help-text to user (located in help.txt)
    """
    with open("help.txt", "r") as f:
        print(f.read())


def get_user_input():
    user_input = input("Command: ")
    return user_input


def showChildren():
    """
    Show list of children and their status to user
    """

    print("Child".ljust(13) + "| Status")
    print("-------------+-------")
    for i in childAndStatus:
        if i == "Itemize" and "Good" in childAndStatus[i]:
            print(i.ljust(12) + " | " + childAndStatus[i] + " Itemize_flag_here")
        else:
            print(i.ljust(12) + " | " + childAndStatus[i])


def updateChildStatus():
    """
    Update the status of a child
    """
    # first select name of user
    # then select status (good or bad)
    # then ask for password
    # then update the dictionary (if password is correct)
    print("TODO")


def main():
    help()
    try:
        while True:         
            user_command = get_user_input()
            if user_command in available_commands:
                cls()
                if user_command == "help()":
                    help()

                elif user_command == "showChildren()":
                    showChildren()

                elif user_command == "updateChildStatus()":
                    updateChildStatus()

                elif user_command == "exit()":
                    print("Bye!")
                    break
            else:
                print("Invalid command!")
                continue
            
    except KeyboardInterrupt:
        print("Goodbye!")



if __name__ == "__main__":
    main()