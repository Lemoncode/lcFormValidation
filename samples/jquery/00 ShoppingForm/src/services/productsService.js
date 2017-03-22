const products = [
  {
    id: 18,
    description: 'Corsair',
    products: [
      { id: '63', description: 'K95 RGB' },
      { id: '73', description: 'K70 RGB' },
      { id: '15', description: 'Strafe RGB' },
      { id: '31', description: 'Strafe RGB MX Silent' },
      { id: '80', description: 'K65 RGB Rapidfire' },
    ]
  },
  {
    id: 46,
    description: 'Ozone',
    products: [
      { id: '28', description: 'Strike X30' },
      { id: '65', description: 'Strike Pro Spectra' },
      { id: '54', description: 'Strike Pro' },
      { id: '55', description: 'Strike Battle Spectra' },
      { id: '84', description: 'Strike Battle' },
      { id: '06', description: 'Blade' },
    ]
  },
  {
    id: 23,
    description: 'Razer',
    products: [
      { id: '37', description: 'Blackwidow Chroma V2' },
      { id: '52', description: 'Blackwidow X Chroma' },
      { id: '02', description: 'Ornata Chroma' },
      { id: '39', description: 'Blackwidow X Ultimate' },
      { id: '04', description: 'Blackwidow 2016' },
      { id: '46', description: 'Orbweaver Chroma' },
    ]
  },
  {
    id: 15,
    description: 'Logitech',
    products: [
      { id: '40', description: 'Pro' },
      { id: '63', description: 'G213' },
      { id: '80', description: 'G910' },
      { id: '01', description: 'G810' },
      { id: '36', description: 'G610' },
      { id: '56', description: 'G410' },
    ]
  },
  {
    id: 21,
    description: 'SteelSeries',
    products: [
      { id: '86', description: 'Apex M800' },
      { id: '65', description: 'Apex M500' },
      { id: '75', description: 'Apex 350' },
      { id: '72', description: 'Apex 300' },
      { id: '47', description: 'Apex 100' },
    ]
  },
];

function fetchProducts() {
  return Promise.resolve(products);
}

export const productsService = {
  fetchProducts,
};
