// QR codes rendered to SVG at build time (no JavaScript ships to the browser).
import QRCode from 'qrcode';

export async function qrSvg(url: string, color = '#ececea') {
  const svg: string = await QRCode.toString(url, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    color: { dark: color, light: '#00000000' },
  });
  return svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');
}
