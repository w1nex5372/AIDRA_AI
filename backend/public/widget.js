(function () {
  // === CONFIG ===
  const CLIENT_ID = window.AIDRA_CLIENT_ID || "demo";
  const WIDGET_URL = "https://aidra-ai.onrender.com/widget-ui.html";

  // === BUTTON ===
  const btn = document.createElement("div");
  btn.id = "aidra-widget-btn";
  btn.innerHTML = "💬";
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
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg,#8b5cf6,#6d28d9);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      z-index: 9998;
      box-shadow: 0 12px 30px rgba(139,92,246,.8);
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
    }

    @media (max-width: 480px) {
      #aidra-widget-iframe {
        width: 100vw;
        height: 100vh;
        right: 0;
        bottom: 0;
        border-radius: 0;
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
