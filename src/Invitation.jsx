import WeddingContacts, { families } from './WeddingContacts.jsx';
import './invitation.css';

export default function Invitation() {
  return (
    <section className="wedding-invitation" aria-labelledby="invitation-title">
      <p className="wedding-invitation__label" lang="en">INVITATION</p>
      <h2 id="invitation-title" tabIndex={-1}>소중한 분들을 초대합니다</h2>
      <div className="wedding-invitation__message">
        <p>서로의 평범한 하루를 아껴 주며<br />저희 두 사람이 결혼합니다.</p>
        <p>함께 걸어갈 첫날에 오셔서<br />따뜻한 축복을 나누어 주시면 감사하겠습니다.</p>
      </div>
      <div className="wedding-invitation__signature">
        {families.map(({ side, relation, couple, parents }) => (
          <p key={side}>
            {parents.map(({ role, name }) => name || role).join(' · ')}
            <span>의 {relation}</span> <strong>{couple.name}</strong>
          </p>
        ))}
      </div>
      <WeddingContacts />
    </section>
  );
}
