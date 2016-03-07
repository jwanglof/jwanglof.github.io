---
layout: post
title:  "Installing RethinkDB on an Intel Galileo Gen 2"
date:   2016-03-06 19:36:00 +0100
categories: galileo rethinkdb
---

This is a small guide on how to install RethinkDB's drive on an Intel Galileo Gen 2 (most steps are from [the official guide][rethinkdb-python]):

1. At first when I tried to run `rethinkdb` I got this error: `ImportError: No module named backports.ssl_match_hostname`. This was an easy fix though, just install `backports.ssl_match_hostname` with `pip`: `pip install backports.ssl_match_hostname`
2. After that it just worked as intended and I could start using it.

At first I tried to install RethinkDB on the board so I could just connect to a local database, which was a good thought, but I couldn't get RethinkDB to be built on the board. After a couple of hours trying to install RethinkDB on the board I came up with a brilliant idea: why not just run the RethinkDB server on my host machine and just connect to it?
Said and done, now I'm connecting to a locally hosted RethinkDB on my host machine and with the RethinkDB driver from the Galileo board =)

I might try to build RethinkDB on the board so I can collect data offline but I don't have a reason for it right now.

<!-- Links -->
[rethinkdb-python]: https://rethinkdb.com/docs/install-drivers/python/
