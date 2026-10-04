import { ImageResponse } from 'next/og';
import { profile } from '@/data';
import { siteUrl } from '@/lib/site';

export const alt = 'Midhunan Vijendra Prabhaharan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          background: '#fbf9e4',
          color: '#122c4f',
          padding: 80,
          borderLeft: '16px solid #5b88b2',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#4a5d78' }}>{new URL(siteUrl).host}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 136, lineHeight: 1 }}>{profile.name.first}</div>
          <div style={{ display: 'flex', fontSize: 48, color: '#4a5d78', marginTop: 12 }}>{profile.name.rest}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 34 }}>computer science student. i build things people use.</div>
      </div>
    ),
    size,
  );
}
