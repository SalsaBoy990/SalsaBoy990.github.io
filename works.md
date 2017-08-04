---
layout: page
title: Referenciák
permalink: /works/
weight: 8
---

Az alábbi egyszerű programokat JavaScript-ben írtam.
ECMAScript 5 kompatibilisek és a <a href="http://jslint.com/" target="_blank">JSLint</a> kódellenőrzőn is átmentek. Továbbá "strict" módot használtam. Mindegyik program esetén a hibák megfelelően "le vannak kezelve" (exception handling).


### Az eddigi munkáim:
1. [Egyszerű számológép (verzió: 1.0b)](/simpleCalculator.html)
2. [RGB színinvertáló és hex-RGB konverter program (verzió: 1.0b)](/colours.html)


A GitHub oldalamon a <a href="https://github.com/SalsaBoy990/MyWorks" target="_blank">MyWorks<a/> repository-mban megtalálhatók a programkódok!

<!--
#### Megjegyzések

Az egyszerű számológépnél `eval()`-t használtam, aminek a használata nem igazán
javallott (biztonsági réseket tárhat a szkriptben). A felhasználói
adatbevitel kizárólag csak az általam megadott gombokon keresztül történhet, billentyűzetről nem! Az `eval()` függvény egy sztringre hívja meg a
a böngészőbe épített JS-értelmezőt vagy fordítót (compiler). Ha a sztringbe rosszindulatú kód kerül, akkor azt az `eval()` ellenőrzés nélkül kiértékeli és lefuttatja!


Egyetlen egy hasznát találtam eddig az `eval()`-nak: a JS fordító ismeri a műveletek sorrendjét, tehát a felhasználó
összetett matematikai kifejezéseket (pl. `2000(5(9/7)-9*8)`) adhat meg szövegként, ami kiértékelődik. Az eredményt (`-131142,857`) pedig visszadom a felhasználónak. Természetesen előtte rávizsgálok, hogy jó-e a bemenet (pl. hiányzó zárójelek). Majd átalakítom megfelelő formátumba a szöveget: a tizedesvesszőket tizedesponttá írom át (a programnyelvekben ez az alapértelmezett, a `,` operátor más célt szolgál), valamint a szorzásjelet pótlom a zárójel előtt, ha szükséges,, hiszen azt el szokás hagyni szorzás esetén.-->