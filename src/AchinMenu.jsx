import React, { useState } from 'react'

// ─── i18n ─────────────────────────────────────────────────────────────────────

const LANGUAGES = ['中文', 'EN', '日本語', '한국어']
const LANG_KEY = { '中文': 'zh', 'EN': 'en', '日本語': 'ja', '한국어': 'ko' }

const UI = {
  zh: {
    langLabel:    '顯示語言 · Display Language',
    heroSub:      '新鮮海味·道地台灣風',
    heroTitle:    '阿卿海鮮店',
    marketPrice:  '時價',
    stirFryNote:  '可選: 沙拉·清蒸·味噌湯',
    vegSub:       '當季新鮮蔬菜',
    footerSub:    'A-Qing Seafood Restaurant',
    footerLang:   '語言選擇 · Language',
    footerCopy:   '© 2024 阿卿海鮮店 · 價格可能調整',
    sections: {
      seafood:  { main: '海鮮類', sub: '(Seafood)' },
      stirFry:  { main: '熱炒類', sub: '(Hot Stir-Fry)' },
      meat:     { main: '肉類',   sub: '(Meat)' },
      fried:    { main: '炸物類', sub: 'Fried Foods' },
      soups:    { main: '熱湯類', sub: 'Hot Soups' },
      veg:      { main: '青菜類', sub: 'Vegetables' },
      staples:  { main: '主食類', sub: 'Staples' },
    },
    vegName:    '季節時蔬',
    staples: [
      { name: '白飯', sub: '每碗計算' },
      { name: '炒麵', sub: '每份計算' },
    ],
  },
  en: {
    langLabel:    'Display Language · 顯示語言',
    heroSub:      'Fresh Seafood · Authentic Taiwanese Flavour',
    heroTitle:    'A-Qing Seafood',
    marketPrice:  'Market Price',
    stirFryNote:  'Options: Salad · Steamed · Miso Soup',
    vegSub:       'Fresh seasonal greens',
    footerSub:    'A-Qing Seafood Restaurant',
    footerLang:   'Language · 語言選擇',
    footerCopy:   '© 2024 A-Qing Seafood · Prices subject to change',
    sections: {
      seafood:  { main: 'Seafood',     sub: '海鮮類' },
      stirFry:  { main: 'Stir-Fry',    sub: '熱炒類' },
      meat:     { main: 'Meat',        sub: '肉類' },
      fried:    { main: 'Fried Foods', sub: '炸物類' },
      soups:    { main: 'Hot Soups',   sub: '熱湯類' },
      veg:      { main: 'Vegetables',  sub: '青菜類' },
      staples:  { main: 'Staples',     sub: '主食類' },
    },
    vegName:    'Seasonal Vegetables',
    staples: [
      { name: 'Steamed Rice',  sub: 'Per bowl' },
      { name: 'Fried Noodles', sub: 'Per serving' },
    ],
  },
  ja: {
    langLabel:    '言語選択 · Display Language',
    heroSub:      '新鮮な海の幸・本場台湾風',
    heroTitle:    '阿卿海鮮店',
    marketPrice:  '時価',
    stirFryNote:  'オプション：サラダ・蒸し・味噌汁',
    vegSub:       '新鮮な旬の野菜',
    footerSub:    'A-Qing シーフードレストラン',
    footerLang:   '言語選択 · Language',
    footerCopy:   '© 2024 阿卿海鮮店 · 価格は変更になる場合があります',
    sections: {
      seafood:  { main: '海鮮類',     sub: 'Seafood' },
      stirFry:  { main: '炒め物類',   sub: 'Hot Stir-Fry' },
      meat:     { main: '肉類',       sub: 'Meat' },
      fried:    { main: '揚げ物類',   sub: 'Fried Foods' },
      soups:    { main: 'スープ類',   sub: 'Hot Soups' },
      veg:      { main: '野菜類',     sub: 'Vegetables' },
      staples:  { main: '主食類',     sub: 'Staples' },
    },
    vegName:    '旬の野菜',
    staples: [
      { name: 'ご飯',     sub: '一杯ごと' },
      { name: '焼きそば', sub: '一人前ごと' },
    ],
  },
  ko: {
    langLabel:    '언어 선택 · Display Language',
    heroSub:      '신선한 해산물 · 정통 대만 맛',
    heroTitle:    '아칭 해산물 식당',
    marketPrice:  '시가',
    stirFryNote:  '선택: 샐러드 · 찜 · 된장국',
    vegSub:       '신선한 제철 채소',
    footerSub:    'A-Qing 해산물 식당',
    footerLang:   '언어 선택 · Language',
    footerCopy:   '© 2024 아칭 해산물 · 가격은 변경될 수 있습니다',
    sections: {
      seafood:  { main: '해산물류',  sub: 'Seafood' },
      stirFry:  { main: '볶음류',    sub: 'Hot Stir-Fry' },
      meat:     { main: '육류',      sub: 'Meat' },
      fried:    { main: '튀김류',    sub: 'Fried Foods' },
      soups:    { main: '국물류',    sub: 'Hot Soups' },
      veg:      { main: '채소류',    sub: 'Vegetables' },
      staples:  { main: '주식류',    sub: 'Staples' },
    },
    vegName:    '제철 채소',
    staples: [
      { name: '밥',    sub: '한 공기당' },
      { name: '볶음면', sub: '1인분당' },
    ],
  },
}

