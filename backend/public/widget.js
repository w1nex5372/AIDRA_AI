(function () {
  // === CONFIG ===
  const CLIENT_ID = window.AIDRA_CLIENT_ID || "demo";
  const WIDGET_URL = "https://aidra-ai.onrender.com/widget-ui.html";

  // === BUTTON ===
  const btn = document.createElement("div");
  btn.id = "aidra-widget-btn";
  btn.innerHTML = `
    <span class="aidra-icon">🥐</span>
    <span class="aidra-text">Talk to us</span>
  `;
  document.body.appendChild(btn);

  // === IFRAME ===
  const iframe = document.createElement("iframe");
  iframe.id = "aidra-widget-iframe";
  iframe.src = `${WIDGET_URL}?clientId=${CLIENT_ID}`;
  document.body.appendChild(iframe);

  // === STYLES ===
  const style = document.createElement("style");
  style.innerHTML = `
    #aidra-widget-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      height: 52px;
      padding: 0 18px 0 14px;
      display: flex;
      align-items: center;
      gap: 10px;

      background: #0b0b0f;
      color: #fff;
      border-radius: 999px;
      cursor: pointer;

      font-family: Inter, system-ui, sans-serif;
      font-size: 14px;
      font-weight: 600;

      box-shadow:
        0 0 0 1px rgba(139,92,246,.35),
        0 12px 30px rgba(139,92,246,.45);

      z-index: 9998;
      transition: transform .15s ease, box-shadow .15s ease;
    }

    #aidra-widget-btn:hover {
      transform: translateY(-1px);
      box-shadow:
        0 0 0 1px rgba(139,92,246,.55),
        0 20px 40px rgba(139,92,246,.65);
    }

    .aidra-icon {
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #aidra-widget-iframe {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 380px;
      height: 600px;
      border: none;
      border-radius: 18px;
      display: none;
      z-index: 9999;
      box-shadow: 0 30px 80px rgba(0,0,0,.6);
      background: transparent;
    }

    @media (max-width: 480px) {
      #aidra-widget-iframe {
        width: 100vw;
        height: 100vh;
        right: 0;
        bottom: 0;
        border-radius: 0;
      }

      #aidra-widget-btn {
        right: 16px;
        bottom: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  // === TOGGLE ===
  let open = false;
  btn.onclick = () => {
    open = !open;
    iframe.style.display = open ? "block" : "none";
  };
})();
