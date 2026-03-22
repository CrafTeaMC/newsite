import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CrafTea | Minecraft Datapacks & Maps',
  description: 'CrafTea is a team dedicated to creating high-quality Minecraft Datapacks, Maps, and Resourcepacks.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
