---
layout: page
title: Magamról
permalink: /about/
weight: 4
---

Gulácsi András vagyok, 1990-ben születtem Szegeden, geográfus és okleveles környezetkutató végzettséggel rendelkezem. Szakterületem a távérzékelés és a térinformatika.

Jelenleg a Szegedi Tudományegyetem Földtudományok Doktori Iskolájában vagyok doktorandosz hallgató.

A jövőben webfejlesztőként (**Frontend**) szeretnék elhelyezkedni.


Egyszerű statikus honlapok készítését vállalom némi fizetésért cserébe (megbeszélés szerint). A statikus honlapokat úgy értem, hogy semmi adatbázis, fórum, hozzászólási lehetőség, chat stb. nincsen bennük, mert ezekhez nem értek. Ezek helyettesítésére a [Facebook](https://www.facebook.com/) tökéletesen alkalmas.


Állásajánlattal kapcsolatos megkereséseket az e-mail címemre várom: [gulandras90@gmail.com](mailto:gulandras90@gmail.com). Az önéletrajzomat lásd alább:


<br/>

### Gulácsi András

<div class="table-columns">
    <ul>
        <li>Lakóhely: Szeged</li>
        <li>Telefon: +36/20/442-7225</li>
        <li>E-mail: <a title="Az e-mail címem" href="mailto:gulandras90@gmail.com">gulandras90@gmail.com</a></li>
        <li id="age"></li>
    </ul>
    <span>
    <img class="profile-picture" src="{{ site.url}}/assets/me-min.jpg" alt="It's me."/></span>
</div>

<script type="text/javascript">
/*global document */
/* Calculate my age. */
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
        document.getElementById(id).innerHTML = "Életkor: " + age;
    } else {
        document.getElementById(id).innerHTML = "Életkor: " + age;
    }
    return;
}
</script>
<script>window.onload = getAge(1990, 8, 2,"age");</script>

<h4>Erősségeim, referenciák</h4>
<ul class="lista">
	<li>Objektum orientált programozás: <strong>C/C++</strong> és <strong>JavaScript</strong> alapok</li>
    <li><strong>Frontend</strong> webfejlesztés, <strong>HTML</strong>, <strong>CSS</strong>, Sass</li>
    <li>A <strong>jQuery</strong> framework és <strong>Node.js</strong> ismerete</li>
    <li><strong>GIT</strong> és <strong>Jekyll</strong> alapismeretek</li>
    <li>Responsive Design alkalmazása (media query, CSS columns)</li>
    <li>Google Earth Engine API és a Google Maps API ismerete</li>
    <li>Szoftverek: <strong>Visual Studio Code</strong>, Code::Blocks, MS Visual Studio </li>
	<li><a href="https://github.com/SalsaBoy990/MyWorks" target="_blank">Munkáim a GitHub-on!</a></li>
</ul>

<h4>Nyelvismeret</h4>
<ul class="lista">
    <li><strong>Angol</strong>: alapfok (az informatikai szaknyelvet is értem)</li>
	<li>Német: felsőfok (nem aktív a nyelvtudásom) </li>
</ul>

<h4>Tanulmányok</h4>
<ul class="lista">
	<li><strong>2017 – :</strong><br />SZTE TTIK Földtudományok Doktori Iskola, doktorandusz</li>
	<li><strong>2014 – 2016:</strong><br />SZTE TTIK Környezettudományi Intézet, környezettudomány MSc szak (tájértékelés és tájvédelem szakirány), mesterdiploma</li>
	<li><strong>2010 – 2013:</strong><br />SZTE TTIK Természeti Földrajzi és Geoinformatikai Tanszék, földrajz BSc (geoinformatika szakirány), alapdiploma</li>
	<li><strong>2005 – 2010:</strong><br />Tömörkény István Gimnázium és Művészeti Szakközépiskola, Magyar-német kéttannyelvű osztály nyelvi előkészítő évvel, érettségi bizonyítvány</li>
</ul>

<h4>Szakmai tapasztalat</h4>
<ul class="lista">
	<li><strong>2015:</strong><br />A Meló Diák közvetítőcégen keresztül a Florin Vegyipari és Kereskedelmi Zrt.-nél diákmunka, 3 hónap</li>
	<li><strong>2014:</strong><br />Alsó-Tisza-vidéki Vízügyi Igazgatóság Vízvédelmi és Vízgyűjtőgazdálkodási Osztály, 4 hetes szakmai gyakorlat</li>
	<li><strong>2012:</strong><br />Bács-Kiskun Megyei Erdészeti Igazgatóság szegedi kirendeltsége, 6 hetes szakmai gyakorlat</li>
</ul>

<h4>Szakmai elismerések</h4>
<ul class="lista">
	<li>A 2016. évi XV. Országos Felsőoktatási Környezettudományi Diákkonferencia Levegőkörnyezet szekciójában kapott <strong>2. helyezés</strong>. Szeged, 2016. április 1.</li>
	<li>Az SZTE TTIK által rendezett 2015. évi Környezettudományi Diákköri Konferencia I. szekciójában <strong>1. helyezés</strong>. Szeged, 2015. október 26.</li>
	<li>A 2015. évi XXXII. Országos Tudományos Diákköri Konferencia Fizika, földtudományok és matematika szekciója geoinformatika és távérzékelés tagozatában kapott <strong>különdíj</strong>. Kolozsvár, 2015. április 18.</li>
	<li>Az SZTE TTIK által rendezett 2014. évi őszi Tudományos Diákköri Konferencia földrajz-földtudomány I. szekciójában <strong>1. helyezés</strong>. Szeged, 2014. október 20.</li>
</ul>

<h4>Tudományos publikációk</h4>
<ul class="lista">
	<li><a href="https://vm.mtmt.hu//search/slist.php?nwi=1&inited=1&ty_on=1&url_on=1&cite_type=2&orderby=3D1a&location=mtmt&stn=1&AuthorID=10059234" target="_blank">Teljes publikációs lista</a></li>
</ul>

<h4>Szabadidő</h4>
<ul class="lista">
	<li>Tánc (kubai salsa, bachata és kizomba): <a title="A Dolce Dance Tánciskola facebook oldala" href="https://www.facebook.com/dolce.dance.salsa.tanciskola/?fref=ts" target="_blank">Dolce Dance Tánciskola</a></li>
	<li>Kung fu: <a title="A kung fu iskola facebook oldala" href="https://www.facebook.com/Szegedi-Shaolin-Kung-Fu-Iskola-122359341211967/?fref=ts" target="_blank">Chang Dung Sheng Shaolin Kung Fu</a></li>
	<li>Írás és olvasás</li>
	<li>Futás, kettlebell, kerékpározás</li>		
</ul>
