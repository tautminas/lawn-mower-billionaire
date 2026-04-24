export const AudioMixin = {
  preloadAudio() {
    this.load.audio("theme", "theme.mp3");
  },

  playBackgroundMusic() {
    const themeMusic = this.sound.get("theme");
    if (!themeMusic || !themeMusic.isPlaying) {
      this.sound.play("theme", {
        loop: true,
        volume: 0.5,
      });
    }
  },
};
