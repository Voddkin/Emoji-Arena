import re

with open("styles.css", "r") as f:
    css = f.read()

news_css = """
/* --- MODULE 14: NEWS HUB & FOMO --- */
.news-hub-icon {
    font-size: 1.5rem;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s;
    filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));
}
.news-hub-icon:hover {
    transform: scale(1.1);
}
.notification-dot {
    position: absolute;
    top: -5px; right: -5px;
    width: 12px; height: 12px;
    background-color: #e74c3c;
    border-radius: 50%;
    box-shadow: 0 0 10px #e74c3c;
    animation: pulse-red 1.5s infinite;
}

/* Timeline Layout */
.news-timeline-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #222;
    color: #bdc3c7;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: background 0.2s, color 0.2s;
    font-family: 'Fredoka One', cursive;
}
.news-timeline-item:hover {
    background: rgba(255,255,255,0.05);
}
.news-timeline-item.active {
    background: rgba(155, 89, 182, 0.2);
    color: var(--primary-color);
    border-left: 4px solid var(--primary-color);
}
.tag-new {
    background: #e74c3c;
    color: white;
    font-size: 0.6rem;
    padding: 2px 6px;
    border-radius: 10px;
    text-transform: uppercase;
}

/* Patch Content Automated Formatting */
.patch-content ul {
    list-style: none;
    padding-left: 20px;
    margin-top: 10px;
}
.patch-content li {
    margin-bottom: 10px;
    position: relative;
}
.patch-content li::before {
    content: "⚙️";
    position: absolute;
    left: -25px;
    top: 2px;
    font-size: 0.9rem;
}
.patch-content strong {
    color: #f1c40f;
}
.patch-content em {
    color: #3498db;
    font-style: normal;
    font-weight: bold;
}
"""

css += "\n" + news_css

with open("styles.css", "w") as f:
    f.write(css)
