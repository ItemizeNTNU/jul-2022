# Week 1 - normal challenge

### Description
Hint: Alvene bruker nordisk tastatur!

Itemize styret satt og planla juleavslutning når vi plutselig kom over noe spennende nettverkstrafikk. Etter litt nærmere undersøkelser viser det seg at det er en samtaleutveksling mellom julenissen og sjefs alven. Alt tyder på at det er snakk om en sted julenissen skal levere gaver til. Men akkurat når vi fant ut dette ble pizza levert og vi glemte helt hva vi drev med. Klarer du å finne ut hvilket sted julenissen og sjefs alven snakker om?

### Category
Forensics

### Setup
1. Install wireshark with USBpcap.

2. Rewrite the conversation from `conversation.md` on the elf's POV on a notepad while capturing the traffic and save it as a pcapng.

3. Convert `.pcapng` to `.pcap`, stripping unnecessary information. `christmas.pcap` being the challenge file.
```
$ tshark -F pcap -r christmas.pcapng -w christmas.pcap
```

### Solution

```
$ # Retrieve usb input data and format it according to how it is going to be parsed
$ tshark -r christmas.pcap -Y 'usb.capdata && usb.data_len == 8' -T fields -e usb.capdata | sed 's/../:&/g2' > keystrokes.txt

$ # Clone repository for parsing these data
$ git clone git@github.com:carlospolop-forks/ctf-usb-keyboard-parser.git
$ cd ctf-usb-keyboard-parser/

$ # Parse the usb keystrokes
$ python3 usbkeyboard.py ../keystrokes.txt
Hei juleen⌫⌫bn⌫⌫nissen!  F;lgende reinsdr⌫yr er klare til [rets tur>  Dasher, Dancer, Prac⌫ncer, Vixen, Comet, Cupid og Blitzen.
If;lge veterin'ralven har Rudolf f[tt en skadet klov. Det⌫⌫et vil derfor v're vanskelig for han [ lande p[ alle takene under levering av gavene.
Det skal jeg prsonlig s;rge for.
Stede⌫⌫⌫⌫⌫De 10 f;rste stedenee⌫ er som f;lger> Vads;, Hesseng, Vard;, Karasjok,  Rypefjord, Berlev[g, :ksfjord, Nordv[gen, Amtmannsnes, Lakselv. Jeg kommer tilbake til hvilket sted som er f;rst n[r kartavlene har f[tt kalkulert den beste ruten.
Slemmebarn listen best[r i [r av 20 barn. 5 B⌫barn er nye p[ listen mens de 15 siste er de samme som i fjor.
Det skal vi s;⌫elvf;lgelig s;rge fo⌫⌫⌫⌫ for.
Fikk akkuratt beskjed av kartavlene at rune⌫⌫ten er kalkulert, og f;rste sted duskal levere gaver til er Itemize&Berlev[g)
Avreise er 23. desember kl 23>49⌫⌫59.
```

Flag: `Itemize{Berlevåg}`

Verify hash: `251be01c698ed71a454da814ea180895`


# Week 1 - normal challenge fix

Some high-IQ individual solved the challenge in an unintended way (by bruteforcing the given hash value), a fix for the challenge was therefore added.

### Solution
```
$ # Retrieve usb input data and format it according to how it is going to be parsed
$ tshark -r christmas.pcap -Y 'usb.capdata && usb.data_len == 8' -T fields -e usb.capdata | sed 's/../:&/g2' > keystrokes.txt

$ # Clone repository for parsing these data
$ git clone git@github.com:carlospolop-forks/ctf-usb-keyboard-parser.git
$ cd ctf-usb-keyboard-parser/

$ # Parse the usb keystrokes
$ python3 usbkeyboard.py ../keystrokes.txt
Hei jull⌫enissen! F;lgende reinsdyr e klare til [rets tur>  Dasher, Dancer, Prancer, Vixen, Comet, Cupid og Blitzen.
Idf;⌫⌫⌫f;lge veterin'ralven har Rudolf f[tt et skadet klov. Det vil derfor v're vanskelig for han [ lande p[ alle takene under levering av gavene.
Det skal jeg personlig s;rge o⌫for.
Listen over de  ⌫10 f;rste sten⌫dene er som f;lger> Vads;, Hesseng, Vard;, Karasjok, Rypefjord, Berlev[g, Ksj⌫fjro⌫⌫⌫⌫⌫⌫:ksfjord, Nordv[genm⌫, Amtmannsnes og Lakselv. Jeeg⌫⌫g kommer tilbake til hvilket sted som er f;rst n[r kartavlene har f[tt kalkulert den beste ruten.
Slemmebarn ll⌫isten best[r i [r av 20 barn. 5 barn er nye p[ listen mens de 15 siste er de samme som i fjor.
Det skal vi selvf;lgelig s;'⌫rge for.
Fikk akkurat beskjed av kartalvene at run⌫ten er kalkulert. F;rste sted du skal levere gaver til er Itemize&Berlev[g?Hohoho!!!)
Avreise er 23. desember kl 23>59
```

Flag: `Itemize{Berlevåg_Hohoho!!!}`

Flag format: `Itemize{Location_text}`

Verify hash: `dc406ea31869d41cb322912a22cd2857`


# Week 1 - easy challenge

### Description
Hei!
Du skal hjelpe sende eller levere et brev til Julenissen, men har rotet bort adressen.
Alvene har klart å finne noen ord som kanskje kan være til hjelp: luer.minsten.kledt

### Category
OSINT

### Solution
Use of what3words: https://what3words.com/luer.minsten.kledt

`///luer.minsten.kledt`

Flag: `Itemize{Havnebakken 6, 1440 Drøbak}`

Flag format: `Itemize{StreetName StreetNumber, PostalCode PostalCodeLocation}` ie. if the address of NTNU is `Høgskoleringen 1, 7034 Trondheim` then the flag would be `Itemize{Høgskoleringen 1, 7034 Trondheim}`

Verify hash: `3e43a0f8e89866d5972673acd25289da`
