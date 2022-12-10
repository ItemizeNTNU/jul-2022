FROM python:3.8

RUN useradd -d /home/ctf/ -m -p ctf -s /bin/bash ctf
RUN echo "ctf:ctf" | chpasswd

WORKDIR /home/ctf

COPY ./chall/ynetd .
COPY ./chall/main.py .
COPY ./chall/help.txt .
COPY ./chall/flag.txt .
COPY ./chall/lists ./lists

RUN chmod +x ynetd
RUN chmod +x main.py

RUN chown -R root:root /home/ctf

USER ctf

CMD ./ynetd -d . -lt 1 -se y -p 3000 "python3 -u main.py"
