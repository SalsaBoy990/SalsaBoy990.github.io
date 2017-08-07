---
layout: post
title:  A Google Earth Engine felhő alapú platform alkalmazása a geoinformatikában, 1. rész.
date: 2017-08-07 17:26
categories: tudomany
---

**Korunkban már nem az adatok hiánya jelenti a földrajzi kutatások korlátját, hanem annak a tömérdek rendelkezésre álló és ingyenes távérzékelt adatnak a rendkívül hosszadalmas feldolgozása. Hiszen csak nagy mennyiségű, empirikus adatból lehet szilárd, megbízható tudományos következtetéseket levonni, és megbízható modelleket megalapozni. A Google Earth Engine felhő alapú számítási platform alkalmazásával szeretném demonstrálni az objektum-orientált programozás elengedhetetlen szükségét a geoinformatikában.**


<br />
## A Google Earth Engine bemutatása

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/4E6yQLoGO2o" frameborder="0"></iframe>
</center>

A **felhő alapú** (cloud computing) **szolgáltatások** közös jellemzője, hogy a szolgáltatásokat nem egy dedikált hardvereszközön üzemeltetik, hanem a szolgáltató eszközein elosztva, a szolgáltatás üzemeltetési részleteit a felhasználótól elrejtve. Ezeket a szolgáltatásokat a felhasználók **a hálózaton keresztül** érhetik el. A **Google Earth Engine** is egy ilyen felhő alapú szolgáltatás. Ez egy olyan szoftverszolgáltatási módszer, amelynél a szoftver és a kapcsolódó adatok központilag vannak tárolva (tipikusan egy (internet) felhőben, esetünkben a Google szerverein), ugyanakkor a felhasználói hozzáférések egy vékony **kliens**en keresztül zajlanak, amely leggyakrabban egy valamilyen **webböngésző alkalmazás**. Esetünkben ez a Google Earth Engine alkalmazásprogramozási felülete vagy interfésze (application programming interface, API). A Google Earth Engine API a JavaScript és a Python programozási nyelveket használja. A Python használatához telepítésre is szükség van. Csak a JavaScript klienssel foglalkozom.

<center>
    <img />
</center>

<p>A Google Earth Engine (a későbbiekben: GEE) felhő alapú platformját műholdképek és egyéb földi megfigyelési adatok feldolgozására hozták létre. Hozzáférést nyújt a Google képi adattáraihoz (909 terrabájtnyi, azaz majdnem 1 petabájtnyi (10<sup>15</sup> bájt) adat) és biztosítja azt a gigászi számítási teljesítményt, ami a képek feldolgozásához szükséges.</p>

A tudomány tekintélyes adat- és technológiai erőforrásokkal való párosítása több **előnnyel** jár:

1. **Példa nélküli sebesség:** még a legerősebb felhasználói számítógépekkel is napokba vagy hetekbe telik egy elemzés lefuttatása a földfelszín bármely nagyobb szegletére. A felhő alapú számítással nagyságrendileg lecsökken a számítási idő.
2.	**Könnyen használható és alacsony költségű:** egy internetes felület, amely könnyű hozzáférést nyújtva az adatokhoz (Landsat, MODIS, Sentinel stb.), a tudományos algoritmusokhoz és a számítási teljesítményhez. Drámaian lecsökkenti a földrajzi adatok elemzésének költségeit és összetettségét. Ez lehetővé teszi a magas befolyású, adat-vezérelte tudományt.

A GEE számítási módszere figyelemreméltóan hatékony: automatikusan párhuzamosítja az elemzéseket, így aztán számos számítógép CPU-ján egy időben futnak a Google adatközpontokban. A számításokat „lustán” hajtja végre, csak a kijelző megtöltéséhez vagy a kért értékek számításához szükséges bemenő adatokat kéri be. Ez az **éppen időben** (just-in-time) **megosztott számítási modell** lehetővé teszi az eredmények valós idejű felfedezését. A számítás után, az eredményeket gyorsítótárazza a memóriában azért, hogy az ugyanarra a műholdképre vagy értékre vonatkozó többszörös HTTP lekérések ne vezessenek fölösleges újraszámításhoz.

