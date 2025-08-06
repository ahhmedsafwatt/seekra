import Link from 'next/link'
import { Logo as LogoIcon, SeekraLogo } from '../icons'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  iconSize?: number
  textHeight?: number
  textWidth?: number
  fillColor?: string
}

export const LogoComponent = ({
  className,
  iconSize = 24,
  textHeight = 18,
  textWidth = 64,
  fillColor = 'currentColor',
}: LogoProps) => (
  <Link
    href="/"
    className={cn(
      'group z-50 flex items-center gap-1.5 text-xl font-bold',
      className,
    )}
  >
    <LogoIcon size={iconSize} fillColor={fillColor} />
    <SeekraLogo
      width={textWidth}
      height={textHeight}
      fillColor={fillColor}
      className="inline-block"
    />
  </Link>
)
