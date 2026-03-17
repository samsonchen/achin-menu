// ═══════════════════════════════════════════════════════════════════════════
//  菜單項目設定 — 餐廳業者請在此處修改菜單
//
//  每個項目的欄位說明：
//    names  多語言名稱，必填 { zh: 中文, en: 英文, ja: 日文, ko: 韓文 }
//    price  價格字串，例如 'NT$350'；若為時價填 'market'；無標價填 null
//    image  圖片檔名，例如 'hsf-1.jpg'，圖片放在 public/images/ 資料夾
//           若尚未有圖片，填 null，系統會顯示下方 emoji 代替
//    emoji  無圖片時顯示的圖示（圖片備用）
//    tags   標記陣列，例如 ['推薦', '小辣', '含豬肉']，留空填 []
//
//  新增項目範例：
//    { names: { zh: '蒜炒螃蟹', en: 'Garlic Crab', ja: 'ニンニクカニ', ko: '마늘게' },
//      price: 'NT$480', image: 'crab-garlic.jpg', emoji: '🦀', tags: ['推薦'] }
// ═══════════════════════════════════════════════════════════════════════════

// ── 海鮮類 ──────────────────────────────────────────────────────────────────
export const seafoodItems = [
  {
    names: { zh: '透抽·三杯',     en: 'Squid · Three Cup',      ja: 'イカ·三杯炒め',         ko: '오징어·삼배'      },
    price: null,      image: null, emoji: '🦑', tags: [],
  },
  {
    names: { zh: '透抽·蛋香',     en: 'Squid · Egg Sauce',      ja: 'イカ·卵炒め',           ko: '오징어·달걀'      },
    price: 'NT$400',  image: null, emoji: '🦑', tags: [],
  },
  {
    names: { zh: '透抽·清炒',     en: 'Squid · Stir-Fried',     ja: 'イカ·清炒め',           ko: '오징어·볶음'      },
    price: null,      image: null, emoji: '🦑', tags: [],
  },
  {
    names: { zh: '鮮蚵·豆鼓',     en: 'Oyster · Black Bean',    ja: '牡蠣·豆豉',             ko: '굴·두반장'        },
    price: 'NT$300',  image: null, emoji: '🦪', tags: [],
  },
  {
    names: { zh: '鮮蚵·蒜味',     en: 'Oyster · Garlic',        ja: '牡蠣·ニンニク',         ko: '굴·마늘'          },
    price: 'NT$330',  image: null, emoji: '🦪', tags: [],
  },
  {
    names: { zh: '鮮蝦·川燙',     en: 'Shrimp · Blanched',      ja: 'エビ·ボイル',           ko: '새우·데침'        },
    price: null,      image: null, emoji: '🍤', tags: [],
  },
  {
    names: { zh: '鮮蝦·熱炒',     en: 'Shrimp · Stir-Fried',    ja: 'エビ·炒め',             ko: '새우·볶음'        },
    price: 'NT$350',  image: null, emoji: '🍤', tags: [],
  },
  {
    names: { zh: '鮮蝦·麻油',     en: 'Shrimp · Sesame Oil',    ja: 'エビ·ごま油炒め',       ko: '새우·참기름'      },
    price: null,      image: null, emoji: '🍤', tags: [],
  },
  {
    names: { zh: '鮮蝦·蒜香奶油', en: 'Shrimp · Garlic Butter', ja: 'エビ·ガーリックバター', ko: '새우·마늘버터'    },
    price: null,      image: null, emoji: '🍤', tags: [],
  },
  {
    names: { zh: '招牌滑蛋蝦仁', en: 'Signature Egg & Shrimp',  ja: '看板滑り卵エビ',         ko: '시그니처 달걀새우' },
    price: 'NT$350',  image: null, emoji: '🥚', tags: ['招牌'],
  },
  {
    names: { zh: '芹香曼波魚',   en: 'Celery Mola Fish',        ja: 'セロリ·マンボウ',       ko: '미나리·개복치'    },
    price: 'NT$450',  image: null, emoji: '🐡', tags: [],
  },
  {
    names: { zh: '蒜苗鯊魚肉',   en: 'Garlic Shark Meat',       ja: 'ニンニク·サメ肉',       ko: '마늘·상어살'      },
    price: 'NT$400',  image: null, emoji: '🦈', tags: [],
  },
  {
    names: { zh: '蟹肉炒蛋',     en: 'Crab Egg Stir-Fry',       ja: 'カニ肉炒り卵',           ko: '게살·달걀볶음'    },
    price: 'NT$400',  image: null, emoji: '🦀', tags: [],
  },
]

