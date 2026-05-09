/**
 * Fiyatı formatlar (örn: 2045.50 -> "$2,045.50")
 */
export function formatPrice(price) {
	return new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(price);
}

/**
 * Yüzdeyi formatlar (örn: 1.25 -> "+1.25%")
 */
export function formatPercentage(value) {
	const sign = value >= 0 ? '+' : '';
	return `${sign}${value.toFixed(2)}%`;
}

/**
 * Tarihi formatlar (örn: 2024-05-09 -> "09 Mayıs 2024")
 */
export function formatDate(date) {
	const options = { year: 'numeric', month: 'long', day: 'numeric', language: 'tr-TR' };
	return new Date(date).toLocaleDateString('tr-TR', options);
}

/**
 * Saati formatlar (örn: 14:30)
 */
export function formatTime(date) {
	return new Date(date).toLocaleTimeString('tr-TR', { 
		hour: '2-digit', 
		minute: '2-digit' 
	});
}

/**
 * Büyük sayıları kısaltır (örn: 450000 -> "450K")
 */
export function abbreviateNumber(num) {
	if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
	if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
	return num.toString();
}

/**
 * Metal sembolünü tam adına çevirir
 */
export function getMetalName(symbol) {
	const names = {
		gold: 'Altın',
		silver: 'Gümüş',
		copper: 'Bakır',
		platinum: 'Platinum',
		palladium: 'Palladyum'
	};
	return names[symbol] || symbol;
}

/**
 * Fiyat değişiminin rengini döndürür
 */
export function getPriceChangeColor(change) {
	if (change > 0) return 'text-green-600';
	if (change < 0) return 'text-red-600';
	return 'text-gray-600';
}

/**
 * Tarihsel verileri analiz eder
 */
export function analyzeChartData(prices) {
	if (!prices || prices.length === 0) return null;

	const min = Math.min(...prices);
	const max = Math.max(...prices);
	const avg = prices.reduce((a, b) => a + b) / prices.length;
	const latest = prices[prices.length - 1];
	const changePercent = ((latest - prices[0]) / prices[0]) * 100;

	return { min, max, avg, latest, changePercent };
}
