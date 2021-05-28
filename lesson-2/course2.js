console.clear();
console.log("Javascript'te Fonksiyonlar 🚀\n");

// ----------- FONKSİYONLARA GİRİŞ --------------
// Yazılan kodun tekrar tekrar kullanılmasını sağlar

// Tanımlama ve Parametreler
// Örnek: f(x) = 3x - 4
// function sayHello() {
// 	console.log("Hello");
// }

// Çağırma
// sayHello();

// Örnek: merhaba de

// Örnek 2: isimle merhaba de
// function sayHelloWithName(name) {
// 	console.log("Merhaba " + name);
// }

// sayHelloWithName('Erkan Arslan');

// Değer Döndürme: return
// function functionName() {
// 	// code
// 	return value;
// }

// let result = functionName();

// Örnek: f(x, y) = 2x + 3y + 5
// function f(x, y) {
// 	return 2*x + 3*y + 5;
// }

// result = f(3, 2);
// console.log(result);

// void döndüren fonksiyonlar
// let result = sayHello();
// console.log("Result: ", result);

// Anonim fonksiyonlar
// let myFunction = function (parameters) {
// 	// code
// 	return result;
// }

// Fonksiyonları değişken gibi kullanma
// function add(a, b) {
// 	return a + b;
// }

// let sum = add;

// console.log(sum(4, 9));

// Önemli: Fonksiyon çağrılmadan atanmalı. Çağrılarak atanırsa fonksiyon değil, döndürdüğü değer atanır


// ----------- DEĞİŞKEN KAPSAMI (VARIABLE SCOPE) --------------
// Tanımlanan bir değişken nerelerde geçerlidir? Ömrü ne kadardır?

// Block scope

// let a = 5;

// if(true) {
// 	let a = 10;
// 	console.log("if içinde", a);
// }

// console.log("if dışında", a);

// Function scope

// function printA() {
// 	let a = 10;
// 	console.log("fonksiyon içinde", a);
// }

// printA();

// console.log("fonksiyon dışında", a);


// ----------- CALLBACK'ler --------------
/* Fonksiyonların bir başka fonksiyona parametre olarak geçilmesi. Parametre olarak geçilen fonksiyona callback denir.
 * Callback'ler Javascript'te sıklıkla kullanılır.
 *
 * Neden?
 * 1. Asenkron bir işlem bitince sonucu almamızı ve/veya işlememizi sağlar.
 * 2. Bir işlemin nasıl yapılacağını belirtmemizi, yani kendi kod mantığımızı bir başka kodun içine yerleştirmeyi sağlar.
 */

// Örnek: Matematiksel işlemler
// function add(a, b) {
// 	return a + b;
// }

// function multiply(a, b) {
// 	return a * b;
// }

// function subtract(a, b) {
// 	return a - b;
// }

// function doOperation(a, b, operation) {
// 	let result = operation(a, b);
// 	console.log(result);
// }

// doOperation(10, 7, subtract);

// doOperation(10, 7, function (a, b) {
// 	return a - b;
// })

// function average(numbers) {
// 	let sum = 0;
// 	for(let num of numbers) {
// 		sum += num;
// 	}

// 	return sum / numbers.length;
// }

// let myNumbers = [1, 5, 9];
// let result = average(myNumbers);
// console.log(result);

// let a = 5;

// function doX() {
// 	a = 6;
// }

// function doY() {
// 	a = 7;
// }

// console.log(a);
// doX();
// console.log(a);
// doY();
// console.log(a);



// Şimdi ara ⌛️



// ----------- JAVASCRİPT FONKSİYONLARI --------------
// Önemli: Ezberlemeye çalışmayın!

// ---- Console Fonksiyonları ----
// console objesinin üstünde yer alır
// Console'a yazdırma: log(değer)
// console.log("Merhaba", "Dünya");

// ---- Array (dizi) Fonksiyonları ----
// En sık kullanılan fonksiyonlardır. Dizi değişkeni üstündeki fonksiyonlarla yapılır.
// let fruits = ["elma", "armut", "çilek", "muz"];
// let numbers = [1, 2, 3, 4, 5, 6, 7];

// Elemanları birleştirme: arr.join(glue)
// let result = fruits.join(", ");
// console.log(result);

// Eleman ekleme ve silme: arr.push(newElem), arr.pop()
// fruits.push("kiraz");
// console.log(fruits);
// result = fruits.pop();
// console.log(result);

// Dizileri birleştirme arr.concat(arr2)
// let nums1 = [1, 2, 3];
// let nums2 = [4, 5, 6];
// let nums3 = nums1.concat(nums2);
// console.log(nums3);

// Elemanları sıralama: arr.sort(callback)
// numbers = [14, 3, 21, 2, 7, 4, 26, 99];
// numbers.sort();
// console.log(numbers);

// Örnek: sayıları sıralama
// function sortIncreasing(a, b) {
// 	return b - a;
// }

// numbers.sort(sortIncreasing);
// console.log(numbers);

// Örnek: öğrencileri sıralama
let students = [
	{name : "Erkan", score : 90},
	{name : "Ahmet", score : 20},
	{name : "Mehmet", score : 70},
	{name : "Volkan", score : 50},
];

// students.sort(function (student1, student2) {
// return student1.score - student2.score;
// });
// console.log(students);

// Elemanları dönüştürme: arr.map(callback)
// let numbers = [1, 2, 3, 4, 5, 6, 7];
// let squared = numbers.map(function (num){
// 	return num*num;
// });
// console.log(squared);

