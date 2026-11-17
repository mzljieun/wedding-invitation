import { useEffect, useState } from 'react';
import calendarFile from './assets/wedding.ics?url';
import './schedule.css';

const year = 2027;
const month = 2;
const weddingDay = 6;
const weddingStart = '2027-03-06T13:00:00+09:00';
const weddingTimestamp = Date.parse(weddingStart);
const clockUnits = [['일', 86_400], ['시', 3_600], ['분', 60], ['초', 1]];
const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
const weekCount = Math.ceil((firstWeekday + lastDay) / 7);
const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const seoulDate = new Intl.DateTimeFormat('en', {
  timeZone: 'Asia/Seoul', year: 'numeric', month: 'numeric', day: 'numeric',
});

function weddingCountdown(now) {
  const parts = Object.fromEntries(seoulDate.formatToParts(now).map(({ type, value }) => [type, value]));
  const today = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  const days = (Date.UTC(year, month, weddingDay) - today) / 86_400_000;
  return days === 0 ? 'D-day · 오늘 결혼합니다' : days > 0 ? `D-${days} · 결혼식까지 ${days}일 남았어요` : '함께해 주셔서 감사합니다';
}

export default function WeddingSchedule() {
  const [now, setNow] = useState(Date.now);
  const remaining = Math.max(0, Math.ceil((weddingTimestamp - now) / 1000));
  const clockValues = clockUnits.map(([label, seconds], index) => {
    const value = Math.floor(remaining / seconds);
    const radix = index === 1 ? 24 : 60;
    return [label, String(index === 0 ? value : value % radix).padStart(2, '0')];
  });

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="wedding-schedule" aria-labelledby="schedule-title">
      <p className="wedding-schedule__label" lang="en">SAVE THE DATE</p>
      <h2 id="schedule-title">예식 일정</h2>
      <p><time dateTime={weddingStart}>2027년 3월 6일 토요일 오후 1시</time></p>
      <table>
        <caption>2027년 3월</caption>
        <thead><tr>{weekdays.map(day => <th key={day} scope="col">{day}</th>)}</tr></thead>
        <tbody>
          {Array.from({ length: weekCount }, (_, week) => (
            <tr key={week}>
              {weekdays.map((weekday, column) => {
                const day = week * 7 + column - firstWeekday + 1;
                return (
                  <td key={weekday}>
                    {day === weddingDay ? <span className="wedding-schedule__marked" aria-label="6일, 예식일">6</span>
                      : day >= 1 && day <= lastDay ? day : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="wedding-schedule__clock" role="timer"
        aria-label={`예식 시작까지 ${clockValues.map(([label, value]) => `${Number(value)}${label}`).join(' ')}`}>
        {clockValues.map(([label, value]) => (
          <div className="wedding-schedule__unit" key={label} aria-hidden="true">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <p className="wedding-schedule__countdown">{weddingCountdown(now)}</p>
      <a className="wedding-schedule__save" href={calendarFile} download="wedding.ics">캘린더에 일정 저장</a>
    </section>
  );
}
