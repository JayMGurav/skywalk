import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useCheckoutDetails from "@/hooks/useCheckoutDetails";
import { Gender } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  travellers: z.array(
    z.object({
      firstName: z.string().min(1, {
        message: "Firstname has to be filled.",
      }),
      lastName: z.string().min(1, { message: "This field has to be filled." }),
      gender: z.nativeEnum(Gender, {
        errorMap: () => ({ message: "Please select a valid trip type" }),
      }),
    }),
  ),
});

type updateTravellerValues = z.infer<typeof schema>;

export function AddTraveller({
  numberOfTravellers,
}: {
  numberOfTravellers: number;
}) {
  const { updateCheckoutDetails } = useCheckoutDetails();
  const form = useForm<updateTravellerValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      travellers: new Array(numberOfTravellers).fill({
        firstName: "",
        lastName: "",
        gender: undefined,
      }),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "travellers", // This should match the key in your form state
  });

  function onSubmit({ travellers }: updateTravellerValues) {
    updateCheckoutDetails({
      travellers,
    });
    form.reset();
    toast.success("Successfully added travellers details");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus /> Add traveller
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Traveller details</DialogTitle>
          <DialogDescription>
            We're currently required by airlines and providers to ask for the
            below information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full flex flex-col"
          >
            {fields?.map((field, index) => {
              return (
                <div key={field.id} className="text-sm flex flex-col gap-3">
                  <h3 className="font-semibold">Traveller {index + 1}</h3>
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name={`travellers.${index}.firstName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name:</FormLabel>
                        <Input {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <div className="flex gap-2 items-center ">
                    <FormField
                      control={form.control}
                      name={`travellers.${index}.lastName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name:</FormLabel>
                          <Input type="text" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Gender */}
                    <FormField
                      control={form.control}
                      name={`travellers.${index}.gender`}
                      render={({ field }) => (
                        <FormItem className="w-60">
                          <FormLabel>Gender:</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={Gender.Male}>Male</SelectItem>
                              <SelectItem value={Gender.Female}>
                                Female
                              </SelectItem>
                              <SelectItem value={Gender.Other}>
                                Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              );
            })}
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
