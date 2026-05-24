import re

with open("script.js", "r") as f:
    js = f.read()

sfx_fix = """
    playSFX(sfxId) {
        const pool = this.sfxPool[sfxId];
        if (!pool) return;

        let audioToPlay = pool.find(a => a.paused || a.ended || a.currentTime === 0);

        if (!audioToPlay) {
            audioToPlay = pool.shift();
            pool.push(audioToPlay);
        }

        audioToPlay.volume = this.masterVolume * this.sfxVolume;
        audioToPlay.currentTime = 0;
        const playPromise = audioToPlay.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => { /* Silently ignore 404s and DOMExceptions */ });
        }
    }
"""

js = re.sub(r'playSFX\(sfxId\) \{[\s\S]*?audioToPlay\.play\(\)\.catch\(e => console\.log\(\'SFX Play blocked\'\)\);\n    \}', sfx_fix.strip(), js)

bgm_fix = """
    playBGM(key) {
        const url = this.assets.bgm[key];
        if (!url) return;
        if (this.currentBGMKey === key) return;

        const nextAudio = new Audio(url);
        nextAudio.loop = true;
        nextAudio.volume = 0;

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
            }).catch(e => { /* Silently ignore 404s and DOMExceptions */ });
        }
    }
"""

js = re.sub(r'playBGM\(key\) \{[\s\S]*?this\.fadeAudio\(this\.currentBGM, 0, this\.masterVolume \* this\.musicVolume, 1000\);\n            \}\n        \}\);\n    \}', bgm_fix.strip(), js)

with open("script.js", "w") as f:
    f.write(js)
