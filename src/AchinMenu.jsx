import React, { useState, useEffect } from 'react'
import {
  seafoodItems, meatItems,
  friedItems, soupItems, vegItems, stapleItems,
} from './menuData'

// ─── i18n ─────────────────────────────────────────────────────────────────────

const LANGUAGES = ['中文', 'EN', '日本語', '한국어']
const LANG_KEY = { '中文': 'zh', 'EN': 'en', '日本語': 'ja', '한국어': 'ko' }

const UI = {
  zh: {
    langLabel:    '顯示語言 · Display Language',
    heroSub:      '新鮮海味·道地台灣風',
    heroTitle:    '阿卿海鮮店',
    marketPrice:  '時價',
    vegSub:       '當季新鮮蔬菜',
    footerSub:    'A-Chin Seafood Restaurant',
    footerLang:   '語言選擇 · Language',
    footerCopy:   '© 2024 阿卿海鮮店 · 價格可能調整',
    close:        '關閉',
    descLabel:    '餐點說明',
    noteLabel:    '備註',
    tagLegend:    '標記說明',
    sections: {
      seafood:  { main: '海鮮類', sub: '(Seafood)' },
      meat:     { main: '肉類',   sub: '(Meat)' },
      fried:    { main: '炸物類', sub: 'Fried Foods' },
      soups:    { main: '熱湯類', sub: 'Hot Soups' },
      veg:      { main: '青菜類', sub: 'Vegetables' },
      staples:  { main: '主食類', sub: 'Staples' },
    },
  },
  en: {
    langLabel:    'Display Language · 顯示語言',
    heroSub:      'Fresh Seafood · Authentic Taiwanese Flavour',
    heroTitle:    'A-Chin Seafood',
    marketPrice:  'Market Price',
    vegSub:       'Fresh seasonal greens',
    footerSub:    'A-Chin Seafood Restaurant',
    footerLang:   'Language · 語言選擇',
    footerCopy:   '© 2026 A-Chin Seafood · Prices subject to change',
    close:        'Close',
    descLabel:    'Description',
    noteLabel:    'Note',
    tagLegend:    'Legend',
    sections: {
      seafood:  { main: 'Seafood',     sub: '海鮮類' },
      meat:     { main: 'Meat',        sub: '肉類' },
      fried:    { main: 'Fried Foods', sub: '炸物類' },
      soups:    { main: 'Hot Soups',   sub: '熱湯類' },
      veg:      { main: 'Vegetables',  sub: '青菜類' },
      staples:  { main: 'Staples',     sub: '主食類' },
    },
  },
  ja: {
    langLabel:    '言語選択 · Display Language',
    heroSub:      '新鮮な海の幸・本場台湾風',
    heroTitle:    '阿卿海鮮店',
    marketPrice:  '時価',
    vegSub:       '新鮮な旬の野菜',
    footerSub:    'A-Chin シーフードレストラン',
    footerLang:   '言語選択 · Language',
    footerCopy:   '© 2026 阿卿海鮮店 · 価格は変更になる場合があります',
    close:        '閉じる',
    descLabel:    '説明',
    noteLabel:    '備考',
    tagLegend:    '凡例',
    sections: {
      seafood:  { main: '海鮮類',     sub: 'Seafood' },
      meat:     { main: '肉類',       sub: 'Meat' },
      fried:    { main: '揚げ物類',   sub: 'Fried Foods' },
      soups:    { main: 'スープ類',   sub: 'Hot Soups' },
      veg:      { main: '野菜類',     sub: 'Vegetables' },
      staples:  { main: '主食類',     sub: 'Staples' },
    },
  },
  ko: {
    langLabel:    '언어 선택 · Display Language',
    heroSub:      '신선한 해산물 · 정통 대만 맛',
    heroTitle:    '아칭 해산물 식당',
    marketPrice:  '시가',
    vegSub:       '신선한 제철 채소',
    footerSub:    'A-Chin 해산물 식당',
    footerLang:   '언어 선택 · Language',
    footerCopy:   '© 2026 아칭 해산물 · 가격은 변경될 수 있습니다',
    close:        '닫기',
    descLabel:    '설명',
    noteLabel:    '비고',
    tagLegend:    '범례',
    sections: {
      seafood:  { main: '해산물류',  sub: 'Seafood' },
      meat:     { main: '육류',      sub: 'Meat' },
      fried:    { main: '튀김류',    sub: 'Fried Foods' },
      soups:    { main: '국물류',    sub: 'Hot Soups' },
      veg:      { main: '채소류',    sub: 'Vegetables' },
      staples:  { main: '주식류',    sub: 'Staples' },
    },
  },
}

