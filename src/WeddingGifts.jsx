import { useEffect, useState } from 'react';
import './gifts.css';

// Real accounts should only be added with the account holder's consent.
const sides = [
  { label: '신랑측', accounts: [] },
  { label: '신부측', accounts: [
    { holder: '신부 이지은', bank: '국민은행', number: '123456-01-123456', example: true },
  ] },
];

export default function WeddingGifts() {
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(null), feedback.failed ? 3000 : 1000);
    return () => clearTimeout(timeout);
  }, [feedback]);

  async function copyAccount(id, accountNumber) {
    try {
      await navigator.clipboard.writeText(accountNumber.replace(/[\s-]/g, ''));
      setFeedback({ id, message: '복사했어요' });
    } catch {
      setFeedback({ id, message: '직접 복사해 주세요', failed: true });
    }
  }

  return (
    <section className="wedding-gifts" aria-labelledby="gifts-title">
      <p className="wedding-gifts__label" lang="en">WITH GRATITUDE</p>
      <h2 id="gifts-title">마음 전하실 곳</h2>
      <p className="wedding-gifts__message">
        저희의 시작을 축복해 주시는<br />
        모든 분께 진심으로 감사드립니다.
      </p>
      <div className="wedding-gifts__groups">
        {sides.map(({ label, accounts }) => (
          <details key={label}>
            <summary>{label} 마음 전하기 <span aria-hidden="true" /></summary>
            {accounts.length === 0 ? (
              <p className="wedding-gifts__pending">계좌 정보는 준비 중입니다.</p>
            ) : (
              <ul className="wedding-gifts__accounts">
                {accounts.map(({ holder, bank, number, example }, index) => {
                  const id = `${label}-${index}`;
                  return (
                    <li key={id}>
                      <div>
                        <strong>{holder}</strong>
                        {example && <span className="wedding-gifts__example">예시 · 송금하지 마세요</span>}
                        <p>{bank} <span>{number}</span></p>
                      </div>
                      <div className="wedding-gifts__copy">
                        <button type="button" aria-label={`${holder} 계좌번호 복사`}
                          onClick={() => copyAccount(id, number)}>
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="8" y="8" width="12" height="12" rx="2" />
                            <path d="M5 16a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2" />
                          </svg>
                        </button>
                        <span role="status" className="wedding-gifts__status">
                          {feedback?.id === id ? feedback.message : ''}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </details>
        ))}
      </div>
    </section>
  );
}
