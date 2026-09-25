'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  CalendarClock, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles,
  Flame,
  Snowflake,
  Wrench,
  Clock
} from 'lucide-react'

export default function MaintenancePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    deviceType: 'kombi',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [successData, setSuccessData] = useState<{ nextDate: string } | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'İşlem başarısız oldu.')
      }

      setSuccessData({ nextDate: data.nextServiceDate })
    } catch (err: any) {
      setErrorMsg(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-zinc-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-10 selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* --- ARKA PLAN IŞIKLARI & BOŞLUKLARI DOLDURAN AMBİYANS --- */}
      <div className="pointer-events-none absolute -left-48 top-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-[130px] -z-10" />
      <div className="pointer-events-none absolute -right-48 top-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-[130px] -z-10" />
      <div className="pointer-events-none absolute left-1/2 -top-20 -translate-x-1/2 w-[700px] h-[300px] bg-orange-500/10 rounded-full blur-[140px] -z-10" />

      {/* Arka plan nokta deseni */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ff8c00 1px, transparent 0)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        
        {/* Üst Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800/80">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-orange-400 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
          <a
            href="tel:05521164128"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>0552 116 41 28</span>
          </a>
        </div>

        {/* Başlık */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-500/30">
            Periyodik Bakım Takip Sistemi
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            Cihazınızın Bakım Zamanını Takip Edelim
          </h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base">
            Kombiniz için 6 ayda bir, beyaz eşyalarınız için yılda bir periyodik bakım kaydı oluşturun; günü geldiğinde ustamız hatırlatsın.
          </p>
        </div>

        {/* Ana Yapı: Sol ve Sağ Geniş Ekran Kartlarıyla Birlikte */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Sol Kolon: Bilgilendirici Yan Kartlar (Geniş ekranları şık doldurur) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Neden 6 Ayda Bir Kombi Bakımı?</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Kış öncesi ve sonrası brülör, genleşme tankı ve eşanjör temizliği yakıt faturasında %25 tasarruf sağlar.
              </p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Akıllı Otomatik Hatırlatma</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Kayıt oluşturduğunuzda sistemimize işlenir. Bakım ayı geldiğinde servis ekibimiz size önceden ulaşır.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-950/40 to-zinc-950 border border-orange-500/30 p-5 rounded-3xl">
              <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Garantili İşçilik</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Tüm kontroller kayıt altına alınır ve değişen parçalara 6 ay resmi garanti verilir.
              </p>
            </div>
          </div>

          {/* Sağ Kolon: Form veya Başarı Kartı (8 Birim) */}
          <div className="lg:col-span-8">
            {successData ? (
              <div className="bg-zinc-900 rounded-3xl border border-orange-500/40 p-8 sm:p-12 text-center shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-orange-950/80 text-orange-400 rounded-full border border-orange-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-white">Periyodik Bakım Kaydınız Oluşturuldu!</h2>
                <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto">
                  Bilgileriniz servis yönetim sistemimize başarıyla işlendi.
                </p>

                <div className="mt-6 inline-block bg-black/60 border border-zinc-800 rounded-2xl p-5 text-center">
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">
                    Hesaplanan Bir Sonraki Bakım Tarihi
                  </span>
                  <span className="text-2xl font-black text-orange-400 mt-1 block">
                    {new Date(successData.nextDate).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSuccessData(null)
                      setFormData({ fullName: '', phone: '', address: '', deviceType: 'kombi', notes: '' })
                    }}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer"
                  >
                    Yeni Cihaz Ekle
                  </button>
                  <Link
                    href="/"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md"
                  >
                    Ana Sayfaya Git
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl p-6 sm:p-10">
                {errorMsg && (
                  <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Ahmet Yılmaz"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        Telefon Numaranız *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Örn: 0552 116 41 28"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        Bakımı Yapılacak Cihaz *
                      </label>
                      <select
                        value={formData.deviceType}
                        onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 outline-none transition cursor-pointer"
                      >
                        <option value="kombi">🔥 Kombi (6 Ayda Bir Periyot)</option>
                        <option value="klima">❄️ Klima (6 Ayda Bir Periyot)</option>
                        <option value="camasir">🧺 Çamaşır Makinesi (Yılda 1 Kez)</option>
                        <option value="bulasik">🍽️ Bulaşık Makinesi (Yılda 1 Kez)</option>
                        <option value="buzdolabi">🧊 Buzdolabı (Yılda 1 Kez)</option>
                        <option value="kurutma">⚡ Kurutma Makinesi (Yılda 1 Kez)</option>
                        <option value="diger">🔧 Diğer Cihaz</option>
                      </select>
                      <p className="text-[11px] text-zinc-400 mt-1.5">
                        {formData.deviceType === 'kombi' || formData.deviceType === 'klima'
                          ? '⏱️ Bu cihaz için sistem 6 ay sonrasına otomatik randevu takvimi oluşturur.'
                          : '⏱️ Bu cihaz için sistem 1 yıl sonrasına otomatik randevu takvimi oluşturur.'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        İlçe / Mahalle / Adres Bilgisi
                      </label>
                      <input
                        type="text"
                        placeholder="Örn: Darıca Fevziçakmak Mah."
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      Ek Not veya Belirtmek İstediğiniz Durum
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Örn: Cihazın garantisi bitti, kışa girmeden önce petek temizliği de yapılsın."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 outline-none transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white font-extrabold text-sm py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {loading ? (
                      <span>Sisteme Kaydediliyor...</span>
                    ) : (
                      <>
                        <CalendarClock className="w-4 h-4" />
                        <span>Periyodik Bakım Takvimine Kaydet</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  )
}