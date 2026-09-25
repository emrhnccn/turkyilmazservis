import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// Yazma yetkisine sahip sunucu taraflı istemci
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6132ks2e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, phone, address, deviceType, notes } = body

    if (!fullName || !phone || !deviceType) {
      return NextResponse.json(
        { error: 'Ad Soyad, Telefon ve Cihaz Türü zorunludur.' },
        { status: 400 }
      )
    }

    // Bugünün tarihi
    const today = new Date()
    const lastServiceDate = today.toISOString().split('T')[0]

    // Cihaza göre periyot hesaplama (kombi/klima: 6 ay, diğerleri: 1 yıl)
    const nextDate = new Date(today)
    if (deviceType === 'kombi' || deviceType === 'klima') {
      nextDate.setMonth(nextDate.getMonth() + 6)
    } else {
      nextDate.setFullYear(nextDate.getFullYear() + 1)
    }
    const nextServiceDate = nextDate.toISOString().split('T')[0]

    // Sanity'ye yeni belge kaydetme
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

    return NextResponse.json({ success: true, docId: doc._id, nextServiceDate })
  } catch (error: any) {
    console.error('Bakım kaydı oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Kayıt oluşturulurken bir hata meydana geldi.' },
      { status: 500 }
    )
  }
}