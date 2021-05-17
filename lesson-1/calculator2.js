let inputs = [10, "topla", 5, "çarp", 2, "çıkar", 6, "faktöriyel"];
let number1 = inputs[0];

for(let i = 1; i < inputs.length; i += 2) {
	// İşlemi al: topla, çıkar, çarp, böl
	let operation = inputs[i];
	// İkinci sayıyı al
	let number2 = inputs[i+1];

	let result;

	// Eğer işlem toplama ise:
	if(operation == "topla") {
		// İki sayıyı topla
		result = number1 + number2;
	}
	// Eğer işlem çıkarma ise:
	else if(operation == "çıkar") {
		// İkinci sayıyı ilk sayıdan çıkar
		result = number1 - number2;
	}
	// Eğer işlem çarpma ise:
	else if(operation == "çarp") {
		// İki sayıyı çarp
		result = number1 * number2;
	}
	// Eğer işlem bölme ise:
	else if(operation == "böl") {
		// Eğer ikinci sayı 0 ise:
		if(number2 == 0) {
			// Hata göster
			result = "Sıfıra bölünemez";
		}
		// Değilse:
		else {
			// İlk sayıyı ikinci sayıya böl
			result = number1 / number2;
		}
	}
	else if(operation == "faktöriyel") {
		// 4! = 4*3*2*1
		let acc = 1;
		for(let i = number1; i > 1; i--) {
			acc *= i;
		}

		result = acc;
	}
	else {
		result = "Geçersiz işlem";
	}

	let details = {
		num1 : number1,
		num2 : number2,
		op : operation,
		result : result
	};

	// Sonucu göster
	console.log(details);

	number1 = result;
}