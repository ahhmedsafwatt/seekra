import Link from 'next/link'
import { Logo as LogoIcon, SeekraLogo } from '../icons'
import { cn } from '@/lib/utils'

export const LogoComponent = ({ className }: { className?: string }) => (
  <Link
    href="/"
    className={cn(
      'group flex items-center gap-1.5 text-xl font-bold',
      className,
    )}
  >
    <LogoIcon size={24} />
    <SeekraLogo width={64} height={18} className="inline-block" />
  </Link>
)
