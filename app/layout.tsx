import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SunTrack",
  description: "Solar intelligence platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
