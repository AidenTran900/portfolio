const CDN_BASE = 'https://assets.aidentran.dev'

export function resolveImageUrl(localPath: string): string {
  if (import.meta.env.PROD) {
    if (localPath.startsWith('/images/gallery/')) {
      const filename = localPath.split('/').pop()
      return `${CDN_BASE}/Artwork/${filename}`
    }
    if (localPath === '/hero/bg.webp') {
      return `${CDN_BASE}/bg.webp`
    }
    return `${CDN_BASE}${localPath}`
  }
  return localPath
}

export function resolveVideoUrl(filename: string): string {
  return `${CDN_BASE}/Videos/${filename}`
}