// ─── Menu Data ────────────────────────────────────────────────────────────────

const seafoodItems = [
  { emoji: '🦑', names: { zh: '透抽·三杯',    en: 'Squid · Three Cup',       ja: 'イカ·三杯炒め',       ko: '오징어·삼배'       }, price: null },
  { emoji: '🦑', names: { zh: '透抽·蛋香',    en: 'Squid · Egg Sauce',       ja: 'イカ·卵炒め',         ko: '오징어·달걀'       }, price: 'NT$400' },
  { emoji: '🦑', names: { zh: '透抽·清炒',    en: 'Squid · Stir-Fried',      ja: 'イカ·清炒め',         ko: '오징어·볶음'       }, price: null },
  { emoji: '🦪', names: { zh: '鮮蚵·豆鼓',    en: 'Oyster · Black Bean',     ja: '牡蠣·豆豉',           ko: '굴·두반장'         }, price: 'NT$300' },
  { emoji: '🦪', names: { zh: '鮮蚵·蒜味',    en: 'Oyster · Garlic',         ja: '牡蠣·ニンニク',       ko: '굴·마늘'           }, price: 'NT$330' },
  { emoji: '🍤', names: { zh: '鮮蝦·川燙',    en: 'Shrimp · Blanched',       ja: 'エビ·ボイル',         ko: '새우·데침'         }, price: null },
  { emoji: '🍤', names: { zh: '鮮蝦·熱炒',    en: 'Shrimp · Stir-Fried',     ja: 'エビ·炒め',           ko: '새우·볶음'         }, price: 'NT$350' },
  { emoji: '🍤', names: { zh: '鮮蝦·麻油',    en: 'Shrimp · Sesame Oil',     ja: 'エビ·ごま油炒め',     ko: '새우·참기름'       }, price: null },
  { emoji: '🍤', names: { zh: '鮮蝦·蒜香奶油', en: 'Shrimp · Garlic Butter',  ja: 'エビ·ガーリックバター', ko: '새우·마늘버터'   }, price: null },
  { emoji: '🥚', names: { zh: '招牌滑蛋蝦仁', en: 'Signature Egg & Shrimp',  ja: '看板滑り卵エビ',       ko: '시그니처 달걀새우'  }, price: 'NT$350' },
  { emoji: '🐡', names: { zh: '芹香曼波魚',   en: 'Celery Mola Fish',        ja: 'セロリ·マンボウ',     ko: '미나리·개복치'     }, price: 'NT$450' },
  { emoji: '🦈', names: { zh: '蒜苗鯊魚肉',   en: 'Garlic Shark Meat',       ja: 'ニンニク·サメ肉',     ko: '마늘·상어살'       }, price: 'NT$400' },
  { emoji: '🦀', names: { zh: '蟹肉炒蛋',     en: 'Crab Egg Stir-Fry',       ja: 'カニ肉炒り卵',         ko: '게살·달걀볶음'     }, price: 'NT$400' },
]

const stirFryItems = [
  { emoji: '🥘', names: { zh: '熱炒三鮮',   en: 'Stir-Fry Three Fresh',  ja: '三鮮炒め',       ko: '삼선볶음'       }, price: 'NT$350' },
  { emoji: '🍄', names: { zh: '塔香海香菇', en: 'Basil Seafood Mushroom', ja: 'バジル·キノコ',   ko: '바질·버섯'      }, price: 'NT$250' },
  { emoji: '🐠', names: { zh: '清蒸石斑魚', en: 'Steamed Grouper',        ja: '石斑魚の蒸し',   ko: '쪄낸 능성어'    }, price: 'NT$500' },
  { emoji: '🍣', names: { zh: '東岸生魚片', en: 'East Coast Sashimi',     ja: '東海岸刺身',     ko: '동해안 회'      }, price: 'NT$350' },
  { emoji: '🦞', names: { zh: '野生龍蝦',   en: 'Wild Lobster',           ja: '天然ロブスター', ko: '자연산 랍스터'  }, price: 'market', muted: true },
]

