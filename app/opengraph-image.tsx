import { ImageResponse } from 'next/og';

export const alt = 'POH Media — Films by Seyvik Magon';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function ShareImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '58px 64px', color: '#f1ebdf', background: 'linear-gradient(140deg, #152539 0%, #39363e 56%, #945c49 100%)', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, letterSpacing: 2 }}>
          <span>FILMS BY SEYVIK MAGON</span><span>seyvikmagon.com</span>
        </div>
        <div style={{ display: 'flex', fontSize: 150, letterSpacing: -9, lineHeight: 1 }}>POH Media</div>
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(241,235,223,.4)', paddingTop: 26, gap: 12 }}>
          <span style={{ fontSize: 35 }}>Stories worth feeling.</span>
          <span style={{ fontSize: 19, color: '#d6c6b9' }}>Founder stories. Startup films. Human moments.</span>
        </div>
      </div>
    ),
    size,
  );
}
