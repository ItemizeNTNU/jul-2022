key_hid = {
    0x00 : ['', ''], # no key pressed
    0x04 : ['a', 'A'],
    0x05 : ['b', 'B'],
    0x06 : ['c', 'C'],
    0x07 : ['d', 'D'],
    0x08 : ['e', 'E'],
    0x09 : ['f', 'F'],
    0x0a : ['g', 'G'],
    0x0b : ['h', 'H'],
    0x0c : ['i', 'I'],
    0x0d : ['j', 'J'],
    0x0e : ['k', 'K'],
    0x0f : ['l', 'L'],
    0x10 : ['m', 'M'],
    0x11 : ['n', 'N'],
    0x12 : ['o', 'O'],
    0x13 : ['p', 'P'],
    0x14 : ['q', 'Q'],
    0x15 : ['r', 'R'],
    0x16 : ['s', 'S'],
    0x17 : ['t', 'T'],
    0x18 : ['u', 'U'],
    0x19 : ['v', 'V'],
    0x1a : ['w', 'W'],
    0x1b : ['x', 'X'],
    0x1c : ['y', 'Y'],
    0x1d : ['z', 'Z'],
    0x1e : ['1', '!'],
    0x1f : ['2', '@'], # Nordic
    0x20 : ['3', '£'], # Nordic
    0x21 : ['4', '$'], # Nordic
    0x22 : ['5', '€'], # Nordic
    0x23 : ['6', '^'],
    0x24 : ['7', '{'], # Nordic
    0x25 : ['8', '['], # Nordic
    0x26 : ['9', ']'], # Nordic
    0x27 : ['0', '}'], # Nordic
    0x28 : ['<Enter>','<Enter>'],
    0x28 : ['\n','\n'], # Replaces <Enter> with newline \n
    0x2a : ['<BackSpace>', '<BackSpace>'],
    0x2a : ['⌫', '⌫'], # Replace <BackSpace> with icon
    0x2c : [' ', ' '],
    0x2d : ['-', '_'],
    0x2e : ['=', '+'],
    0x2f : ['å', 'Å'], # Nordic
    0x30 : [']', '}'],
    0x31 : ['\\', '|'],
    0x32 : ['Non-US #', '~'],
    0x33 : ['ø', 'Ø'], # Nordic
    0x34 : ["æ", 'Æ'], # Nordic
    0x35 : ['`', '~'],
    0x36 : [',', ';'], # Nordic
    0x37 : ['.', ':'], # Nordic
    0x38 : ['-', '_'], # Nordic
}

flag = ""

filename = 'keystrokes.txt' 
with open(filename, "r") as f:
    keys = f.read().splitlines()

skip_next = False
for data in keys:
    data = data.split(":")
    input_report = {}
    input_report['modifier'] = data[0]
    input_report['reserved'] = data[1]
    input_report['Key1']     = data[2]
    input_report['Key2']     = data[3]
    input_report['Key3']     = data[4]
    input_report['Key4']     = data[5]
    input_report['Key5']     = data[6]
    input_report['Key6']     = data[7]
    #print(input_report)

    shift = input_report["modifier"] in ["02", "20", "40"] # 0x2 og 0x20 er shift, 0x40 er altgr
    key = int(input_report['Key1'], 16)
    #print(key_hid[key], key, shift)
    try:
        if skip_next:
            skip_next = False
            continue
        if key == 0 or input_report["Key2"] != "00":
            continue
        if shift > 0:
            skip_next = True

        flag += key_hid[key][ 1 if shift else 0 ]
    except Exception as err:
        pass

print()
print(flag)
