function toggleSidebarAndLinks() {
    let sidebarContainer = document.getElementById("aih-sidebar");

    if (sidebarContainer) {
        sidebarContainer.remove();
        document.querySelectorAll("a").forEach(link => {
            link.style.color = "";
        });
        return;
    }

    highlightLinks();
    createSidebar();
    updateSidebarCounter();
    monitorContentChanges();
}

function highlightLinks() {
    document.querySelectorAll("a").forEach(link => {
        link.dataset.originalColor = link.style.color
        link.style.color = "blue";
    });
}

function countWords() {
    const text = document.body.innerText;
    const words = text.match(/\b\w+\b/g);
    return words ? words.length : 0;
}

function createSidebar() {
    let container = document.createElement("div");
    container.id = "aih-sidebar";
    document.body.appendChild(container);

    let shadow = container.attachShadow({ mode: "open" });

    let sidebar = document.createElement("div");
    sidebar.id = "aih-sidebar";
    sidebar.innerHTML = `
        <div id="aih-sidebar__header">Word Counter</div>
        <div id="aih-sidebar__counter">Total Words: <span id="aih-sidebar__counter">0</span></div>
    `;

    let style = document.createElement("style");
    style.textContent = `
        #aih-sidebar {
            position: fixed;
            top: 10%;
            right: 0;
            width: 200px;
            background: white;
            box-shadow: -3px 0 10px rgba(0, 0, 0, 0.2);
            padding: 10px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 99999;
        }
        #aih-sidebar__header {
            background: #007bff;
            color: white;
            padding: 10px;
            font-weight: bold;
            text-align: center;
        }
        #aih-sidebar__counter {
            padding: 10px;
            text-align: center;
        }
    `;

    shadow.appendChild(style);
    shadow.appendChild(sidebar);
}

function updateSidebarCounter() {
    const totalWords = countWords();
    const sidebarContainer = document.getElementById("aih-sidebar");

    if (sidebarContainer) {
        const shadowRoot = sidebarContainer.shadowRoot;
        const sidebarCounterEl = shadowRoot?.querySelector("#aih-sidebar__counter");
        if (sidebarCounterEl) {
            sidebarCounterEl.innerText = totalWords;
        }
    }
}

function monitorContentChanges() {
    const observer = new MutationObserver(() => {
        updateSidebarCounter();
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

toggleSidebarAndLinks();