// let names = students.map(function(student) {
// 	return student.name;
// })
// console.log(names);

// Önemli: döngü için map kullanmayın
// numbers.map(function(number) {
// 	console.log(number);
// })

// Arrow fonksiyonlar
// let add = function(a, b) {
// 	let sum = a + b;
// 	console.log(sum);
// }

// let add2 = (a, b) => {
// 	let sum = a + b;
// 	console.log(sum);
// }

// let add3 = (a, b) => a + b;

// let result = add3(20, 8);
// console.log(result);

// let sayHello = () => console.log("Hello");
// sayHello();

// let square = a => a*a;
// console.log(square(8));

// let numbers = [5,1,8,3];
// numbers.sort((a, b) => a-b);

// a - b
// a < b -> negatif
// a = b -> 0
// a > b -> pozitif

// console.log(numbers);

// let squared = numbers.map(a => a*a);
// console.log(squared);

// let names = students.map(student => student.name);
// console.log(names);

// Elemanları filtreleme: arr.filter(callback)
// let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// let odd = numbers.filter(number => {
// 	if(number % 2 == 1) {
// 		return true;
// 	}
// 	else {
// 		return false;
// 	}
// });

// let numbers2 = [1, 3, 3, 7, 3, 8, 1, 5];
// let unique = numbers2.filter((val, index, array) => {
// 	// Elemanın indexini al
// 	// Dizi içinde elemanın indexini bul
// 	let firstIndex = array.indexOf(val);

// 	// Bu ikisi eşit mi diye kontrol et
// 	return index == firstIndex;
// });

// let unique = numbers2.filter((val, i, arr) => i == arr.indexOf(val));
// console.log(unique);

// let odd = numbers.filter(number => number % 2 == 1);
// console.log(odd);

// Belli bir koşulu sağlayan eleman bulma: arr.find(callback)
// let multipleOf3 = numbers.find(number => {
// 	console.log(number);

// 	return number % 3 == 0;
// });
// console.log("Result:", multipleOf3);

// Elemanın index'ini bulma: arr.indexOf(elem)
// let i = numbers2.indexOf(99);
// console.log(i);

// ---- String (metin) Fonksiyonları ----
// String değişkeni üstündeki fonksiyonlarla yapılır.
// Metin içinde metin arama: str.indexOf(search)
// let hi = "Hello World";
// let index = hi.indexOf("World");
// console.log(index);

// if(index > -1) {
// 	console.log("Var");
// }
// else {
// 	console.log("Yok");
// }

// Metnin bir kısmını kesme: str.slice(start, end)
// let substr = hi.slice(0, 5);
// console.log(substr);

// Metnin bir kısmını değiştirme: str.replace(oldStr, newStr)
// let hi = "Merhaba Erkan Erkan";
// let newHi = hi.replace("Erkan", "Deniz");
// console.log(newHi);

// Büyük/küçük harf dönüşümü: str.toUpperCase(), str.toLowerCase()
// let userName = "Erkan";
// let lc = userName.toLowerCase();
// let uc = userName.toUpperCase();
// console.log(lc, uc);

// Metin etrafındaki boşlukları temizleme str.trim()
// let name = " erkan   çağlar     ";
// let trimmed = name.trim();
// console.log({value : trimmed});

// ---- Nesne Fonksiyonları ----
// Object class'ının üstünde yer alır
// Nesne anahtarlarını (property) getirme: .keys(object)
let human = {
	name : "Çağlar",
	age : 333,
	luckyNumber : 17
};

// let keys = Object.keys(human);
// console.log(keys);

// Bir objenin değerlerini başka bir objeye kopyalama: .assign(target, source)
// let human2 = {
// 	name : "Erkan",
// 	favouriteLanguage : "JS"
// };

// Object.assign(human, human2);
// console.log(human);

// ---- Matematik Fonksiyonları ----
// Math objesi üstünde yer alır.

// Min ve max bulma: min(number...), max(number...)
// let numbers = [1, 3, 3, 7, 3, 8, 1, 5];
// let min = Math.min(1, 5);
// let max = Math.max(1, 5);
// console.log(min, max);

// min = Math.min(...numbers);
// max = Math.max(...numbers);
// console.log(min, max);

// Rasgele sayı: random()
// let number = Math.random();
// console.log(number);

// Örnek: belirlenen bir aralıkta rasgele sayı üretme
// 10-16 arasında rasgele sayı
// let newNumber = number*6 + 10;
// console.log(Math.floor(newNumber));

// Sayı yuvarlama: round(number), ceil(number), floor(number)

// Karekök: sqrt(number)
// let number = Math.sqrt(25);
// console.log(number);

// Mutlak değer: abs(number)
// let number = Math.abs(-128);
// console.log(number);

// Trigonometrik: sin(number), cos,
// let result = Math.sin(45 * Math.PI / 180);
// console.log(result);

// ---- Zamanlama Fonksiyonları ----
// Kodu belli bir süre sonra çalıştırma: setTimeout(callback, timeInMs)
// setTimeout(() => console.log("Hello"), 3000);

// Kodu belli aralıklarla çalıştırma: setInterval(callback, timeInMs)
let timer = setInterval(() => console.log("Hello"), 3000);

// Zamanlanmış işlemleri iptal etme: clearTimout(timer), clearInterval(timer)
clearInterval(timer);

for(let i = 0; i < 10; i++) {
	setTimeout(() => console.log(i), i*1000);
	console.log("i", i);
}

console.log("Outside")