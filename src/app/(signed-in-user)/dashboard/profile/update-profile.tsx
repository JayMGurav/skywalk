"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateProfileAction } from "./actions";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const schema = z.object({
  phone: z
    .string()
    .min(10, {
      message: "Phone number should be atleast 10 digits",
    })
    .max(13, {
      message: "Phone number should be max 13 digits",
    }),
  // email: z
  //   .string()
  //   .min(1, { message: "This field has to be filled." })
  //   .email("This is not a valid email."),
});

type updateProfileValues = z.infer<typeof schema>;

export function UpdateProfile({
  phone,
  // email,
}: {
  phone: string | null;
  // email: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<updateProfileValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: phone ?? "",
      // email,
    },
  });

  async function onSubmit(values: updateProfileValues) {
    try {
      setLoading(true);
      await updateProfileAction(values);
      toast.success("Updated your profile successfully :)");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong :(", {
        description: <pre className="bg-background w-fit">{String(err)}</pre>,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-fit flex items-center my-10 gap-4"
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Phone Number</FormLabel>
              <Input type="text" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Email</FormLabel>
              <Input type="email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" size="sm" className="mb-3" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Hold on.." : "Save"}
        </Button>
      </form>
    </Form>
  );
}
