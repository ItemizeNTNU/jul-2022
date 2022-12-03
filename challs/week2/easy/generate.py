hmap = {
    "0": "🎄",
    "1": "🎅",
    "2": "❄️",
    "3": "⛄",
    "4": "🎁",
    "5": "🦌",
    "6": "🔔",
    "7": "🎶",
    "8": "✨",
    "9": "🛷",
}


flag = "Itemize{s3nd1ng_f0rs1nk3t}"
flag = [str(ord(x)).rjust(3, "0") for x in flag]
#print(flag)

for c in hmap:
    print(hmap[c], end="")
print()
print()
for line in flag:
    for c in line:
        print(hmap[c], end="")
    print(" ", end="")
print()
