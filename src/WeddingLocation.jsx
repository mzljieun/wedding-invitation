import { useRef } from 'react';
import venueMap from './assets/venue-map.png';
import venueOverview from './assets/venue-overview.svg';
import VenueNaverMap from './VenueNaverMap.jsx';
import './location.css';

const venueAddress = '서울특별시 서초구 서초중앙로 14';
const parkingAddress = '서울특별시 서초구 서초중앙로2길 10';
const naverMap = 'https://map.naver.com/p/entry/place/12023277?placePath=%2Fhome';
const mapAlt = '더화이트베일 약도: 남부터미널역 4번 출구에서 예식장으로 오는 길과 맞은편 전용 주차타워 위치';

function sharedLink(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : undefined;
  } catch {
    return undefined;
  }
}

const navigation = [
  { name: '네이버지도', mark: 'N', theme: 'naver', href: naverMap },
  { name: '티맵', mark: 'T', theme: 'tmap', href: sharedLink(import.meta.env.VITE_TMAP_DESTINATION_URL) },
  { name: '카카오내비', mark: 'K', theme: 'kakao', href: sharedLink(import.meta.env.VITE_KAKAO_NAVI_DESTINATION_URL) },
];

export default function WeddingLocation() {
  const mapDialog = useRef(null);
  const pressedBackdrop = useRef(false);
  return (
    <section className="wedding-location" aria-labelledby="location-title">
      <p className="wedding-location__label" lang="en">LOCATION</p>
      <h2 id="location-title">오시는 길</h2>
      <div className="wedding-location__venue">
        <h3>더 화이트 베일 4층 W Hall</h3>
        <p>{venueAddress}</p>
        <a className="wedding-location__telephone" href="tel:0234745000">Tel. 02-3474-5000</a>
      </div>
      <VenueNaverMap>
        <a className="wedding-location__overview" href={naverMap} target="_blank" rel="noopener noreferrer"
          aria-label="더화이트베일 위치 지도, 네이버지도에서 열기">
          <img src={venueOverview} alt="" width="540" height="230" loading="lazy" />
          <span>위치 안내도 · 네이버지도에서 열기 ↗</span>
        </a>
      </VenueNaverMap>
      <button className="wedding-location__map" type="button" onClick={() => mapDialog.current.showModal()} aria-haspopup="dialog">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15" /></svg>
        약도 이미지 보기
      </button>
      <div className="wedding-location__directions">
        <div>
          <h3>내비게이션</h3>
          <p>이용하실 지도 또는 내비게이션을 선택해 주세요.</p>
          <div className="wedding-location__links">
            {navigation.map(({ name, mark, theme, href }) => {
              const label = <><span className={`wedding-location__app-mark ${theme}`} aria-hidden="true">{mark}</span>
                <span>{name}{!href && <small>연결 준비 중</small>}</span></>;
              return href
                ? <a key={name} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                : <span key={name} className="wedding-location__unavailable">{label}</span>;
            })}
          </div>
        </div>
        <div>
          <h3>지하철</h3>
          <p><span className="wedding-location__badge wedding-location__badge--metro">3호선</span> 남부터미널역</p>
          <p>4번 출구에서 도보 약 2분</p>
        </div>
        <div>
          <h3>버스</h3>
          <ul className="wedding-location__bus-list">
            <li>
              <span className="wedding-location__badge wedding-location__badge--local">지선</span>
              <p><strong>4319</strong> <span>사당 → 남부터미널 → 잠실</span></p>
            </li>
            <li>
              <span className="wedding-location__badge wedding-location__badge--trunk">간선</span>
              <p><strong>461</strong> <span>장지동 → 남부터미널 → 여의도</span></p>
              <p><strong>641</strong> <span>문래동 → 남부터미널 → 양재동</span></p>
            </li>
            <li>
              <span className="wedding-location__badge wedding-location__badge--express">직행·공항</span>
              <p><strong>5300-1</strong> <span>수원 → 남부터미널 → 강남역</span></p>
              <p><strong>8501</strong> <span>수원대 → 남부터미널 → 양재꽃시장</span></p>
            </li>
          </ul>
        </div>
        <div>
          <h3>승용차</h3>
          <p>경부고속도로 서초 IC에서 서초·사당 방면으로 약 500m</p>
        </div>
        <div>
          <h3>주차 안내</h3>
          <p>예식장 맞은편 전용 주차타워</p>
          <p>{parkingAddress}<br />지번: 서울특별시 서초구 서초동 1426-5</p>
        </div>
      </div>
      <dialog className="wedding-location__dialog" ref={mapDialog} aria-label="더화이트베일 공식 약도"
        onPointerDown={event => { pressedBackdrop.current = event.target === event.currentTarget; }}
        onClick={event => {
          if (pressedBackdrop.current && event.target === event.currentTarget) mapDialog.current.close();
          pressedBackdrop.current = false;
        }}>
        <button className="wedding-location__close" type="button" aria-label="약도 닫기"
          autoFocus onClick={() => mapDialog.current.close()}>
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
        <img src={venueMap} alt={mapAlt} width="1020" height="822" loading="lazy" />
      </dialog>
    </section>
  );
}
