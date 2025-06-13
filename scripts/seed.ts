const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: "General"},
                {name: "Famous People"},
                {name: "Scientists"},
                {name: "History"},
                {name: "Philosophy"}, 
                {name: "Art"},
                {name: "Musicians"},
            ]
        })
    } catch (error) {
        console.error("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
}

main();