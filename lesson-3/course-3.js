//dizi içindeki en büyük sayıyı bulan fonksiyon
let numbers = [2, 5, 6, 7, 8, 1, 9, 3, 4, 5, 7, 88, 8, 29];
let value = max(numbers);
console.log(value);

function max(numbers) {
    let result = numbers[0];
    for (let num of numbers) {
        result = num > result ? num : result;
    }
    console.log("max number");
    return result;
}

// fibonacci sayıları, sıra numarası verilen fibonacci sayısını döndüren foksiyon

let resultFib = fibonacci(7);
console.log("fibonacci result");
console.log(resultFib);

function fibonacci(index) {
    //index 1 veya 2 ise 1 döndür
    if (index == 1 || index == 2) {
        return 1;
    }
    // 2 önceki değer ve toplam için değişken tanımla
    let first = 1;
    let second = 1;
    let sum;
    // kaçıncı değeri hesapladığımızı gösteren bir sayaç oluştur
    let counter = 2;

    while (true) {
        //sayaç index değerine ulaşana kadar önceki değerleri topla
        sum = first + second;
        counter++;
        // eğer sayaç indexe eşit ise toplamı döndür
        if (counter == index) {
            if (sum > Number.MAX_SAFE_INTEGER) {
                return ("not a safe number");
            }
            return sum;
        }
        first = second;
        second = sum;
    }
}

// EBOB hesaplama

let resultEBOB = obeb(24, 36);
console.log("EBOB result");
console.log(resultEBOB);

function obeb(a, b) {
    // bölen değişkeni oluştur ve 2 'den başlat
    let divider = 2;
    let greatestDivider = 1;
    // bölen değişkenini artırarak  bu sayıları bölüyor mu diye test et
    while (true) {
        // eğer bölen iki sayıdan herhangi birinde büyükse çık(sonucu döndür)
        if (a < divider || b < divider) {
            return greatestDivider;
        }
        let dividable = a % divider == 0 && b % divider == 0;
        // eğer bölüyorsa, sayıları bölerek güncelle,
        if (dividable) {
            a /= divider;
            b /= divider;
            // bölen sayıları ortak bölen olarak kaydet
            greatestDivider *= divider;
        }
        else {
            // eğer bölünmüyorsa bölen sayısını artır
            divider++;
        }

    }

}

// asal sayılar, verilen sayıya kadar olan asal sayıları döndüren fonksiyon
let resultAsal = primeNumbersUpTo(21);
console.log("asal sayılar result");
console.log(resultAsal);

function primeNumbersUpTo(limit) {
    let primeNumbers = [];
    // başlangıç ilk asal sayı olan 2, bitiş ise foknsiyona verilen limit
    // 2'den başlayarak limit sayısına kadar aradaki asal sayıları kontrol et
    for (let number = 2; number <= limit; number++) {
        let isprime = true;
        // 2'den başlayarak sayısının kendisine kadar bölünüyor mu diye kontrol et
        for (let j = 2; j < number; j++) {
            if (number % j == 0) {
                isprime = false;
            }
        }
        // sayı asal ise listeye ekle
        if (isprime) {
            primeNumbers.push(number);
        }
    }
    // limite ulaşınca listeyi döndür
    return primeNumbers;
}

