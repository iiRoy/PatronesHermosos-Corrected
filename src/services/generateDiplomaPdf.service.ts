import PDFDocument from 'pdfkit';

export async function generateDiplomaPdfBuffer(participant: any): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });

    doc.fontSize(24).text('Diploma', { align: 'center' });
    doc.moveDown();
    doc
      .fontSize(16)
      .text(`Otorgado a: ${participant.name || ''} ${participant.paternal_name || ''}`);
    doc.text(`Por su participación en el evento.`);
    doc.end();
  });
}
