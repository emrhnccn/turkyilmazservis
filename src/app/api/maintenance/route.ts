import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

export async function POST(req: Request) {
  try {
    const token = process.env.SANITY_API_WRITE_TOKEN

    // Token tanımlı değilse doğrudan net hata döndür
    if (!token) {
      console.error('HATA: SANITY_API_WRITE_TOKEN ortam değişkeni bulunamadı!')
      return NextResponse.json(
        { error: 'Sunucu yapılandırma hatası: Yazma yetkisi (SANITY_API_WRITE_TOKEN) tanımlanmamış.' },
        { status: 500 }
      )
    }

    // İstek anında taze yetkili istemci oluşturuyoruz
    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6132ks2e',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
      token: token,
    })

    const body = await req.json()
    const { fullName, phone, address, deviceType, notes } = body

    if (!fullName || !phone || !deviceType) {
      return NextResponse.json(
        { error: 'Ad Soyad, Telefon ve Cihaz Türü alanları zorunludur.' },
        { status: 400 }
      )
    }

    // Bugünün tarihi
    const today = new Date()
    const lastServiceDate = today.toISOString().split('T')[0]

    // Cihaza göre periyot hesaplama
    const nextDate = new Date(today)
    if (deviceType === 'kombi' || deviceType === 'klima') {
      nextDate.setMonth(nextDate.getMonth() + 6)
    } else {
      nextDate.setFullYear(nextDate.getFullYear() + 1)
    }
    const nextServiceDate = nextDate.toISOString().split('T')[0]

    // Sanity veritabanına yeni doküman ekleme
    const doc = await writeClient.create({
      _type: 'maintenance',
      fullName,
      phone,
      address: address || '',
      deviceType,
      lastServiceDate,
      nextServiceDate,
      status: 'pending',
      notes: notes || 'Web sitesi üzerinden müşteri tarafından oluşturuldu.',
    })

    return NextResponse.json({
      success: true,
      docId: doc._id,
      nextServiceDate,
    })
  } catch (error: any) {
    console.error('Sanity Yazma Hatası:', error)
    return NextResponse.json(
      { error: error?.message || 'Kayıt Sanity sistemine eklenirken bir hata oluştu.' },
      { status: 500 }
    )
  }
}