export function getVisionImages(): Record<string, string> {
  return {
    pyro: new URL('@assets/images/visions/pyro-icon.svg', import.meta.url).href,
    hydro: new URL('@assets/images/visions/hydro-icon.svg', import.meta.url).href,
    electro: new URL('@assets/images/visions/electro-icon.svg', import.meta.url).href,
    anemo: new URL('@assets/images/visions/anemo-icon.svg', import.meta.url).href,
    cryo: new URL('@assets/images/visions/cryo-icon.svg', import.meta.url).href,
    geo: new URL('@assets/images/visions/geo-icon.svg', import.meta.url).href,
    dendro: new URL('@assets/images/visions/dendro-icon.svg', import.meta.url).href,
  };
}

export function getWeaponImages(): Record<string, string> {
  return {
    sword: new URL('@assets/images/weapons/sword-icon.webp', import.meta.url).href,
    claymore: new URL('@assets/images/weapons/claymore-icon.webp', import.meta.url).href,
    polearm: new URL('@assets/images/weapons/polearm-icon.webp', import.meta.url).href,
    bow: new URL('@assets/images/weapons/bow-icon.webp', import.meta.url).href,
    catalyst: new URL('@assets/images/weapons/catalyst-icon.webp', import.meta.url).href,
  };
}

export function getNationImages(): Record<string, string> {
  return {
    mondstadt: new URL('@assets/images/nations/mondstadt-icon.webp', import.meta.url).href,
    liyue: new URL('@assets/images/nations/liyue-icon.webp', import.meta.url).href,
    inazuma: new URL('@assets/images/nations/inazuma-icon.webp', import.meta.url).href,
    sumeru: new URL('@assets/images/nations/sumeru-icon.webp', import.meta.url).href,
    fontaine: new URL('@assets/images/nations/fontaine-icon.webp', import.meta.url).href,
    natlan: new URL('@assets/images/nations/natlan-icon.webp', import.meta.url).href,
    snezhnaya: new URL('@assets/images/nations/snezhnaya-icon.webp', import.meta.url).href,
    unknown: new URL('@assets/images/nations/unknown-icon.webp', import.meta.url).href,
  };
}