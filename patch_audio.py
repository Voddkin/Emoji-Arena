import re

with open("script.js", "r") as f:
    js = f.read()

# Update playBGM and playSFX
bgm_fix = """
    playBGM(key) {
        if (!this.assets.bgm[key]) return;

        if (this.currentBGM && this.currentBGMKey === key) return;

        const nextAudio = new Audio(this.assets.bgm[key]);
        nextAudio.loop = true;
        nextAudio.volume = 0; // start silent for fade

        const playPromise = nextAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                if (this.currentBGM) {
                    this.fadeAudio(this.currentBGM, this.currentBGM.volume, 0, 1000).then(() => {
                        this.currentBGM.pause();
                        this.currentBGM = nextAudio;
                        this.currentBGMKey = key;
                        this.fadeAudio(this.currentBGM, 0, this.masterVolume * this.musicVolume, 1000);
                    });
                } else {
                    this.currentBGM = nextAudio;
                    this.currentBGMKey = key;
                    this.fadeAudio(this.currentBGM, 0, this.masterVolume * this.musicVolume, 1000);
                }
            }).catch((e) => {
                // Silently ignore 404s and DOMExceptions
            });
        }
    }
"""

sfx_fix = """
    playSFX(key) {
        if (!this.assets.sfx[key]) return;

        const pool = this.sfxPools[key];
        const audio = pool.find(a => a.paused || a.ended);

        if (audio) {
            audio.volume = this.masterVolume * this.sfxVolume;
            audio.currentTime = 0;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch((e) => {
                    // Silently ignore 404s and DOMExceptions
                });
            }
        }
    }
"""

js = re.sub(r'playBGM\(key\) \{[\s\S]*?\}\n\s+playSFX\(key\)', bgm_fix + "\n\n    playSFX(key)", js)
js = re.sub(r'playSFX\(key\) \{[\s\S]*?\}\n\s+setMasterVolume\(val\)', sfx_fix + "\n\n    setMasterVolume(val)", js)

with open("script.js", "w") as f:
    f.write(js)