// Tag definitions — keyed by letter/number code matching menuData.js
//   R=推薦  1=小辣  2=中辣  3=大辣  P=含豬肉  B=含牛肉  L=含羊肉  V=素菜
const TAG_DEFS = {
  R: { names: { zh: '推薦',   en: 'Recommended', ja: 'おすすめ',     ko: '추천'      }, bg: '#FFF8E1', text: '#D4A64A', emoji: '⭐' },
  1: { names: { zh: '小辣',   en: 'Mild Spicy',  ja: '小辛',         ko: '약간 매운' }, bg: '#FFF0E6', text: '#E8784A', emoji: '🌶' },
  2: { names: { zh: '中辣',   en: 'Medium Spicy',ja: '中辛',         ko: '보통 매운' }, bg: '#FFE8E0', text: '#C04020', emoji: '🌶' },
  3: { names: { zh: '大辣',   en: 'Very Spicy',  ja: '大辛',         ko: '많이 매운' }, bg: '#FFE5E5', text: '#D64545', emoji: '🔥' },
  P: { names: { zh: '含豬肉', en: 'Pork',        ja: '豚肉含有',     ko: '돼지고기'  }, bg: '#FFE8F0', text: '#C75680', emoji: '🐷' },
  B: { names: { zh: '含牛肉', en: 'Beef',        ja: '牛肉含有',     ko: '소고기'    }, bg: '#F0E4D8', text: '#8B5E3C', emoji: '🐄' },
  L: { names: { zh: '含羊肉', en: 'Lamb',        ja: 'ラム肉含有',   ko: '양고기'    }, bg: '#F0E4D8', text: '#8B5E3C', emoji: '🐑' },
  V: { names: { zh: '素菜',   en: 'Vegetarian',  ja: 'ベジタリアン', ko: '채식'      }, bg: '#E8F5E9', text: '#3D8A5A', emoji: '🌿' },
}
const TAG_DEFAULT = { names: { zh: '', en: '', ja: '', ko: '' }, bg: '#EDECEA', text: '#6D6C6A', emoji: '' }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function imgUrl(filename) {
  return `${import.meta.env.BASE_URL}images/${filename}`
}

// ─── Item Detail Modal ────────────────────────────────────────────────────────

