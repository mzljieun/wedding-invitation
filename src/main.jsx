import { createRoot } from 'react-dom/client';
import ComingSoon from './ComingSoon.jsx';

const root = createRoot(document.getElementById('root'));

const isPreview =
  new URLSearchParams(window.location.search).get('preview') === 'cover';

if (isPreview) {
  import('./WeddingPreview.jsx').then(({ default: WeddingPreview }) => {
    document.title = '이승훈 · 이지은 청첩장 미리보기';
    root.render(<WeddingPreview />);
  });
} else {
  root.render(<ComingSoon />);
}