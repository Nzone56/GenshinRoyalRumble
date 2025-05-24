import type { Character } from "@mytypes/Character";

export const fetchCharacters = async () => {
  const url = "https://genshin.jmp.blue/characters/all";
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const fetchCharacter = async (id: string) => {
  const url = `https://genshin.jmp.blue/characters/${id}`;
  const response = await fetch(url);
  const data = await response.json();

  const character: Character = {
    id,
    name: data.name,
    gender: data.gender,
    vision: data.vision,
    weapon: data.weapon,
    nation: data.nation,
    rarity: data.rarity,
    title: data.title,
    description: data.description,
    images: {
      card: `https://genshin.jmp.blue/characters/${id}/card`,
      icon: `https://genshin.jmp.blue/characters/${id}/icon`,
      iconside: `https://genshin.jmp.blue/characters/${id}/icon-side`,
      portrait: `https://genshin.jmp.blue/characters/${id}/portrait`,
    },
  };

  return character;
};

export const preloadCharacterImages = (ids: string[]) => {
  // console.log("jmmm");
  // ids.forEach((id) => {
  //   const urls = [
  //     `https://genshin.jmp.blue/characters/${id}/card`,
  //     `https://genshin.jmp.blue/characters/${id}/icon`,
  //     `https://genshin.jmp.blue/characters/${id}/iconside`,
  //     `https://genshin.jmp.blue/characters/${id}/portrait`,
  //   ];
  //   urls.forEach((url) => {
  //     const img = new Image();
  //     img.src = url; // Browser saves it on Cache
  //   });
  // });
};
