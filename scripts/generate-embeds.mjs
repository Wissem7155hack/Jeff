import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PIE_IDS = [
  "1f736750cc80f29339722e9a",
  "bbc5dfec037a92153d1995ce",
  "c130351e2ef62af898588c52",
  "0c14d0a046e20ee0e79234fb",
];

const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const SPOOF_CODE = `
  <base href="https://cloud.protopie.io/">
  <script>
    (function() {
      // 1. Force Desktop Environment across all navigator properties
      const DESKTOP_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
      const DESKTOP_PLATFORM = "Win32";
      
      try {
        Object.defineProperty(navigator, "userAgent", { get: () => DESKTOP_UA, configurable: true });
        Object.defineProperty(navigator, "appVersion", { get: () => DESKTOP_UA, configurable: true });
        Object.defineProperty(navigator, "platform", { get: () => DESKTOP_PLATFORM, configurable: true });
        Object.defineProperty(navigator, "maxTouchPoints", { get: () => 0, configurable: true });
        if (navigator.userAgentData) {
          Object.defineProperty(navigator.userAgentData, "mobile", { get: () => false, configurable: true });
          Object.defineProperty(navigator.userAgentData, "platform", { get: () => "Windows", configurable: true });
        }
      } catch(e) {}

      // 2. Spoof media queries (pointer: coarse -> false)
      const origMatchMedia = window.matchMedia;
      if (origMatchMedia) {
        window.matchMedia = function(q) {
          if (q && (q.includes("pointer: coarse") || q.includes("(hover: none)"))) {
            return {
              matches: false,
              media: q,
              onchange: null,
              addListener: function(){},
              removeListener: function(){},
              addEventListener: function(){},
              removeEventListener: function(){},
              dispatchEvent: function(){ return false; }
            };
          }
          return origMatchMedia.call(window, q);
        };
      }

      // 3. Pre-seed ProtoPie storage flags to mark warnings as dismissed
      try {
        localStorage.setItem("hasPlayerFeatureWarningShown", "true");
        localStorage.setItem("dontShowPlayerPopup", "true");
        localStorage.setItem("protopie_dont_show_player_popup", "true");
        localStorage.setItem("player_popup_dismissed", "true");
        sessionStorage.setItem("hasPlayerFeatureWarningShown", "true");
      } catch(e) {}

      // 4. Active MutationObserver to instantly remove/dismiss any popup if rendered
      function killPopups() {
        const dialog = document.getElementById("dialog");
        const dimmer = document.getElementById("dimmer");
        if (dialog && dialog.childNodes.length > 0) {
          const buttons = dialog.querySelectorAll("button");
          buttons.forEach(function(btn) {
            if (btn.innerText && btn.innerText.toLowerCase().includes("continue")) {
              btn.click();
            }
          });
          dialog.innerHTML = "";
        }
        if (dimmer) {
          dimmer.innerHTML = "";
          dimmer.style.display = "none";
        }
        const modals = document.querySelectorAll('[class*="Modal"], [class*="modal"], [role="dialog"]');
        modals.forEach(function(el) {
          if (el.textContent && (el.textContent.includes("ProtoPie Player") || el.textContent.includes("Web browser"))) {
            el.remove();
          }
        });
      }

      const observer = new MutationObserver(killPopups);
      if (document.documentElement) {
        observer.observe(document.documentElement, { childList: true, subtree: true });
      } else {
        document.addEventListener("DOMContentLoaded", function() {
          observer.observe(document.documentElement, { childList: true, subtree: true });
        });
      }
      setInterval(killPopups, 200);
    })();
  </script>
  <style>
    /* Hard CSS block on any player dialog / modal / dimmer */
    #dialog, #dimmer, #dialog > div, [role="dialog"], [class*="Modal"], [class*="modal"], [class*="Dialog"] {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  </style>
`;

async function generate() {
  const outDir = path.resolve(__dirname, "../public/embed");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const id of PIE_IDS) {
    const targetUrl = `https://cloud.protopie.io/p/${id}?ui=false&scaleToFit=true&enableHotspotHints=true&cursorType=touch`;
    console.log(`Fetching prototype ${id}...`);
    try {
      const res = await fetch(targetUrl, {
        headers: {
          "User-Agent": DESKTOP_UA,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });

      if (!res.ok) {
        console.warn(`Upstream returned ${res.status} for ${id}, using existing file if available.`);
        continue;
      }

      let html = await res.text();
      if (html.includes("<head>")) {
        html = html.replace("<head>", "<head>" + SPOOF_CODE);
      } else if (html.includes("<html>")) {
        html = html.replace("<html>", "<html><head>" + SPOOF_CODE + "</head>");
      } else {
        html = SPOOF_CODE + html;
      }

      const dest = path.join(outDir, `${id}.html`);
      fs.writeFileSync(dest, html, "utf8");
      console.log(`Generated ${dest} (${html.length} bytes)`);
    } catch (err) {
      console.warn(`Network fetch failed for ${id}:`, err.message);
    }
  }
}

generate().catch(console.error);
