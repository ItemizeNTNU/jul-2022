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

flag = "🎄🎶⛄ 🎅🎅🔔 🎅🎄🎅 🎅🎄🛷 🎅🎄🦌 🎅❄️❄️ 🎅🎄🎅 🎅❄️⛄ 🎅🎅🦌 🎄🦌🎅 🎅🎅🎄 🎅🎄🎄 🎄🎁🛷 🎅🎅🎄 🎅🎄⛄ 🎄🛷🦌 🎅🎄❄️ 🎄🎁✨ 🎅🎅🎁 🎅🎅🦌 🎄🎁🛷 🎅🎅🎄 🎅🎄🎶 🎄🦌🎅 🎅🎅🔔 🎅❄️🦌"

for c in hmap:
    flag = flag.replace(hmap[c], c)
flag = "".join([chr(int(x)) for x in flag.split()])
print(flag)
