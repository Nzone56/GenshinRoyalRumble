export const fetchCharacters = async () => {
  const url = "https://genshin.jmp.blue/characters/all"
  const response = await fetch(url)
  const data = await response.json();

  return data

}