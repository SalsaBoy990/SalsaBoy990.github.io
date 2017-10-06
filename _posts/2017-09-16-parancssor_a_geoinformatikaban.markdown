---
layout: post
comments: true
title: "Földrajzi adatfeldolgozás a parancssorban: a SAGA GIS és a GDAL"
excerpt: "A parancssor ismerete elengedhetetlen minden webfejlesztő és geoinformatikus számára! Ebben a tutoriálban a parancssori adatfeldolgozásra mutatok egy példát a szabad forráskódú SAGA GIS és GDAL alkalmazásával Windows operációs rendszer alatt. Egy 17 éves MODIS vegetációs index adatsort dolgozok fel egy batch szkript segítségével."
date:   2017-09-16 20:50
tags: "sagagis"
categories: tudomany
---


A SAGA mozaikszó a System for Automated Geoscientific Analyses (Automatizált Földtudományi Elemző Rendszer) rövidítése.
A [SAGA GIS](http://www.saga-gis.org/en/index.html) egy C++-ban írt szabad forráskódú térinformatikai szoftver. A legújabb, **5.0**-ás verziót használtam a tutoriálhoz.

A **SAGA GIS térinformatikai szoftver** kifejlesztésének ötlete az 1990-es évek végén született meg a németországi Göttingeni Egyetem Természetföldrajzi Tanszékén. A tanszéken futó kutatási projektek középpontjában a raszteres adatok, azon belül is kifejezetten a digitális domborzatmodellek, elemzése volt, amit többek közt a talajtulajdonságok, terep által irányított folyamatok, valamint éghajlati paraméterek modellezésére, előrejelzésére használtak. A SAGA GIS-t tehát kifejezetten raszteres adatokfeldolgozására, elemzésére írták. A SAGA GIS fejlesztése *Jürgen Böhner* és *Olaf Conrad* vezetésével történt és történik napjainkban is.

A kereskedelmi szoftverek közül az ERDAS Imagine ingyenes alternatívája lehet a SAGA GIS.

A [GDAL](http://www.gdal.org/) (Geospatial Data Abstraction Library) egy szabad forrású földrajzi adatfeldolgozó szoftverkönyvtár, ami számos vektoros és raszteres adatokat manipuláló modult tartalmaz, amelyek a paranccssorban vagy valamilyen héjalkalmazáson ([OSGeo4W Shell](https://trac.osgeo.org/osgeo4w/)) keresztül érhetők el. A gépemen lévő változat a [Quantum GIS (QGIS)](http://www.qgis.org/hu/site/) szabad forráskódú térinformatikai szoftver mellett települ fel (ugyanis a QGIS is használja a GDAL moduljait), és az **OSGeo4W Shell** héjalkalmazáson keresztül futtatom. A **GDAL verzióm: 1.11.2** (2015. február 10.). A QGIS 2.8.1-Wien változatot telepítettem fel.

A fenti verziójú alkalmazásokat használtam a parancssori szkriptek futtatására, tehát más verziókkal nem 100%, hogy tökéletesen működnek.

<br />

## 1. Adat és módszer

Egy 15 éves 2000 és 2016 közötti műholdas adatsort használtam fel a parancssorban történő adatfeldolgozás demonstrálására. A NASA Terra műhold MODIS szenzorának [250 méteres felbontású, 16 napos EVI és NDVI kompozitképeit](https://lpdaac.usgs.gov/dataset_discovery/modis/modis_products_table/mod13q1_v006) (`MOD13Q1: MODIS/Terra Vegetation Indices 16-Day L3 Global 250 m SIN Grid V005`) dolgoztam fel a Duna-Tisza-közi erdőterületekre, melyeket az Európai Uniós [CORINE](https://www.eea.europa.eu/publications/COR0-landcover) (Coordination of Information on the Environment) felszínborítási adatbázis segítségével határolt le a témavezetőm (*Dr. Kovács Ferenc*).
Az EU tagállamok nagyjából 6 évente felmérik a felszínborítás változásait különböző felszínborítási kategóriák szerint, 1:100 000-es méretarányban. A `CLC_2000` (a 2000-05 közötti), a `CLC_2006` (a 2006-11 közötti) és a `CLC_2012` (2012-től kezdődő műholdképekre) adatok alapján lettek lehatárolva az erdők.


Azokat a 250*250 méteres cellákat válogattuk le, aminek legalább 2/3 részét erdő borította. Külön vizsgáljuk a lomb-, a tűlevelű és az elegyes erdőket. A cél a vegetáció egészségi állapotának monitorozása, valamint trendszerű változásainak kimutatása a szárazodó Homokhátságon március vége és szeptember vége között. Az 1970-es évektől számítva a talajvízkút-hálózat mérései szerint átlagosan 3 méterrel süllyedt a régióban a talajvízszint (a magasabban fekvő térségekben ennél nagyobb csökkenés is megfigyelhető, de kizárólag csak ott).


A 16 napos kompozitképeket úgy kell érteni, hogy a 16 nap alatt készült összes felvételből raknak össze egy képet: a legjobb minőségű, azaz tiszta, felhőktől mentes értékeket használják fel minden egyes cellára (pixelre). A legnagyobb hátulütője az optikai (a látható és az infravörös tartományban mérő) szenzoroknak, hogy a felhőkön nem látnak át, szemben a lézeres vagy radaros mérésekkel. A kompozit készítésével sokkal teljesebb adatokat kapunk, hiszen egy hosszabb időszakra nézve valószínűbb, hogy lesznek olyan felhőmentes képek, amelyek lefedik a földfelszín nagy részét, így használható információkhoz jutunk.

Az **EVI** (Enhanced Vegetation Index, Továbbfejlesztett Vegetációindex) és az **NDVI** (Normalized Difference Vegetation Index, [Normalizált Vegetációindex](https://www.agroinform.hu/gazdasag/hogyan-hasznosithatom-a-vegetacios-index-kepeket-demo-32500-001)) spektrális index. A [**spektrális indexek**](http://www.geo.u-szeged.hu/~feri/kornyezeti_informatika/ch10s02.html) olyan származtatott mérőszámok, amelyek a műholdkép-sávokon (például látható kék, látható zöld, látható vörös, közeli, középhullámú és hosszúhullámú, azaz termális infravörös hullámhossz-tartományú sávok) végzett aritmetikai műveletek (osztás, szorzás, kivonás, összeadás) eredményeképpen állnak elő.

A műholdkép sávok értékei reflektancia értékek, vagyis a különböző hullámhossz tartományokban mért, felszínre beérkező és onnan visszaverődő sugárzás hányadosai (0 és 1 közötti értékek lehetnek). Például a hófelszín a beérkező napsugárzás 90%-át veri vissza a látható hullámhossz-tartományban. Ezzel szemben a homok csak 30-40%-ot ver vissza, ezért nem csoda, hogy nyáron nagyon felforrósodik a tűző napon. A különböző felszínek/anyagok másképpen vernek vissza a különböző hullámhosszakon. Ez azért fontos, mert ennek segítségével jól el tudjuk határolni egymástól a felszínborítás-típusokat és feltérképezni a változásokat.

A vegetációs indexek segítségével a levélzetben bekövetkező biológiai változásokat számszerűsíthetjük (cifrán mondva: kvantifikálhatjuk). Szoros kapcsolat áll fenn a levélzet klorofilltartalma és a vegetációs indexek értékei között. A vegetációs indexeket az 1970-es évek eleje óta használják a növényzet/biomassza változásainak értékelére (*Rouse, J. W. et al. 1973*).

A klorofill molekulák (klorofill-a és klorofill-b) a zöld színtestekben (kloroplasztisz) találhatók. A kloroplasztisz a szén-dioxidból és a vízből fény hatására cukrot (glükózt) állít elő. Ez a fotoszintézis folyamata. A klorofill molekulák nagyon fontos szerepet töltenek be a növények energiatermelő folyamataiban, ugyanis ezek nyelik el (abszorbeálják) a látható vörös és kék tartományba eső napfényt. (A zöld tartományban viszont nagy a visszaverődés, és [innen a levelek zöld színe.](http://miert.webclub.hu/miert-zoldek-a-levelek)) Az így elnyelt fotonok energiáját összegyűjtik és továbbítják a fotoszintézis enzimei, fehérjéi felé.

**Egészséges vegetáció** esetén magas a klorofilltartalom a levelekben. Ilyenkor **a látható vörös tartományban nagyon alacsony a reflektancia** (a visszaverődés), hiszen a klorofill elnyeli a sugárzást. Ezzel szemben, a közeli infravörös tartományban reflektancia csúcs jelentkezik, ugyanis itt a levélzet erősen visszaverő. **A vegetációindexek a vörös és a közeli infravörös sáv reflektanciaértékei közötti különbségen alapszanak.**

**A hosszan tartó szárazság, illetve aszály hatására** a növény nem jut elegendő vízhez, ezért a levelek elkezdenek sárgulni-barnulni, csökken a klorofill-tartalmuk, a fotoszintetikus aktivitás lecsökken. Ilyenkor **a klorofill kevesebb vörös tartományú fényt nyel el, tehát a reflektancia itt megnő.** Ezzel együtt a közeli infravörös tartományban is csökken egy kicsit a reflektancia, vagyis **kisebb lesz a különbség a két sáv értékei között.** A magasabb vegetációindex értékek nagyobb klorofill tartalmat, míg a kisebbek lecsökkent klorofilltartalmat jeleznek. Másképpen kifejezve, egyenes arányosság áll fenn az indexértékek és a fotoszintetikus aktivitás között.

A vegetációs indexek esetén szokás normalizálást alkalmazni, amivel [-1; +1] intervallumba transzformáljuk az értékeket. Ez azért előnyös, mert különböző lejtőszög és megvilágítás hatásait kiküszöbölhetjük vele.

Az [EVI index](https://en.wikipedia.org/wiki/Enhanced_vegetation_index) a hagyományos NDVI továbbfejlesztett, optimalizált változata, melynek számításához a közeli infravörös és a vörös sávok mellett a kék sávot is felhasználják azon célból, hogy javítsák a talaj háttérjeleket és csökkentsék a légköri befolyásokat, mint például az aeroszol szétszóródást.

Itt vannak a vegetációindexek képletei:

`NDVI = (NIR − Red) / (NIR + Red)`

`EVI = G * ((NIR − Red) / (NIR + C1 * Red − C2 * Blue + L))`

ahol `NIR` a közeli infravörös sáv (841-876 nm), `Red` a látható vörös sáv (620-670 nm) és `Blue` a látható kék sáv (459-479 nm).  nm: nanométer, `10^-9` m. A korrekciós együtthatók értékei `C1 = 6`, `C2 = 2,5`, `L = 1` és `G = 7,5`.

<br />

## 2. Feldolgozás a parancssorban

A Windows parancssorban úgynevezett [**kötegelt állományokat**](https://hu.wikipedia.org/wiki/K%C3%B6tegelt_%C3%A1llom%C3%A1ny) futtatok. Egyszerű és hatékony kis programokat lehet batch-ban írni. Az általában .cmd vagy **.bat** kiterjesztésű kötegelt állományokat (angolból átvett néven [batch fájlokat](https://hu.wikipedia.org/wiki/Batch_programoz%C3%A1s)) Windows, OS/2, és MS-DOS rendszerekben szokták használni. Formailag egy szövegfájlhoz hasonlítanak, tartalmuk pedig parancsok (DOS/Windows parancsok) egymásutánja. Futtatásuk a tartalom sorról sorra való olvasásával történik például a **cmd.exe**-vel a Windows operációs rendszer alatt. A SAGA GIS parancssorban is futtatható, de célszerű kötegelt fájlként futtatni az utasítások sorozatát.

<br />

### 2.1. SAGA GIS (saga_cmd)

A SAGA GIS moduljai a parancssorban is elérhetők. Ha írunk egy programot vagy egy szkriptet, akkor mindig adjuk meg kommentekben, hogy mit csinál a program, milyen probléma megoldására írtuk! A batch-ban a `REM` paranccsal tudunk kommentet elhelyezni a szkriptünkbe. Ezeket a számítógép parancsértelmezője figyelmen kívül hagyja. Az `ECHO` (visszhang) parancs üzeneteket jelenít meg a kijelzőn (a kommenteket és a parancsokat). Alapértelmezetten `ON` módban van (`ECHO ON`), de ki is kapcsolható az `ECHO OFF` paranccsal. Az `@` jel azt a célt szolgálja hogy az `echo off`-ot tartalmazó sorra is kikapcsolja a visszhangot. A parancsokat kisbetűsen és nagybetűsen is írhatjuk.

He beírjátok a parancssorba, hogy `help`, akkor kilistázza az összes parancsot és rövid leírásukat, valamint útmutatókat a használatukról. Ha pedig a `help parancs_neve` sort írátok be, akkor még részletesebb magyarázatot kaptok a parancs használatáról. [Ezen a linken](https://www.tutorialspoint.com/batch_script/batch_script_quick_guide.htm) egy jó tutoriált találtok a batch használatáról.

A helyi változók a felhasználó által megadott azonosítók, melyek az értékadás során jönnek létre. Értékadás a `SET` parancs segítségével történik az alábbi szintaxis szerint: `SET azonosito = ertek`. A helyi változók csak az adott programban érvényesek. A változók értéke rejtve marad, ha a visszhang ki van kapcsolva az `echo off` parancs segítségével.

A környezeti változók (például a `PATH` a futtatható fájlok keresési útja) a gép működésére nézve fontos információkat tartalmaznak. A szkriptünkben külső programokat (a SAGA GIS moduljait) futtatunk. Ezeknek vannak bemenő parancssori argumentumai, amiket meg kell adni.

Ahhoz, hogy hozzáférjünk a SAGA modulokhoz, ideiglenesen módosítanunk kell a `PATH` környezeti változót, hogy az a **`saga_cmd.exe`** elérési útjára mutasson (`set PATH=%PATH%;g:\saga-5.0.0_x64\`). Csak így tudjuk meghívni a programot. A `SETLOCAL` parancs segítségével lokálissá tehetjük a `PATH` változónkat, így csak a szkriptünkben lesz látható, vagyis kívülről nem lesz hozzáférhető.

Évenként dolgozom fel az adatokat, tehát minden év esetén módosítani kell egy kicsit a változókat! Itt van a programom eleje:

<pre><code class="language-batch">REM @ECHO OFF
REM *****************************************************************
REM Create mean and median images and clip them with polygons
REM Author: András Gulácsi
REM E-mail: admin@newgeographer.com
REM Date: September 10th, 2017
REM SAGA GIS és GDAL: Földrajzi adatfeldolgozás a parancssorban
REM http://www.newgeographer.com/tudomany/2017/09/16/parancssor_a_geoinformatikaban.html
REM *****************************************************************
REM *************** PATHS ******************
REM Path to saga_cmd.exe
SETLOCAL
set PATH=%PATH%;g:\saga-5.0.0_x64\

REM Path to working dir
SET WORK=g:\modis\2005\EOV_2005\ndvi\
SET RESULT=g:\modis\TEMP
SET SHAPES=g:\modis\
SET POLYGON=00_l_250_66sz_poli.shp
SET POSTFIX=_00_l
SET YEAR=2005
REM ****************************************
</code></pre>

Létrehoztam néhány fontos változót a fájlok elérési útjait/nevét eltárolva bennük. A `WORK` a bemenő képfájlok (GeoTIFF-ben), a `SHAPES` a bemenő shape fájlok elérési útvonala. A `RESULT` az eredményfájlok kimenő útvonala, a `POLYGON` a shape fájl neve, amivel kivágjuk a mintaterületet a képből. Ez egy poligon típusú vektoros állomány.

A következő lépésben **egy `FOR` ciklus segítségével beolvassuk a bemenő fájlokat tartalmazó mappánkban található összes .tif állományt, majd átkonvertáljuk azokat a SAGA GIS saját fájlformátumába, .sgrd-be.** A `%WORK%` helyére a `WORK` változónk tartalma helyettesítődik be. A `*` az egy tetszőleges sztringet helyettesít, vagyis tetszőleges nevű, de .tif állományokat olvasunk be.

A `saga_cmd io_gdal 0` parancs a SAGA GIS **io_gdal** moduljának egyik eszközét hívja meg (raszter importálása). Ezután **a parancssori argumentumokat** kell megadnunk: `-GRIDS` (bemenő fájl), `-FILES` (eredményfájl), `-TRANSFORM` (transzformáció, ez nekünk nem kell). A `%%i` az éppen aktuális fájl nevét jelöli. A továbbiakban a .sgrd fájlokkal dolgozunk. A `^` **beszúrási jelre** azért van szükség, mert egy sorba kellene írni a parancsot, de a láthatóság kedvéért sortöréseket használtam. A `^` jel a sor végéhez hozzáfűzi a következő sort (a beszúrási jel és a rá következő újsor karakter törlődik). Fontos a sorköz a `^` előtt!


<pre><code class="language-batch">FOR /F %%i IN ('dir /b %WORK%\*.tif') DO (

REM Tool: Import Raster
saga_cmd io_gdal 0 ^
-GRIDS=%WORK%\%%i.sgrd ^
-FILES=%WORK%\%%i ^
-TRANSFORM=0

)
</code></pre>

A modulokról és azok használatáról a [SAGA GIS dokumentációban](http://www.saga-gis.org/saga_tool_doc/5.0.0/a2z.html) találhattok bővebb leírást.

A raszterállományokra (grid-ek) statisztikákat (átlagképeket, szórást stb.) a **Statistics for Grids** eszközzel számolhatunk. Argumentumként meg kell adni a bemenő grid-eket (amiket az előzőekben .sgrd-be alakítottunk át), valamint azokat a statisztikákat, amiket ki akarunk számolni (`-MEAN`, `-PCTL`). A `-PCTL` a percentilis rövidítése, ehhez tartozik egy másik argumentum (`-PCTL_VAL`), ahol meg kell adni, hogy hányadik percentilist akarjuk kiszámítani. Az 50. percentilis a medián, ami egyébként az alapértelmezett érték, tehát meg sem kéne adnunk külön.

Viszont van egy problémánk: évenként meg kell adnunk a 13 db kép teljes elérési útvonalát, amit begépelni kényelmetlen és időigényes volna. `FOR` ciklust itt nem használhatunk. Ilyenkor mit tehetünk? Van egy fontos alapelvem, ami így szól: **ha lehetséges, akkor mindig térj vissza egy olyan megoldáshoz, amit már ismersz!** Az Excelben mindenki ismeri a függvényeket. Az `ÖSSZEFŰZ()` függvény segítségével könnyedén legenerálhatjuk az elérési utakat, és csak az éveket kell átírni. Az összefűzött szöveget pedig egyben bemásoljuk a szkriptünkbe. (Itt zárójelben megjegyzem, ha esetleg valamelyikőtök nem tudná, hogy a .bat fájlokat úgy szerkeszthetjük, hogy átírjuk a fájlkiterjesztést .txt-re.). A grid-ek elérési útvonalait `;`-vel kell elválasztanunk egymástól.

<img src="{{ site.url }}/assets/sagagis/excel.png" class="large" alt="Elérési utak, fájlnevek generálása az ÖSSZEFŰZ() függvény segítségével"/>
<br />

<pre><code class="language-batch">REM Tool: Statistics for Grids

saga_cmd statistics_grid 4 ^
-GRIDS=%WORK%\NDVI2005081_eov_kiv.tif.sgrd;%WORK%\NDVI2005097_eov_kiv.tif.sgrd;%WORK%\NDVI2005113_eov_kiv.tif.sgrd;%WORK%\NDVI2005129_eov_kiv.tif.sgrd;%WORK%\NDVI2005145_eov_kiv.tif.sgrd;%WORK%\NDVI2005161_eov_kiv.tif.sgrd;%WORK%\NDVI2005177_eov_kiv.tif.sgrd;%WORK%\NDVI2005193_eov_kiv.tif.sgrd;%WORK%\NDVI2005209_eov_kiv.tif.sgrd;%WORK%\NDVI2005225_eov_kiv.tif.sgrd;%WORK%\NDVI2005241_eov_kiv.tif.sgrd;%WORK%\NDVI2005257_eov_kiv.tif.sgrd;%WORK%\NDVI2005273_eov_kiv.tif.sgrd ^
-MEAN=%RESULT%\atlag.sgrd ^
-PCTL=%RESULT%\median.sgrd ^
-PCTL_VAL=50
</code></pre>

Ezután az átlag- és mediánképekből ki kell vágnunk az erdőterületeket a poligonok segítségével. Erre a `shapes_grid` modul **Grid vágása poligonnal** eszközét használjuk. Meg kell adni a bemenetet, a kimenetet, a poligonokat tartalmazó shape fájlt és az `-EXTENT` argumentumot, ami a kimenő grid terjedelmét határozza meg. Mi ezt `0`-ra állítjuk. Ebben az esetben az eredeti terjedelmet megtartjuk. Ez az alapértelmezett beállítás:

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

<br />
Miután eredményül kaptuk a mintaterületünkre kivágott átlag- és mediánképeket, ki kell exportálnunk őket GeoTIFF-be. Ehhez megint csak az `io_gdal` modult használjuk. A `-GRIDS`-nél az exportálandó grid-et, a `-FILE`-nál a kimenő fájlt adjuk meg:

<pre><code class="language-batch">REM Tool: Export GeoTIFF

saga_cmd io_gdal 2 ^
-GRIDS=%RESULT%\atlag%POSTFIX%.sgrd ^
-FILE=%RESULT%\%YEAR%_atlag%POSTFIX%.tif

saga_cmd io_gdal 2 ^
-GRIDS=%RESULT%\median%POSTFIX%.sgrd ^
-FILE=%RESULT%\%YEAR%_median%POSTFIX%.tif

PAUSE
</code></pre>

A `PAUSE` paranccsal megállítjuk a szkript futását, hogy ne lépjen ki azonnal a konzolból, hanem várja meg egy billentyű lenyomását, és utána lépjen ki. Ez olyan, mint amikor a C-ben a `system("PAUSE");` utasítással tesszük ugyanezt. (Megjegyzendő, hogy C-ben [nem ajánlom ezt a megoldást]((http://www.cplusplus.com/articles/j3wTURfi/)), mert erőforrásigényes, nem biztonságos és csak Windows rendszeren működik. Ennél sokkal egyszerűbb a `getchar()`-t használni.)

A következő részben pedig az idősorok számtani átlagát és egyéb statisztikai jellemzőjét exportáljuk ki szöveges fájlba.

<br />
### 2.2. Virtuális raszter készítése GDAL-ban

Először létrehozunk egy virtuális raszter ([.vrt fájl, a GDAL saját formátuma](http://www.gdal.org/gdal_vrttut.html)) fájlkatalógust, ami XML formátumban tartalmazza az együtt kezelt képfájlok leíró adatait, de magukat az adatokat nem. Ezt a virtuális rasztert fogjuk megnyitni a SAGA GIS-ben.

Nyissunk az OSGeo4W héjalkalmazást és gépeljük be ezt a rövid parancsot egyben:

`gdalbuildvrt -separate g:\modis\TEMP\raszter\layer_stack.vrt g:\modis\TEMP\raszter\*.tif`

<img src="{{ site.url }}/assets/sagagis/shell.png" class="image3" alt="Az OSGeo4W Shell felülete: a gdalbuildvrt használati útmutatója kiíratva"/>
<br />

A `-separate` logikai argumentumot megadva külön sávokba helyezi a képeket (ha ezt lehagynánk, akkor virtuális mozaikot készítene nekünk a GDAL), utána következik a kimenet és a bemenet. Ebben a sorrendben! Az elérési útvonalakat pedig módosítsátok, ha szükséges.

Indítsuk el a **saga_gui.exe**-t, utána a menüsorban válasszuk ki a **File -> Open** parancsot (vagy a mappa ikonra is kattinthatunk a fájl megnyitásához) és nyissuk meg a virtuális raszterünket (`layer_stack.vrt`)! Utána navigáljunk el ide: **Geoprocessing -> Spatial and Geostatistics -> Grids -> Save Grid Statistics to Table**. Nyissuk meg az eszközt! A **Grid Systems**-nél adjuk meg grid rendszerünket (a raszter terjedelem és felbontás) a legördülő listából. Utána a **Grids**-nél a `...` gombra kattintva a felugró kéthasábos ablak bal oldali oszlopában válasszuk ki a képkötegünket és a dupla vagy a szimpla nyílra kattintva pakoljuk át a jobb oldali ablakba (így lesz kiválasztva), majd kattintsunk az oké gombra! A táblázat részt hagyjuk úgy, ahogy van. Végül válasszuk ki, hogy milyen statisztikákat számoljon a képekre, és kattintsunk az okéra.


<img src="{{ site.url }}/assets/sagagis/saga_gui_1.png" class="large" alt="Grid statisztikák mentése táblázatba eszköz"/>
<br />
A létrehozott táblázatra kattintsunk jobb egérgombbal és válasszuk ki a **„mentés mint”** opciót és mentsük el .txt formátumba. Ez utána könnyedén beilleszthető az MS Excel-be vagy más táblázatkezelő szoftverbe.


<img src="{{ site.url }}/assets/sagagis/saga_gui_2.png" class="large" alt="A statisztikákat tartalmazó táblázat exportálása szöveges formátumba"/>
<br />
Feltöltöttem nektek a Google Drive-ra a MODIS minta-adatbázisomat ([**modis_sample_data.rar**](https://drive.google.com/open?id=0B8pLujeireG7YjBmWTMtbm85UzQ), 561 MB, kitömörítve 2,71 GB), amin gyakorolhatjátok a parancssori adatfeldolgozást. A batch szkriptet megtaláljátok a [**saga_gis_batch**](https://github.com/SalsaBoy990/saga_gis_batch) repository-mban.

<br />
***Házi feladat:** Készíts egy tudományos színvonalú elemzést egy tetszőlegesen választott mintaterület erdőiben (pl. Keszthelyi-hegység) bekövetkezett változásokról az NDVI adatok alapján, 2000 és 2016 között! Milyen kapcsolat áll fenn a megfigyelt változások és az éves meteorológiai viszonyok között? (A minta-adatbázisban az ország egész területére megvannak az NDVI-képek.) A Keszthelyi-hegységet azért ajánlom mintaterületnek, mert ott egy igen jelentős erdőpusztulás következett be 2011-től kezdődően. Ennek okainak feltárása egy nagyon jó BSc-s szakdolgozat témája lehet.*

<br />

## Ajánlott irodalom

<ul class="no-decoration-18px">
    <li><em>Gulácsi A. - Kovács F. (2015).</em> <a href="http://www.tajokologiailapok.szie.hu/pdf/201502/04_Gulacsi_Kovacs.pdf">Aszályvizsgálat lehetősége MODIS műholdképekből számított spektrális indexekkel Magyarországon.</a>Tájökológiai Lapok 13(2), pp. 235-248.
    </li>
    <li>
    <em>Gulácsi A. - Kovács F. (2015).</em> <a href="http://publicatio.bibl.u-szeged.hu/11921/">Drought monitoring with spectral indices calculated from MODIS satellite images in Hungary.</a> Journal of Environmental Geography 8(3-4), pp. 11-20.
    </li>
    <li>
    <em>Rouse, J. W. - Haas, H. R. - Schell, A. J. - Deering, W. D. (1973).</em> <a href="https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/19740022614.pdf">Monitoring vegetation systems in the Great Plains
with ERTS.</a> Third ERTS Symposium, NASA SP-351 1. pp. 309–317. 
    </li>
</ul>
