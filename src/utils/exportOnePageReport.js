import { pdf } from '@react-pdf/renderer';
import { createElement } from 'react';
import OnePageSummaryDocument from '../frontend/components/report/OnePageSummaryDocument';

// Triggers a browser download for a Blob without navigating away from the SPA.
function saveBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/**
 * Builds a single A4-page "executive summary" PDF directly from data using
 * @react-pdf/renderer (no DOM screenshotting), then downloads it.
 *
 * @param {Object} data - everything OnePageSummaryDocument needs to render
 * @param {string} fileName - file name for the saved PDF
 */
export async function exportOnePageSummary({ data, fileName }) {
  const blob = await pdf(createElement(OnePageSummaryDocument, data)).toBlob();
  saveBlob(blob, fileName);
}
