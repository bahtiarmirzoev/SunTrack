import type { AppDictionary } from "./en"

const dictionary: AppDictionary = {
  common: {
    brand: {
      name: "SunTrack",
      tagline: "Günəş intellekti platforması",
    },
    menu: {
      open: "Naviqasiya menyusunu aç",
      close: "Naviqasiya menyusunu bağla",
      label: "Menyu",
    },
    nav: {
      home: "Ana səhifə",
      howItWorks: "Necə işləyir",
      dashboard: "Panel",
      about: "Haqqımızda",
      login: "Giriş",
      viewDashboard: "Panelə bax",
    },
    footer: {
      rights: "Bütün hüquqlar qorunur.",
      orchestration: "Günəş orkestri",
      about: "Haqqımızda",
      howItWorks: "Necə işləyir",
      dashboard: "Panel",
    },
    localeNames: {
      az: "Azərbaycan dili",
      ru: "Русский",
      en: "English",
    },
  },
  home: {
    headerTagline: "SunTrack",
    headerTitle: "Günəş intellekti platforması",
    navSecondaryCta: "Panelə bax",
    heroBadge: "Canlı önizləmə · Ağıllı izləmə iş başında",
    heroTitle: "Günəş performansı canlı kimi hiss edilir",
    heroDescription:
      "Panelləri, anbarı və enerji bazarını kinematik panel, adaptiv süni intellekt və proqnozlaşdırılan servis inamı ilə orkestr edin.",
    heroPrimaryCta: "Necə işlədiyini öyrən",
    heroSecondaryCta: "Canlı demonu aç",
    heroStats: [
      { value: "120+", label: "Optimallaşdırılan sahə", detail: "14 ölkədə" },
      { value: "25%", label: "Daha çox çıxış", detail: "fiksed-tilt ilə müqayisədə" },
      { value: "1.2M", label: "Günlük məlumat", detail: "toplanır və qiymətləndirilir" },
    ],
    capabilitiesKicker: "İmkanlar",
    capabilitiesTitle: "İddialı günəş komandaları üçün qurulub",
    capabilitiesDescription:
      "Sensor sağlamlığından treydinq qərarlarına qədər hər qarşılıqlı əlaqə dərindən dizayn edilir ki, operatorlar axında qalsın.",
    capabilities: [
      {
        title: "Anlıq monitorinq",
        description: "Yüksək dəqiqlikli telemetriya hər invertor və stringi görünən saxlayır.",
      },
      {
        title: "Performans analitikası",
        description: "Süni intellekt anomaliyaları, itirilmiş məhsulu və xidmət ipuclarını üzə çıxarır.",
      },
      {
        title: "Sağlamlıq izləməsi",
        description: "Termal sürüşmə, kölgə və mexaniki gərginlik proaktiv xəbərdarlıqlarla izlənir.",
      },
      {
        title: "Şəbəkəyə hazır anbar",
        description: "Batareya orkestri enerji qiymətləri ilə yükləmə pəncərələrini tarazlayır.",
      },
      {
        title: "Qlobal park nəzarəti",
        description: "Çox sahəli komanda mərkəzi proqram, treker və məhdudiyyəti idarə edir.",
      },
      {
        title: "Insights API",
        description: "Təhlükəsiz API-lər KPI-ları EMS, BI və treydinq yığınınıza ötürür.",
      },
    ],
    experienceKicker: "Təcrübə",
    experienceTitle: "SunTrack imzası",
    experienceDescription:
      "Hərəkət, dərinlik və aydınlıq idarəetmə otağı komandaları üçün vəziyyətə nəzarəti yüksəldir.",
    experience: [
      {
        title: "Adaptiv izləmə",
        copy: "Rəqəmsal əkizlər atmosfer səpilməsini və mexaniki boşluğu simulyasiya edərək panelləri dəqiq hizalayır.",
        metric: "%18 illik əlavə məhsul",
      },
      {
        title: "Etibarlı süni intellekt",
        copy: "Hər tövsiyənin və xəbərdarlığın arxasında duran amillər izah olunur.",
        metric: "%96 anomaliya aşkarlanması",
      },
      {
        title: "İmmersiv panel",
        copy: "Axıcı qarşılıqlı əlaqə və ambient hərəkət mürəkkəb məlumatı ani oxunan edir.",
        metric: "<150 ms gecikmə",
      },
    ],
    testimonials: [
      {
        quote:
          "SunTrack utility miqyaslı fermalarımızı dəyişdi. Təkcə proqnozlaşdırılan yamalar yatırımın 6 aya qayıtmasına kifayət etdi.",
        author: "Leyla Rəhimova",
        title: "COO, Caspian Solar",
      },
      {
        quote:
          "Panel sanki yaşayır. Operatorlarımız real vaxtda əməkdaşlıq edir və problemləri dayanmadan qabaqlayır.",
        author: "Marko Jensən",
        title: "Əməliyyatlar rəhbəri, Solunergy",
      },
    ],
    nextStepKicker: "Növbəti addım",
    nextStepTitle: "Günəş gələcəyini orkestr etməyə hazırsan?",
    nextStepDescription:
      "SunTrack-i həftələr ərzində işə sal, parkını qoş və hər qərarın kinematik aydınlıqdan necə faydalandığını gör.",
    nextStepPrimaryCta: "İnteraktiv paneli aç",
    nextStepSecondaryCta: "Komanda ilə tanış ol",
  },
  about: {
    header: {
      tagline: "SunTrack",
      title: "Studio",
    },
    footerTagline: "Haqqımızda",
    hero: {
      badge: "Haqqımızda",
      title: "Günəşi, proqramı və insanları birlikdə idarə edirik",
      description:
        "SunTrack, mühəndis, dizayner və sahə operatorlarından ibarət Solaria kollektivinin əsas məhsuludur. 8+ GW layihə təcrübəsini kinematik idarəetmə otağına çevirdik.",
      stats: [
        { label: "Yaranma", value: "2025" },
        { label: "Komanda", value: "48 mütəxəssis" },
        { label: "Optimizə olunan GW", value: "4.5+" },
        { label: "Bazarı", value: "14 region" },
      ],
    },
    snapshot: {
      label: "Studiyanın görüntüsü",
      disciplinesLabel: "Peşə sahələri",
      disciplines: [
        { label: "Sistem & AI", value: "18 nəfər" },
        { label: "Dizayn & tədqiqat", value: "12 nəfər" },
        { label: "Sahə əməliyyatları", value: "9 nəfər" },
        { label: "Müştəri laboratoriyası", value: "9 nəfər" },
      ],
      officesLabel: "Ofislər",
      officesValue: "Bakı · Berlin · San-Fransisko",
    },
    principles: {
      kicker: "Dəyərlər",
      title: "Hər qərarı istiqamətləndirən prinsiplər",
      description: "Bu prinsipləri laboratoriyamızın divarlarına və müqavilələrimizə yazırıq.",
      values: {
        sustainability: {
          title: "Davamlılıq",
          description: "Hər release karbon izi və dövriyyə təsirinə görə ölçülür.",
        },
        humanCentered: {
          title: "İnsana yönəlik",
          description: "Operatorlar stresdə olanda belə aydınlıqla çalışsın deyə dizayn edirik.",
        },
        inventiveSpirit: {
          title: "Yaradıcı ruh",
          description: "Sənayeni irəli aparmaq üçün hardware, AI və dizaynı birləşdiririk.",
        },
        transparency: {
          title: "Mütləq şəffaflıq",
          description: "Müştərilər yol xəritəmizi, telemetriyamızı və hesabatlarımızı canlı görür.",
        },
      },
    },
    story: {
      kicker: "Hekayə",
      title: "Cəsarətli mərhələlər",
      timeline: [
        { year: "2025", detail: "Azərbaycan mikro-şəbəkələri üçün trekerlərdən sonra SunTrack-i buraxdıq." },
        { year: "2026", detail: "Immersiv alətlər yaratmaq üçün Günəş İnteraksiya Laboratoriyasını açdıq." },
        { year: "2027", detail: "Utility miqyasına keçib proqnozlaşdırılan servisi təqdim etdik." },
        { year: "2028", detail: "Şəbəkə operatorları ilə tələb-cavab intellektini həmmüəllif etdik." },
      ],
    },
    contact: {
      kicker: "Əlaqə",
      title: "Bizə yaz",
      cards: {
        hq: {
          title: "Sunnyvale HQ",
          detail: "123 Solar Way · Sunnyvale, CA 94086 · ABŞ",
        },
        email: {
          title: "Bizə yaz",
          detail: "hello@suntrack.energy · partnerships@suntrack.energy",
        },
        phone: {
          title: "Zəng et",
          detail: "+1 (555) 123-4567 · B.e–C.a · 09:00–17:00 PT",
        },
      },
      form: {
        nameLabel: "Ad",
        emailLabel: "Email",
        messageLabel: "Mesaj",
        messagePlaceholder: "Parkınız, çətinliyiniz və ya hədəfləriniz haqqında yazın.",
        submit: "Mesaj göndər",
      },
    },
  },
  howItWorks: {
    header: {
      tagline: "SunTrack",
      title: "Metodologiya",
    },
    footerTagline: "Necə işləyir",
    hero: {
      badge: "Proses",
      title: "Dərin alqoritmli günəş sinir sistemi",
      description:
        "SunTrack atmosfer elmini, rəqəmsal əkizləri və operator təcrübəsini eyni dövrəyə bağlayır. Hər mərhələ kontekst və izah olunan AI ilə idarə olunur.",
      primaryCta: "Canlı idarəni aç",
      secondaryCta: "Komanda ilə tanış ol",
    },
    livePanel: {
      label: "Canlı axın",
      kicker: "Faza sinxronu",
      headline: "Treker sürəti: 2.1°/dəq",
      metrics: [
        { label: "Atmosfer aydınlığı", value: "0.82" },
        { label: "AI etibarı", value: "%97" },
      ],
      stream: [
        { label: "Dataset sinxi", value: "120 san", status: "Sağlam" },
        { label: "Proqnoz siqnalları", value: "3 açıq", status: "Baxışda" },
        { label: "Treker donanması", value: "%98 hizalı", status: "Canlı" },
      ],
    },
    workflow: {
      kicker: "İş axını",
      title: "Beş sinxron qat",
      description:
        "Hər qat ən önəmli siqnalını ön plana çıxarmaq üçün animasiya olunur – istər sahədə planşetlə, istər idarəetmə otağında.",
      steps: {
        dataCapture: {
          stepLabel: "Addım 01",
          title: "Məlumat toplanması",
          description: "Kənar sensorlar hər 5 saniyədə günəş, külək, fırlanma və string telemetriyasını ötürür.",
          accent: "from-cyan-200/40",
        },
        aiForecasting: {
          stepLabel: "Addım 02",
          title: "AI proqnozu",
          description: "Hava modelləri və tarixçə ideal orientasiya və dispetç pəncərələrini hesablayır.",
          accent: "from-emerald-200/40",
        },
        trackerControl: {
          stepLabel: "Addım 03",
          title: "Treker nəzarəti",
          description: "Aktuatorlar titrənsiz, mexaniki yorğunluğu azaldan profillər alır.",
          accent: "from-lime-200/40",
        },
        energyOrchestration: {
          stepLabel: "Addım 04",
          title: "Enerji orkestri",
          description: "Anbar, şəbəkə ixracı və yüklər qiymət və dayanıqlıq siqnallarına cavab verir.",
          accent: "from-amber-200/40",
        },
        operationsHub: {
          stepLabel: "Addım 05",
          title: "Əməliyyat mərkəzi",
          description: "İmmersiv panel KPI-ları, anomaliyaları və əməkdaşlıq alətlərini birləşdirir.",
          accent: "from-violet-200/40",
        },
      },
    },
    timeline: {
      kicker: "Taymlayn",
      title: "Siqnaldan əmələ saniyələrdə",
      description:
        "Şaquli inteqrasiya olunmuş stack 150 ms altında gecikmə verir ki, treker düzəlişləri və bazar qərarları vaxtında yetişsin.",
      items: [
        { title: "T + 0 san", copy: "Edge qurğular normallaşdırılmış metrikləri SunTrack avtobusa göndərir." },
        { title: "T + 10 san", copy: "Süni intellekt ssenariləri yenidən qiymətləndirir, izahlı anomaliyalar görünür." },
        { title: "T + 25 san", copy: "Əmr paketləri treker, anbar və şəbəkə interfeyslərinə yayılır." },
        { title: "T + 40 san", copy: "Operatorlar təsirlənən aktivləri vurğulayan kinematik keçidləri görür." },
      ],
    },
    ui: {
      kicker: "UI xoreoqrafiyası",
      title: "Vəziyyətə nəzarət üçün dizayn olunub",
      cards: [
        {
          title: "Ambient hərəkət",
          copy: "Zərif paralaks və nəfəs alan işıqlar diqqəti sakit şəkildə yönəldir.",
        },
        {
          title: "İzahlı qatlar",
          copy: "Hər AI təklifi səbəblərini açır, lentlər məlumat mənşəyini göstərir.",
        },
        {
          title: "Əməkdaşlıq izləri",
          copy: "Təslimlər işıqlı izlər buraxır ki, komanda bir-birinin düşüncəsini izləsin.",
        },
      ],
    },
    nextStep: {
      kicker: "Növbəti addım",
      title: "SunTrack-i parkında həftələrə yerləşdir",
      description:
        "Fazalarla yerləşdir, rəqəmsal əkizini işıqlandır və platformanın hardware, komanda və treydinqi necə orkestr etdiyini izlə.",
      primaryCta: "İnteraktiv demonu başlat",
      secondaryCta: "Case study-lərə bax",
    },
  },
  dashboard: {
    header: {
      brand: "SunTrack",
    },
    actions: {
      backHome: "Ana səhifəyə qayıt",
      refresh: "Məlumatı yenilə",
    },
    heroCard: {
      kicker: "Nəzarət mərkəzi",
      title: "Canlı park icmalı",
      description: "Adaptiv trekerlər, proqnoz analitikası və hava foresaytı performansı sabit saxlayır.",
    },
    system: {
      title: "Sistem paneli",
      subtitle: "SunTrack performansını anlıq izləyin",
      lastUpdated: "Son yenilənmə: 13 May 2025 · 18:08",
    },
    stats: {
      power: {
        label: "Cari güc çıxışı",
        sub: "Dünənlə müqayisədə +%12",
        accent: "from-emerald-200/40",
      },
      temperature: {
        label: "Panel temperaturu",
        sub: "Optimal aralıq: 15–35°C",
        accent: "from-orange-200/40",
      },
      battery: {
        label: "Batareya vəziyyəti",
        sub: "Təxmini ehtiyat: 6 saat",
        accent: "from-lime-200/40",
      },
      humidity: {
        label: "Rütubət",
        sub: "Son 24s: %45 orta",
        accent: "from-sky-200/40",
      },
    },
    tabs: ["Performans", "Hava proqnozu", "Enerji istehsalı", "Sistem statusu"],
    calculator: {
      title: "Panel necə işləyir",
      description: "Aşağıdakı kalkulyatorla Azərbaycandakı qurğular üçün istehsalı təxmin edin.",
    },
  },
  login: {
    hero: {
      tagline: "SunTrack",
      label: "Operator girişi",
      title: "İdarəetmə otaqları üçün dəqiqlik səviyyəli giriş",
      description:
        "SunTrack kinematik aydınlığı kompromissiz təhlükəsizliklə birləşdirir. Bir dəfə daxil ol, qlobal parkları orkestr et.",
    },
    features: {
      zeroTrust: {
        title: "Zero-trust mövqeyi",
        copy: "Granulyar icazələr, cihaz etibarı və adaptiv MFA.",
      },
      hardwareKeys: {
        title: "Hardware açarları hazır",
        copy: "WebAuthn, FIDO2 və enterprise SSO daxildir.",
      },
      cinematicUi: {
        title: "Kinematik UI",
        copy: "Ambient hərəkət vəziyyətə nəzarəti sakit saxlayır.",
      },
    },
    metrics: [
      { label: "Qlobal gecikmə", value: "<150 ms" },
      { label: "Sessiya bütövlüyü", value: "%99.999" },
      { label: "Regionlar", value: "14 aktiv" },
    ],
    card: {
      badge: "Təhlükəsiz portal",
      title: "SunTrack-ə daxil ol",
      subtitle: "Park metrikləri, xəbərdarlıqlar və əməkdaşlıq mövzularına çıxış",
    },
    form: {
      emailLabel: "Email",
      passwordLabel: "Şifrə",
      showPassword: "Şifrəni göstər",
      forgotPassword: "Şifrəni unutmusunuz?",
      forgotPasswordHref: "/forgot-password",
      cta: "Daxil ol",
      ctaLoading: "Daxil olunur...",
      validation: {
        emailRequired: "Email tələb olunur.",
        emailInvalid: "Zəhmət olmasa düzgün email daxil edin.",
        passwordRequired: "Şifrə tələb olunur.",
        passwordLength: "Şifrə ən azı 6 simvol olmalıdır.",
      },
    },
    connections: {
      sso: "SSO • Azure AD · Okta · Google",
      keys: "Hardware açarları • YubiKey · Feitian",
      noAccount: "Hesabınız yoxdur?",
      requestAccess: "Giriş istəyin",
      requestAccessHref: "/request-access",
    },
    footerNote: "SunTrack",
  },
} as const

export default dictionary

