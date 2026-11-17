import { useRef } from 'react';

export const families = [
  { side: '신랑측', relation: '아들', couple: { role: '신랑', name: '이승훈', phone: '' }, parents: [
    { role: '아버지', name: '', phone: '' }, { role: '어머니', name: '', phone: '' },
  ] },
  { side: '신부측', relation: '딸', couple: { role: '신부', name: '이지은', phone: '' }, parents: [
    { role: '아버지', name: '', phone: '' }, { role: '어머니', name: '', phone: '' },
  ] },
];

function Icon({ type }) {
  const paths = {
    phone: 'M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a13 13 0 0 1-7-7l2-2-2-5Z',
    sms: 'M3 5h18v14H3z M3 6l9 7 9-7',
  };

  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={paths[type]} />
  </svg>;
}

export default function WeddingContacts() {
  const dialog = useRef(null);
  const pressedBackdrop = useRef(false);

  return (
    <>
      <button className="wedding-invitation__contact" type="button" aria-haspopup="dialog"
        onClick={() => dialog.current.showModal()}><Icon type="phone" /> 연락하기</button>
      <dialog className="wedding-contacts" ref={dialog} aria-labelledby="wedding-contacts-title"
        onPointerDown={event => { pressedBackdrop.current = event.target === event.currentTarget; }}
        onClick={event => {
          if (pressedBackdrop.current && event.target === event.currentTarget) {
            const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
            if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) dialog.current.close();
          }
          pressedBackdrop.current = false;
        }}>
        <header>
          <h3 id="wedding-contacts-title">연락하기</h3>
          <button type="button" aria-label="연락처 닫기" autoFocus onClick={() => dialog.current.close()}>×</button>
        </header>
        {families.map(({ side, couple, parents }) => (
          <section key={side} className="wedding-contacts__group">
            <h4>{side}</h4>
            <ul>
              {[couple, ...parents].map(({ role, name, phone }) => (
                <li key={role}>
                  <span className="wedding-contacts__role">{role}</span>
                  <strong>{name || '이름 미등록'}</strong>
                  <div className="wedding-contacts__actions">
                    {[['tel', '전화', 'phone'], ['sms', '문자', 'sms']].map(([scheme, label, icon]) =>
                      phone ? <a key={scheme} href={`${scheme}:${phone}`} aria-label={`${name || role}에게 ${label}하기`}><Icon type={icon} /></a>
                        : <button key={scheme} type="button" disabled aria-label={`${role} ${label} 번호 미등록`}><Icon type={icon} /></button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="wedding-contacts__note">등록된 번호로 전화하거나 문자를 보낼 수 있어요.</p>
      </dialog>
    </>
  );
}
