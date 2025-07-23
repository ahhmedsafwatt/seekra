"use client";
import { useMemo, useState, useRef } from "react";
import SeekraLogo from "./SeekraLogo";
import Logo from "./Logo";
import { MenuIcon } from "./menu-icon";
import { Button } from "./button";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SiBuymeacoffee } from "react-icons/si";

interface navLinks {
  href: string;
  label: string;
  children?: (navLinks & { icon?: React.ReactNode; description?: string })[];
}

const links: navLinks[] = [
  {
    href: "/browse",
    label: "Browse",
    children: [
      {
        href: "/browse/chatbots",
        label: "Chatbots",
        icon: "image",
      },
      {
        href: "/browse/ai-agents",
        label: "AI Agents",
        icon: "robot",
      },
      {
        href: "/browse/video-generators",
        label: "Video Generators",
        icon: "video",
      },
      {
        href: "/browse/image-generators",
        label: "Image Generators",
        icon: "image",
      },
      {
        href: "/browse/audio-generators",
        label: "Audio Generators",
      },
    ],
  },
  {
    href: "/self-hosted",
    label: "Self-hosted",
  },
  {
    href: "/advertise",
    label: "Advertise",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    visible: boolean;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });
  const linksContainerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useMemo(() => {
    () => {
      setIsMenuOpen((prev) => !prev);
    };
  }, [isMenuOpen]);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const linkRect = e.currentTarget.getBoundingClientRect();
    const containerRect = linksContainerRef.current?.getBoundingClientRect();
    if (containerRect) {
      setHighlightStyle({
        left: linkRect.left - containerRect.left,
        top: linkRect.top - containerRect.top,
        width: linkRect.width,
        height: linkRect.height,
        visible: true,
      });
    }
  };

  const handleMouseLeave = () => {
    setHighlightStyle((prev) => ({ ...prev, visible: false }));
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b">
      {/* Mobile menu icon */}
      <nav className="container backdrop-blur-md  bg-background/60 flex items-center justify-between py-2 lg:rounded-sm ">
        <div className="flex items-center gap-4 lg:gap-8">
          <a
            href="/"
            className="flex items-center gap-2 font-bold text-xl group"
          >
            <Logo size={24} />
            <SeekraLogo width={64} height={18} className="inline-block" />
          </a>
        </div>
        <div
          ref={linksContainerRef}
          className="hidden lg:flex gap-2.5 text-sm relative"
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated highlight background */}
          <AnimatePresence>
            {highlightStyle.visible && (
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute bg-accent rounded-sm z-0"
                initial={{
                  opacity: 0.5,
                  scale: 1.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.1,
                }}
                style={{
                  left: highlightStyle.left,
                  top: highlightStyle.top,
                  width: highlightStyle.width,
                  height: highlightStyle.height,
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground cursor-pointer hover:text-secondary transition-colors duration-200 relative z-10 px-2 py-2"
              onMouseEnter={handleMouseEnter}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Search
              className="text-muted-foreground cursor-pointer hover:bg-accent rounded-sm p-1.5 hover:text-secondary transition-colors duration-200 box-content"
              size={18}
            />
            <SiBuymeacoffee
              size={18}
              className="text-muted-foreground cursor-pointer hover:bg-accent rounded-sm p-1.5 hover:text-secondary transition-colors duration-200 box-content"
            />
            <Button
              asChild
              size="sm"
              className="rounded-sm hover:scale-95 ease-out duration-200"
            >
              <a href="/submit">Submit</a>
            </Button>
          </div>
          <MenuIcon
            isMenuOpen={isMenuOpen}
            toggleMenu={() => toggleMenu}
            className="lg:hidden cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