A GEE Code Editor fejlesztői környezet felületét a lenti kép mutatja: fent középen a **JavaScript kódszerkesztő**, alul a **térképnézet**, a bal felső ablakban a fülekkel a **szkriptkezelő** (Scripts), az **API dokumentáció** (Docs) és a **saját feltöltött adataink** (Assets) érhetők el. A jobb felső ablakban a **felügyelő** (Inspector) – pl. a térképre kattintva egy pont földrajzi koordinátáit írja ki –, a **konzol** (Console) – a `print()` függvény ide ír –, és a **feladatok** (Tasks) – pl. egy műholdkép GeoTIFF-be exportálása – jeleníthető meg a fülekre kattintva. A kódszerkesztő ablak fejlécében a **Get Link** gombra kattintva megkapjuk a szkriptünkre mutató egyedi html címet.

<center>
<img src="{{ site.url }}/assets/gee-800px-min.jpg" class="large" alt="Google Earth Engine kódszerkesztő" />
<figcaption>1. kép: A Google Earth Engine kódszerkesztője
</figcaption>
</center>

### Fontos tudnivalók

A GEE nem kereskedelmi célra ingyenesen elérhető, viszont a használata az **Earth Engine Kiértékelők** (Earth Engine Evaluators) számára korlátozott.

<ol>
    <li>A Google Earth Engine használatához <a href="https://accounts.google.com/SignUp?hl=hu" target="_blank">Google Fiók</a>kal kell rendelkezni.
    </li>
    <li>Egy űrlapot kell kitölteni <a href="https://signup.earthengine.google.com/" target="_blank">itt</a>. Kb. 1 hét alatt bírálják el, és adnak hozzáférést a platformhoz.
    </li>
</ol>

Csak ez a két lépés után tudod használni a Google Earth Engine-t.

A továbbiakban dióhéjban bemutatom a GEE működését. Az **objektum-orientált programozás** és a **JavaScript** nyelv rövid bemutatását egy későbbi blogbejegyzésben pótolom.


<br />
## Hogyan működik a Google Earth Engine?

### 1. Kliens kontra szerver

Fontos megkülönböztetni az **EE objektumokat** más JavaScript objektumoktól vagy elemi grafikus objektumoktól (ún. primitívek), amelyek a kódban lehetnek. A szerveren található objektumokat **kliens oldali „proxy” objektumok** (tárolók) manipulálásával lehet változtatni.  A webböngészőt hívjuk kliensnek: esetünkben ez a Google Earth Engine API. **Minden „ee”-vel kezdődő „valami” egy proxy objektum.** Ezek nem tartalmaznak semmilyen tényleges adatot, mert ezek csupán a szerveren található objektumok kezelői.


A következő példában a kliensSztring sztring típusú változót becsomagoljuk egy tárolóba (az `ee.Date()` konstruktorát hívjuk meg). Ezeket a tárolókat küldjük el a szervernek feldolgozásra!

{% highlight javascript %}
var kliensSztring = "2017-04-01";
print(typeof kliensSztring); //=> sztring
// Az ee.Date() konstruktorát meghívjuk.
var szerverSztring = ee.Date(kliensSztring);
print(
    "Ez egy EE objektum?",
    (szerverSztring instanceof ee.ComputedObject)
); //=> igaz
{% endhighlight %}



A dátum objektumok segítségével könnyedén le tudjuk válogatni a megadott időszakban készült műholdképeket a képkollekcióból (`ee.ImageCollection` osztály).


A szerver oldali objektumok és metódusok (tagfüggvények) szintaxisa `ee.Thing`, illetve `ee.Thing.method()`. Bármely másik objektum, ami nem „ee”-vel kezdődik az mind kliens oldali. Például a `print()`, a `Map`, az `Export` vagy a `Chart`. Mivel a kliens nem tudja, hogy mi található a szerver oldali `ee.Thing` objektumokban, így aztán **a rajtuk végzett for ciklusok és feltételes kifejezések (if-else) nem működnek!** Helyette a **szerver oldali** funkciókat kell használni:

