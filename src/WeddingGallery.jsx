import { useRef, useState } from 'react';
import cover from './assets/cover.jpg';
import coverSmall from './assets/cover-small.jpg';
import first from './assets/gallery-01.jpg';
import firstSmall from './assets/gallery-01-small.jpg';
import second from './assets/gallery-02.jpg';
import secondSmall from './assets/gallery-02-small.jpg';
import './gallery.css';

const photos = [
  { full: cover, thumbnail: coverSmall, alt: '우산을 든 승훈과 지은의 흑백 웨딩 사진', landscape: true },
  { full: first, thumbnail: firstSmall, alt: '승훈과 지은의 두 번째 웨딩 사진' },
  { full: second, thumbnail: secondSmall, alt: '승훈과 지은의 세 번째 웨딩 사진' },
];

export default function WeddingGallery() {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const track = useRef(null);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const pressedBackground = useRef(false);
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(0);

  function movePhoto(offset) {
    setSelected(index => (index + offset + photos.length) % photos.length);
  }

  function openPhoto(index, button) {
    trigger.current = button;
    setSelected(index);
    dialog.current.showModal();
  }

  function closePhoto() {
    setSelected(null);
    trigger.current?.focus();
  }

  function slideStep() {
    const [firstCard, nextCard] = track.current.children;
    return nextCard.offsetLeft - firstCard.offsetLeft;
  }

  function goToSlide(index) {
    const target = Math.max(0, Math.min(photos.length - 1, index));
    track.current.scrollTo({ left: target * slideStep() });
  }

  function startDrag(event) {
    suppressClick.current = false;
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag.current = { x: event.clientX, left: track.current.scrollLeft, index: active, moved: false };
    event.target.setPointerCapture(event.pointerId);
  }

  function moveDrag(event) {
    const gesture = drag.current;
    if (!gesture) return;
    const delta = event.clientX - gesture.x;
    if (!gesture.moved && Math.abs(delta) < 8) return;
    if (!gesture.moved) {
      gesture.moved = true;
      suppressClick.current = true;
      event.currentTarget.classList.add('is-dragging');
    }
    track.current.scrollLeft = gesture.left - delta;
  }

  function finishDrag(event) {
    const gesture = drag.current;
    drag.current = null;
    if (!gesture) return;
    const delta = event.clientX - gesture.x;
    if (!gesture.moved && Math.abs(delta) < 32) return;
    suppressClick.current = true;
    event.currentTarget.classList.remove('is-dragging');
    const offset = Math.abs(delta) >= 32 && event.type === 'pointerup' ? -Math.sign(delta) : 0;
    goToSlide(gesture.index + offset);
  }

  return (
    <section className="wedding-gallery" aria-labelledby="gallery-title">
      <p className="wedding-gallery__label" lang="en">GALLERY</p>
      <h2 id="gallery-title">함께한 순간들</h2>
      <div className="wedding-gallery__slider">
        <ul className="wedding-gallery__track" ref={track}
          onScroll={() => setActive(Math.round(track.current.scrollLeft / slideStep()))}
          onPointerDown={startDrag} onPointerMove={moveDrag}
          onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={finishDrag}
          onClickCapture={event => {
            if (!suppressClick.current || event.detail === 0) return;
            suppressClick.current = false;
            event.stopPropagation();
          }}>
          {photos.map(({ thumbnail, alt, landscape }, index) => (
            <li key={thumbnail}>
              <button type="button" onClick={event => openPhoto(index, event.currentTarget)}
                aria-label={`${alt} 크게 보기`}>
                <img className={landscape ? 'wedding-gallery__landscape' : undefined}
                  src={thumbnail} alt="" loading="lazy" draggable={false} />
              </button>
            </li>
          ))}
        </ul>
        <button className="wedding-gallery__arrow wedding-gallery__arrow--previous" type="button"
          onClick={() => goToSlide(active - 1)} disabled={active === 0} aria-label="갤러리 왼쪽으로">‹</button>
        <button className="wedding-gallery__arrow wedding-gallery__arrow--next" type="button"
          onClick={() => goToSlide(active + 1)} disabled={active === photos.length - 1} aria-label="갤러리 오른쪽으로">›</button>
      </div>
      <p className="wedding-gallery__counter"><strong>{active + 1}</strong> / {photos.length}</p>
      <p>옆으로 넘기고, 사진을 누르면 전체 구도를 볼 수 있어요.</p>
      <dialog className="wedding-gallery__dialog" ref={dialog} aria-label="웨딩 사진 크게 보기"
        onPointerDown={event => { pressedBackground.current = event.target === event.currentTarget; }}
        onClick={event => {
          if (pressedBackground.current && event.target === event.currentTarget) dialog.current.close();
          pressedBackground.current = false;
        }}
        onClose={closePhoto} onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}>
        <button className="wedding-gallery__close" type="button" aria-label="확대 사진 닫기"
          autoFocus onClick={() => dialog.current.close()}>
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
        <div className="wedding-gallery__dialog-photo">
          {selected !== null && <img src={photos[selected].full} alt={photos[selected].alt} />}
        </div>
        <button className="wedding-gallery__arrow wedding-gallery__arrow--previous" type="button"
          onClick={() => movePhoto(-1)} aria-label="이전 사진">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m14 6-6 6 6 6" /></svg>
        </button>
        <button className="wedding-gallery__arrow wedding-gallery__arrow--next" type="button"
          onClick={() => movePhoto(1)} aria-label="다음 사진">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m10 6 6 6-6 6" /></svg>
        </button>
        <div className="wedding-gallery__position" aria-live="polite">
          {selected === null ? '' : `${selected + 1} / ${photos.length}`}
        </div>
      </dialog>
    </section>
  );
}
