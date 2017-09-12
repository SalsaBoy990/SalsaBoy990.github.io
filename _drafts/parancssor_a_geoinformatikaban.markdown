---
layout: post
comments: true
title: "SAGA GIS és GDAL: Földrajzi adatfeldolgozás a parancssorban"
excerpt: ""
tags: "sagagis"
categories: tudomany
---


## 1. Bevezetés

A SAGA mozaikszó a System for Automated Geoscientific Analyses (Automatizált Földtudományi Elemző Rendszer) rövidítése.
A SAGA GIS egy C++-ban írt szabad forráskódú térinformatikai szoftver. A legújabb verzió az **5.0**. Bővebb információért keressétek fel a program [honlapját](http://www.saga-gis.org/en/index.html).

A **SAGA GIS térinformatikai szoftver** kifejlesztésének elképzelése az 1990-es évek végén született meg a németországi Göttingeni Egyetem Természetföldrajzi Tanszékén. A kutatási projektek középpontjában a raszteres adatok, azon belül is kifejezetten a digitális domborzatmodellek, elemzése volt, amit többek közt a talajtulajdonságok, terep által irányított folyamatok, valamint éghajlati paraméterek modellezésére, előrejelzésére használtak. A SAGA GIS fejlesztése Jürgen Böhner és Olaf Conrad vezetésével történt és történik napjainkban is.

A kereskedelmi szoftverek közül az ERDAS Imagine ingyenes alternatívája lehet a SAGA GIS.

A [GDAL](http://www.gdal.org/) (Geospatial Data Abstraction Library) egy szabad forrású földrajzi adatfeldolgozó szoftverkönyvtár, ami számos vektoros és raszteres adatokat manipuláló modult tartalmaz, amelyek a paranccssorban vagy valamilyen héjalkalmazáson ([OSGeo4W Shell](https://trac.osgeo.org/osgeo4w/)) keresztül érhetők el. A gépemen lévő változat a [Quantum GIS (QGIS)](http://www.qgis.org/hu/site/) szabad forráskódú térinformatikai szoftver mellett települ fel (ugyanis a QGIS is használja a GDAL moduljait), és az **OSGeo4W Shell** héjalkalmazáson keresztül futtatom. A **GDAL verzióm: 1.11.2** (2015. február 10.). A QGIS 2.8.1-Wien változatot telepítettem fel. A legújabb kiadáshoz már biztosan egy újabb GDAL verzió jár. Ezzel nem teszteltem le a szkriptjeimet.

A fenti verziókat használtam a parancssori szkriptek futtatására, tehát más verziókkal nem 100%, hogy tökéletesen működnek.

<br />

## 2. Adat és módszer

Egy 15 éves 2000 és 2015 közötti műholdas adatsort használtam fel a parancssori földrajzi adatfeldolgozás demostrálására. A Terra műhold MODIS szenzorának [250 méteres felbontású, 16 napos EVI és NDVI kompozitképeit](https://lpdaac.usgs.gov/dataset_discovery/modis/modis_products_table/mod13q1_v006) (`MOD13Q1: MODIS/Terra Vegetation Indices 16-Day L3 Global 250 m SIN Grid V005`) elemeztem a Duna-Tisza-közi erdőterületekre, amelyek az Európai Uniós [CORINE](https://www.eea.europa.eu/publications/COR0-landcover) (Coordination of Information on the Environment) felszínborítási adatbázis segítségével lettek lehatárolva.
Az EU tagállamok nagyjából 6 évente felmérik a felszínborítás változásait különböző felszínborítási kategóriák szerint, 1:100 000-es méretarányban. A CLC_2000 (a 2000-05 közötti), a CLC_2006 (a 2006-11 közötti) és a CLC_2012 (2012-től kezdődő műholdképekre) adatok alapján határoltuk le az erdőket.


Azokat a 250*250 méteres cellákat válogattuk le, aminek legalább 2/3 részét erdő borította. Külön vizsgáljuk a lomb-, a tűlevelű és az elegyes erdőket. A cél a vegetáció egészségi állapotának monitorozása a szárazodó Homokhátságon március vége és szeptember vége között. Az 1970-es évektől számítva a talajvízkút-hálózat mérései szerint átlagosan 3 méterrel süllyedt a régióban a talajvízszint (a magasabban fekvő térségekben ennél nagyobb csökkenés is megfigyelhető).


A 16 napos kompozitképeket úgy kell érteni, hogy a 16 nap alatt készült összes felvételből raknak össze egy képet: a legjobb minőségű, azaz tiszta, felhőktől mentes értékeket használják fel minden egyes cellára (pixelre). A legnagyobb hátulütője az optikai (a látható és az infravörös tartományban mérő) szenzoroknak, hogy a felhőkön nem látnak át, szemben a lézeres vagy radaros mérésekkel szemben. A kompozit készítésével sokkal teljesebb adatokat kapunk, hiszen egy hosszabb időszakra nézve valószínűbb, hogy lesznek olyan felhőmentes képek, amelyek lefedik a földfelszín nagy részét, így használható információkat nyerhetünk.

Mik azok a spektrális indexek?


NDVI = (ρNIR − ρred) / (ρNIR + ρred)
NDWI = (ρNIR − ρSWIR) / (ρNIR + ρSWIR)	
ahol NDVI normalizált differenciált vegetációindex, NDWI normalizált differenciált vízindex, ami a növényzeti nedvességtartalmat fejezi ki, ρred a látható vörös sáv (620-670 nm), ρNIR a közeli infravörös sáv (841-876 nm), és ρSWIR az egyik középső infravörös sáv (2105-2155 nm).

<br />

## 3. Feldolgozás a parancssorban

A Windows parancssorban úgynevezett [**kötegelt állományokat**](https://hu.wikipedia.org/wiki/K%C3%B6tegelt_%C3%A1llom%C3%A1ny) futtatok. Egyszerű és hatékony kis programokat lehet batch-ban írni. Az általában .cmd vagy .bat kiterjesztésű kötegelt állományokat (angolból átvett néven [batch fájlokat](https://hu.wikipedia.org/wiki/Batch_programoz%C3%A1s)) Windows, OS/2, és MS-DOS rendszerekben szokták használni. Formailag egy szövegfájlhoz hasonlítanak, tartalmuk pedig parancsok (DOS/Windows parancsok) egymásutánja. Futtatásuk a tartalom sorról sorra való olvasásával történik például a **cmd.exe**-vel a Windows operációs rendszer alatt. A SAGA GIS parancssorban is futtatható, de célszerű kötegelt fájlkánt futtatni az utasítások sorozatát.

<br />

### 3.1. SAGA GIS (saga_cmd)

<pre><code class="language-batch">REM @ECHO OFF
ECHO
REM *****************************************************************
REM Create mean and median images and clip them with polygons
REM Author: András Gulácsi
REM E-mail: admin@newgeographer.com
REM Date: September 10th, 2017
REM SAGA GIS és GDAL: Földrajzi adatfeldolgozás a parancssorban
REM link
REM *****************************************************************
REM *************** PATHS ******************
REM Path to saga_cmd.exe
set PATH=%PATH%;g:\saga-5.0.0_x64\

REM Path to working dir
SET WORK=g:\modis\2005\EOV_2005\ndvi\
SET RESULT=g:\modis\TEMP
SET SHAPES=g:\modis\
SET POLYGON=00_l_250_66sz_poli.shp
SET POSTFIX=_00_l
REM ****************************************
</code></pre>

`saga_cmd io_gdal 0`


<pre><code class="language-batch">FOR /F %%i IN ('dir /b %WORK%\*.tif') DO (

REM Tool: Import Raster

saga_cmd io_gdal 0 ^
-GRIDS=%WORK%\%%i.sgrd ^
-FILES=%WORK%\%%i ^
-TRANSFORM=0

)
</code></pre>

<img src="{{ site.url }}/assets/sagagis/excel.png" class="large" alt="Elérési utak, fájlnevek generálása az ÖSSZEFŰZ() függvény segítségével"/>



**Ha van egy bonyolult probléma és ha lehetséges, akkor mindig térj vissza egy olyan megoldáshoz, amit már ismersz!**


<pre><code class="language-batch">REM Tool: Statistics for Grids

saga_cmd statistics_grid 4 ^
-GRIDS=%WORK%\NDVI2005081_eov_kiv.tif.sgrd;%WORK%\NDVI2005097_eov_kiv.tif.sgrd;%WORK%\NDVI2005113_eov_kiv.tif.sgrd;%WORK%\NDVI2005129_eov_kiv.tif.sgrd;%WORK%\NDVI2005145_eov_kiv.tif.sgrd;%WORK%\NDVI2005161_eov_kiv.tif.sgrd;%WORK%\NDVI2005177_eov_kiv.tif.sgrd;%WORK%\NDVI2005193_eov_kiv.tif.sgrd;%WORK%\NDVI2005209_eov_kiv.tif.sgrd;%WORK%\NDVI2005225_eov_kiv.tif.sgrd;%WORK%\NDVI2005241_eov_kiv.tif.sgrd;%WORK%\NDVI2005257_eov_kiv.tif.sgrd;%WORK%\NDVI2005273_eov_kiv.tif.sgrd ^
-MEAN=%RESULT%\atlag.sgrd ^
-PCTL=%RESULT%\median.sgrd ^
-PCTL_VAL=50
</code></pre>



<pre><code class="language-batch">REM Tool: Clip Grid with Polygon

saga_cmd shapes_grid 7 ^
-INPUT=%RESULT%\atlag.sgrd ^
-OUTPUT=%RESULT%\atlag%POSTFIX%.sgrd ^
-POLYGONS=%SHAPES%\%POLYGON% ^
-EXTENT=0

saga_cmd shapes_grid 7 ^
-INPUT=%RESULT%\median.sgrd ^
-OUTPUT=%RESULT%\median%POSTFIX%.sgrd ^
-POLYGONS=%SHAPES%\%POLYGON% ^
-EXTENT=0
</code></pre>

<img src="{{ site.url }}/assets/sagagis/saga_results.png" class="large" alt="A mintaterületek sikeresen kivágva az átlagképből"/>


<pre><code class="language-batch">REM Tool: Export GeoTIFF

saga_cmd io_gdal 2 ^
-GRIDS=%RESULT%\atlag%POSTFIX%.sgrd ^
-FILE=%RESULT%\atlag%POSTFIX%.tif

saga_cmd io_gdal 2 ^
-GRIDS=%RESULT%\median%POSTFIX%.sgrd ^
-FILE=%RESULT%\median%POSTFIX%.tif


PAUSE
</code></pre>

### 3.2. Virtuális raszter készítése GDAL-ban


<img src="{{ site.url }}/assets/sagagis/shell.png" class="image3" alt="Az OSGeo4W Shell felülete: a gdalbuildvrt használati útmutatója kiíratva"/>

## Összefoglalás
<br />