# Week 4 - normal challenge

### Description

Nå er det snart jul! Alvene har utviklet seg et online spill hvor man sammen kan feire julen digitalt.
Spillet er fortsatt under utvikling og alvene gjør sitt beste på å fullføre spillet til julaften. Heldigvis, har alvene vært så snille og gitt oss en demo versjon av spillet så vi får prøvet ut spillet først. Det har blitt sagt at alvene har gjemt en overraskelse et sted over elven i spillet, se om du klarer å finne det.

Prøv ut spillet her:
http://129.241.150.119:34008/

### Category

web

### Solution

- Websocket data manipulation with burp, change y-coordinate to walk over the river for flag.

Flag: `Itemize{l33t_h4x0r}`

Flag format: `Itemize{l33t_t3xt}`

Verify hash: `85991f9d0255330b63ad69b724cec90a`

# Week 4 - easy challenge

### Description

Hei!

Alvene skulle prøve være mer digitale i år når de skulle samle inn ønskelister for julenissen. Uheldigvis så er de ikke så gode på teknologi enda, slik at det ble et svært rot når den skulle deles ut. De har likevel forsikret seg om at dersom man løser opp i rotet vil man kunne nå frem til julenissen til tross for rotet.

Klarer du å løse opp i rotet og sende inn ønskelisten din?

Oppgave:

```
-.-. -.-- .-. -. ..-. .-.
--.. -. ...- -.--
.-.. -... .... .
.--- ...- ..-. ..- -.-- ...- ..-. --.
..- .-. . .-. ---...
.-- .... -.-- .-. .- ...- ..-. ..-. .-. .- .--.-. ...- --. .-. --.. ...- -- .-. .-.-.- .- -...
```

### Category

misc

### Solution

1. Simply [cyberchef](<https://gchq.github.io/CyberChef/#recipe=From_Morse_Code('Space','Line%20feed')ROT13(true,true,false,13)&input=LS0uLiAtLiAuLi4tIC0uLS0KLi0uLiAtLi4uIC4uLi4gLgouLS0tIC4uLi0gLi4tLiAuLi0gLS4tLSAuLi4tIC4uLS4gLS0uCi4uLSAuLS4gLiAuLS4gLS0tLi4uCi4tLSAuLi4uIC0uLS0gLi0uIC4tIC4uLi0gLi4tLiAuLi0uIC4tLiAuLSAuLS0uLS4gLi4uLSAtLS4gLi0uIC0tLi4gLi4uLSAtLSAuLS4gLi0uLS4tIC4tIC0uLi4>) magic, morse -> rot13
2. Mail something to `julenissen@itemize.no` and retrieve flag from autoreply

Flag: `Itemize{bekreftet_mottatt_ønskeliste}`

Flag format: `Itemize{l33t_t3xt}`

Verify hash: `31935b8f71da1bf7af2f61323c93fe23`
