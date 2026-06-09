## Stefan Novaković 89221092

Spletna aplikacija za upravljanje perutninske farme, razvita v okviru študijskega projekta pri predmetu Sistemi 3 - informacijski sistemi

## Opis projekta

Aplikacija omogoča digitalno upravljanje vseh ključnih procesov na farmi perutnine:

* Evidenca perutnine
* Evidenca hrane
* Evidenca proizvodnje
* Evidenca prodaje
* Upravljanje uporabnikov

Projekt uporablja arhitekturo:

* Frontend: React + Vite
* Backend: Node.js + Express
* Podatkovna baza: MySQL

## Podatkovni model

Sistem uporablja naslednje tabele:

### perad

Podatki o perutnini:

* vrsta
* starost
* spol
* količina

### hrana

Podatki o zalogi hrane:

* naziv
* tip
* količina
* cena
* rok uporabe

### proizvodnja

Podatki o proizvodnji:

* datum
* tip proizvodnje
* količina
* opombe

### prodaja

Podatki o prodaji:

* datum
* količina
* skupna cena
* način plačila
* status

### pregled

Veterinarski pregledi:

* datum
* diagnoza
* stanje
* opombe

### sertifikat

Podatki o certifikatih:

* naziv
* datum izdaje
* datum poteka
* status

### korisnik

Podatki o uporabnikih sistema:

* ime
* telefon
* email
* naslov
* vloga
