import {
  Chatbot,
  AiAgent,
  ImageGaneration,
  VideoGaneration,
  AudioGaneration,
} from '@/components/icons/index'
import { Navlinks } from '../utilities/types'

export const NAVIGATION_LINKS: Navlinks[] = [
  {
    label: 'Browse',
    children: [
      {
        href: '/chatbots',
        label: 'Chatbots',
        icon: Chatbot,
        description: 'Explore a variety of chatbots for different purposes.',
      },
      {
        href: '/ai-agents',
        label: 'AI Agents',
        icon: AiAgent,
        description: 'Discover AI agents that can perform tasks autonomously.',
      },
      {
        href: '/video-generators',
        label: 'Video Generators',
        icon: VideoGaneration,
        description: 'Explore a variety of video generation tools.',
      },
      {
        href: '/image-generators',
        label: 'Image Generators',
        icon: ImageGaneration,
        description: 'Explore a variety of image generation tools.',
      },
      {
        href: '/audio-generators',
        label: 'Audio Generators',
        icon: AudioGaneration,
        description: 'Discover tools for generating audio content.',
      },
    ],
  },
  {
    href: '/self-hosted',
    label: 'Self-hosted',
  },
  {
    href: '/categories',
    label: 'Categories',
  },
  {
    href: '/advertise',
    label: 'Advertise',
  },
]