const meatItems = [
  { emoji: '🥩', names: { zh: '醬爆嫩牛肉', en: 'Sauce-Braised Beef',      ja: 'ソース炒め牛肉',    ko: '소스볶음 소고기' }, price: 'NT$280' },
  { emoji: '🍖', names: { zh: '沙茶羊肉',   en: 'Satay Lamb',              ja: 'サテー羊肉',        ko: '사테이 양고기'  }, price: 'NT$300' },
  { emoji: '🍗', names: { zh: '秘製滷豬腳', en: 'Braised Pork Knuckle',    ja: '秘伝豚足煮込み',    ko: '비법 족발조림'  }, price: 'NT$550' },
]

const friedItems = [
  { emoji: '🦑', names: { zh: '花枝丸',   en: 'Squid Balls',      ja: 'イカ団子',         ko: '오징어볼'    }, price: '$250' },
  { emoji: '🍟', names: { zh: '薯條',     en: 'French Fries',     ja: 'フライドポテト',   ko: '감자튀김'    }, price: '$120' },
  { emoji: '🐟', names: { zh: '炸魚柳',   en: 'Fried Fish Fillet', ja: '魚フライ',        ko: '생선튀김'    }, price: '$300' },
  { emoji: '🥗', names: { zh: '魚蛋沙拉', en: 'Fish Ball Salad',  ja: '魚団子サラダ',     ko: '어묵 샐러드' }, price: '$300' },
]

const soupItems = [
  { emoji: '🐚', names: { zh: '蛤蜊湯',   en: 'Clam Soup',       ja: 'ハマグリスープ', ko: '조개탕'     }, price: '$250', imgBg: '#C8F0D8', priceColor: '#3D8A5A' },
  { emoji: '🦪', names: { zh: '鮮蚵湯',   en: 'Oyster Soup',     ja: '牡蠣スープ',     ko: '굴탕'       }, price: '$300', imgBg: '#C8F0D8', priceColor: '#3D8A5A' },
  { emoji: '🐡', names: { zh: '味噌魚湯', en: 'Miso Fish Soup',  ja: '味噌魚スープ',   ko: '된장생선국' }, price: '$480', imgBg: '#FFF3E0', priceColor: '#D89575' },
  { emoji: '🍵', names: { zh: '鮮魚清湯', en: 'Clear Fish Soup', ja: '魚の清湯',       ko: '맑은생선국' }, price: '$480', imgBg: '#FFF3E0', priceColor: '#D89575' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function MenuCard({ emoji, name, price, muted }) {
  return (
    <div
      className="rounded-xl overflow-hidden bg-white flex flex-col"
      style={{ boxShadow: '0 2px 12px rgba(26,25,24,0.03)' }}
    >
      <div className="flex items-center justify-center bg-[#EDECEA] rounded-t-xl" style={{ height: 140 }}>
        <span style={{ fontSize: 40 }}>{emoji}</span>
      </div>
      <div className="flex flex-col gap-1 p-[8px_10px_10px]">
        <span className="text-[13px] font-semibold text-[#1A1918] leading-snug">{name}</span>
        {price ? (
          <span className="text-[12px] font-semibold" style={{ color: muted ? '#9C9B99' : '#D89575' }}>
            {price}
          </span>
        ) : (
          <span className="text-[12px] text-[#9C9B99]">NT$ —</span>
        )}
      </div>
    </div>
  )
}

function FriedCard({ emoji, name, price }) {
  return (
    <div
      className="rounded-xl overflow-hidden bg-white flex flex-col"
      style={{ boxShadow: '0 2px 8px rgba(26,25,24,0.07)' }}
    >
      <div className="flex items-center justify-center bg-[#EDECEA] rounded-t-xl" style={{ height: 140 }}>
        <span style={{ fontSize: 36 }}>{emoji}</span>
      </div>
      <div className="flex flex-col gap-1 p-[10px]">
        <span className="text-[15px] font-bold text-[#1A1918]">{name}</span>
        <span className="text-[14px] font-bold text-[#D89575]">{price}</span>
      </div>
    </div>
  )
}

function SoupCard({ emoji, name, price, imgBg, priceColor }) {
  return (
    <div
      className="rounded-xl overflow-hidden bg-white flex flex-col"
      style={{ boxShadow: '0 2px 8px rgba(26,25,24,0.07)' }}
    >
      <div
        className="flex items-center justify-center rounded-t-xl"
        style={{ height: 120, backgroundColor: imgBg }}
      >
        <span style={{ fontSize: 36 }}>{emoji}</span>
      </div>
      <div className="flex flex-col gap-1 p-[10px]">
        <span className="text-[15px] font-bold text-[#1A1918]">{name}</span>
        <span className="text-[14px] font-bold" style={{ color: priceColor }}>{price}</span>
      </div>
    </div>
  )
}

function SectionHeaderSmall({ accent, main, sub }) {
  return (
    <div className="flex items-center gap-[10px] px-[18px] py-4">
      <div className="w-1 h-6 rounded-sm flex-shrink-0" style={{ backgroundColor: accent }} />
      <div className="flex items-center gap-2">
        <span className="text-[18px] font-semibold text-[#1A1918] tracking-[-0.2px]">{main}</span>
        <span className="text-[13px] text-[#6D6C6A]">{sub}</span>
      </div>
    </div>
  )
}

function SectionHeaderLarge({ accent, main, sub }) {
  return (
    <div className="flex items-center gap-[10px] px-3">
      <div className="w-1 h-8 rounded-sm flex-shrink-0" style={{ backgroundColor: accent }} />
      <div className="flex flex-col" style={{ gap: 1 }}>
        <span className="text-[20px] font-bold text-[#1A1918]">{main}</span>
        <span className="text-[11px] font-medium text-[#9C9B99]">{sub}</span>
      </div>
    </div>
  )
}

function Grid({ items, Card = MenuCard }) {
  const rows = []
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2))
  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, ri) => (
        <div key={ri} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}>
          {row.map((item, ci) => <Card key={ci} {...item} />)}
        </div>
      ))}
    </div>
  )
}