{% highlight javascript %}
// Normalizált Differenciált Vegetációindex számítása.
var addNDVIBand = function (image) {
    "use strict";
    return function (image) {
        return image.addBands(
            image.normalizedDifference(["B5", "B4"])
                .rename("NDVI")
        );
    };
};

/* Landsat 8 kollekció szűrése, NDVI számítása az
 * összes képre a map() metódussal. */
var point = ee.Geometry.Point(19.064, 47.547);
var landsat = "LANDSAT/LC8_L1T_TOA_FMASK";

var filteredCollection = ee.ImageCollection(landsat)
    .filterBounds(point)
    .filterDate("2016-08-01", "2016-08-31")
    .map(addNDVIBand(landsat))
    // Növekvő sorrend a %-os felhőborítás alapján.
    .sort("CLOUD_COVER", true);
{% endhighlight %}

<br/>
### 2. Késleltetett végrehajtás

Ha egy szkriptet írunk, akkor a kód nem közvetlenül fut le az EE szerverein. Ehelyett, a kliens könyvtár (GEE API) átkódolja a szkriptet **JSON objektumok** sorozatává, majd ezeket elküldi a Google-nek, és válaszra vár. Semmi sem lesz elküldve a Google számára feldolgozásra, ha explicite nem adunk rá utasítást. Tehát fölöslegesen nem dolgoz fel semmit a szerver, ha nem utasítjuk rá. A `print()` vagy a `Map.addLayer()` utasítás már elegendő a kérés elküldéséhez:

{% highlight javascript %}
// Az első kép leválogatása (a legkevesebb felhő).
var first = filteredCollection.first();
var landsatImage = ee.Image(first);

// A kép tulajdonságainak kiírása a konzolra.
print(landsatImage);

var studyArea = ee.Geometry.Rectangle(
    19.1223,
    46.7513,
    19.2341,
    46.8884
);

// Megjelenítési paraméterek beállítása.
var vizParams = {
    bands: ["B5", "B4", "B3"],
    min: 0,
    max: 0.5,
    gamma: 1.3
};

// A 11. piramisszinthez tartozó felbontás 76 méter!
Map.setCenter(19.17826, 46.81987, 11);

// Megjelenítés a térképnézeten.
Map.addLayer(studyArea);
Map.addLayer(
    landsatImage.clip(studyArea),
    vizParams,
    "Landsat 8 hamis színes kompozit"
);
{% endhighlight %}

<br />
### 3. A lépték és a vetületek kezelése

Fontos tudnivaló, hogy a `Map.addLayer()` segítségével a térképen kirajzolt kép eltérő bemenetekből készül a nagyítási szint és a térképnézet határaitól függően. A lépték a GEE-ben **pixelméretet** jelent. A GEE az elemzés / a bemenő adat léptékét a kimenetből határozza meg, amit nekünk meg kell adnunk. A GEE ugyanis **képpiramisokat** használ, ahol minden egyes cella értéke egy adott piramisszinten az alatta levő szint 2x2-es blokkjának, azaz 4 cellájának az átlagértéke. Az aggregálás egy 256x256 cella felbontású képszelvényig történik. A GEE azt a piramisszintet választja, ami **legközelebb esik az általunk megadott léptékhez** (kisebb vagy egyenlő annál), és abból számol.

<center>
    <img src="{{ site.url }}/assets/keppiramisok.png" class="image2" alt="GEE képpiramisok" />
    <figcaption>2. kép: Google Earth Engine képpiramisok
    </figcaption>
    <figcaption>1. táblázat: Pixelméretek a különböző nagyítási szinteknél (0-20) a Google Mercator vetülete esetén (EPSG:3857). Ha Magyarországra akarunk vonatkoztatni, akkor a földrajzi szélesség koszinuszával be kell szorozni az értékeket. Például a 12-es nagyítási szintnél: 38·cos(47°) = 25,6 m.
    </figcaption>
    <table>
        <tr>
            <th width="40%">Nagyítási szint
            </th>
            <th width="60%">Pixelméret az Egyenlítőnél
            </th>
        </tr>
        <tr>
            <td>11</td>
            <td>76 m</td>
        </tr>
        <tr>
            <td>12</td>
            <td>38 m</td>
        </tr>
        <tr>
            <td>13</td>
            <td>19 m</td>
        </tr>
        <tr>
            <td>14</td>
            <td>9,6 m</td>
        </tr>
        <tr>
            <td>15</td>
            <td>4,8 m</td>
        </tr>
        <tr>
            <td>16</td>
            <td>2,4 m</td>
        </tr>
    </table>
