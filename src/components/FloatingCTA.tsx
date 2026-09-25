import React from 'react'
import { Phone, MessageCircle } from 'lucide-react'

interface FloatingCTAProps {
  phone?: string
  whatsapp?: string
}

export default function FloatingCTA({ phone = "05550000000", whatsapp = "905550000000" }: FloatingCTAProps) {
  const cleanPhone = phone.replace(/\s+/g, '')

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-2xl md:hidden">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <a
          href={`tel:${cleanPhone}`}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all text-sm"
        >
          <Phone className="w-4 h-4 fill-white" />
          <span>Hemen Ara</span>
        </a>

        <a
          href={`https://wa.me/${whatsapp}?text=Merhaba,%20teknik%20servis%20talebinde%20bulunmak%20istiyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all text-sm"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  )
}