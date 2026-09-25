'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  CalendarClock, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  ShieldCheck, 
  Wrench, 
  Sparkles 
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
    <main className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Üst Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
          <a
            href="tel:05521164128"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>0552 116 41 28</span>
          </a>
        </div>

        {/* Başlık */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200">
            Periyodik Bakım Hatırlatma Sistemi
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight">
            Cihazınızın Bakım Zamanını Takip Edelim
          </h1>
          <p className="text-slate-600 mt-3 text-sm leading-relaxed">
            Kombiniz için 6 ayda bir, beyaz eşyalarınız için yılda bir periyodik bakım kaydı oluşturun; günü geldiğinde ustamız hatırlatsın, cihazınız yüksek verimle çalışsın.
          </p>
        </div>

        {/* Başarılı Kayıt Kartı */}
        {successData ? (
          <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 text-center shadow-lg animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Periyodik Bakım Kaydınız Oluşturuldu!</h2>
            <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
              Bilgileriniz servis yönetim sistemimize başarıyla işlendi.
            </p>

            <div className="mt-6 inline-block bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Hesaplanan Bir Sonraki Bakım Tarihi
              </span>
              <span className="text-2xl font-black text-blue-600 mt-1 block">
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
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition"
              >
                Yeni Cihaz Ekle
              </button>
              <Link
                href="/"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs px-6 py-3 rounded-xl transition"
              >
                Ana Sayfaya Git
              </Link>
            </div>
          </div>
        ) : (
          /* Kayıt Formu */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ahmet Yılmaz"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm focus:border-blue-500 focus:bg-white outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Telefon Numaranız *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Örn: 0552 116 41 28"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm focus:border-blue-500 focus:bg-white outline-none transition"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Bakımı Yapılacak Cihaz *
                  </label>
                  <select
                    value={formData.deviceType}
                    onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm focus:border-blue-500 focus:bg-white outline-none transition"
                  >
                    <option value="kombi">🔥 Kombi (6 Ayda Bir Periyot)</option>
                    <option value="klima">❄️ Klima (6 Ayda Bir Periyot)</option>
                    <option value="camasir">🧺 Çamaşır Makinesi (Yılda 1 Kez)</option>
                    <option value="bulasik">🍽️ Bulaşık Makinesi (Yılda 1 Kez)</option>
                    <option value="buzdolabi">🧊 Buzdolabı (Yılda 1 Kez)</option>
                    <option value="kurutma">⚡ Kurutma Makinesi (Yılda 1 Kez)</option>
                    <option value="diger">🔧 Diğer Cihaz</option>
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    {formData.deviceType === 'kombi' || formData.deviceType === 'klima'
                      ? '⏱️ Bu cihaz için sistem 6 ay sonrasına otomatik randevu takvimi oluşturur.'
                      : '⏱️ Bu cihaz için sistem 1 yıl sonrasına otomatik randevu takvimi oluşturur.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    İlçe / Mahalle / Adres Bilgisi
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Darıca Fevziçakmak Mah."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm focus:border-blue-500 focus:bg-white outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Ek Not veya Belirtmek İstediğiniz Durum
                </label>
                <textarea
                  rows={3}
                  placeholder="Örn: Cihazın garantisi bitti, kışa girmeden önce petek temizliği de yapılsın."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm focus:border-blue-500 focus:bg-white outline-none transition"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
    </main>
  )
}