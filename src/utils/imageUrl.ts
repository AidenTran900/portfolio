const CDN_BASE = 'https://assets.aidentran.dev'

export function resolveImageUrl(localPath: string): string {
  if (import.meta.env.PROD) {
    const filename = localPath.split('/').pop()
    return `${CDN_BASE}/${filename}`
  }
  return localPath
}
