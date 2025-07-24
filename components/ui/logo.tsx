import Link from 'next/link'
import { Logo as LogoIcon, SeekraLogo } from '../icons'

export const LogoComponent = () => (
  <Link href="/" className="group flex items-center gap-1.5 text-xl font-bold">
    <LogoIcon size={24} />
    <SeekraLogo width={64} height={18} className="inline-block" />
  </Link>
)
