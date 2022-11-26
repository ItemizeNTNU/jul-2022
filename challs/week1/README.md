# Week 1 - normal challenge

### Description
Hint: Alvene bruker nordisk tastatur!
...

### Category
Forensics

### Setup
1. Install wireshark with USBpcap. Rewrite the conversation while capturing the traffic on a notepad and save as a pcapng.

2. Convert `.pcapng` to `.pcap`, stripping unnecessary information.
```
$ tshark -F pcap -r christmas.pcapng -w christmas.pcap
```

### Solution
```
$ tshark -r christmas.pcap -Y 'usb.capdata && usb.data_len == 8' -T fields -e usb.capdata | sed 's/../:&/g2' > keystrokes.txt
$ git clone git@github.com:carlospolop-forks/ctf-usb-keyboard-parser.git
$ cd ctf-usb-keyboard-parser/
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
Flag format: `Itemize{StreetName StreetNumber, PostalCode PostalCodeLocation}` ie. the address of NTNU is `Høgskoleringen 1, 7034 Trondheim` then the flag would be `Itemize{Høgskoleringen 1, 7034 Trondheim}`
Verify hash: `3e43a0f8e89866d5972673acd25289da`
