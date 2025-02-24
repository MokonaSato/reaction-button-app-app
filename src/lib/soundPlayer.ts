export const soundMap: { [key: string]: string } = {
  "へぇ": new URL('../sounds/hee.wav', import.meta.url).toString(),
  "なるほど": new URL('../sounds/naruhodo.wav', import.meta.url).toString(),
  "面白い！": new URL('../sounds/omoshiroi.wav', import.meta.url).toString(),
  "うーん？": new URL('../sounds/uun.wav', import.meta.url).toString()
};

export const playSound = (label: string, isMuted: boolean) => {
  if (!isMuted) {
    const soundUrl = soundMap[label];
    if (soundUrl) {
      const audio = new Audio(soundUrl);
      audio.play();
    } else {
      console.error(`Sound URL not found for label: ${label}`);
    }
  }
};