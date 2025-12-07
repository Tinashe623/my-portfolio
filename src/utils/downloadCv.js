export async function downloadCvFromElement(element, filename = 'Tinashe_Mundieta_CV.pdf') {
  if (!element) return
  const html2pdf = (await import('html2pdf.js')).default

  // Inject temporary black & white print styles
  element.classList.add('bw-cv')
  const style = document.createElement('style')
  style.setAttribute('data-bw-cv', '1')
  style.textContent = `
    .bw-cv { color: #111 !important; background: #fff !important; filter: grayscale(100%); }
    .bw-cv * { color: #111 !important; background: transparent !important; box-shadow: none !important; }
    .bw-cv .chakra-card, .bw-cv [role="group"] .chakra-card { background: #fff !important; border: 1px solid #111 !important; }
    .bw-cv .chakra-heading { color: #000 !important; background: transparent !important; -webkit-text-fill-color: initial !important; }
    .bw-cv .chakra-tag { background: #fff !important; border: 1px solid #000 !important; color: #000 !important; }
    .bw-cv a { color: #000 !important; text-decoration: underline !important; }
    .bw-cv .chakra-container { padding-left: 10mm !important; padding-right: 10mm !important; }
    .bw-cv .chakra-stack { gap: 8px !important; }
  `
  document.head.appendChild(style)

  const opt = {
    margin: [8, 8, 8, 8],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all'] },
  }
  try {
    await html2pdf().set(opt).from(element).save()
  } finally {
    element.classList.remove('bw-cv')
    style.remove()
  }
}
