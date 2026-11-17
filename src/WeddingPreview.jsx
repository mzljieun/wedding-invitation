import Cover from './Cover.jsx';
import Invitation from './Invitation.jsx';
import WeddingSchedule from './WeddingSchedule.jsx';
import WeddingGallery from './WeddingGallery.jsx';

export default function WeddingPreview() {
  return (
    <main>
      <Cover />
      <Invitation />
      <WeddingSchedule />
      <WeddingGallery />
    </main>
  );
}
