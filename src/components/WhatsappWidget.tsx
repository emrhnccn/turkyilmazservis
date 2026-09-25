'use client'

import React, { useState } from 'react'
import { MessageCircle, X, Send, PhoneCall } from 'lucide-react'

interface WhatsAppWidgetProps {
  phone?: string
  isStatic?: boolean
}

export default function WhatsappWidget({ phone = '0552 116 41 28', isStatic = false }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
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
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 p-4 text-white relative">
        {!isStatic && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3.5 right-3.5 w-7 h-7 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 bg-zinc-950 rounded-full flex items-center justify-center text-orange-400 shadow-md border border-white/10">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-zinc-900 rounded-full"></span>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-tight text-white">Türkyılmaz WhatsApp Hattı</h4>
            <p className="text-[11px] text-orange-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></span>
              0552 116 41 28 • Çevrimiçi
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-zinc-950 space-y-3">
        <div className="bg-zinc-900 p-3 rounded-2xl rounded-tl-none border border-zinc-800 shadow-xs max-w-[95%]">
          <p className="text-xs text-zinc-300 leading-relaxed">
            👋 Merhaba! Cihazınızdaki arızayı hızlıca çözmek için aşağıdaki hazır konulardan birini seçebilir veya mesajınızı yazabilirsiniz:
          </p>
          <span className="text-[10px] text-zinc-400 mt-1 block text-right">Az önce</span>
        </div>

        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-1">
            Hızlı Şablon Seçin:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickTemplates.map((t, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(t.text)}
                className="text-left text-xs bg-zinc-900 hover:bg-orange-950/40 hover:text-orange-400 hover:border-orange-500/50 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-xl transition font-medium cursor-pointer"
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>

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
              className="w-8 h-8 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 disabled:opacity-30 text-white flex items-center justify-center shrink-0 transition shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[330px] sm:w-[360px] animate-in fade-in slide-in-from-bottom-5 duration-300">
          {CardContent}
        </div>
      )}

      <div className="flex items-center gap-3">
        <a
          href={`tel:${cleanPhone}`}
          aria-label="Telefonla Ara"
          className="w-13 h-13 sm:hidden bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="WhatsApp İletişim Kartı"
          className="relative group w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-orange-500/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform rotate-90" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 fill-current" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-zinc-950"></span>
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}