"use client"
import { useMemo, useState } from "react"

const BASE_MONTHLY_KWH_PER_M2: Record<string, number> = {
  Jan: 10.9, Feb: 16.3, Mar: 24.5, Apr: 29.9, May: 32.6, Jun: 35.4,
  Jul: 35.4, Aug: 29.9, Sep: 24.5, Oct: 19.0, Nov: 8.2, Dec: 5.4
}

const MONTH_ORDER = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const REGION_LABELS: Record<string,string> = {
  azerbaijan: "Bütün Azərbaycan (orta)",
  baku_absheron: "Bakı–Abşeron",
  ganca: "Gəncə və qərb bölgələri",
  naqchivan: "Naxçıvan",
}

function toFixedClean(num: number, digits = 0) {
  if (!isFinite(num)) return "0"
  return parseFloat(num.toFixed(digits)).toString()
}

function tiltFactor(tiltDeg: number) {
  const k = 0.00015
  const delta = tiltDeg - 30
  const f = 1 - k * delta * delta
  return Math.max(0, f)
}

function monthlyEnergyKwhSimple(pvArea: number, tilt: number, regionFactor: number, eff: number, pr: number) {
  const fTilt = tiltFactor(tilt)
  const scale = (eff / 0.2) * (pr / 0.8) * regionFactor
  const result: Record<string, number> = {}
  for (const m of MONTH_ORDER) {
    const base = BASE_MONTHLY_KWH_PER_M2[m]
    result[m] = base * pvArea * scale * fTilt
  }
  return result
}

