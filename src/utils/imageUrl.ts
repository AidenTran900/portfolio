const CDN_BASE = 'https://assets.aidentran.dev'

export function resolveImageUrl(localPath: string): string {
  if (import.meta.env.PROD) {
    if (localPath.startsWith('/images/gallery/')) {
      const filename = localPath.split('/').pop()
      return `${CDN_BASE}/Artwork/${filename}`
    }
    if (localPath === '/hero/bg.webp') {
      return `${CDN_BASE}/bg.v1.webp`
    }
    return `${CDN_BASE}${localPath}`
  }
  // Dev: strip version tag (e.g. .v1) so paths match local /public filenames
  return localPath.replace(/\.v\d+(\.\w+)$/, '$1')
}

export function resolveVideoUrl(filename: string): string {
  return `${CDN_BASE}/Videos/${filename}`
}
