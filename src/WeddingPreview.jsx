import Cover from './Cover.jsx';
import Invitation from './Invitation.jsx';
import WeddingSchedule from './WeddingSchedule.jsx';
import WeddingGallery from './WeddingGallery.jsx';
import WeddingLocation from './WeddingLocation.jsx';
import WeddingGifts from './WeddingGifts.jsx';
import './wedding-theme.css';

export default function WeddingPreview() {
  return (
    <main className="wedding-preview">
      <Cover />
      <Invitation />
      <WeddingSchedule />
      <WeddingGallery />
      <WeddingLocation />
      <WeddingGifts />
    </main>
  );
}
