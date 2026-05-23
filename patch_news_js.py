import re

with open("script.js", "r") as f:
    js = f.read()

# Add News Hub Logic
news_logic = """
// --- MODULE 14: NEWS HUB LOGIC ---
function initializeNewsHub() {
    if (!GAME_PATCH_NOTES || GAME_PATCH_NOTES.length === 0) return;

    const lastRead = localStorage.getItem('Emoji_Arena_LastReadPatch');
    const latestPatch = GAME_PATCH_NOTES[0];
    const dot = document.getElementById('news-notification-dot');

    if (lastRead !== latestPatch.id && dot) {
        dot.classList.remove('hidden');
    }

    const btnHub = document.getElementById('btn-news-hub');
    if (btnHub) {
        btnHub.addEventListener('click', () => {
            if (dot) dot.classList.add('hidden');
            localStorage.setItem('Emoji_Arena_LastReadPatch', latestPatch.id);
            openNewsHub();
        });
    }

    const btnClose = document.getElementById('btn-close-news');
    if (btnClose) {
        btnClose.addEventListener('click', () => {
            document.getElementById('news-hub-modal').classList.add('hidden');
        });
    }
}

function openNewsHub() {
    const modal = document.getElementById('news-hub-modal');
    if (!modal) return;
    modal.classList.remove('hidden');

    const timeline = document.getElementById('news-timeline');
    timeline.innerHTML = '';

    GAME_PATCH_NOTES.forEach((patch, index) => {
        const btn = document.createElement('button');
        btn.className = `news-timeline-item ${index === 0 ? 'active' : ''}`;

        let newTag = index === 0 ? '<span class="tag-new">NOVO</span>' : '';
        btn.innerHTML = `<span>${patch.version}</span> ${newTag}`;

        btn.onclick = () => {
            document.querySelectorAll('.news-timeline-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPatchDetails(patch);
        };

        timeline.appendChild(btn);
    });

    if (GAME_PATCH_NOTES.length > 0) {
        renderPatchDetails(GAME_PATCH_NOTES[0]);
    }
}

function renderPatchDetails(patch) {
    document.getElementById('patch-title').innerText = patch.title;
    document.getElementById('patch-version').innerText = patch.version;
    document.getElementById('patch-date').innerText = patch.date;
    document.getElementById('patch-subtitle').innerText = patch.subtitle;
    document.getElementById('patch-content').innerHTML = patch.content;
}
"""

js = js.replace("// --- Fim SecOps Watchdog ---", "// --- Fim SecOps Watchdog ---\n" + news_logic)

# Inject call into DOMContentLoaded
init_hook = """
    setupBottomNav();
    initializeNewsHub();
    updateUIProfile();
"""
js = js.replace("setupBottomNav();\n    updateUIProfile();", init_hook)

with open("script.js", "w") as f:
    f.write(js)
