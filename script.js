(function() {
  const root   = document.documentElement;
  const mq     = window.matchMedia("(prefers-color-scheme: dark)");
  const radios = document.querySelectorAll('input[name="theme"]');

  function setTheme(mode) {
    if (mode === "system") {
      localStorage.removeItem("theme");
      root.classList.toggle("dark", mq.matches);
    } else {
      localStorage.theme = mode;
      root.classList.toggle("dark", mode === "dark");
    }
    radios.forEach(r => r.checked = r.value === mode);
  }

  // 초기 상태 설정
  const saved = localStorage.getItem("theme") || "system";
  setTheme(saved);

  // 시스템 테마 변경 시 자동 반영
  mq.addEventListener("change", () => {
    if (!localStorage.getItem("theme")) {
      setTheme("system");
    }
  });

  // 라디오 클릭 이벤트 연결
  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      setTheme(radio.value);
    });
  });
})();
