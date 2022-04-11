type d = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;
type oneToNine = Exclude<d, 0>;
type YYYY = `202${d}`;
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`;
type DD = `0${oneToNine}` | `${1 | 2}${d}` | `3${0 | 1}`;

export type Date = `${YYYY}-${MM}-${DD}` | 'latest';

export type Formats = '.json' | '.min.json';

export type AdditionalDate = {
  date: Date
}

export type CurrencyReturn<C extends CurrencyCode> = {
  [curr in C]: Record<CurrencyCode, number>
} & AdditionalDate;

export type FromToResp<T extends CurrencyCode> = {
  [curr in T]: number
} & AdditionalDate;

export interface AllCurrencies {
  '1inch': "1inch Network",
  ada: "Cardano",
  aed: "United Arab Emirates Dirham",
  afn: "Afghan afghani",
  algo: "Algorand",
  all: "Albanian lek",
  amd: "Armenian dram",
  ang: "Netherlands Antillean Guilder",
  aoa: "Angolan kwanza",
  ars: "Argentine peso",
  atom: "Atomic Coin",
  aud: "Australian dollar",
  avax: "Avalanche",
  awg: "Aruban florin",
  azn: "Azerbaijani manat",
  bam: "Bosnia-Herzegovina Convertible Mark",
  bbd: "Bajan dollar",
  bch: "Bitcoin Cash",
  bdt: "Bangladeshi taka",
  bgn: "Bulgarian lev",
  bhd: "Bahraini dinar",
  bif: "Burundian Franc",
  bmd: "Bermudan dollar",
  bnb: "Binance Coin",
  bnd: "Brunei dollar",
  bob: "Bolivian boliviano",
  brl: "Brazilian real",
  bsd: "Bahamian dollar",
  btc: "Bitcoin",
  btn: "Bhutan currency",
  busd: "Binance USD",
  bwp: "Botswanan Pula",
  byn: "New Belarusian Ruble",
  byr: "Belarusian Ruble",
  bzd: "Belize dollar",
  cad: "Canadian dollar",
  cdf: "Congolese franc",
  chf: "Swiss franc",
  chz: "Chiliz",
  clf: "Chilean Unit of Account (UF)",
  clp: "Chilean peso",
  cny: "Chinese Yuan",
  cop: "Colombian peso",
  crc: "Costa Rican Colón",
  cro: "Crypto.com Chain Token",
  cuc: "Cuban peso",
  cup: "Cuban Peso",
  cve: "Cape Verdean escudo",
  czk: "Czech koruna",
  dai: "Dai",
  djf: "Djiboutian franc",
  dkk: "Danish krone",
  doge: "Dogecoin",
  dop: "Dominican peso",
  dot: "Dotcoin",
  dzd: "Algerian dinar",
  egld: "Elrond",
  egp: "Egyptian pound",
  enj: "Enjin Coin",
  ern: "Eritrean nakfa",
  etb: "Ethiopian birr",
  etc: "Ethereum Classic",
  eth: "Ether",
  eur: "Euro",
  fil: "FileCoin",
  fjd: "Fijian dollar",
  fkp: "Falkland Islands pound",
  ftt: "FarmaTrust",
  gbp: "Pound sterling",
  gel: "Georgian lari",
  ggp: "GGPro",
  ghs: "Ghanaian cedi",
  gip: "Gibraltar pound",
  gmd: "Gambian dalasi",
  gnf: "Guinean franc",
  grt: "Golden Ratio Token",
  gtq: "Guatemalan quetzal",
  gyd: "Guyanaese Dollar",
  hkd: "Hong Kong dollar",
  hnl: "Honduran lempira",
  hrk: "Croatian kuna",
  htg: "Haitian gourde",
  huf: "Hungarian forint",
  icp: "Internet Computer",
  idr: "Indonesian rupiah",
  ils: "Israeli New Shekel",
  imp: "CoinIMP",
  inj: "Injective",
  inr: "Indian rupee",
  iqd: "Iraqi dinar",
  irr: "Iranian rial",
  isk: "Icelandic króna",
  jep: "Jersey Pound",
  jmd: "Jamaican dollar",
  jod: "Jordanian dinar",
  jpy: "Japanese yen",
  kes: "Kenyan shilling",
  kgs: "Kyrgystani Som",
  khr: "Cambodian riel",
  kmf: "Comorian franc",
  kpw: "North Korean won",
  krw: "South Korean won",
  ksm: "Kusama",
  kwd: "Kuwaiti dinar",
  kyd: "Cayman Islands dollar",
  kzt: "Kazakhstani tenge",
  lak: "Laotian Kip",
  lbp: "Lebanese pound",
  link: "ChainLink",
  lkr: "Sri Lankan rupee",
  lrd: "Liberian dollar",
  lsl: "Lesotho loti",
  ltc: "Litecoin",
  ltl: "Lithuanian litas",
  luna: "Luna Coin",
  lvl: "Latvian lats",
  lyd: "Libyan dinar",
  mad: "Moroccan dirham",
  matic: "Polygon",
  mdl: "Moldovan leu",
  mga: "Malagasy ariary",
  mkd: "Macedonian denar",
  mmk: "Myanmar Kyat",
  mnt: "Mongolian tugrik",
  mop: "Macanese pataca",
  mro: "Mauritanian ouguiya",
  mur: "Mauritian rupee",
  mvr: "Maldivian rufiyaa",
  mwk: "Malawian kwacha",
  mxn: "Mexican peso",
  myr: "Malaysian ringgit",
  mzn: "Mozambican Metical",
  nad: "Namibian dollar",
  ngn: "Nigerian naira",
  nio: "Nicaraguan córdoba",
  nok: "Norwegian krone",
  npr: "Nepalese rupee",
  nzd: "New Zealand dollar",
  omr: "Omani rial",
  one: "Menlo One",
  pab: "Panamanian balboa",
  pen: "Sol",
  pgk: "Papua New Guinean kina",
  php: "Philippine peso",
  pkr: "Pakistani rupee",
  pln: "Poland złoty",
  pyg: "Paraguayan guarani",
  qar: "Qatari Rial",
  ron: "Romanian leu",
  rsd: "Serbian dinar",
  rub: "Russian ruble",
  rwf: "Rwandan Franc",
  sar: "Saudi riyal",
  sbd: "Solomon Islands dollar",
  scr: "Seychellois rupee",
  sdg: "Sudanese pound",
  sek: "Swedish krona",
  sgd: "Singapore dollar",
  shib: "Shiba Inu",
  shp: "Saint Helena pound",
  sll: "Sierra Leonean leone",
  sol: "Sola",
  sos: "Somali shilling",
  srd: "Surinamese dollar",
  std: "São Tomé and Príncipe Dobra (pre-2018)",
  svc: "Salvadoran Colón",
  syp: "Syrian pound",
  szl: "Swazi lilangeni",
  thb: "Thai baht",
  theta: "Theta",
  tjs: "Tajikistani somoni",
  tmt: "Turkmenistani manat",
  tnd: "Tunisian dinar",
  top: "Tongan Paʻanga",
  trx: "TRON",
  try: "Turkish lira",
  ttd: "Trinidad & Tobago Dollar",
  twd: "New Taiwan dollar",
  tzs: "Tanzanian shilling",
  uah: "Ukrainian hryvnia",
  ugx: "Ugandan shilling",
  uni: "Universe",
  usd: "United States dollar",
  usdc: "USD Coin",
  usdt: "Tether",
  uyu: "Uruguayan peso",
  uzs: "Uzbekistani som",
  vef: "Sovereign Bolivar",
  vet: "Vechain",
  vnd: "Vietnamese dong",
  vuv: "Vanuatu vatu",
  wbtc: "Wrapped Bitcoin",
  wst: "Samoan tala",
  xaf: "Central African CFA franc",
  xag: "Silver Ounce",
  xau: "XauCoin",
  xcd: "East Caribbean dollar",
  xdr: "Special Drawing Rights",
  xlm: "Stellar",
  xmr: "Monero",
  xof: "West African CFA franc",
  xpf: "CFP franc",
  xrp: "XRP",
  yer: "Yemeni rial",
  zar: "South African rand",
  zmk: "Zambian kwacha",
  zmw: "Zambian Kwacha",
  zwl: "Zimbabwean Dollar"
}

export type CurrencyCode =
  '1inch' |
  'ada' |
  'aed' |
  'afn' |
  'algo' |
  'all' |
  'amd' |
  'ang' |
  'aoa' |
  'ars' |
  'atom' |
  'aud' |
  'avax' |
  'awg' |
  'azn' |
  'bam' |
  'bbd' |
  'bch' |
  'bdt' |
  'bgn' |
  'bhd' |
  'bif' |
  'bmd' |
  'bnb' |
  'bnd' |
  'bob' |
  'brl' |
  'bsd' |
  'btc' |
  'btn' |
  'busd' |
  'bwp' |
  'byn' |
  'byr' |
  'bzd' |
  'cad' |
  'cdf' |
  'chf' |
  'chz' |
  'clf' |
  'clp' |
  'cny' |
  'cop' |
  'crc' |
  'cro' |
  'cuc' |
  'cup' |
  'cve' |
  'czk' |
  'dai' |
  'djf' |
  'dkk' |
  'doge' |
  'dop' |
  'dot' |
  'dzd' |
  'egld' |
  'egp' |
  'enj' |
  'ern' |
  'etb' |
  'etc' |
  'eth' |
  'eur' |
  'fil' |
  'fjd' |
  'fkp' |
  'ftt' |
  'gbp' |
  'gel' |
  'ggp' |
  'ghs' |
  'gip' |
  'gmd' |
  'gnf' |
  'grt' |
  'gtq' |
  'gyd' |
  'hkd' |
  'hnl' |
  'hrk' |
  'htg' |
  'huf' |
  'icp' |
  'idr' |
  'ils' |
  'imp' |
  'inj' |
  'inr' |
  'iqd' |
  'irr' |
  'isk' |
  'jep' |
  'jmd' |
  'jod' |
  'jpy' |
  'kes' |
  'kgs' |
  'khr' |
  'kmf' |
  'kpw' |
  'krw' |
  'ksm' |
  'kwd' |
  'kyd' |
  'kzt' |
  'lak' |
  'lbp' |
  'link' |
  'lkr' |
  'lrd' |
  'lsl' |
  'ltc' |
  'ltl' |
  'luna' |
  'lvl' |
  'lyd' |
  'mad' |
  'matic' |
  'mdl' |
  'mga' |
  'mkd' |
  'mmk' |
  'mnt' |
  'mop' |
  'mro' |
  'mur' |
  'mvr' |
  'mwk' |
  'mxn' |
  'myr' |
  'mzn' |
  'nad' |
  'ngn' |
  'nio' |
  'nok' |
  'npr' |
  'nzd' |
  'omr' |
  'one' |
  'pab' |
  'pen' |
  'pgk' |
  'php' |
  'pkr' |
  'pln' |
  'pyg' |
  'qar' |
  'ron' |
  'rsd' |
  'rub' |
  'rwf' |
  'sar' |
  'sbd' |
  'scr' |
  'sdg' |
  'sek' |
  'sgd' |
  'shib' |
  'shp' |
  'sll' |
  'sol' |
  'sos' |
  'srd' |
  'std' |
  'svc' |
  'syp' |
  'szl' |
  'thb' |
  'theta' |
  'tjs' |
  'tmt' |
  'tnd' |
  'top' |
  'trx' |
  'try' |
  'ttd' |
  'twd' |
  'tzs' |
  'uah' |
  'ugx' |
  'uni' |
  'usd' |
  'usdc' |
  'usdt' |
  'uyu' |
  'uzs' |
  'vef' |
  'vet' |
  'vnd' |
  'vuv' |
  'wbtc' |
  'wst' |
  'xaf' |
  'xag' |
  'xau' |
  'xcd' |
  'xdr' |
  'xlm' |
  'xmr' |
  'xof' |
  'xpf' |
  'xrp' |
  'yer' |
  'zar' |
  'zmk' |
  'zmw' |
  'zwl'