function ItemModal({ item, lk, t, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const name  = item.names[lk]
  const price = item.price === 'market' ? t.marketPrice : item.price

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: 'rgba(26,25,24,0.65)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[390px] bg-white rounded-t-2xl overflow-hidden"
        style={{ boxShadow: '0 -4px 32px rgba(26,25,24,0.18)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Image or emoji hero */}
        {item.image ? (
          <img
            src={imgUrl(item.image)}
            alt={name}
            className="w-full object-cover"
            style={{ height: 220 }}
          />
        ) : (
          <div
            className="w-full flex items-center justify-center bg-[#EDECEA]"
            style={{ height: 180 }}
          >
            <span style={{ fontSize: 72 }}>{item.emoji}</span>
          </div>
        )}

        {/* Content */}
        <div className="px-5 pt-4 pb-8 flex flex-col gap-3">
          {/* Name + price row */}
          <div className="flex items-start justify-between gap-3">
            <span className="text-[20px] font-bold text-[#1A1918] leading-snug flex-1">{name}</span>
            {price ? (
              <span
                className="text-[18px] font-bold flex-shrink-0 mt-[1px]"
                style={{ color: item.price === 'market' ? '#9C9B99' : '#D89575' }}
              >
                {price}
              </span>
            ) : (
              <span className="text-[16px] text-[#9C9B99] flex-shrink-0 mt-[1px]">NT$ —</span>
            )}
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((key) => {
                const c = TAG_DEFS[key] ?? TAG_DEFAULT
                return (
                  <span
                    key={key}
                    className="text-[12px] font-semibold px-[10px] py-[4px] rounded-full"
                    style={{ backgroundColor: c.bg, color: c.text }}
                  >
                    {c.emoji ? `${c.emoji} ${c.names[lk]}` : c.names[lk]}
                  </span>
                )
              })}
            </div>
          )}

          {/* Description */}
          {item.desc?.[lk] && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#9C9B99]">{t.descLabel}</span>
              <span className="text-[13px] text-[#1A1918] leading-relaxed">{item.desc[lk]}</span>
            </div>
          )}

          {/* Note */}
          {item.note?.[lk] && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#9C9B99]">{t.noteLabel}</span>
              <span className="text-[13px] text-[#6D6C6A] leading-relaxed">{item.note[lk]}</span>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-1 w-full h-11 rounded-xl bg-[#EDECEA] text-[15px] font-semibold text-[#1A1918] active:bg-[#DDDBD8] transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Card Components ──────────────────────────────────────────────────────────

function TagPills({ tags, lk }) {
  if (!tags || tags.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1 mt-0.5">
      {tags.map((key) => {
        const c = TAG_DEFS[key] ?? TAG_DEFAULT
        return (
          <span
            key={key}
            className="text-[9px] font-semibold px-[6px] py-[2px] rounded"
            style={{ backgroundColor: c.bg, color: c.text }}
          >
            {c.emoji ? `${c.emoji} ${c.names[lk]}` : c.names[lk]}
          </span>
        )
      })}
    </div>
  )
}

function MenuCard({ item, name, price, muted, lk, onSelect }) {
  return (
    <button
      className="rounded-xl overflow-hidden bg-white flex flex-col text-left w-full active:opacity-80 transition-opacity"
      style={{ boxShadow: '0 2px 12px rgba(26,25,24,0.06)' }}
      onClick={() => onSelect(item)}
    >
      <div className="flex items-center justify-center bg-[#EDECEA] rounded-t-xl w-full overflow-hidden" style={{ height: 140 }}>
        {item.image ? (
          <img src={imgUrl(item.image)} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span style={{ fontSize: 40 }}>{item.emoji}</span>
        )}
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
        <TagPills tags={item.tags} lk={lk} />
      </div>
    </button>
  )
}

function FriedCard({ item, name, price, lk, onSelect }) {
  return (
    <button
      className="rounded-xl overflow-hidden bg-white flex flex-col text-left w-full active:opacity-80 transition-opacity"
      style={{ boxShadow: '0 2px 8px rgba(26,25,24,0.07)' }}
      onClick={() => onSelect(item)}
    >
      <div className="flex items-center justify-center bg-[#EDECEA] rounded-t-xl w-full overflow-hidden" style={{ height: 140 }}>
        {item.image ? (
          <img src={imgUrl(item.image)} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span style={{ fontSize: 36 }}>{item.emoji}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-[10px]">
        <span className="text-[15px] font-bold text-[#1A1918]">{name}</span>
        <span className="text-[14px] font-bold text-[#D89575]">{price}</span>
        <TagPills tags={item.tags} lk={lk} />
      </div>
    </button>
  )
}

function SoupCard({ item, name, price, imgBg, priceColor, lk, onSelect }) {
  return (
    <button
      className="rounded-xl overflow-hidden bg-white flex flex-col text-left w-full active:opacity-80 transition-opacity"
      style={{ boxShadow: '0 2px 8px rgba(26,25,24,0.07)' }}
      onClick={() => onSelect(item)}
    >
      <div
        className="flex items-center justify-center rounded-t-xl w-full overflow-hidden"
        style={{ height: 140, backgroundColor: imgBg }}
      >
        {item.image ? (
          <img src={imgUrl(item.image)} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span style={{ fontSize: 36 }}>{item.emoji}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-[10px]">
        <span className="text-[15px] font-bold text-[#1A1918]">{name}</span>
        <span className="text-[14px] font-bold" style={{ color: priceColor }}>{price}</span>
        <TagPills tags={item.tags} lk={lk} />
      </div>
    </button>
  )
}

// ─── Layout Helpers ───────────────────────────────────────────────────────────

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

function Grid({ items, Card = MenuCard, lk, onSelect }) {
  const rows = []
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2))
  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, ri) => (
        <div key={ri} className="grid gap-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {row.map((item, ci) => <Card key={ci} {...item} lk={lk} onSelect={onSelect} />)}
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
  const [selectedItem, setSelectedItem] = useState(null)
  const lk = LANG_KEY[lang]
  const t = UI[lk]

  // Resolve localised display props for each item
  const localise = (items) =>
    items.map((item) => ({
      ...item,
      name: item.names[lk],
      price: item.price === 'market' ? t.marketPrice : item.price,
      muted: item.price === 'market',
      item,  // pass raw item for modal
    }))

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#F5F4F1] font-outfit overflow-x-hidden">

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

      {/* Tag Legend */}
      <div className="bg-[#FAFAF8] px-3 py-2 flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-medium text-[#9C9B99] flex-shrink-0">{t.tagLegend}</span>
        {['R', '1', '3', 'P', 'B', 'V'].map((key) => {
          const c = TAG_DEFS[key]
          return (
            <span
              key={key}
              className="text-[9px] font-semibold px-[6px] py-[2px] rounded"
              style={{ backgroundColor: c.bg, color: c.text }}
            >
              {c.emoji} {c.names[lk]}
            </span>
          )
        })}
      </div>

      {/* Hero Banner */}
      <div className="w-full">
        <img
          src={imgUrl('cover.jpg')}
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
          <Grid items={localise(seafoodItems)} lk={lk} onSelect={setSelectedItem} />
        </div>
      </div>

      {/* 肉類 Section */}
      <div className="bg-white">
        <SectionHeaderSmall accent="#D4A64A" {...t.sections.meat} />
        <div className="px-3 pb-4">
          <Grid items={localise(meatItems)} lk={lk} onSelect={setSelectedItem} />
        </div>
      </div>

      {/* 炸物類 Section */}
      <div className="bg-white pt-6 pb-2">
        <SectionHeaderLarge accent="#D89575" {...t.sections.fried} />
        <div className="px-3 pt-4 pb-4">
          <Grid items={localise(friedItems)} Card={FriedCard} lk={lk} onSelect={setSelectedItem} />
        </div>
      </div>

      {/* 熱湯類 Section */}
      <div className="bg-[#F5F4F1] pt-6 pb-2">
        <SectionHeaderLarge accent="#3D8A5A" {...t.sections.soups} />
        <div className="px-3 pt-4 pb-4">
          <Grid items={localise(soupItems)} Card={SoupCard} lk={lk} onSelect={setSelectedItem} />
        </div>
      </div>

      {/* 青菜類 Section */}
      <div className="bg-white pt-6 pb-2">
        <SectionHeaderLarge accent="#3D8A5A" {...t.sections.veg} />
        <div className="px-3 pt-4 pb-4">
          {localise(vegItems).map((item, i) => (
            <button
              key={i}
              className="flex items-center rounded-xl overflow-hidden bg-white w-full active:opacity-80 transition-opacity text-left"
              style={{ boxShadow: '0 2px 8px rgba(26,25,24,0.07)' }}
              onClick={() => setSelectedItem(item.item)}
            >
              <div
                className="flex items-center justify-center flex-shrink-0 rounded-l-xl"
                style={{ width: 80, height: 72, backgroundColor: '#C8F0D8' }}
              >
                <span style={{ fontSize: 32 }}>{item.emoji}</span>
              </div>
              <div className="flex-1 flex items-center justify-between px-[14px] py-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-bold text-[#1A1918]">{item.name}</span>
                  <span className="text-[11px] text-[#9C9B99]">{t.vegSub}</span>
                </div>
                <span className="text-[16px] font-bold text-[#3D8A5A]">{item.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 主食類 Section */}
      <div className="bg-[#F5F4F1] pt-6 pb-4">
        <SectionHeaderLarge accent="#D89575" {...t.sections.staples} />
        <div className="px-3 pt-4 flex flex-col gap-[10px]">
          {localise(stapleItems).map((item, i) => (
            <button
              key={i}
              className="flex items-center rounded-xl overflow-hidden bg-white active:opacity-80 transition-opacity text-left w-full"
              style={{ boxShadow: '0 2px 8px rgba(26,25,24,0.07)' }}
              onClick={() => setSelectedItem(item.item)}
            >
              <div
                className="flex items-center justify-center flex-shrink-0 rounded-l-xl"
                style={{ width: 72, height: 64, backgroundColor: '#FFF3E0' }}
              >
                <span style={{ fontSize: 28 }}>{item.emoji}</span>
              </div>
              <div className="flex-1 flex items-center justify-between px-[14px] py-[10px]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-bold text-[#1A1918]">{item.name}</span>
                  <span className="text-[11px] text-[#9C9B99]">{item.sub?.[lk]}</span>
                </div>
                <span className="text-[14px] font-bold text-[#D89575]">{item.price}</span>
              </div>
            </button>
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

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          lk={lk}
          t={t}
          onClose={() => setSelectedItem(null)}
        />
      )}

    </div>
  )
}
