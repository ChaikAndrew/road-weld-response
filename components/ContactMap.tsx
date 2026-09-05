"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MapLibreMap, Marker, StyleSpecification } from "maplibre-gl";
import { Cog } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  GOOGLE_MAPS_PLACE_URL,
  LABIDA_ADDRESS,
  LABIDA_LAT,
  LABIDA_LNG,
  LABIDA_NAME,
  MAP_DARK_STYLE_FALLBACK,
  OPENFREEMAP_DARK_STYLE,
} from "@/lib/location";
import styles from "./ContactMap.module.css";

/** Desktop: Rochester → Ontario corridor */
const DESKTOP_ZOOM = 10.5;
/** Mobile: zoomed out so Rochester + Labida both fit */
const MOBILE_ZOOM = 9;
/** Slightly west of Labida so Rochester sits on the left, Ontario on the right */
const DESKTOP_CENTER: [number, number] = [-77.49, 43.2];
/** Mobile: pull west so Rochester city is in frame */
const MOBILE_CENTER: [number, number] = [-77.52, 43.2];
const MARKER_LNG_LAT: [number, number] = [LABIDA_LNG, LABIDA_LAT];
const MOBILE_MQ = "(max-width: 767px)";
/** Give OpenFreeMap a short window before falling back to Carto */
const STYLE_FETCH_TIMEOUT_MS = 4000;

function getInitialView(): { center: [number, number]; zoom: number } {
  const isMobile =
    typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches;
  return isMobile
    ? { center: MOBILE_CENTER, zoom: MOBILE_ZOOM }
    : { center: DESKTOP_CENTER, zoom: DESKTOP_ZOOM };
}

/** Brighter place/road labels on dark basemaps; Rochester highlighted in brand yellow */
function emphasizeMapLabels(map: MapLibreMap) {
  const layers = map.getStyle()?.layers;
  if (!layers) return;

  // MapLibre expression: yellow only when the feature name is Rochester
  const labelColor = [
    "case",
    [
      "any",
      [
        "==",
        ["downcase", ["coalesce", ["to-string", ["get", "name"]], ""]],
        "rochester",
      ],
      [
        "==",
        ["downcase", ["coalesce", ["to-string", ["get", "name:en"]], ""]],
        "rochester",
      ],
    ],
    "#FFC107",
    "#F5F5F5",
  ];

  for (const layer of layers) {
    if (layer.type !== "symbol") continue;

    const layout = layer.layout as Record<string, unknown> | undefined;
    if (!layout?.["text-field"]) continue;

    try {
      map.setPaintProperty(layer.id, "text-color", labelColor);
      map.setPaintProperty(layer.id, "text-halo-width", 0);
      map.setPaintProperty(layer.id, "text-opacity", 1);
    } catch {
      // Layer may not support all paint props — skip quietly
    }
  }
}

/**
 * Prefer OpenFreeMap Dark; if the style JSON cannot be fetched in time,
 * fall back to Carto so the map never stays blank.
 */
async function resolveMapStyle(): Promise<string | StyleSpecification> {
  const controller = new AbortController();
  const timer = window.setTimeout(
    () => controller.abort(),
    STYLE_FETCH_TIMEOUT_MS
  );

  try {
    const response = await fetch(OPENFREEMAP_DARK_STYLE, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`style HTTP ${response.status}`);
    return (await response.json()) as StyleSpecification;
  } catch {
    return MAP_DARK_STYLE_FALLBACK;
  } finally {
    window.clearTimeout(timer);
  }
}

function createMarkerElement(): HTMLDivElement {
  // Use a div, not a <button>: global `button { transition: all }` fights
  // MapLibre's transform and leaves the pin stuck at the map origin.
  const el = document.createElement("div");
  el.className = styles.marker;
  el.setAttribute("aria-label", `${LABIDA_NAME} location marker`);

  const pulse = document.createElement("span");
  pulse.className = styles.markerPulse;
  pulse.setAttribute("aria-hidden", "true");

  const pin = document.createElement("span");
  pin.className = styles.markerPin;
  pin.setAttribute("aria-hidden", "true");
  pin.innerHTML = `
    <svg class="${styles.markerSvg}" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z"
        fill="#FFC107"
      />
      <circle cx="14" cy="14" r="5.5" fill="#0A0A0A" />
    </svg>
  `;

  el.append(pulse, pin);
  return el;
}

function createPopupContent(): HTMLDivElement {
  const content = document.createElement("div");

  const title = document.createElement("p");
  title.className = styles.popupTitle;
  title.textContent = LABIDA_NAME;

  const address = document.createElement("p");
  address.className = styles.popupAddress;
  address.textContent = LABIDA_ADDRESS;

  const link = document.createElement("a");
  link.className = styles.popupButton;
  link.href = GOOGLE_MAPS_PLACE_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Open in Google Maps";

  content.append(title, address, link);
  return content;
}