// ── 熱炒類 ──────────────────────────────────────────────────────────────────
export const stirFryItems = [
  {
    names: { zh: '熱炒三鮮',   en: 'Stir-Fry Three Fresh',   ja: '三鮮炒め',       ko: '삼선볶음'      },
    price: 'NT$350',  image: 'hsf-1.jpg', emoji: '🥘', tags: ['推薦'],
  },
  {
    names: { zh: '塔香海香菇', en: 'Basil Seafood Mushroom', ja: 'バジル·キノコ',   ko: '바질·버섯'     },
    price: 'NT$250',  image: null,        emoji: '🍄', tags: [],
  },
  {
    names: { zh: '清蒸石斑魚', en: 'Steamed Grouper',        ja: '石斑魚の蒸し',   ko: '쪄낸 능성어'   },
    price: 'NT$500',  image: null,        emoji: '🐠', tags: ['推薦'],
  },
  {
    names: { zh: '東岸生魚片', en: 'East Coast Sashimi',     ja: '東海岸刺身',     ko: '동해안 회'     },
    price: 'NT$350',  image: null,        emoji: '🍣', tags: [],
  },
  {
    names: { zh: '野生龍蝦',   en: 'Wild Lobster',           ja: '天然ロブスター', ko: '자연산 랍스터' },
    price: 'market',  image: null,        emoji: '🦞', tags: [],
  },
]

// ── 肉類 ────────────────────────────────────────────────────────────────────
export const meatItems = [
  {
    names: { zh: '醬爆嫩牛肉', en: 'Sauce-Braised Beef',   ja: 'ソース炒め牛肉',  ko: '소스볶음 소고기' },
    price: 'NT$280',  image: null, emoji: '🥩', tags: ['含牛肉'],
  },
  {
    names: { zh: '沙茶羊肉',   en: 'Satay Lamb',            ja: 'サテー羊肉',      ko: '사테이 양고기'  },
    price: 'NT$300',  image: null, emoji: '🍖', tags: ['含羊肉'],
  },
  {
    names: { zh: '秘製滷豬腳', en: 'Braised Pork Knuckle', ja: '秘伝豚足煮込み',  ko: '비법 족발조림'  },
    price: 'NT$550',  image: null, emoji: '🍗', tags: ['含豬肉', '招牌'],
  },
]

// ── 炸物類 ──────────────────────────────────────────────────────────────────
export const friedItems = [
  {
    names: { zh: '花枝丸',   en: 'Squid Balls',       ja: 'イカ団子',       ko: '오징어볼'    },
    price: 'NT$250',  image: null, emoji: '🦑', tags: [],
  },
  {
    names: { zh: '薯條',     en: 'French Fries',      ja: 'フライドポテト', ko: '감자튀김'    },
    price: 'NT$120',  image: null, emoji: '🍟', tags: [],
  },
  {
    names: { zh: '炸魚柳',   en: 'Fried Fish Fillet', ja: '魚フライ',       ko: '생선튀김'    },
    price: 'NT$300',  image: null, emoji: '🐟', tags: [],
  },
  {
    names: { zh: '魚蛋沙拉', en: 'Fish Ball Salad',   ja: '魚団子サラダ',   ko: '어묵 샐러드' },
    price: 'NT$300',  image: null, emoji: '🥗', tags: [],
  },
]

// ── 熱湯類 ──────────────────────────────────────────────────────────────────
export const soupItems = [
  {
    names: { zh: '蛤蜊湯',   en: 'Clam Soup',       ja: 'ハマグリスープ', ko: '조개탕'     },
    price: 'NT$250',  image: null, emoji: '🐚', tags: [],
    imgBg: '#C8F0D8', priceColor: '#3D8A5A',
  },
  {
    names: { zh: '鮮蚵湯',   en: 'Oyster Soup',     ja: '牡蠣スープ',     ko: '굴탕'       },
    price: 'NT$300',  image: null, emoji: '🦪', tags: [],
    imgBg: '#C8F0D8', priceColor: '#3D8A5A',
  },
  {
    names: { zh: '味噌魚湯', en: 'Miso Fish Soup',  ja: '味噌魚スープ',   ko: '된장생선국' },
    price: 'NT$480',  image: null, emoji: '🐡', tags: [],
    imgBg: '#FFF3E0', priceColor: '#D89575',
  },
  {
    names: { zh: '鮮魚清湯', en: 'Clear Fish Soup', ja: '魚の清湯',       ko: '맑은생선국' },
    price: 'NT$480',  image: null, emoji: '🍵', tags: [],
    imgBg: '#FFF3E0', priceColor: '#D89575',
  },
]

// ── 青菜類 ──────────────────────────────────────────────────────────────────
export const vegItems = [
  {
    names: { zh: '季節時蔬', en: 'Seasonal Vegetables', ja: '旬の野菜', ko: '제철 채소' },
    price: 'NT$180',  image: null, emoji: '🥬', tags: [],
  },
]

// ── 主食類 ──────────────────────────────────────────────────────────────────
export const stapleItems = [
  {
    names: { zh: '白飯',  en: 'Steamed Rice',  ja: 'ご飯',     ko: '밥'     },
    price: 'NT$15',   image: null, emoji: '🍚', tags: [],
    sub: { zh: '每碗計算', en: 'Per bowl',     ja: '一杯ごと', ko: '한 공기당' },
  },
  {
    names: { zh: '炒麵',  en: 'Fried Noodles', ja: '焼きそば', ko: '볶음면' },
    price: 'NT$100',  image: null, emoji: '🍜', tags: [],
    sub: { zh: '每份計算', en: 'Per serving',  ja: '一人前ごと', ko: '1인분당' },
  },
]
