import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CompanionIdPageProps {
    params: {
        companionId: string;
    }
}

const CompanionIdPage = async ({
    params
}: CompanionIdPageProps) => {
    try {
        const session = await auth();

        if (!session?.userId) {
            redirect("/sign-in");
        }

        console.log("Attempting database query with:", {
            companionId: params.companionId,
            userId: session.userId
        });

        const companion = await prismadb.companion.findUnique({
            where: {
                id: params.companionId,
                userId: session.userId
            }
        });

        console.log("Companion query result:", companion);

        const categories = await prismadb.category.findMany();
        console.log("Categories query result:", categories);

        return (
            <div>
                <CompanionForm
                    initialData={companion}
                    categories={categories}
                />
            </div>
        );
    } catch (error) {
        console.error("Database error details:", {
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined,
            error
        });
        return (
            <div className="h-full p-4">
                <p>Database connection error. Please check your environment variables and database connection.</p>
            </div>
        );
    }
}

export default CompanionIdPage;