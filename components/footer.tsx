import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react'
import { Button } from './ui/button'
import { LogoComponent } from './ui/logo'
import Link from 'next/link'

export const Footer = () => {
  const menuItems = [
    {
      title: 'Browse',
      links: [
        {
          url: '/chatbots',
          text: 'Chatbots',
        },
        {
          url: '/ai-agents',
          text: 'AI Agents',
        },
        {
          url: '/video-generators',
          text: 'Video Generators',
        },
        {
          url: '/image-generators',
          text: 'Image Generators',
        },
        {
          url: '/audio-generators',
          text: 'Audio Generators',
        },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { text: 'About', url: '/about' },
        { text: 'Blog', url: '/blod' },
        { text: 'Advertise', url: '/advertise' },
        { text: 'Contact', url: 'seekra7@gmail.com' },
      ],
    },
  ]
  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      tooltip: 'Follow us on GitHub',
      url: 'https://github.com/ahhmedsafwatt',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      tooltip: 'Follow us on Twitter',
      url: 'https://x.com/seekra261563',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      tooltip: 'Follow us on Instagram',
      url: 'https://www.instagram.com/ahmeed_safwatt/',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      tooltip: 'Connect with us on LinkedIn',
      url: 'https://www.linkedin.com/company/seekra/',
    },
  ]

  return (
    <footer className="border-t py-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2 mb-8 lg:mb-0">
            <div className="flex items-center gap-2 lg:justify-start">
              <LogoComponent />
            </div>
            <p className="text-muted-foreground mt-4 text-pretty text-sm font-medium md:text-base">
              your AI command center—built to guide creators, builders, and
              teams to the exact tools they need to ship faster and smarter.
            </p>
          </div>
          {menuItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 font-serif font-bold">{section.title}</h3>
              <ul className="text-muted-foreground space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="hover:text-primary">
                    <Link href={link.url}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="relative">
            <h3 className="mb-4 font-serif text-lg font-bold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              {socialLinks.map((social) => (
                <TooltipProvider key={social.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-secondary rounded-full"
                        asChild
                      >
                        <Link
                          href={social.url}
                          aria-label={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <social.icon className="h-4 w-4" />
                          <span className="sr-only">{social.label}</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
        <div className="text-muted-foreground mt-24 flex text-wrap border-t pt-6 font-serif text-sm font-medium md:items-end">
          Made by
          <Link
            href={'https://ahmed-safwat-portfolio-swart.vercel.app/'}
            className="text-secondary fontser ml-1 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ahmed safwat.
          </Link>
          Website may contain affiliate links.
        </div>
      </div>
    </footer>
  )
}
