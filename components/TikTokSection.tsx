"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, X } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StarField from "@/components/StarField";

const TIKTOK_PROFILE = "https://www.tiktok.com/@labidallc";

interface TikTokClip {
  id: string;
  title: string;
  thumbnail: string;
  href: string;
}

const clips: TikTokClip[] = [
  {
    id: "7681883041140067597",
    title: "Excavator Repair",
    thumbnail: "/tiktok/excavator.jpg",
    href: `${TIKTOK_PROFILE}/video/7681883041140067597`,
  },
  {
    id: "7657433752817192205",
    title: "Dock Repair",
    thumbnail: "/tiktok/dock-repair.jpg",
    href: `${TIKTOK_PROFILE}/video/7657433752817192205`,
  },
  {
    id: "7681875953873653006",
    title: "Mobile Welding",
    thumbnail: "/tiktok/mobile-welding.jpg",
    href: `${TIKTOK_PROFILE}/video/7681875953873653006`,
  },
];

function playerSrc(id: string, preview: boolean) {
  const params = new URLSearchParams({
    autoplay: "1",
    loop: "1",
    music_info: "0",
    description: "0",
    rel: "0",
    // Official param is `muted`. Hover must stay muted for browser autoplay rules.
    muted: preview ? "1" : "0",
    ...(preview
      ? {
          controls: "0",
          play_button: "0",
          progress_bar: "0",
          volume_control: "0",
          fullscreen_button: "0",
          timestamp: "0",
        }
      : {}),
  });

  return `https://www.tiktok.com/player/v1/${id}?${params.toString()}`;
}

function sendPlayerMessage(
  iframe: HTMLIFrameElement | null,
  type: string,
  value: unknown = null
) {
  iframe?.contentWindow?.postMessage(
    { type, value, "x-tiktok-player": true },
    "*"
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .55.04.81.11v-3.56a6.27 6.27 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.2 8.2 0 0 0 4.76 1.52V6.8a4.85 4.85 0 0 1-1-.11z" />
    </svg>
  );
}

const MODAL_VOLUME = 45;

function ModalPlayer({ clip }: { clip: TikTokClip }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [needsUnmute, setNeedsUnmute] = useState(true);

  useEffect(() => {
    setNeedsUnmute(true);

    const applySound = () => {
      const iframe = iframeRef.current;
      sendPlayerMessage(iframe, "unMute");
      sendPlayerMessage(iframe, "setVolume", MODAL_VOLUME);
    };

    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data["x-tiktok-player"] !== true) return;

      if (data.type === "onPlayerReady" || data.type === "onStateChange") {
        applySound();
      }

      if (data.type === "onMute") {
        setNeedsUnmute(Boolean(data.value));
      }

      if (data.type === "onVolumeChange" && typeof data.value === "number") {
        if (data.value > 0) setNeedsUnmute(false);
      }
    };

    window.addEventListener("message", onMessage);

    // Retry while the iframe finishes loading after the click gesture.
    const timers = [300, 800, 1500].map((delay) =>
      window.setTimeout(applySound, delay)
    );

    return () => {
      window.removeEventListener("message", onMessage);
      timers.forEach(clearTimeout);
    };
  }, [clip.id]);

  const enableSound = () => {
    const iframe = iframeRef.current;
    sendPlayerMessage(iframe, "unMute");
    sendPlayerMessage(iframe, "setVolume", MODAL_VOLUME);
    sendPlayerMessage(iframe, "play");
    setNeedsUnmute(false);
  };

  return (
    <div className="relative aspect-[9/16] overflow-hidden bg-dark-gray">
      <iframe
        ref={iframeRef}
        src={playerSrc(clip.id, false)}
        title={clip.title}
        className="h-full w-full border-0"
        allow="fullscreen; autoplay; encrypted-media"
      />

      {needsUnmute && (
        <button
          type="button"
          onClick={enableSound}
          className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-center gap-2 bg-black/80 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:text-warning-yellow"
        >
          <Volume2 className="h-4 w-4" />
          Tap for sound
        </button>
      )}
    </div>
  );
}

export default function TikTokSection() {
  const [activeClip, setActiveClip] = useState<TikTokClip | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();

  useEffect(() => {
    if (!activeClip) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveClip(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeClip]);

  const openClip = (clip: TikTokClip) => {
    setHoveredId(null);
    setActiveClip(clip);
  };

  return (
    <section id="work" className="relative w-full bg-black py-10 lg:py-16 overflow-hidden">
      <StarField />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div
            ref={headerRef}
            className={`text-center mb-6 lg:mb-8 scroll-reveal ${headerInView ? "visible" : ""}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">
              See the Work
            </h2>
            <p className="text-xl text-white/80 font-semibold">
              Mobile welding and on-site repairs across Rochester, NY
            </p>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
          >
            {clips.map((clip, index) => {
              const isPreviewing = hoveredId === clip.id && !activeClip;

              return (
                <button
                  key={clip.id}
                  type="button"
                  onClick={() => openClip(clip)}
                  onMouseEnter={() => setHoveredId(clip.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(clip.id)}
                  onBlur={() => setHoveredId(null)}
                  className={`group relative block aspect-[9/16] w-full overflow-hidden bg-dark-gray text-left normal-case tracking-normal scroll-reveal focus-visible:outline focus-visible:outline-2 focus-visible:outline-warning-yellow focus-visible:outline-offset-2 ${gridInView ? "visible" : ""}`}
                  style={
                    gridInView
                      ? { ["--scroll-delay" as string]: `${index * 0.1}s` }
                      : undefined
                  }
                  aria-label={`Watch ${clip.title}`}
                >
                  <Image
                    src={clip.thumbnail}
                    alt={clip.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className={`object-cover transition-all duration-500 ease-out ${
                      isPreviewing
                        ? "scale-105 opacity-0"
                        : "opacity-100 group-hover:scale-105"
                    }`}
                  />

                  {isPreviewing && (
                    <iframe
                      src={playerSrc(clip.id, true)}
                      title={`${clip.title} preview`}
                      className="absolute inset-0 h-full w-full border-0 pointer-events-none"
                      allow="autoplay; encrypted-media"
                      tabIndex={-1}
                    />
                  )}

                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                      isPreviewing ? "opacity-40" : "opacity-100"
                    }`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-black uppercase tracking-wide text-white">
                      {clip.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className={`mt-10 flex justify-center scroll-reveal ${gridInView ? "visible" : ""}`}
            style={
              gridInView
                ? { ["--scroll-delay" as string]: "0.35s" }
                : undefined
            }
          >
            <a
              href={TIKTOK_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-500 ease-in-out hover:border-warning-yellow hover:text-warning-yellow"
            >
              <TikTokIcon className="h-5 w-5" />
              See more on TikTok
            </a>
          </div>
        </div>
      </div>

      {activeClip && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          role="dialog"
          aria-modal="true"
          aria-label={activeClip.title}
          onClick={() => setActiveClip(null)}
        >
          <div
            className="relative w-full max-w-[min(360px,calc((100svh-8rem)*9/16))]"
            onClick={(event) => event.stopPropagation()}
          >
            <ModalPlayer clip={activeClip} />

            <button
              type="button"
              onClick={() => setActiveClip(null)}
              className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-warning-yellow transition-opacity duration-300 hover:opacity-80"
              aria-label="Close video"
            >
              <X className="h-7 w-7" strokeWidth={2.5} />
            </button>

            <a
              href={activeClip.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/70 transition-colors duration-300 hover:text-warning-yellow"
            >
              <TikTokIcon className="h-4 w-4" />
              Open on TikTok
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
