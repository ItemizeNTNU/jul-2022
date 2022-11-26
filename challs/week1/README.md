# Week 1

### Description
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
