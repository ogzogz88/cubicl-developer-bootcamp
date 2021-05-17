// console.log parantez içindeki değeri yazdırır. Birden fazla değer yazmak için aralara virgül konur.
console.log("Merhaba Dünya 😀");

// ----------- PRİMİTİF DEĞERLER ve TİPLERİ --------------
// number (integer, float): 123, 3.14
// console.log(45.17);

// boolean: true, false
// console.log(false);

// string: "Merhaba Dünya", 'Hello World', "a", "";
// console.log("Merhaba dünya");

// string escape karakteri: \
// console.log("Erkan Çağlar'a \"merhaba\" dedi");

// null ve undefined
// console.log(null, undefined);

// ----------- OPERATÖRLER --------------
// Matematiksel: +, - , *, /, %
// console.log(7 % 2);

// Operatör öncelikleri ve parantezler
// console.log((10+20)/2);

// Karşılaştırma: <, <=, >, >=, ==, !=
// console.log(3 != 3);

// Kayan noktalı sayı karşılaştırması
// console.log(0.1 + 0.2);

// String birleştirme: +
// console.log("Merhaba" + " " + "Dünya");

// Mantıksal: &&, ||, !
// console.log(true && true, true && false, false && false);
// console.log(true || true, true || false, false || false);
// console.log(!true, !false);

// Otomatik tip dönüştürme ve katı karşılaştırma: ===, !==
// console.log(-"-4"-1)
// console.log(+"4"+1)
// console.log(4 === "4", true == 1, false == 0)

// ----------- DEĞİŞKENLER --------------
// İsimlendirme: a-z, A-Z, 0-9, _
// book, number, number2, number3, myLuckyNumber

// Tanımlama: let, var
// let myLuckyNumber;
// console.log(myLuckyNumber);

// // Atama operatörü: =
// myLuckyNumber = 7;
// console.log(myLuckyNumber);

// Tanımlama ve atama birlikte
// let myLuckyNumber = 7;
// console.log(myLuckyNumber);

// myLuckyNumber = 8;
// console.log(myLuckyNumber);

// Sabitler: const
// const myConstantNumber = 13;
// console.log(myConstantNumber);

// myConstantNumber = 15;

// İfadeleri atama
// myLuckyNumber = 4 + 5;
// console.log(myLuckyNumber);

// let newNumber = 10;
// myLuckyNumber = 10 + myLuckyNumber;
// console.log(myLuckyNumber);

// Matematiksel operatör kısayolları: +=, -=, /=, *=, ++, --
// newNumber += 25;
// console.log(newNumber);

// newNumber++;
// console.log(newNumber);

// newNumber--;
// console.log(newNumber);

// String uzunluğu
// console.log("".length)

// ----------- KONTROL YAPILARI --------------
// Koşullar: if, else, else if
// if(expression) {
// 	// code
// }
// else if(expression2) {

// }
// else if(expression3) {

// }
// else if(expression4) {

// }
// else {
// 	// code
// }

// Örn: Maddenin halleri
// let temp = 115;

// if(temp <= 0) {
// 	console.log("katı");
// }
// else if(temp <= 100) {
// 	console.log("sıvı");
// }
// else {
// 	console.log("gaz");
// }

// Döngüler: while, for
// while(expression) {
// 	// code
// }

// for(init; check; counter) {
// 	// code
// }

// Örn: bir aralıktaki sayıları yazdır
// let i = 1;
// while(i <= 10) {
// 	console.log(i);
// 	i++;
// }

// for(let i = 1; i <= 10; i++) {
// 	console.log(i);
// }

// Örn: faktöriyel işlemi

// break, continue
// let i = 0;
// while(i < 10) {
// 	i++;
// 	if(i % 2 == 0) {
// 		continue;
// 	}
// 	console.log(i);
// }

// Diğer kontrol yapıları: switch, do while
// do {
// 	// code
// }
// while(expression);

// ----------- KOMPOZİT DEĞERLER ve TİPLERİ --------------
// --- Diziler ---
// Tanımlama: [1, 2, 3], []
let myValues = [1, 2, 3, true, null, "merhaba"];

// Belli bir elemana ulaşma: [index]
// let value = myValues[2];
// console.log(value);
// console.log(myValues[2]);

// myValues[2] = "Hello";
// console.log(myValues[2]);

// index olarak ifade kullanma
// let index = 2;
// console.log(myValues[index + 1]);

// Uzunluk, son elemana ulaşma
// console.log(myValues.length);
// console.log(myValues[myValues.length-1]);

// Döngü: for, while ile
// for(let i = 0; i < myValues.length; i++) {
// 	console.log(myValues[i]);
// }

// Döngü: for of
// let fruits = ["elma", "armut", "üzüm", "çilek"];
// for(let fruit of fruits) {
// 	console.log(fruit);
// }

// Örn: hesap makinesine işlem dizisi girilmesi

// --- Objeler (Nesneler) ---
// Tanımlama: {prop : value, prop2 : value2}, {}
let book = {
	title : "1984",
	publishDate : 1949,
	author : "George Orwell"
};

// Belli bir elemana ulaşma: .property
// console.log(book.author);

// book.author = "Çağlar";
// console.log(book.author);

// Elemana ifade ile erişme: [property]
// let prop = "publishDate";
// console.log(book[prop]);

// book[prop] = 1954;
// console.log(book[prop]);

// Döngü: for in
// for(let prop in book) {
// 	console.log(prop, book[prop]);
// }

// Örn: yapılan işlemin detaylarının gösterilmesi

// ----------- İç İçe Döngüler --------------
// Örn: çarpım tablosu
// for(let i = 1; i <= 10; i++) {
// 	let row = [];

// 	for(let j = 1; j <= 10; j++) {
// 		row[j-1] = i*j;
// 	}

// 	console.log(row);
// }

// let start = +new Date();

// let sum = 0;
// for(let i = 0; i < 1000000; i++) {
// 	sum += i;
// }

// let end = +new Date();

// console.log(sum, "found in", end-start, "ms");

// ----------- Mutability --------------
// Mutable, Immutable
// Primitif değerler değer ile atanır
// let a = "abc";
// let b = a;

// console.log(a, b);

// a += "def";

// console.log(a, b);

// Kompozit değerler referans ile atanır
// let a = [1,2,3];
// let b = a;

// console.log(a, b);

// a[0] = 5;

// console.log(a, b);

// let a = [1,2,3];
// let b = [...a];

// let c = {name : 'Çağlar', lastname : "Keskin"};
// let d = {...c};

// console.log(a, b);

// a[0] = 5;

// console.log(a, b);
