import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

export async function POST(req: Request) {
  try {
    let rawToken = process.env.SANITY_API_WRITE_TOKEN

    if (!rawToken) {
      return NextResponse.json(
        { error: 'Sunucu yapılandırma hatası: SANITY_API_WRITE_TOKEN tanımlı değil.' },
        { status: 500 }
      )
    }

    // Kazara girilen değişken adı, tırnak ve satır sonu boşluklarını temizle
    let cleanToken = rawToken.trim()
    if (cleanToken.includes('=')) {
      cleanToken = cleanToken.split('=').pop() || cleanToken
    }
    cleanToken = cleanToken.replace(/["'\r\n]/g, '').trim()

    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6132ks2e',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
      token: cleanToken,
    })

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

    // Sanity'ye doküman oluşturma
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
    console.error('Bakım Kaydı Hatası:', error)
    return NextResponse.json(
      { error: error?.message || 'Kayıt eklenirken bir hata oluştu.' },
      { status: 500 }
    )
  }
}