// calculator

document.addEventListener('DOMContentLoaded', function () {
	const coinSelect = document.getElementById('coin');
	const currencySelect = document.getElementById('currency');
	const coinValueInput = document.getElementById('coinvalue');
	const currencyValueInput = document.getElementById('currencyvalue');

	async function fetchExchangeRate(coin, currency) {
		const response = await fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`
		);
		const data = await response.json();
		return data[coin][currency];
	}

	async function updateConversion() {
		const coin = coinSelect.value;
		const currency = currencySelect.value;
		const coinValue = parseFloat(coinValueInput.value) || 0;

		if (coinValue > 0) {
			const exchangeRate = await fetchExchangeRate(coin, currency);
			const currencyValue = coinValue * exchangeRate;
			currencyValueInput.value = currencyValue.toLocaleString();
		} else {
			currencyValueInput.value = '';
		}
	}

	coinSelect.addEventListener('change', updateConversion);
	currencySelect.addEventListener('change', updateConversion);
	coinValueInput.addEventListener('input', updateConversion);

	// Initial conversion update
	updateConversion();
});

// read more button

document.getElementById('readMoreBtn').addEventListener('click', function () {
	document.getElementById('modal').style.display = 'block';
	document.querySelector('.user_login').style.display = 'block';
	document.querySelector('.user_register').style.display = 'none';
});

document.querySelector('.modal_close').addEventListener('click', function () {
	document.getElementById('modal').style.display = 'none';
});
