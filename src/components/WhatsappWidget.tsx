'use client'

import React, { useState } from 'react'
import { MessageCircle, X, Send, PhoneCall, Sparkles } from 'lucide-react'

interface WhatsAppWidgetProps {
  phone?: string
  isStatic?: boolean
}

export default function WhatsappWidget({ phone = '0552 116 41 28', isStatic = false }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const [customMsg, setCustomMsg] = useState('')

  const cleanPhone = phone.replace(/\s+/g, '').replace('+', '')
  const waNumber = cleanPhone.startsWith('0')
    ? `90${cleanPhone.slice(1)}`
    : cleanPhone.startsWith('90')
    ? cleanPhone
    : `90${cleanPhone}`

  const quickTemplates = [
    {
      title: '❄️ Buzdolabı Arızası',
      text: 'Merhaba, buzdolabım soğutmuyor/arızalandı. Arıza tespiti ve randevu için bilgi alabilir miyim?',
    },
    {
      title: '🧺 Çamaşır Makinesi',
      text: 'Merhaba, çamaşır makinemde arıza var (su akıtıyor/sıkmıyor). Ne zaman gelebilirsiniz?',
    },
    {
      title: '🍽️ Bulaşık Makinesi',
      text: 'Merhaba, bulaşık makinem arızalandı, yerinde servis hizmeti rica ediyorum.',
    },
    {
      title: '⚡ Kurutma / Ankastre',
      text: 'Merhaba, kurutma makinesi / ankastre ocağım için teknik servis desteği almak istiyorum.',
    },
    {
      title: '🔥 Kombi & Klima Bakımı',
      text: 'Merhaba, kombi / klima periyodik bakımı ve arıza tespiti için randevu almak istiyorum.',
    },
  ]

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank')
  }

  const CardContent = (
    <div className="w-full bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden text-left">
      {/* Kart Başlığı (Turuncu - Amber Gradient) */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 p-4 text-white relative">
        {!isStatic && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3.5 right-3.5 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-zinc-950 rounded-full flex items-center justify-center text-orange-400 shadow-md border border-white/10">
              <MessageCircle className="w-7 h-7 fill-current" />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-orange-400 border-2 border-zinc-900 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-tight text-white">Türkyılmaz WhatsApp Hattı</h4>
            <p className="text-[11px] text-orange-100 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              {phone} • Çevrimiçi & Hızlı Yanıt
            </p>
          </div>
        </div>
      </div>

      {/* Kart Gövdesi */}
      <div className="p-4 bg-zinc-950 space-y-3">
        <div className="bg-zinc-900 p-3 rounded-2xl rounded-tl-none border border-zinc-800 shadow-xs max-w-[95%]">
          <p className="text-xs text-zinc-300 leading-relaxed">
            👋 Merhaba! Cihazınızdaki arızayı hızlıca çözmek için aşağıdaki hazır konulardan birini seçebilir veya mesajınızı yazabilirsiniz:
          </p>
          <span className="text-[10px] text-zinc-400 mt-1 block text-right">Az önce</span>
        </div>

        {/* Hazır Şablonlar */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-1">
            Hızlı Şablon Seçin:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickTemplates.map((t, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(t.text)}
                className="text-left text-xs bg-zinc-900 hover:bg-orange-950/50 hover:text-orange-400 hover:border-orange-500/50 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-xl transition font-medium cursor-pointer"
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>

        {/* Mesaj Yazma Alanı */}
        <div className="pt-2">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-1.5 pl-3 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500/20 transition">
            <input
              type="text"
              placeholder="Arızanızı kısaca yazın..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customMsg.trim()) {
                  handleSend(customMsg)
                }
              }}
              className="w-full text-xs text-white placeholder-zinc-500 bg-transparent outline-none"
            />
            <button
              onClick={() => {
                if (customMsg.trim()) handleSend(customMsg)
              }}
              disabled={!customMsg.trim()}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 disabled:opacity-30 text-white flex items-center justify-center shrink-0 transition shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (isStatic) {
    return CardContent
  }

  return (
    <>
      {/* MASAÜSTÜ & TABLET İÇİN TURUNCU WHATSAPP BUTONU VE POPUP BALONCUĞU */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        {/* AÇILAN DETAYLI ŞABLON KARTI */}
        {isOpen && (
          <div className="mb-4 w-[330px] sm:w-[380px] animate-in fade-in slide-in-from-bottom-5 duration-300">
            {CardContent}
          </div>
        )}

        {/* BUTONUN ÜSTÜNDE ÇIKAN DİKKAT ÇEKİCİ KONUŞMA BALONCUĞU (POPUP TOOLTIP) */}
        {!isOpen && showTooltip && (
          <div className="mb-3 max-w-[260px] sm:max-w-[290px] bg-zinc-900/95 backdrop-blur-md border border-orange-500/40 text-white p-3.5 rounded-2xl rounded-br-xs shadow-2xl shadow-orange-500/15 relative animate-bounce duration-1000">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowTooltip(false)
              }}
              aria-label="Kapat"
              className="absolute -top-2 -left-2 w-5 h-5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full flex items-center justify-center text-[10px] border border-zinc-700 transition"
            >
              ✕
            </button>

            <div 
              onClick={() => {
                setShowTooltip(false)
                setIsOpen(true)
              }}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-orange-400 font-extrabold text-[11px] mb-1 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ustamıza Danışın</span>
              </div>
              <p className="text-xs text-zinc-200 leading-snug">
                Arızanızı WhatsApp'tan yazın, <strong>hemen fiyat ve bilgi</strong> verelim! 🛠️
              </p>
            </div>

            {/* Baloncuğun alt ok üçgeni */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-zinc-900 border-r border-b border-orange-500/40 transform rotate-45" />
          </div>
        )}

        {/* BÜYÜK TURUNCU BUTON (16x16 / 64px) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setShowTooltip(false)
              setIsOpen(!isOpen)
            }}
            aria-label="WhatsApp İletişim Hattı"
            className="relative group w-16 h-16 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {isOpen ? (
              <X className="w-7 h-7 transition-transform rotate-90" />
            ) : (
              <>
                <MessageCircle className="w-8 h-8 fill-current" />
                {/* Dışa Doğru Yayılan Turuncu Neon Dalgası */}
                <span className="absolute -inset-2 rounded-full bg-orange-500 opacity-40 animate-ping -z-10" />
                
                {/* Turuncu Bildirim Rozeti */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-zinc-950 border-2 border-orange-500 font-black text-[9px] text-orange-400 items-center justify-center">
                    1
                  </span>
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* MOBİL İÇİN EN ALTA YAPIŞIK ÇAĞRI BARI (TAMAMEN TURUNCU-AMBER UYUMLU) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 p-2.5 sm:hidden flex items-center gap-2">
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-md active:scale-95 transition"
        >
          <PhoneCall className="w-4 h-4 text-orange-400 animate-pulse" />
          <span>Hemen Ara</span>
        </a>
        <button
          onClick={() => {
            setShowTooltip(false)
            setIsOpen(!isOpen)
          }}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp'tan Yaz</span>
        </button>
      </div>
    </>
  )
}