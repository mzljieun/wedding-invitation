import coverPhoto from './assets/cover.jpg';
import './cover.css';

export default function Cover() {
  return (
    <header className="wedding-cover">
      <p className="wedding-cover__label" lang="en">THE WEDDING OF</p>
      <h1>이승훈 <span>&amp;</span> 이지은</h1>
      <figure>
        <img src={coverPhoto} width="1800" height="1200" fetchPriority="high"
          alt="우산을 든 승훈과 지은의 흑백 웨딩 사진" />
        <figcaption lang="en">TOGETHER, ALWAYS</figcaption>
      </figure>
      <p className="wedding-cover__date">
        <time dateTime="2027-03-06T13:00:00+09:00">2027년 3월 6일 토요일 오후 1시</time>
      </p>
      <p className="wedding-cover__venue">더 화이트 베일 4층 W Hall</p>
    </header>
  );
}
