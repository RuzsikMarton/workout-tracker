export function isStandalone(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (
      window.navigator as Navigator & {
        standalone?: boolean;
      }
    ).standalone === true
  );
}

export function getDevice() {
  const ua = navigator.userAgent;

  return {
    isIOS:
      /iPhone|iPad|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),

    isAndroid: /Android/.test(ua),
    isMac: /Macintosh|MacIntel|MacPPC|Mac68K/.test(ua),
    isWindows: /Windows/.test(ua),
  };
}

export function getBrowser() {
  const ua = navigator.userAgent;

  return {
    isChrome: /Chrome/.test(ua) && !/Edge/.test(ua),
    isFirefox: /Firefox/.test(ua),
    isSafari: /Safari/.test(ua) && !/Chrome/.test(ua),
    isEdge: /Edg/.test(ua),
    isOpera: /Opera|OPR/.test(ua),
  };
}
