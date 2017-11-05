---
layout: page
title: Magamról
permalink: /about/
weight: 4
---

<div>
  <div>
    <img class="profile-picture" src="{{ site.url}}/assets/basic/me-min.jpg" alt="Önarckép"/>
  </div>
  <div style="max-width:650px;">
    <p>Sziasztok! Gulácsi András vagyok (<span id="age"></span> éves), természettudós és író. Frontend/JavaScript fejlesztőnek készülök. Pillanatnyilag PhD hallgatóként tevékenykedek, de kész vagyok váltani.<br />
      <span aria-hidden="true">{% include placemark.svg %}</span>
      <span id="adress">Szeged, Magyarország</span>
    </p>
  </div>
</div>

<script type="text/javascript">
/* Function calculates my age. Args: the date and
 * the id of the HTML element where to inject the age value. */
function getAge(year, month, day, id) {
    "use strict";
    var now = new Date();

    /* Construct the date of the birthday */
    var then = new Date(year, month, day);
    var nowYear = now.getFullYear();

    /* Get the difference between current year and birthyear */
    var age = nowYear - then.getFullYear() - 1;
    var nowMonth = now.getMonth();
    var nowDay = now.getDate();

    /* Current month is bigger than birthmonth; increase age by 1 */
    if (nowMonth > month) {
        age += 1;
        document.getElementById(id).innerHTML = age;
    }
    /* Current month is >= than birthmonth and current day is >= than
     * birthday; increment age by 1. */
    else if (nowMonth >= month && nowDay >= day) {
        age += 1;
        document.getElementById(id).innerHTML = age;
    }
    else {
        document.getElementById(id).innerHTML = age;
    }
    return;
}
</script>
<script>window.onload = getAge(1990, 8, 2,"age");</script>

<p style="clear: both"></p>

## Itt veheted fel velem a kapcsolatot

E-mail: <a title="e-mail" href="mailto:{{ site.email }}">{{ site.email }}</a>

Megtalálsz a [Twitter]({{ site.twitter }})-en, a [LinkedIn]({{ site.linkedin }})-en és a [GitHub](https://github.com/SalsaBoy990)-on is. Az önéletrajzomat [innen töltheted le](https://www.docdroid.net/QELceEr/gulacsiandrasoneletrajz2017.pdf).

## A munkáim

* [STATS.js](https://github.com/SalsaBoy990/STATS.js): **jelenleg fejlesztés alatt áll**. Egyszerű számokat tartalmazó tömbökből, illetve tömbökben tárolt objektumok (például egy mySQL adattábla JSON-ba konvertálva) valamelyik tulajdonságából statisztikákat (egyelőre ezek: összeg, átlag, bármelyik percentilis, medián, kvartilisek, minimum, maximum, kiugró értékek) számító JavaScript könyvtár. Egyelőre egymásba ágyazott objektumokat nem támogat. Az eredményeket dobozdiagram formájában is megjeleníti az AnyChart könyvtár segítségével. További tervezett funkciók: az adatsorok szűrése valamelyik statisztika alapján: például az átlag feletti elemek leválogatása. Sok funkcionális programozási elemet használok, valamint a jQuery-hez hasonló felépítésű a könyvtáram. Metóduslánccal és hasonló elegáns technikákkal.
{: .update}

* [simpleCalc](https://github.com/SalsaBoy990/simpleCalc): számológép, ami a 4 alapművelet számítására képes tetszőleges kombinációban és zárójelekkel. [Megnyitás](/simpleCalculator.html)
* [simpleColor](https://github.com/SalsaBoy990/simpleColor): RGB szín invertáló és RGB-hexa konverziós program. [Megnyitás](/simpleColor.html)