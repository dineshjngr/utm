import QRCode from 'qrcode';

/**
 * QR Code Generator Service
 */
export async function renderQRCode(canvasElement, text, options = {}) {
  if (!canvasElement || !text) return;

  const defaultOptions = {
    width: options.width || 320,
    margin: options.margin !== undefined ? options.margin : 2,
    color: {
      dark: options.darkColor || '#0f172a',
      light: options.lightColor || '#ffffff'
    },
    errorCorrectionLevel: 'M'
  };

  try {
    await QRCode.toCanvas(canvasElement, text, defaultOptions);
    return true;
  } catch (err) {
    console.error('Failed to generate QR code:', err);
    throw err;
  }
}

export async function downloadQRCode(canvasElement, filename = 'utm-qr-code.png') {
  if (!canvasElement) return;
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvasElement.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function copyQRCodeImage(canvasElement) {
  if (!canvasElement) throw new Error('No QR canvas found');

  return new Promise((resolve, reject) => {
    canvasElement.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error('Canvas blob generation failed'));
        return;
      }
      try {
        if (navigator.clipboard && navigator.clipboard.write) {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          resolve(true);
        } else {
          reject(new Error('Clipboard image write not supported in this browser'));
        }
      } catch (err) {
        reject(err);
      }
    }, 'image/png');
  });
}
