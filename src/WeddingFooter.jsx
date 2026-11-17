import { useEffect, useRef, useState } from 'react';
import './footer.css';

const url = 'https://mzljieun.github.io/wedding-invitation/';
const title = '이승훈 · 이지은 결혼합니다';
const shareText = `${title}\n${url}`;
const icons = {
  share: 'M12 15V3m-4 4 4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7',
  sms: 'M4 5h16v12H9l-5 4V5Z',
  copy: 'M10 13a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-2 2m3 5a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l2-2',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
};

function Icon({ name }) {
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={name === 'more' ? 3 : 1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={icons[name]} />
  </svg>;
}

export default function WeddingFooter() {
  const dialog = useRef(null);
  const urlField = useRef(null);
  const [status, setStatus] = useState('');
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!showFallback || !dialog.current.open) return;
    urlField.current.focus();
    urlField.current.select();
  }, [showFallback, status]);

  function showDialog() {
    setStatus('');
    setShowFallback(false);
    dialog.current.showModal();
  }

  function showCopyFallback(message) {
    setStatus(message);
    setShowFallback(true);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setShowFallback(false);
      setStatus('청첩장 링크를 복사했어요.');
    } catch {
      showCopyFallback('선택된 주소를 직접 복사해 주세요.');
    }
  }

  async function share() {
    if (!navigator.share) {
      showCopyFallback('이 브라우저에서는 기기 공유 대신 링크를 복사해 주세요.');
      return;
    }
    try {
      await navigator.share({ title, url });
    } catch (error) {
      if (error.name !== 'AbortError') showCopyFallback('공유창을 열지 못했어요. 링크를 복사해 주세요.');
    }
  }

  return (
    <footer id="share-footer" className="wedding-footer" aria-label="청첩장 마무리">
      <span className="wedding-footer__mark" aria-hidden="true">&amp;</span>
      <p className="wedding-footer__thanks">저희의 시작을 함께해 주셔서 감사합니다.</p>
      <p className="wedding-footer__signature">승훈 · 지은 드림</p>
      <button className="wedding-footer__share" type="button" aria-haspopup="dialog" onClick={showDialog}>
        <span className="wedding-footer__icon"><Icon name="share" /></span>
        <span>공유하기</span>
      </button>
      <dialog className={`wedding-footer__dialog${showFallback ? ' has-fallback' : ''}`} ref={dialog} aria-labelledby="share-title">
        <header>
          <h2 id="share-title">공유하기</h2>
          <button type="button" onClick={() => dialog.current.close()} aria-label="공유창 닫기" autoFocus>×</button>
        </header>
        <div className="wedding-footer__actions">
          <a href={`sms:?body=${encodeURIComponent(shareText)}`}>
            <span className="wedding-footer__icon wedding-footer__icon--sms"><Icon name="sms" /></span>문자
          </a>
          <button type="button" onClick={copy} aria-label="링크 복사">
            <span className="wedding-footer__icon"><Icon name="copy" /></span>
            {!showFallback && status ? '복사했어요' : '링크 복사'}
          </button>
          <button type="button" onClick={share}>
            <span className="wedding-footer__icon"><Icon name="more" /></span>더보기
          </button>
        </div>
        {showFallback && (
          <label className="wedding-footer__url">
            <span>공유할 주소</span>
            <input ref={urlField} value={url} readOnly />
          </label>
        )}
        <p role="status" className="wedding-footer__status">{status}</p>
      </dialog>
    </footer>
  );
}
