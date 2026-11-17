import { createRoot } from 'react-dom/client';
import ComingSoon from './ComingSoon.jsx';

const root = createRoot(document.getElementById('root'));

if (import.meta.env.DEV && new URLSearchParams(location.search).get('preview') === 'cover') {
  import('./WeddingPreview.jsx').then(({ default: WeddingPreview }) => {
    document.title = '이승훈 · 이지은 청첩장 미리보기';
    root.render(<WeddingPreview />);
  });
} else {
  root.render(<ComingSoon />);
}
