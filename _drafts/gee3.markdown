---
layout: post
comments: false
title: "A Google Earth Engine alkalmazása a geoinformatikában, 3. rész: JavaScript folytatás."
---

Ajánlott irodalom:
1. Brian W. Kernighan - Dennis M. Richie: **A C programozási nyelv. 2. kiadás.** - Műszaki Kiadó, Budapest.
2. Benedek Zoltán - Levendovszky Tihamér (2013). **Szoftverfejlesztés C++ nyelven.** SZAK Kiadó Kft., Bicske.
3. David Flanagan (2011). **JavaScript: The Definitive Guide. 6th Edition.** O’Reilly, USA.

Az összes kevert C/C++ kódot a **C++ fordító**val fordítottam le (.cpp kiterjesztésű a forrásfájl). Így járjatok el ti is, különben nem fog működni!

Ezeken kívül ajánlom még a [TheHUNTutorials](https://www.youtube.com/user/TheHUNTutorials/playlists) Youtube csatornáján megjelent és a [C++ Programming Tutorial Complete](https://www.youtube.com/watch?v=-WwGMNGRHdw) (angol!) című tutoriálokat.

Ehhez az alábbi fejlesztői környezeteket ajánlom:
* C/C++ esetén: **Code::Blocks 10.05**. A [codeblocks-10.05mingw-setup.exe](https://sourceforge.net/projects/codeblocks/files/Binaries/10.05/Windows/) változatot töltsd le! A MINGW a C++ fordító neve.


Háromféle **paraméterátadás**t különböztetünk meg, ezek:

1. A **cím szerinti** paraméterátadás esetén **mutatók** segítségével adjuk át a **változók címeit** a függvénynek. Ezen keresztül az eredeti változók értékeit módosíthatjuk. A mutatók a legfontosabb nyelvi eszközök közé tartoznak, ismeretük elengedhetetlen minden programozó számára!

2. Az **érték szerinti** paraméterátadás esetén lokális másolat készül a blokkon { } belül a függvényben, tehát az eredeti változóink értéke nem változik meg. 

3. A C++ esetén bevezették a **referencia szerinti** paraméterátadást a mutatók kiváltására, ahol a változóra egy **alias** (álnév) segítségével hivatkozunk. A JavaScript-ben nincsenek mutatók, nem is férhetünk hozzá a memóriacímekhez.

<center><em>Az 1. C++ példa: Egyszerű függvények és a paraméterátadás bemutatása.</em></center>

{% highlight cpp %}
/* Header fájlok csatolása */
#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

/* A függvények prototípusai. Itt deklarálni kell őket,
 * hogy a fordító tudja, hogy használni fogjuk őket, és
 * megkeresi a függvények definícióit.
 */
int terulet(int, int); // Téglalap területének számítása.
int modosit(int&, int); // Referencia szerinti hivatkozás, típusnév&
int modosit2(int, int); // Itt érték szerinti paraméterátadás van.
int modosit3(int*, int); // Cím szerinti paraméterátadás.

int main(){
    setlocale(LC_ALL, "hun"); // Ékezetes karakterek miatt.
    int a = 10, b = 20; // A téglalap oldalai.
    modosit(b, 30); // b=30
    modosit2(b, 50); // b=30 marad!
    modosit3(&b, 5); // b=5, az &b a 'b' változó memóriacíme.
    printf("A téglalap területe: %d\n", terulet(a,b)); //=> 50
    getchar(); // Egy billentyű lenyomására vár.
    return 0;
}
// Függvénydefiníciók.
int terulet(int a, int b) { return a * b; }
// Referencia szerinti paraméterátadás.
int modosit(int& a, int szam) { 
    if(szam > 0) return a = szam; // Negatív szám nem lehet.
    else return 0; 
}
// Érték szerinti paraméterátadás.
int modosit2(int a, int szam) {
    if(szam > 0) return a = szam;
    else return 0;
}
// Mutató szerinti paraméterátadás.
int modosit3(int *p, int szam) {
    if(szam > 0) return *p = szam;
    else return 0;
}
{% endhighlight %}

Ez hasonlít a C-ben használt nyelvi elemhez, a **struktúrá**hoz (`struct`). Az egyetlen különbség, hogy a struktúratagok hozzáférése **publikus**, tehát kívülről megváltoztatható (és az öröklés is publikus). C++ szabvány esetén természetesen **privát**tá, kívülről hozzáférhetetlenné tehetünk belső változókat (sőt az osztály esetén alapértelmezetten mindig privát a változók hozzáférése, de ezen változathatunk), és csak az általunk írt metódusokon férhetünk hozzájuk. Ez a biztonságot szolgálja.

<center><em>A 2. C++ példa: A struktúra, a konstruktor, a destruktor, a metódus.</em></center>
{% highlight cpp %}
/* Header fájlok csatolása */
#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

struct Teglalap
{
    int a;
    int b;
    // Alapértelmezett konstruktor. Nem inicializálja a-t és b-t.
    Teglalap();

    /* Saját konstruktor. A függvényneveket a fordító
     * a paramétereik és azok típusa szerint különbözteti meg.
     * Ezt a függvénynevek túlterhelésének nevezzük. */
    Teglalap(int a, int b): a(a), b(b) {};

    /* Destruktor a dinamikusan lefoglalt tárhelyek
     * felszabadítására (memóriaszivárgás ellen).
     * Az egyszerű változók felszabadításával nem kell törődnünk.
     */
    ~Teglalap(){}; 

    /* Ennek a terület függvénynek a hatóköre a struktúra belseje
     * a { } között, ugyanis blokk szintű hatókör van a C/C++-ban
     */
    int terulet() { return this->a * this->b; };

    /* A this értékének kiírása. */
    void this_erteke() const {
        printf("%x\n", this);
    };
};

int main() {
    setlocale(LC_ALL, "hun"); // Ékezetes karakterek miatt.

    Teglalap z(5, 7); // A struktúra példányosítása.

    printf("a = %d\n",z.a); //=> a = 5
    printf("b = %d\n",z.b); //=> b = 7

    printf("A téglalap területe: %d\n", z.terulet()); //=> 35
	
    z.a = 20;

    /* a this értéke meg fog egyezni a z memóriacímével! */
    z.this_erteke();
    printf("%x\n", &z);
	
    getchar();
    return 0;
}
{% endhighlight %}

Néhány dolog magyarázatra szorul.

Elsőként: kizárólag a példa kedvéért keverem a C és a C++ kódot (a struktúra helyett osztályt használj)! Ha nem tudod mit csinálsz, akkor ne keverd! Ez programozási szemszögből nem feltétlenül jó gyakorlat, mert komoly hibákat eredményezhet bizonyos esetekben. Például dinamikus memóriakezelésnél a `new`-t és a `delete`-t soha ne keverjük a `malloc()`-al és a `free()`-vel!

A **this** a struktúra aktuális példányának (a `z`-nek) belső mutatója, amivel a tagváltozókat és a taggfüggvényeket (más szóval metódusokat) érhetjük el a `->` (nyíl) operátor segítségével. Ez egy valódi mutató, amit a **this** kulcsszóval helyettesítünk és jelen esetben a `z` struktúra címére mutat. Bővebb magyarázat [itt](https://www.youtube.com/watch?v=d4ts84MGyUc) és [itt](https://www.youtube.com/watch?v=I2-RmR7JRdc).

Ez a rövid C kódrészlet talán jobban rámutat a lényegre:
{% highlight c %}
/* Egy egyszerű struktúra C-ben. */
struct Teglalap {
    int x;
    int y;
};
/* a main()-ben: a Téglalap struktúra mutatója */
struct Teglalap elso;
struct Teglalap *p;
p = &elso;
(*p).x = 50;
(*p).y = 90;

/* Helyette ezt is írhatnám: */
p->x = 50;
p->y = 90;
printf("x = %d, y = %d\n", (*p).x, p->y); //=> "x = 50, y = 90"
{% endhighlight %}

Egy `struct Teglalap` típusú struktúrát jelölő mutatót hoztam létre `p` néven. Ha `p` egy `Teglalap` struktúrát címez, akkor `*p` maga a struktúra (memóriacím, ahol `elso` megtalálható), és `(*p).x`, illetve `(*p).y` az `elso` struktúra tagjai/elemei. A zárójelre szükség van, mivel a `.` struktúratag operátor precedenciája magasabb, mint a `*` operátoré. A szintaxis egyszerűsítésére vezették be a `->` operátort (balról jobbra köt).

A C++-ban a `this` ehhez hasonlóan a struktúra vagy az osztály példányát jelölő (annak kezdőcímét tároló) mutató. A 2. C++ példámban írhatnánk azt is (teljesen fölöslegesen, hiszen a `z.x` sokkal egyszerűbb), hogy:
{% highlight c %}
Teglalap z(5, 7), *p;
p = &z;
p->a = 63;
{% endhighlight %}

A **this** a struktúra aktuális példányának (a `z`-nek) belső mutatója, amivel a tagváltozókat és a taggfüggvényeket (más szóval metódusokat) érhetjük el a `->` (nyíl) operátor segítségével. Ez egy valódi mutató, amit a **this** kulcsszóval helyettesítünk és jelen esetben a `z` struktúra címére mutat. 

A JavaScript-ben szintén létezik a `this`. A `this` az éppen aktuális objektumpéldányra hivatkozik (teljesen automatikusan). Viszont nem mutató, mert a JS-ben nincsen mutató, ezért a `->` nyíl operátor helyett a `.` operátorral érhetjük el az objektum tulajdonságait a `this`-en keresztül (vagyis: `this->a` helyett `this.a`).


Az egységbe zárás lényege, a változók és a függvények együtt kezelése mellett, hogy **szabályozzuk a változók hozzáférését**, hogy az osztályon kívülről ne lehessen megváltoztatni őket (**public**, **protected** és **private** hozzáférés létezik). Miért előnyös ez? Nem lenne szerencsés, ha például egy bankszámla egyenlege lenullázható vagy negatívra állítható lenne kívülről (bár előnyös volna, ha hozzáadhatnánk `2E+11` Ft-ot). A következő példaprogram egy nagyon egyszerű bankszámla osztályt valósít meg.

<center><em>A 3. C++ példa: Az osztály és a hozzáférési szintek.</em></center>
{% highlight cpp %}
#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

class Bankszamla
{
private:
    /* Alapértelmezetten private, kívülről nem hozzáférhető.
     * A private hozzáférést jelölő kulcsszó elhagyható. */
    int egyenleg; 

public:
    Bankszamla() {}; // Alapértelmezett konstruktor.
    // Saját konstruktor a változó inicializáláshoz.
    Bankszamla(int x): egyenleg(x) {};

    // Destruktor, a lefoglalt memóriahely felszabadításához.
    ~Bankszamla() {}; // a ~ jel kell.

    // A fizetés hozzáadása az egyenleghez.
    inline void hozzaadas(int fizu) { this->egyenleg += fizu; }
    	
    // Pénzlevonás fizetésnél.
    inline void levonas(int koltseg) { this->egyenleg -= koltseg; }

    // Mennyi pénz van a számlámon?
    inline int getEgyenleg() { return this->egyenleg; }
};

int main()
{
    setlocale(LC_ALL, "hun");
	
    // Osztály példányosítása. Egyenleg: 2 millió Ft.
    Bankszamla y(2e+06);

    /* A . struktúra-adattag operátorral érhetjük el a változót.
     * Az osztályoknál is a . operátort használjuk a tagváltozók vagy
     * a metódusok eléréséhez */
    y.egyenleg = 0; // Hiba. Nem engedi a fordító!
	
    // Az osztály getEgyenleg() metódusának meghívása az y példányra.
    printf("Az egyenlegem: %d\n", y.getEgyenleg());

    y.levonas(34567);
    printf("Az egyenlegem a levonás után: %d\n", y.getEgyenleg());

    getchar();
    return 0;
}
{% endhighlight %}

Az inline kulcsszó azt jelöli, hogy az osztályon belül definiáljuk a metódusokat. A másik lehetőség, hogy csak a függvényprototípust adjuk meg az osztályon belül, és utólag definiáljuk a függvényeket.

A `Bankszamla(int x): egyenleg(x) {};` kódrészlet ezzel egyenértékű: `Bankszamla(int x) { this->egyenleg = x; };`. A `:` utáni rész egy inicializálási lista, az `egyenleg` változónak értékül adom az `x` értékét (az `egyenleg` nevet is adhatnánk az `x` változónak, hiszen a `this->` az `egyenleg` tagváltozóra mutat, és nem a függvényparaméterre.

A függvénynevek és az operátorok túlterhelésével, az alapértelmezett függvényargumentumokkal, az örökléssel, a kivételkezeléssel stb. nem foglalkozom itt.

Az objektumok kezdeti értékadásaiért (inicializálás) speciális tagfüggvények, a **konstruktor**ok felelnek. A konstruktor olyan tagfüggvény, amelynek neve megegyezik az osztályéval, és nem rendelkezik típussal.

Az objektumok által felhasznált memória mindaddig lefoglalt marad, míg fel nem szabadítjuk. Erre a célra a C++ biztosít számunkra egy speciális tagfüggvényt, a **destruktor**t. Hasonlóan a konstruktorhoz, a destruktornak sincs visszatérési értéke. A destruktornak nem lehetnek paraméterei. A destruktor nevét az osztály nevéből és a hullám karakterből (~) képezzük.




<center><em>A 3. JavaScript példa: Objektum literál, tulajdonságok és metódusok.</em></center>

{% highlight javascript %}
var square = function (x) {
    return x;
};
console.log("A megadott szám négyzete: " + square(200));

var point = {
  x: 0,
  y: 0,
  print_1: function () {
     console.log("x: " + point.x + ", y: " + point.y);
  } 
};

point.print_2 = function () {
  console.log("x: " + point.x + ", y: " + point.y);
};
point.x = 5, point.y = 15;
point.print_1(); //=> x: 5, y: 15
{% endhighlight %}

<center><em>A 4. JavaScript példa: Függvény szintaxis, konstruktor és osztály.</em></center>
{% highlight javascript %}
function square (x) {
    return x;
}
console.log("A megadott szám négyzete: " + square(200));

/* Ez egy pont osztály konstruktora. */
function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.print = function () {
        console.log("x: " + point.x + "y: " + point.y);
    };
}
/* A prototípus objektumhoz hozzáadunk egy függvényt.
 * A pont osztályuk a prototípustól öröki ezt a függvényt.
 */
Point.prototype.add = function() {
    return this.x + this.y;
};

/* Az osztály példányosítása: egy változóban
 * eltároljuk az objektumot.
 */
var object = new Point(10, 20);
{% endhighlight %}

<center><em>Az 5. JavaScript példa: Az objektumok (beleértve a tömböket és a függvényeket) mutálódnak!</em></center>
{% highlight javascript %}
var o = { nev: "Jancsi" };
o.nev.toString();
console.log(o.nev);

{% endhighlight %}



<center><em>A 6. JavaScript példa: Tömbök, tömbszerű pbjektumok és az objektum tulajdonságok elérése.</em></center>
{% highlight javascript %}
// A tömbök.
var ures_tomb = [];
var tomb = [1, 2, 3, 4, 5];
console.log(tomb[0]);

/* Elemek hozzáadása a tömb végére. */
tomb.push(-200, 1552, 9999);
/* Az utolsó elem törlése. */
tomb.pop();
/* A tömb elemeinek kiíratása. */
for (var i = 0; i < tomb.length; i++) {
    console.log("A tömb " + (i+1) + ". eleme: " + tomb[i]);
}
console.log("\n");

/* Ezzel a 4. index utáni elemeket törlöm. */
tomb.length = 4;

/* Ugyanaz, mint az előző, csak for in ciklussal. */
var temp;
for (var p in tomb) {
  /* Számmá kellett konvertálni. */
  temp = Number(p)+1;
  console.log("A tömb " + temp + ". eleme: " + tomb[p]);
}
console.log("\n");

/* Tömbszerű objektumok. */
/* Üres objektum. */
var a = {};
var i = 0;
while (i < 10) {
  a[i] = i * i;
  i++;
}
/* A tömböknek van hossz tulajdonsága. Itt is létrehozzuk. */
a.length = i;

var osszeg = 0;
for (var j = 0; j < a.length; j++) {
  osszeg += a[j];
}
console.log(osszeg);

/* Az objektum tulajdonságok elérése történhet a
 * .tulajdonsag és a ["tulajdonsag"] szintaxissal is.
 */
for (var prop in a) {
    console.log(prop + " = " + a[prop]);
}
 /* a 4. példában szereplő objektum. */
object["x"] = 100;
object.y = 25;
console.log(object.add()); //=> 125
{% endhighlight %}

<center><em>Az 5. JavaScript példa: Funkcionális programozás és a JSON (JavaScript Object Notation).</em></center>
{% highlight javascript %}
var sum = tomb.map(function () { return x + y; });
console.log("Az összeg: " + sum);

var json = point.toJSON();

var bar = [
    function() { return 1; },
    function() { return 2; }
];
bar[0]();
bar[1]();

function Animal (name, age, color, race) {
    var name = name || "Tom";
    this.color = color || "szürke";
};
 var eger = new Animal();

 eger.name = "Jerry"; // Hiba
 eger.color = "sárga";


{% endhighlight %}
