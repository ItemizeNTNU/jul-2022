# Week 2 - normal challenge

### Description

Etter å ha funnet ut hvor gavene blir levert, blir du brått nysgjerrig på om noen av gavene er til deg!🎁 Du bestemmer deg for å grave litt og finner et forum som snakker om en lekket nettside Julenissen bruker til å håndtere snille-barn lista si: https://santaslist.ctf.itemize.no/ Som vi alle vet får man kun gaver om Julenissen tror at du har vært snill ✨ Men etter at du spionerte på samtalen hans, viser det seg at du kanskje havner på slemme-barn lista! Heldig for deg så har styret i Itemize funnet en sårbarhet i custom session-implementasjonen til siden som lar deg ta å se gavene de andre barnene har fått, og samtidig også registrert inn et barn med flagget som julegaven til deg. Klarer du å finne ut hva slags julegave barnene har fått og? 👼😈

### Category

Web

### Solution

Figure out the signature works by repeating XOR on name.

Signature key is: `HoHoHo!!!`

Break Signature by setying session name as `Haxorman L337` in cookie: `SGF4b3JtYW4gTDMzNw.GygOWypca1V4H1svOwwiW29WdVI`

Flag: `Itemize{l33t_gr1nch3n_3r_t1lb4k3}`

Flag format: `Itemize{l33t_t3xt}`

Verify hash: `e313a5841cc96f9e083d8ed549ca5f77`

# Week 2 - easy challenge

### Description

Bestemor sendte meg en julepakke. Den skulle komme for 10 timer siden, men postkontoret har ikke sett noe av pakken! De ba meg sjekke sporingsnummeret, men denne gir jo ikke mening. Jeg lurer på om det kan være brukt ASCIImoji-enkoding. Kunne du ha sporet pakken for meg?

Sporingsnummer:

```
🎄🎅❄️⛄🎁🦌🔔🎶✨🛷

🎄🎶⛄ 🎅🎅🔔 🎅🎄🎅 🎅🎄🛷 🎅🎄🦌 🎅❄️❄️ 🎅🎄🎅 🎅❄️⛄ 🎅🎅🦌 🎄🦌🎅 🎅🎅🎄 🎅🎄🎄 🎄🎁🛷 🎅🎅🎄 🎅🎄⛄ 🎄🛷🦌 🎅🎄❄️ 🎄🎁✨ 🎅🎅🎁 🎅🎅🦌 🎄🎁🛷 🎅🎅🎄 🎅🎄🎶 🎄🦌🎅 🎅🎅🔔 🎅❄️🦌
```

### Category

Misc

### Solution

See [solve.py](./easy/solve.py)

Flag: `Itemize{s3nd1ng_f0rs1nk3t}`

Flag format: `Itemize{l33t_t3xt}`

Verify hash: `4ea5fdb653a2e1a720931c5b316c6bb2`
