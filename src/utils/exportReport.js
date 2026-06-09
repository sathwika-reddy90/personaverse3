// Tailwind v4 emits modern CSS color functions (oklch/oklab/color-mix) that the
// original html2canvas can't parse — html2canvas-pro is a maintained fork that
// understands them, so colors render correctly in the captured PDF.
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

const PAGE_WIDTH_MM = 210; // A4 portrait
const PAGE_HEIGHT_MM = 297;
const MARGIN_MM = 10;
const GAP_MM = 5;
const CONTENT_WIDTH_MM = PAGE_WIDTH_MM - MARGIN_MM * 2;
const CONTENT_HEIGHT_MM = PAGE_HEIGHT_MM - MARGIN_MM * 2;

const RENDER_SCALE = 2;

async function renderSectionCanvas(el, backgroundColor) {
  return html2canvas(el, {
    scale: RENDER_SCALE,
    backgroundColor,
    useCORS: true,
    windowWidth: el.scrollWidth,
    windowHeight: el.scrollHeight,
    // Skip interactive controls (buttons, toasts) that shouldn't appear in a static report.
    ignoreElements: (node) => node?.hasAttribute?.('data-pdf-hide'),
  });
}

// Crops a horizontal strip out of a source canvas and returns it as its own canvas —
// used to split a section that's taller than one PDF page across several pages
// without ever cutting through a row of pixels twice.
function cropCanvas(source, sy, sHeight) {
  const slice = document.createElement('canvas');
  slice.width = source.width;
  slice.height = sHeight;
  slice.getContext('2d').drawImage(source, 0, sy, source.width, sHeight, 0, 0, source.width, sHeight);
  return slice;
}

/**
 * Renders a list of DOM sections into a single multi-page PDF, keeping each
 * section's own styling/colors (captured as an image) and breaking pages
 * between sections — or, for sections taller than a page, mid-section at
 * clean pixel-row boundaries — instead of mid-line.
 *
 * @param {Object} options
 * @param {HTMLElement[]} options.sections - DOM nodes to capture, in order
 * @param {string} options.fileName - file name for the saved PDF
 * @param {string} [options.backgroundColor] - canvas background behind each section
 * @param {(progress: { index: number, total: number }) => void} [options.onProgress]
 */
export async function exportSectionsToPdf({ sections, fileName, backgroundColor = '#F0F4F8', onProgress }) {
  if (!sections || sections.length === 0) {
    throw new Error('No report sections found to export.');
  }

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const pxPerMm = (RENDER_SCALE * sections[0].clientWidth) / CONTENT_WIDTH_MM;
  const pageHeightPx = CONTENT_HEIGHT_MM * pxPerMm;

  let cursorY = MARGIN_MM;
  let pageHasContent = false;

  for (let i = 0; i < sections.length; i++) {
    const canvas = await renderSectionCanvas(sections[i], backgroundColor);
    const heightMm = (canvas.height * CONTENT_WIDTH_MM) / canvas.width;

    if (heightMm <= CONTENT_HEIGHT_MM) {
      // Whole section fits on one page — pack it under the previous section
      // when there's room, otherwise start a fresh page.
      if (pageHasContent && cursorY + heightMm > PAGE_HEIGHT_MM - MARGIN_MM) {
        pdf.addPage();
        cursorY = MARGIN_MM;
      }
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', MARGIN_MM, cursorY, CONTENT_WIDTH_MM, heightMm, undefined, 'FAST');
      cursorY += heightMm + GAP_MM;
      pageHasContent = true;
    } else {
      // Section is taller than a single page — give it its own run of pages
      // and slice it at clean pixel-row boundaries so nothing is cut mid-line.
      if (pageHasContent) {
        pdf.addPage();
      }
      let renderedPx = 0;
      let firstSlice = true;
      while (renderedPx < canvas.height) {
        const sliceHeightPx = Math.min(pageHeightPx, canvas.height - renderedPx);
        const slice = cropCanvas(canvas, renderedPx, sliceHeightPx);
        const sliceHeightMm = (sliceHeightPx * CONTENT_WIDTH_MM) / canvas.width;

        if (!firstSlice) pdf.addPage();
        pdf.addImage(slice.toDataURL('image/png'), 'PNG', MARGIN_MM, MARGIN_MM, CONTENT_WIDTH_MM, sliceHeightMm, undefined, 'FAST');

        renderedPx += sliceHeightPx;
        firstSlice = false;
      }
      // Force the next section onto a clean page rather than packing under a slice.
      pdf.addPage();
      cursorY = MARGIN_MM;
      pageHasContent = false;
    }

    onProgress?.({ index: i + 1, total: sections.length });
  }

  // Drop a trailing blank page left over from the "force new page" step above.
  const pageCount = pdf.internal.getNumberOfPages();
  if (pageCount > 1 && !pageHasContent) {
    pdf.deletePage(pageCount);
  }

  pdf.save(fileName);
}

export const sanitizeFileSegment = (value) =>
  String(value || 'Student')
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'Student';
