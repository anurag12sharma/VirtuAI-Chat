"use client";

import * as z from "zod";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is requied!",
    }),
    description: z.string().min(1, {
        message: "Description is requied!",
    }),
    instructions: z.string().min(200, {
        message: "Instructions require atleast 200 characters!",
    }),
    seed: z.string().min(200, {
        message: "Seed require atleast 200 characters!",
    }),
    src: z.string().min(1, {
        message: "Image is required!",
    }),
    categoryId: z.string().min(1, {
        message: "Category is required!",
    }),
})

export const CompanionForm = ({
    categories,
    initialData
}: CompanionFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            instructions: initialData?.instructions || "",
            seed: initialData?.seed || "",
            src: initialData?.src || "",
            categoryId: initialData?.categoryId || undefined
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">General Information</h3>
                            <p className="text-sm text-muted-foreground">
                                General information about your Companion
                            </p>
                        </div>
                        <Separator className="bg-primary/10"/>
                    </div>
                    <FormField
                        control={form.control}
                        name="src"
                        render={({field}) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormControl>
                                    Image Upload Component
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}