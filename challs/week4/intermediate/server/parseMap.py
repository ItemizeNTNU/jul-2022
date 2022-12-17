import json
with open("map.json") as f:
    a = f.read()
a = json.loads(a)
layers = a["layers"][0]
row = layers["gridCellsY"]
column = layers["gridCellsX"]
data = layers["data"]
m = [[0]*column for x in range(row)]
print(row, column)
a = set()
rep = {
32:"0",
33:"1",
34:"2",
35:"3",
37:"4",
38:"5",
47:"6", # Hright
48:".", # Ground
49:"8",
50:"9", # Hleft
53:"a", # ShadowRight
54:"b", # ShadowLeft
62:"c",
63:"d", # Hbottom
64:"e",
65:"f",
66:"1", # Htop
67:"h",
68:"i", # Shadow
77:".", # Ground
78:"k",
79:"l",
80:"m",
81:"n",
82:"o",
83:"p",
92:"#"} # Crate
for i in range(len(data)):
    m[i//column][i%column] = rep.get(data[i], "?")
    a.add(data[i])

#print(m, a)
print("\n".join(["".join(x) for x in m]))
