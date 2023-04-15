export type Platform = 'YouTube' | 'LinkedIn' | 'Twitch' | 'Twitter'

export interface SocialProfile {
  readonly platform: Platform
  readonly url: string
}
