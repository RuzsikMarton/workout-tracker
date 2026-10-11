"use client";

import Script from "next/script";

export default function IosPwaSplash() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/ios-pwa-splash@1.0.0/cdn.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        const iosPWASplash = (
          window as Window & {
            iosPWASplash?: (icon: string, color: string) => void;
          }
        ).iosPWASplash;

        iosPWASplash?.("/logo.png", "#1f1f1f");
      }}
    />
  );
}
