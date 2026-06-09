// html2canvas-pro cannot locate elements with position:fixed that are scrolled
// far off-screen (e.g. left:-9999px) because the element falls outside the
// iframe viewport it creates for cloning. Keeping a permanently-hidden ref in
// the React tree also risks the root element being tagged with data-pdf-hide,
// which the ignoreElements callback would then filter out.
//
// Solution: mount the component into a fresh container at (0,0) with opacity:0
// at the moment the user triggers the export, capture it, then unmount it.
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import OnePageSummaryDocument from '../frontend/components/report/OnePageSummaryDocument';

// Wait for React to commit + browser to paint (two rAF ticks is the safe minimum).
function waitForPaint() {
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

/**
 * Renders OnePageSummaryDocument into a temporary off-screen DOM node,
 * captures it with html2canvas, and downloads the result as a single A4 PDF.
 *
 * @param {Object} options
 * @param {Object} options.data    - all props for OnePageSummaryDocument
 * @param {string} options.fileName - file name for the saved PDF
 */
export async function exportOnePageSummary({ data, fileName }) {
  // ① Mount into a fresh node placed at (0,0) so html2canvas can find it.
  //    opacity:0 keeps it invisible; overflow:visible avoids clipping tall content.
  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '794px',
    opacity: '0',
    pointerEvents: 'none',
    zIndex: '-9999',
    overflow: 'visible',
  });
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(createElement(OnePageSummaryDocument, data));

  // ② Wait for React to commit the tree and the browser to paint it.
  await waitForPaint();

  const inner = container.firstElementChild;
  if (!inner) {
    root.unmount();
    document.body.removeChild(container);
    throw new Error('OnePageSummaryDocument rendered nothing — check component props.');
  }

  // ③ Capture. Pass windowWidth so text layout matches the 794 px design width.
  let canvas;
  try {
    canvas = await html2canvas(inner, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FFFFFF',
      windowWidth: 794,
      windowHeight: inner.scrollHeight,
      scrollX: 0,
      scrollY: 0,
    });
  } finally {
    // ④ Always clean up, even if capture throws.
    root.unmount();
    document.body.removeChild(container);
  }

  // ⑤ Write to A4 PDF, scaling to fit if the content is taller than one page.
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  const pdfW = pdf.internal.pageSize.getWidth();   // 210 mm
  const pdfH = pdf.internal.pageSize.getHeight();  // 297 mm
  const imgH = pdfW * (canvas.height / canvas.width);

  pdf.addImage(
    canvas.toDataURL('image/png'),
    'PNG',
    0, 0,
    pdfW,
    imgH <= pdfH ? imgH : pdfH,
    undefined,
    'FAST',
  );

  pdf.save(fileName);
}