</center>

A Google a térképek megjelenítéséhez a **Mercator vetületet** használja (WGS 84 / Pseudo-Mercator, EPSG:3857), így aztán a képpiramis megfelelő szintjén, a megjelenítést megelőzően, vetületi transzformációra kerül sor (röptében). Ha lehetséges, akkor célszerű elkerülni az egyéb vetületi transzformációkat. Meg kell hagyni az adatokat eredeti vetületükben! Az EOV nem támogatott. Ne is próbáld használni, mert rossz lesz az eredmény!

{% highlight javascript %}
// Az első sáv kiválasztása; vetület, lépték kiírása.
var myImage = landsatImage.select(0);
print(
    "Vetület, crs, és crs_transform:",
    myImage.projection()
);
print(
    "Felbontás méterben:",
    myImage.projection().nominalScale()
);
{% endhighlight %}


<br/>
### 4. Input/output műveletek

Több lehetőség áll rendelkezésünkre az exportálásra: az adatainkat **GeoTIFF-be/HD videóba** menthetjük a **Google Drive**-ra, a Google felhő-alapú tárolóegységre (**Google Cloud Storage**) vagy az **Assets** mappánkba. Ez utóbbi helyre a saját GeoTIFF raszterállományainkat is feltölthetünk. A vektoros adatokat **KML formátumban** ajánlott feltölteni, amiből **Fusion Table** készül, amit betölthetünk a szkriptünkbe az azonosítója segítségével. A készített idősorok adatai is lementhetők CSV-be (pontosvesszővel tagolt értékek).

{% highlight javascript %}
/* Mindig adjuk meg az eredeti felbontást!
 * A kép eredeti vetületébe (WGS 84 / UTM) menti. */
Export.image.toDrive({
    image: landsatImage.select("NDVI"),
    description: "NDVI_image",
    scale: 30,
    region: studyArea
});
{% endhighlight %}


Próbáljátok ki a szkriptet a <a href="https://code.earthengine.google.com/" target="_blank">Google Earth Engine Code Editor</a>ban! A teljes kódot töltsd le az <a href="https://github.com/SalsaBoy990/EarthEngine/blob/master/tutorial1.js" target="_blank">Earth Engine</a> gyűjteményemből!

A Google Earth Engine-nek nem csak alkalmazásprogramozási felülete (API) van, hanem rendelkezésre áll a <a href="https://explorer.earthengine.google.com" target="_blank">Google Earth Engine Explorer</a>, ami egy grafikus felhasználói felület (graphical user interface, GUI), ahol programozási ismeretek nélkül is hozzáférhetünk az adatokhoz. Természetesen sokkal korlátozottabb funkcionalitással bír, mint a kódszerkesztő. Ennek a használata is regisztrációhoz kötött és szintén ingyenes nem kereskedelmi célokra.

<br />
## Felhasznált irodalom

<ul class="no-decoration-16px">
    <li>Google Earth Engine Team (2015). <a href="https://earthengine.google.com" target="_blank">Google Earth Engine: A planetary-scale geospatial analysis platform.</a>
    </li>
    <li><a href="https://developers.google.com/earth-engine/" target="_blank">Google Earth Engine API kézikönyv.</a> 
    </li>
    <li><a href="https://code.earthengine.google.com/" target="_blank">Google Earth Engine Code Editor.</a></li>
    <li><a href="https://explorer.earthengine.google.com" target="_blank">Google Earth Engine Explorer.</a></li>
    <li>Egy Earth Engine Kiértékelő felhasználói fiókért egy elektronikus űrlap kitöltésével <a href="https://signup.earthengine.google.com/" target="_blank">itt</a> lehet jelentkezni. 
    </li>
    <li>További JavaScript kódok a <a href="https://github.com/SalsaBoy990/EarthEngine" target="_blank">GitHub</a> gyűjteményemből érhetők el. 
    </li>
</ul>




