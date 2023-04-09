export type Platfom = 'YouTube' | 'LinkedIn' | 'Twitch' | 'Twitter'

export interface SocialProfile {
  readonly platform: Platfom
  readonly url: string
}