/**
 * Interactive MapLibre location map for Labida LLC.
 * Prefers OpenFreeMap Dark, falls back to Carto if unavailable.
 * MapLibre JS/CSS load only when the map approaches the viewport.
 */
export default function ContactMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const container = mapContainerRef.current;
    if (!root || !container) return;

    let cancelled = false;
    let marker: Marker | null = null;
    let map: MapLibreMap | null = null;
    let usedFallback = false;

    const initMap = async () => {
      if (cancelled || mapInstanceRef.current || !mapContainerRef.current) return;

      // Heavy MapLibre runtime loads only when the map is about to appear.
      const [{ default: maplibregl }, style] = await Promise.all([
        import("maplibre-gl"),
        resolveMapStyle(),
      ]);

      if (cancelled || mapInstanceRef.current || !mapContainerRef.current) return;

      usedFallback = typeof style === "string";

      const { center, zoom } = getInitialView();

      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: style as string | StyleSpecification,
        center,
        zoom,
        minZoom: 3,
        maxZoom: 18,
        attributionControl: { compact: true },
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false,
        scrollZoom: true,
        fadeDuration: 300,
        maxPitch: 0,
        trackResize: true,
        cooperativeGestures: false,
      });

      // OpenFreeMap Dark may reference missing sprites (e.g. wood-pattern).
      map.on("styleimagemissing", (e) => {
        if (!map || map.hasImage(e.id)) return;
        map.addImage(e.id, {
          width: 1,
          height: 1,
          data: new Uint8Array([0, 0, 0, 0]),
        });
      });

      // Safety net: if style fails before it becomes usable, switch once to Carto.
      map.on("error", () => {
        if (!map || cancelled || usedFallback || map.isStyleLoaded()) return;
        usedFallback = true;
        map.setStyle(MAP_DARK_STYLE_FALLBACK);
      });

      map.addControl(
        new maplibregl.NavigationControl({
          showCompass: false,
          visualizePitch: false,
        }),
        "top-right"
      );

      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();

      const syncMarkerPosition = () => {
        marker?.setLngLat(MARKER_LNG_LAT);
      };

      const handleLoad = () => {
        if (!map || cancelled) return;
        map.resize();
        const view = getInitialView();
        map.jumpTo({ center: view.center, zoom: view.zoom });
        emphasizeMapLabels(map);

        if (!marker) {
          marker = new maplibregl.Marker({
            element: createMarkerElement(),
            anchor: "bottom",
            pitchAlignment: "viewport",
            rotationAlignment: "viewport",
          })
            .setLngLat(MARKER_LNG_LAT)
            .setPopup(
              new maplibregl.Popup({
                offset: 28,
                closeButton: true,
                maxWidth: "280px",
                className: styles.popup,
                focusAfterOpen: false,
              }).setDOMContent(createPopupContent())
            )
            .addTo(map);
        } else {
          syncMarkerPosition();
        }

        setIsMapReady(true);

        // project() is reliable after the first idle; also catches a 0-size first paint.
        map.once("idle", () => {
          if (!map || cancelled) return;
          map.resize();
          syncMarkerPosition();
        });
      };

      map.on("load", handleLoad);
      map.on("resize", syncMarkerPosition);
      // Re-apply after style swap (e.g. Carto fallback)
      map.on("style.load", () => {
        if (!map || cancelled) return;
        emphasizeMapLabels(map);
      });
      mapInstanceRef.current = map;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void initMap();
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 }
    );

    observer.observe(root);

    return () => {
      cancelled = true;
      observer.disconnect();
      marker?.remove();
      map?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.frame}>
        <div
          className={`${styles.loader} ${isMapReady ? styles.loaderHidden : ""}`}
          aria-hidden={isMapReady}
          aria-busy={!isMapReady}
        >
          <Cog
            className={styles.loaderCog}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className={styles.loaderLabel}>Loading map…</span>
        </div>
        <div
          ref={mapContainerRef}
          className={`${styles.map} ${isMapReady ? styles.mapReady : ""}`}
          role="region"
          aria-label={`${LABIDA_NAME} location map`}
        />
      </div>

      <div className={styles.meta}>
        <div>
          <a
            href={GOOGLE_MAPS_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.addressLink}
          >
            {LABIDA_ADDRESS}
          </a>
          <p className={styles.note}>Mobile service, by appointment only</p>
        </div>
        <a
          href={GOOGLE_MAPS_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapsButton}
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