function LanguageBar({ lang, setLang, light = true }) {
  return (
    <div className="flex items-center gap-2 w-full">
      {LANGUAGES.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`flex items-center justify-center h-9 px-4 rounded-full text-[14px] transition-colors whitespace-nowrap ${
            lang === l
              ? 'bg-[#D89575] text-white font-semibold'
              : light
                ? 'bg-white text-[#6D6C6A] font-medium border border-[#D1D0CD]'
                : 'bg-[#2C2C2A] text-[#9C9B99] font-medium'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AchinMenu() {
  const [lang, setLang] = useState('中文')
  const lk = LANG_KEY[lang]
  const t = UI[lk]

  // Resolve localised items
  const localise = (items) =>
    items.map((item) => ({
      ...item,
      name: item.names[lk],
      price: item.price === 'market' ? t.marketPrice : item.price,
    }))

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#F5F4F1] font-outfit overflow-x-hidden">

      {/* Status Bar */}
      <div className="flex items-center justify-between bg-white px-5" style={{ height: 62 }}>
        <span className="text-[15px] font-semibold text-[#1A1918] font-inter">9:41</span>
        <div className="flex items-center gap-[6px]">
          <svg width="16" height="16" viewBox="0 0 24 20" fill="#1A1918">
            <rect x="0"  y="14" width="4" height="6" rx="1"/>
            <rect x="5"  y="10" width="4" height="10" rx="1"/>
            <rect x="10" y="6"  width="4" height="14" rx="1"/>
            <rect x="15" y="2"  width="4" height="18" rx="1"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1918" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
            <circle cx="12" cy="20" r="1" fill="#1A1918"/>
          </svg>
          <svg width="22" height="12" viewBox="0 0 24 12">
            <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="#1A1918" strokeWidth="1" fill="none"/>
            <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#1A1918"/>
            <path d="M21.5 4v4a2 2 0 0 0 0-4z" fill="#1A1918"/>
          </svg>
        </div>
      </div>

      {/* Sticky Header */}
      <div
        className="flex items-center px-4 bg-white sticky top-0 z-10"
        style={{ height: 60, boxShadow: '0 2px 8px rgba(26,25,24,0.06)' }}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFF0E8] flex-shrink-0">
          <span style={{ fontSize: 20 }}>🦀</span>
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[18px] font-semibold text-[#D89575] tracking-[-0.2px]">阿卿海鮮店</span>
        </div>
        <div style={{ width: 40, height: 40 }} />
      </div>

      {/* Language Selector */}
      <div className="bg-white px-3 pt-[10px] pb-2 flex flex-col gap-[6px]">
        <LanguageBar lang={lang} setLang={setLang} light />
        <span className="text-[11px] text-[#9C9B99]">{t.langLabel}</span>
      </div>

      {/* Hero Banner */}
      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1732985030183-5afbc688e63d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzM1NjE2MTd8&ixlib=rb-4.1.0&q=80&w=1080"
          alt="阿卿海鮮店"
          className="w-full object-cover"
          style={{ height: 200 }}
        />
        <div className="bg-[#1A1918] px-5 py-[14px] flex flex-col gap-1">
          <span className="text-[26px] font-bold text-white tracking-[-0.5px]">{t.heroTitle}</span>
          <span className="text-[13px] font-medium text-[#D89575]">{t.heroSub}</span>
        </div>
      </div>

      {/* 海鮮類 Section */}
      <div className="bg-white">
        <SectionHeaderSmall accent="#D89575" {...t.sections.seafood} />
        <div className="px-3 pb-4">
          <Grid items={localise(seafoodItems)} />
        </div>
      </div>

      {/* 熱炒類 Section */}
      <div className="bg-[#FAFAF8]">
        <SectionHeaderSmall accent="#3D8A5A" {...t.sections.stirFry} />
        <div className="px-3 pb-4 flex flex-col gap-3">
          <Grid items={localise(stirFryItems)} />
          <span className="text-[11px] text-[#9C9B99] mt-1">{t.stirFryNote}</span>
        </div>
      </div>

      {/* 肉類 Section */}
      <div className="bg-white">
        <SectionHeaderSmall accent="#D4A64A" {...t.sections.meat} />
        <div className="px-3 pb-4">
          <Grid items={localise(meatItems)} />
        </div>
      </div>

      {/* 炸物類 Section */}
      <div className="bg-white pt-6 pb-2">
        <SectionHeaderLarge accent="#D89575" {...t.sections.fried} />
        <div className="px-3 pt-4 pb-4">
          <Grid items={localise(friedItems)} Card={FriedCard} />
        </div>
      </div>

      {/* 熱湯類 Section */}
      <div className="bg-[#F5F4F1] pt-6 pb-2">
        <SectionHeaderLarge accent="#3D8A5A" {...t.sections.soups} />
        <div className="px-3 pt-4 pb-4">
          <Grid items={localise(soupItems)} Card={SoupCard} />
        </div>
      </div>

      {/* 青菜類 Section */}
      <div className="bg-white pt-6 pb-2">
        <SectionHeaderLarge accent="#3D8A5A" {...t.sections.veg} />
        <div className="px-3 pt-4 pb-4">
          <div
            className="flex items-center rounded-xl overflow-hidden bg-white w-full"
            style={{ boxShadow: '0 2px 8px rgba(26,25,24,0.07)' }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0 rounded-l-xl"
              style={{ width: 80, height: 72, backgroundColor: '#C8F0D8' }}
            >
              <span style={{ fontSize: 32 }}>🥬</span>
            </div>
            <div className="flex-1 flex items-center justify-between px-[14px] py-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold text-[#1A1918]">{t.vegName}</span>
                <span className="text-[11px] text-[#9C9B99]">{t.vegSub}</span>
              </div>
              <span className="text-[16px] font-bold text-[#3D8A5A]">$180</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主食類 Section */}
      <div className="bg-[#F5F4F1] pt-6 pb-4">
        <SectionHeaderLarge accent="#D89575" {...t.sections.staples} />
        <div className="px-3 pt-4 flex flex-col gap-[10px]">
          {[
            { emoji: '🍚', price: '$15 /碗' },
            { emoji: '🍜', price: '$100 /份' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center rounded-xl overflow-hidden bg-white"
              style={{ boxShadow: '0 2px 8px rgba(26,25,24,0.07)' }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0 rounded-l-xl"
                style={{ width: 72, height: 64, backgroundColor: '#FFF3E0' }}
              >
                <span style={{ fontSize: 28 }}>{item.emoji}</span>
              </div>
              <div className="flex-1 flex items-center justify-between px-[14px] py-[10px]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-bold text-[#1A1918]">{t.staples[i].name}</span>
                  <span className="text-[11px] text-[#9C9B99]">{t.staples[i].sub}</span>
                </div>
                <span className="text-[14px] font-bold text-[#D89575]">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#1A1918] px-5 pt-8 pb-12 flex flex-col gap-5">
        <div className="flex flex-col gap-[6px]">
          <span className="text-[22px] font-bold text-[#D89575]">🦀 阿卿海鮮店</span>
          <span className="text-[12px] text-[#9C9B99]">{t.footerSub}</span>
        </div>
        <div className="h-px bg-[#333330]" />
        <span className="text-[11px] font-semibold text-[#9C9B99]">{t.footerLang}</span>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <LanguageBar lang={lang} setLang={setLang} light={false} />
        </div>
        <span className="text-[11px] text-[#6D6C6A]">{t.footerCopy}</span>
      </div>

    </div>
  )
}
