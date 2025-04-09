//npx prisma db seed
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

// 🔧 Convierte "Con espacios" a "Con_espacios"
function fixEnum(value: string): string {
    return value.replace(/ /g, '_');
}

// 🕒 Convierte "09:00:00" a Date con hora
function parseTimeToDate(baseDate: Date, timeStr: string): Date {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    const date = new Date(baseDate);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds || 0);
    return date;
}

async function main() {
    console.log('🧨 Borrando registros previos...');
    await prisma.participants.deleteMany();
    await prisma.collaborators.deleteMany();
    await prisma.tutors.deleteMany();
    await prisma.groups.deleteMany();
    await prisma.mentors.deleteMany();
    await prisma.assistant_coordinators.deleteMany();
    await prisma.venue_coordinators.deleteMany();
    await prisma.venues.deleteMany();

    console.log('🌱 Insertando datos...');

    // 1. VENUES
    const venues = JSON.parse(
        fs.readFileSync('./prisma/seed/venues.json', 'utf-8')
    );
    for (const venue of venues) {
        await prisma.venues.create({
            data: {
                ...venue,
                status: fixEnum(venue.status),
                participation_file: Buffer.from('ArchivoPDF'),
            },
        });
    }

    // 2. COORDINADORAS DE SEDE
    const venueCoordinators = JSON.parse(
        fs.readFileSync('./prisma/seed/venue_coordinators.json', 'utf-8')
    );
    for (const coord of venueCoordinators) {
        await prisma.venue_coordinators.create({ data: coord });
    }

    // 3. COORDINADORAS ASISTENTES
    const assistants = JSON.parse(
        fs.readFileSync('./prisma/seed/assistant_coordinators.json', 'utf-8')
    );
    for (const a of assistants) {
        await prisma.assistant_coordinators.create({
            data: {
                ...a,
                role: fixEnum(a.role),
            },
        });
    }

    // 4. MENTORAS
    const mentors = JSON.parse(
        fs.readFileSync('./prisma/seed/mentors.json', 'utf-8')
    );
    for (const m of mentors) {
        await prisma.mentors.create({ data: m });
    }

    // 5. GRUPOS
    const groups = JSON.parse(
        fs.readFileSync('./prisma/seed/groups.json', 'utf-8')
    );
    for (const g of groups) {
        const baseDate = new Date(g.start_date);
        await prisma.groups.create({
            data: {
                ...g,
                start_date: baseDate,
                end_date: new Date(g.end_date),
                start_hour: parseTimeToDate(baseDate, g.start_hour),
                end_hour: parseTimeToDate(baseDate, g.end_hour),
            },
        });
    }

    // 6. TUTORES
    const tutors = JSON.parse(
        fs.readFileSync('./prisma/seed/tutors.json', 'utf-8')
    );
    for (const t of tutors) {
        await prisma.tutors.create({ data: t });
    }

    // 7. PARTICIPANTES
    const participants = JSON.parse(
        fs.readFileSync('./prisma/seed/participants.json', 'utf-8')
    );
    for (const p of participants) {
        await prisma.participants.create({
            data: {
                ...p,
                participation_file: Buffer.from('ArchivoPDF'),
            },
        });
    }

    // 8. COLABORADORAS
    const collaborators = JSON.parse(
        fs.readFileSync('./prisma/seed/collaborators.json', 'utf-8')
    );
    for (const c of collaborators) {
        await prisma.collaborators.create({ data: c });
    }

    console.log('✅ ¡Datos insertados exitosamente!');
}

main()
    .catch((e) => {
        console.error('❌ Error en seed:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
