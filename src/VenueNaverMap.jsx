import { useEffect, useRef, useState } from 'react';

const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID?.trim();
const latitude = Number(import.meta.env.VITE_VENUE_LATITUDE);
const longitude = Number(import.meta.env.VITE_VENUE_LONGITUDE);
const configured = Boolean(clientId && latitude >= 33 && latitude <= 39 && longitude >= 124 && longitude <= 132);
let sdk;

function loadMaps() {
  if (window.naver?.maps?.Map) return Promise.resolve(window.naver.maps);
  sdk ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(clientId)}`;
    script.async = true;
    script.onload = () => {
      if (window.naver?.maps?.Map) resolve(window.naver.maps);
      else reject(new Error('Naver Maps SDK unavailable'));
    };
    script.onerror = reject;
    document.head.append(script);
  });
  return sdk;
}

export default function VenueNaverMap({ children }) {
  const container = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!configured) return;
    let active = true;
    let map;
    let marker;
    let listener;
    loadMaps().then(maps => {
      if (!active) return;
      const center = new maps.LatLng(latitude, longitude);
      map = new maps.Map(container.current, { center, zoom: 16, scrollWheel: false });
      marker = new maps.Marker({ position: center, map, title: '더 화이트 베일' });
      listener = maps.Event.once(map, 'tilesloaded', () => { if (active) setReady(true); });
    }).catch(() => { /* Keep the static overview available. */ });
    return () => {
      active = false;
      if (listener) window.naver.maps.Event.removeListener(listener);
      marker?.setMap(null);
      map?.destroy();
    };
  }, []);

  if (!configured) return children;
  return (
    <div className="wedding-location__map-stage">
      <div className={`wedding-location__live-map${ready ? ' is-ready' : ''}`} ref={container}
        role="region" aria-label="더화이트베일 네이버지도" aria-hidden={!ready} inert={!ready} />
      {!ready && children}
    </div>
  );
}
