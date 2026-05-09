import axios from 'axios';

const API_KEY = import.meta.env.VITE_CME_API_KEY || 'demo_key';
const API_URL = import.meta.env.VITE_CME_API_URL || 'https://www.cmegroup.com/market-data/api';

// Mock veriler (gerçek API bağlantısı için değiştirin)
const mockMetals = [
	{
		symbol: 'gold',
		name: 'Altın (Gold)',
		price: 2045.50,
		change: 1.25,
		openInterest: 450000,
		volume: 250000
	},
	{
		symbol: 'silver',
		name: 'Gümüş (Silver)',
		price: 24.75,
		change: 0.85,
		openInterest: 180000,
		volume: 120000
	},
	{
		symbol: 'copper',
		name: 'Bakır (Copper)',
		price: 3.95,
		change: -0.50,
		openInterest: 220000,
		volume: 160000
	},
	{
		symbol: 'platinum',
		name: 'Platinum',
		price: 1050.00,
		change: 0.40,
		openInterest: 90000,
		volume: 45000
	},
	{
		symbol: 'palladium',
		name: 'Palladyum (Palladium)',
		price: 950.25,
		change: -1.10,
		openInterest: 70000,
		volume: 35000
	}
];

const mockChartData = {
	labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
	gold: [2010, 2025, 2035, 2040, 2045, 2050, 2045.50],
	silver: [24.50, 24.60, 24.70, 24.65, 24.75, 24.80, 24.75],
	copper: [3.98, 3.96, 3.95, 3.93, 3.94, 3.95, 3.95],
	platinum: [1045, 1047, 1048, 1050, 1049, 1050, 1050.00],
	palladium: [960, 955, 952, 951, 950, 950, 950.25]
};

/**
 * Tüm metallerin verilerini getirir
 */
export async function fetchMetalsData() {
	try {
		// Gerçek API için:
		// const response = await axios.get(`${API_URL}/metals`, {
		//   headers: { 'Authorization': `Bearer ${API_KEY}` }
		// });
		// return response.data;

		// Şimdilik mock veriler dönüyoruz
		return mockMetals;
	} catch (error) {
		console.error('Metal verileri alınamadı:', error);
		return mockMetals; // Hata durumunda mock veriler dön
	}
}

/**
 * Belirli bir metalin tarihsel grafiği verilerini getirir
 */
export async function fetchChartData(metalSymbol) {
	try {
		// Gerçek API için:
		// const response = await axios.get(`${API_URL}/metals/${metalSymbol}/chart`, {
		//   headers: { 'Authorization': `Bearer ${API_KEY}` }
		// });
		// return response.data;

		// Mock veriler
		return {
			labels: mockChartData.labels,
			prices: mockChartData[metalSymbol] || mockChartData.gold
		};
	} catch (error) {
		console.error(`${metalSymbol} grafik verileri alınamadı:`, error);
		return {
			labels: mockChartData.labels,
			prices: mockChartData.gold
		};
	}
}

/**
 * Open Interest verilerini getirir
 */
export async function fetchOpenInterest(metalSymbol) {
	try {
		const metal = mockMetals.find(m => m.symbol === metalSymbol);
		return metal ? metal.openInterest : 0;
	} catch (error) {
		console.error('Open Interest verileri alınamadı:', error);
		return 0;
	}
}

/**
 * Belirli bir metal için uyarı kuralı oluşturur
 */
export async function createPriceAlert(metalSymbol, targetPrice, alertType = 'above') {
	try {
		// Gerçek API için:
		// const response = await axios.post(`${API_URL}/alerts`, {
		//   metal: metalSymbol,
		//   targetPrice,
		//   alertType
		// }, {
		//   headers: { 'Authorization': `Bearer ${API_KEY}` }
		// });
		// return response.data;

		return {
			id: Date.now(),
			metal: metalSymbol,
			targetPrice,
			alertType,
			status: 'active'
		};
	} catch (error) {
		console.error('Uyarı kuralı oluşturulamadı:', error);
		return null;
	}
}

/**
 * Gerçek zamanlı fiyat güncellemelerini dinler (WebSocket)
 */
export function subscribeToRealTimeUpdates(callback) {
	// Gerçek API için WebSocket bağlantısı:
	// const ws = new WebSocket(`wss://api.cmegroup.com/realtime`);
	// ws.onmessage = (event) => {
	//   callback(JSON.parse(event.data));
	// };
	// return ws;

	// Mock: Her 5 saniyede bir güncelleme simüle et
	const interval = setInterval(() => {
		const randomMetal = mockMetals[Math.floor(Math.random() * mockMetals.length)];
		const priceChange = (Math.random() - 0.5) * 10;
		callback({
			symbol: randomMetal.symbol,
			price: randomMetal.price + priceChange,
			change: ((priceChange / randomMetal.price) * 100).toFixed(2)
		});
	}, 5000);

	return () => clearInterval(interval);
}
