import { useEffect, useState } from 'react';
import coverPhoto from './assets/cover-retro.jpg';
import './cover.css';

export default function Cover() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    function hideAfterScroll() {
      if (window.scrollY <= 12) return;
      setShowHint(false);
      window.removeEventListener('scroll', hideAfterScroll);
    }

    window.addEventListener('scroll', hideAfterScroll, { passive: true });
    hideAfterScroll();
    return () => window.removeEventListener('scroll', hideAfterScroll);
  }, []);

  return (
    <header className="wedding-cover">
      <div className="wedding-cover__poster">
        <img src={coverPhoto} width="1200" height="1800" fetchPriority="high"
          alt="금색 0306 풍선과 함께 웃고 있는 승훈과 지은" />
        <div className="wedding-cover__masthead">
          <p className="wedding-cover__label">저희 결혼해요!</p>
          <h1>이승훈 <span>&amp;</span> 이지은</h1>
        </div>
        {showHint && (
          <a className="wedding-cover__scroll" href="#invitation-title"
            aria-label="아래로 내려 초대 문구 보기">
            <span>아래로 보기</span>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
        )}
      </div>
      <div className="wedding-cover__details">
        <p className="wedding-cover__date">
          <time dateTime="2027-03-06T13:00:00+09:00">2027년 3월 6일 토요일 오후 1시</time>
        </p>
        <p className="wedding-cover__venue">더 화이트 베일 4층 W Hall</p>
      </div>
    </header>
  );
}
