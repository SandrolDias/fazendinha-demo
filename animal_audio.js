window.fazendinhaAudio = {
  finish: null,
  stop() {
    this.finish?.(false);
  },
  play(path) {
    this.stop();
    return new Promise(resolve => {
      const audio = new Audio(path);
      const finish = success => {
        if (this.finish !== finish) return;
        this.finish = null;
        audio.onended = audio.onerror = null;
        audio.pause();
        resolve(success);
      };
      this.finish = finish;
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false);
      audio.play().catch(() => finish(false));
    });
  },
};