export function SolarCalculator() {
  const [pvArea, setPvArea] = useState<number>(10)
  const [tilt, setTilt] = useState<number>(30)
  const [eff, setEff] = useState<number>(20)
  const [pr, setPr] = useState<number>(80)
  const [regionKey, setRegionKey] = useState<string>("azerbaijan")
  const [regionFactor, setRegionFactor] = useState<number>(100)
  const [consumptionMonth, setConsumptionMonth] = useState<number>(250)
  const [capex, setCapex] = useState<number>(6000)
  const [capexYears, setCapexYears] = useState<number>(3)
  const [maintYear, setMaintYear] = useState<number>(200)
  const [electricityPrice, setElectricityPrice] = useState<number>(0.084)
  const [exportPrice, setExportPrice] = useState<number>(0.066)

  const effDecimal = eff / 100
  const prDecimal = pr / 100
  const regionFactorDecimal = regionFactor / 100

  const monthly = useMemo(
    () => monthlyEnergyKwhSimple(pvArea, tilt, regionFactorDecimal, effDecimal, prDecimal),
    [pvArea, tilt, regionFactorDecimal, effDecimal, prDecimal]
  )

  const yearly = Object.values(monthly).reduce((a, b) => a + b, 0)
  const daily = yearly / 365
  const exportIncomeYear = yearly * exportPrice
  const co2saved = yearly * 0.45
  const peakPowerKW = pvArea * 0.15
  const monthlyExportKwh = Math.max(0, yearly / 12 - consumptionMonth)
  const yearlyExportKwh = Math.max(0, yearly - consumptionMonth * 12)
  const monthlySavings = (yearly * electricityPrice) / 12
  const selfConsumptionRate = Math.min(100, (consumptionMonth * 12 / yearly) * 100)
  const paybackYears = capex / ((yearly * electricityPrice) - maintYear)

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 bg-white">
      {/* LEFT COLUMN */}
      <div className="md:col-span-4 bg-[#f6fff6] border border-[#d7f5d7] rounded-xl p-5 space-y-4">
        <div className="text-sm font-semibold text-[rgba(26,67,10,1)]">
          Obyekt & Sistem Parametrləri
        </div>
        <div className="text-sm text-[#4c6b4c]">
          Fərdi həyət evi, bina və ya korporativ obyekt üçün sadələşdirilmiş model
        </div>

        <div className="mt-4 space-y-3">
          <label className="text-xs text-[#3f5f3f]">Region</label>
          <select
            className="w-full p-2 rounded bg-white border border-[#b8e6b8] text-[#355835]"
            value={regionKey}
            onChange={(e) => setRegionKey(e.target.value)}
          >
            {Object.keys(REGION_LABELS).map((k) => (
              <option key={k} value={k}>{REGION_LABELS[k]}</option>
            ))}
          </select>

          <label className="text-xs text-[#3f5f3f]">Panel Area (m²)</label>
          <input
            className="w-full p-2 rounded bg-white border border-[#b8e6b8] text-[#355835]"
            type="number"
            value={pvArea}
            onChange={(e) => setPvArea(Number(e.target.value) || 0)}
          />

          <label className="text-xs text-[#3f5f3f]">Tilt Angle (°)</label>
          <input
            className="w-full p-2 rounded bg-white border border-[#b8e6b8]"
            type="number"
            value={tilt}
            onChange={(e) => setTilt(Number(e.target.value) || 0)}
          />

          <label className="text-xs text-[#3f5f3f]">Efficiency (%)</label>
          <input
            className="w-full p-2"
            type="range"
            min={12}
            max={24}
            step={0.1}
            value={eff}
            onChange={(e) => setEff(Number(e.target.value))}
          />
          <div className="text-xs text-[#4c6b4c]">{eff}%</div>

          <label className="text-xs text-[#3f5f3f]">Performance Ratio (%)</label>
          <input
            className="w-full p-2"
            type="range"
            min={60}
            max={90}
            step={1}
            value={pr}
            onChange={(e) => setPr(Number(e.target.value))}
          />
          <div className="text-xs text-[#4c6b4c]">{pr}%</div>

          <label className="text-xs text-[#3f5f3f]">Region factor (%)</label>
          <input
            className="w-full p-2"
            type="range"
            min={80}
            max={120}
            step={1}
            value={regionFactor}
            onChange={(e) => setRegionFactor(Number(e.target.value))}
          />
          <div className="text-xs text-[#4c6b4c]">{regionFactor}%</div>

          <label className="text-xs text-[#3f5f3f]">Aylıq istehlak (kWh)</label>
          <input
            className="w-full p-2 rounded bg-white border border-[#b8e6b8]"
            type="number"
            value={consumptionMonth}
            onChange={(e) => setConsumptionMonth(Number(e.target.value) || 0)}
          />

          <label className="text-xs text-[#3f5f3f]">İlkin CAPEX (AZN)</label>
          <input
            className="w-full p-2 rounded bg-white border border-[#b8e6b8]"
            type="number"
            value={capex}
            onChange={(e) => setCapex(Number(e.target.value) || 0)}
          />

          <label className="text-xs text-[#3f5f3f]">CAPEX geri ödəmə (il)</label>
          <input
            className="w-full p-2"
            type="range"
            min={1}
            max={10}
            value={capexYears}
            onChange={(e) => setCapexYears(Number(e.target.value))}
          />
          <div className="text-xs text-[#4c6b4c]">{capexYears} il</div>

          <label className="text-xs text-[#3f5f3f]">İllik texniki xidmət (AZN)</label>
          <input
            className="w-full p-2"
            type="range"
            min={0}
            max={1000}
            step={50}
            value={maintYear}
            onChange={(e) => setMaintYear(Number(e.target.value))}
          />
          <div className="text-xs text-[#4c6b4c]">{maintYear} AZN/il</div>

          <label className="text-xs text-[#3f5f3f]">Elektrik qiyməti (AZN/kWh)</label>
          <input
            className="w-full p-2 rounded bg-white border border-[#b8e6b8]"
            type="number"
            step="0.001"
            value={electricityPrice}
            onChange={(e) => setElectricityPrice(Number(e.target.value) || 0)}
          />

          <label className="text-xs text-[#3f5f3f]">Export qiyməti (AZN/kWh)</label>
          <input
            className="w-full p-2 rounded bg-white border border-[#b8e6b8]"
            type="number"
            step="0.001"
            value={exportPrice}
            onChange={(e) => setExportPrice(Number(e.target.value) || 0)}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button className="bg-[rgba(26,67,10,1)] text-white rounded-full py-2">Export CSV</button>
          <button className="border border-[rgba(26,67,10,1)] text-[rgba(26,67,10,1)] rounded-full py-2">
            Reset
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="md:col-span-8 space-y-4">
        <div className="bg-[#f6fff6] border border-[#d7f5d7] rounded-xl p-5">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-sm text-[#4c6b4c]">Aylıq PV Enerji İstehsalı</div>
              <div className="text-2xl font-bold text-[rgba(26,67,10,1)]">
                {toFixedClean(yearly, 0)} kWh / il
              </div>
              <div className="text-xs text-[#4c6b4c]">
                Gündəlik ortalama: {toFixedClean(daily, 1)} kWh / gün
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#ffffff] p-3 rounded-lg border border-[#d7f5d7] text-center">
                <div className="text-xs text-[#4c6b4c]">CO₂ Saved</div>
                <div className="font-bold text-[rgba(26,67,10,1)]">
                  {toFixedClean(co2saved, 0)} kg
                </div>
              </div>
              <div className="bg-[#ffffff] p-3 rounded-lg border border-[#d7f5d7] text-center">
                <div className="text-xs text-[#4c6b4c]">Export Income /yr</div>
                <div className="font-bold text-[rgba(26,67,10,1)]">
                  {toFixedClean(exportIncomeYear, 2)} AZN
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f6fff6] border border-[#d7f5d7] rounded-xl p-4">
          <div className="text-sm font-semibold text-[rgba(26,67,10,1)] mb-2">
            Aylıq PV İstehsal Məlumatları
          </div>
          <div className="grid grid-cols-4 gap-2">
            {MONTH_ORDER.map((m) => (
              <div key={m} className="bg-white p-2 rounded border border-[#d7f5d7] text-center">
                <div className="text-xs text-[#4c6b4c]">{m}</div>
                <div className="text-sm font-bold text-[rgba(26,67,10,1)]">
                  {toFixedClean(monthly[m], 0)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#d7f5d7] text-center">
            <div className="text-xs text-[#4c6b4c]">Pik AC Güc (approx)</div>
            <div className="text-lg font-bold text-[rgba(26,67,10,1)]">
              {toFixedClean(peakPowerKW, 2)} kW
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#d7f5d7] text-center">
            <div className="text-xs text-[#4c6b4c]">İllik şəbəkəyə satış</div>
            <div className="text-lg font-bold text-[rgba(26,67,10,1)]">
              {toFixedClean(yearlyExportKwh, 0)} kWh
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#d7f5d7] text-center">
            <div className="text-xs text-[#4c6b4c]">Aylıq qazanc (approx)</div>
            <div className="text-lg font-bold text-[rgba(26,67,10,1)]">
              {toFixedClean(monthlySavings, 2)} AZN / ay
            </div>
          </div>
        </div>

        {/* Additional Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-xl border border-[#d7f5d7] text-center">
            <div className="text-xs text-[#4c6b4c]">Self-consumption</div>
            <div className="text-base font-bold text-[rgba(26,67,10,1)]">
              {toFixedClean(selfConsumptionRate, 1)}%
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#d7f5d7] text-center">
            <div className="text-xs text-[#4c6b4c]">Payback period</div>
            <div className="text-base font-bold text-[rgba(26,67,10,1)]">
              {toFixedClean(paybackYears, 1)} il
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#d7f5d7] text-center">
            <div className="text-xs text-[#4c6b4c]">İllik qazanc</div>
            <div className="text-base font-bold text-[rgba(26,67,10,1)]">
              {toFixedClean(yearly * electricityPrice, 0)} AZN
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#d7f5d7] text-center">
            <div className="text-xs text-[#4c6b4c]">Net annual (10y)</div>
            <div className="text-base font-bold text-[rgba(26,67,10,1)]">
              {toFixedClean((yearly * electricityPrice - maintYear), 0)} AZN
            </div>
          </div>
        </div>

        {/* Financial Details Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-xl border border-[#d7f5d7]">
            <div className="text-xs text-[#4c6b4c] mb-1">İllik istehlak</div>
            <div className="text-base font-bold text-[rgba(26,67,10,1)]">
              {consumptionMonth * 12} kWh
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#d7f5d7]">
            <div className="text-xs text-[#4c6b4c] mb-1">Coverage ratio</div>
            <div className="text-base font-bold text-[rgba(26,67,10,1)]">
              {toFixedClean(Math.min(100, (yearly / (consumptionMonth * 12)) * 100), 1)}%
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#d7f5d7]">
            <div className="text-xs text-[#4c6b4c] mb-1">ROI (10 il)</div>
            <div className="text-base font-bold text-[rgba(26,67,10,1)]">
              {toFixedClean(((yearly * electricityPrice * 10 - maintYear * 10) / capex - 1) * 100, 1)}%
            </div>
          </div>
        </div>

        {/* Environmental & System Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#d7f5d7]">
            <div className="text-xs text-[#4c6b4c] mb-2">Ətraf mühit təsiri</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-[#4c6b4c]">CO₂ saved (25 il):</span>
                <span className="font-semibold text-[rgba(26,67,10,1)]">{toFixedClean(co2saved * 25 / 1000, 1)} ton</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4c6b4c]">Ağac ekvivalenti:</span>
                <span className="font-semibold text-[rgba(26,67,10,1)]">{toFixedClean(co2saved * 25 / 20, 0)} ağac</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#d7f5d7]">
            <div className="text-xs text-[#4c6b4c] mb-2">Sistem detalları</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-[#4c6b4c]">Panel sayı (~400W):</span>
                <span className="font-semibold text-[rgba(26,67,10,1)]">{Math.ceil(peakPowerKW / 0.4)} ədəd</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4c6b4c]">Təxmini inverter:</span>
                <span className="font-semibold text-[rgba(26,67,10,1)]">{toFixedClean(peakPowerKW * 0.9, 1)} kW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}