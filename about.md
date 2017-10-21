---
layout: page
title: Magamról
permalink: /about/
weight: 4
---

<div>
  <div style="">
    <img class="profile-picture" src="{{ site.url}}/assets/basic/me-min.jpg" alt="It's me."/>
  </div>
  <div style="max-width:650px;">
    <p>Sziasztok! Gulácsi András vagyok (<span id="age"></span> éves), természettudós és író. Frontend/JavaScript fejlesztőnek készülök. Jelenleg PhD hallgató vagyok, de kész vagyok otthagyni az egyetemet.<br />
      <span>{% include placemark.svg %}</span>
      <span id="adress">Szeged, Magyarország</span>
    </p>
  </div>
</div>

<script type="text/javascript">
/* Function calculate my age. */
function getAge(year, month, day, id) {
    "use strict";
    var now = new Date();
    var then = new Date(year, month, day);
    var nowYear = now.getFullYear();
    var age = nowYear - then.getFullYear() - 1;
    var nowMonth = now.getMonth();
    var nowDay = now.getDate();
    if (nowMonth >= month && nowDay >= day) {
        age += 1;
        document.getElementById(id).innerHTML = age;
    } else {
        document.getElementById(id).innerHTML = age;
    }
    return;
}
</script>
<script>window.onload = getAge(1990, 8, 2,"age");</script>

<p style="clear: both"></p>

## Itt veheted fel velem a kapcsolatot

E-mail: <a title="e-mail" href="mailto:{{ site.email }}">{{ site.email }}</a>

Megtalálsz a [LinkedIn]({{ site.linkedin }})-en és a [GitHub](https://github.com/SalsaBoy990)-on is. Az önéletrajzomat [innen töltheted le](https://www.docdroid.net/cGLwe5U/gulacsiandrasoneletrajz2017.pdf).

## A munkáim
* [Egyszerű számológép (verzió: 1.0b)](/simpleCalculator.html)
* [RGB színinvertáló és hex-RGB konverter program (verzió: 1.0b)](/colours.html)