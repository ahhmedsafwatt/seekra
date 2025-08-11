import bundleAnalyzer from '@next/bundle-analyzer'
import { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
}
export default withBundleAnalyzer(nextConfig)
