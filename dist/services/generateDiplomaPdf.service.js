"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDiplomaPdfBuffer = generateDiplomaPdfBuffer;
const pdfkit_1 = __importDefault(require("pdfkit"));
async function generateDiplomaPdfBuffer(participant) {
    return new Promise((resolve) => {
        const doc = new pdfkit_1.default();
        const buffers = [];
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
