import haversine from 'haversine-distance';

export const MARK_TYPES = {
	I_NEED: 'I_NEED',
	I_HAVE: 'I_HAVE',
};

export const MARKERS_DATA = [
	{
		id: '1',
		type: MARK_TYPES.I_NEED,
		ownerName: 'Володимир Мурин',
		location: 'Львів, вулиця Городоцька(біля скрині)',
		contactInfo: 'Телефон: +380978373363',
		creationDate: Date.now(),
		description: 'Потрібні планшети і готівка для Н бригади',
		notes: 'До планшетів було б дуже добре мати зарядку',
		keyWords: 'Перший допис',
		items: [
			{
				name: 'Планшети',
				quantity: '5 штук',
			},
			{
				name: 'Готівка',
				quantity: '10 000 грн',
			},
		],
	},
	{
		id: '2',
		type: MARK_TYPES.I_NEED,
		ownerName: 'Володимир Мурин',
		location: 'Львів, вулиця Городоцька(біля скрині)',
		contactInfo: 'Телефон: +380978373363',
		creationDate: Date.now(),
		description: 'Потрібні планшети і готівка для Н бригади',
		notes: 'До планшетів було б дуже добре мати зарядку',
		keyWords: 'Другий допис',
		items: [
			{
				name: 'Планшети',
				quantity: '5 штук',
			},
			{
				name: 'Готівка',
				quantity: '10 000 грн',
			},
		],
	},
	{
		id: '3',
		type: MARK_TYPES.I_NEED,
		ownerName: 'Володимир Мурин',
		location: 'Львів, вулиця Городоцька(біля скрині)',
		contactInfo: 'Телефон: +380978373363',
		creationDate: Date.now(),
		description: 'Потрібні планшети і готівка для Н бригади',
		notes: 'До планшетів було б дуже добре мати зарядку',
		keyWords: 'Третій допис',
		items: [
			{
				name: 'Планшети',
				quantity: '5 штук',
			},
			{
				name: 'Готівка',
				quantity: '10 000 грн',
			},
		],
	},
	{
		id: '4',
		type: MARK_TYPES.I_NEED,
		ownerName: 'Володимир Мурин',
		location: 'Львів, вулиця Городоцька(біля скрині)',
		contactInfo: 'Телефон: +380978373363',
		creationDate: Date.now(),
		description: 'Потрібні планшети і готівка для Н бригади',
		notes: 'До планшетів було б дуже добре мати зарядку',
		keyWords: 'Четвертий допис',
		items: [
			{
				name: 'Планшети',
				quantity: '5 штук',
			},
			{
				name: 'Готівка',
				quantity: '10 000 грн',
			},
		],
	},
	{
		id: '5',
		type: MARK_TYPES.I_NEED,
		ownerName: 'Володимир Мурин',
		location: 'Львів, вулиця Городоцька(біля скрині)',
		contactInfo: 'Телефон: +380978373363',
		creationDate: Date.now(),
		description: 'Потрібні планшети і готівка для Н бригади',
		notes: 'До планшетів було б дуже добре мати зарядку',
		keyWords: 'Пятий допис',
		items: [
			{
				name: 'Планшети',
				quantity: '5 штук',
			},
			{
				name: 'Готівка',
				quantity: '10 000 грн',
			},
		],
	},
	{
		id: '6',
		type: MARK_TYPES.I_NEED,
		ownerName: 'Володимир Мурин',
		location: 'Львів, вулиця Городоцька(біля скрині)',
		contactInfo: 'Телефон: +380978373363',
		creationDate: Date.now(),
		description: 'Потрібні планшети і готівка для Н бригади',
		notes: 'До планшетів було б дуже добре мати зарядку',
		keyWords: 'Шостий допис',
		items: [
			{
				name: 'Планшети',
				quantity: '5 штук',
			},
			{
				name: 'Готівка',
				quantity: '10 000 грн',
			},
		],
	},
	{
		id: '7',
		type: MARK_TYPES.I_NEED,
		ownerName: 'Володимир Мурин',
		location: 'Львів, вулиця Городоцька(біля скрині)',
		contactInfo: 'Телефон: +380978373363',
		creationDate: Date.now(),
		description: 'Потрібні планшети і готівка для Н бригади',
		notes: 'До планшетів було б дуже добре мати зарядку',
		keyWords: 'Сьомий допис',
		items: [
			{
				name: 'Планшети',
				quantity: '5 штук',
			},
			{
				name: 'Готівка',
				quantity: '10 000 грн',
			},
		],
	},
	{
		id: '8',
		type: MARK_TYPES.I_NEED,
		ownerName: 'Володимир Мурин',
		location: 'Львів, вулиця Городоцька(біля скрині)',
		contactInfo: 'Телефон: +380978373363',
		creationDate: Date.now(),
		description: 'Потрібні планшети і готівка для Н бригади',
		notes: 'До планшетів було б дуже добре мати зарядку',
		keyWords: 'Восьмий допис',
		items: [
			{
				name: 'Планшети',
				quantity: '5 штук',
			},
			{
				name: 'Готівка',
				quantity: '10 000 грн',
			},
		],
	},
	{
		id: '9',
		type: MARK_TYPES.I_NEED,
		ownerName: 'Володимир Мурин',
		location: 'Львів, вулиця Городоцька(біля скрині)',
		contactInfo: 'Телефон: +380978373363',
		creationDate: Date.now(),
		description: 'Потрібні планшети і готівка для Н бригади',
		notes: 'До планшетів було б дуже добре мати зарядку',
		keyWords: 'Девятий допис',
		items: [
			{
				name: 'Планшети',
				quantity: '5 штук',
			},
			{
				name: 'Готівка',
				quantity: '10 000 грн',
			},
		],
	},
	{
		id: '10',
		type: MARK_TYPES.I_NEED,
		ownerName: 'Володимир Мурин',
		location: 'Львів, вулиця Городоцька(біля скрині)',
		contactInfo: 'Телефон: +380978373363',
		creationDate: Date.now(),
		description: 'Потрібні планшети і готівка для Н бригади',
		notes: 'До планшетів було б дуже добре мати зарядку',
		keyWords: 'Десятий допис',
		items: [
			{
				name: 'Планшети',
				quantity: '5 штук',
			},
			{
				name: 'Готівка',
				quantity: '10 000 грн',
			},
		],
	},
];

export const DOTS = [
	{
		location: {
			lat: 50.458516,
			lng: 30.508254,
		},
		marker_id: '1',
	},
	{
		location: {
			lat: 50.460541,
			lng: 30.541304,
		},
		marker_id: '2',
	},
	{
		location: {
			lat: 50.434151,
			lng: 30.691758,
		},
		marker_id: '3',
	},
	{
		location: {
			lat: 50.562263,
			lng: 30.746979,
		},
		marker_id: '4',
	},
	{
		location: {
			lat: 50.557571,
			lng: 30.389028,
		},
		marker_id: '5',
	},
	{
		location: {
			lat: 50.331727,
			lng: 30.4784,
		},
		marker_id: '6',
	},
	{
		location: {
			lat: 49.842425,
			lng: 24.012524,
		},
		marker_id: '7',
	},
	{
		location: {
			lat: 49.835536,
			lng: 24.026381,
		},
		marker_id: '8',
	},
	{
		location: {
			lat: 49.857225,
			lng: 24.03779,
		},
		marker_id: '9',
	},
	{
		location: {
			lat: 49.823107,
			lng: 24.041314,
		},
		marker_id: '10',
	},
];

export const isInRange = (center, dot, range = 30000) => {
	if (range === Infinity) {
		return true;
	}

	return haversine(center, dot) < range;
};
