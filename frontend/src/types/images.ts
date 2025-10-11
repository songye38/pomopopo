// types/images.ts
export interface SessionImageSet {
  web: string;
  mobile: string;
}

export const sessionImages: Record<string, SessionImageSet> = {
  basic: { web: "/images/web/converge.png", mobile: "/images/mobile/converge.png" },
  observe: { web: "/images/web/converge.png", mobile: "/images/mobile/converge.png" },
  converge: { web: "/images/web/converge.png", mobile: "/images/mobile/converge.png" },
  refine: { web: "/images/web/refine.png", mobile: "/images/mobile/refine.png" },
  random: { web: "/images/web/random.png", mobile: "/images/mobile/random.png" },
  reverse: { web: "/images/web/reverse.png", mobile: "/images/mobile/reverse.png" },
  emotion: { web: "/images/web/emotion.png", mobile: "/images/mobile/emotion.png" },
  explore: { web: "/images/web/explore.png", mobile: "/images/mobile/explore.png" },
  story: { web: "/images/web/story.png", mobile: "/images/mobile/story.png" },
  escape: { web: "/images/web/escape.png", mobile: "/images/mobile/escape.png" },
  repeat: { web: "/images/web/repeat.png", mobile: "/images/mobile/repeat.png" },
  empty: { web: "/images/web/empty.png", mobile: "/images/mobile/empty.png" },
};
