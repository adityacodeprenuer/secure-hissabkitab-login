
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Schema for form validation
const productionFormSchema = z.object({
  lotNo: z.string().min(2, {
    message: "Lot number must be at least 2 characters.",
  }),
  size: z.string().min(1, {
    message: "Size is required.",
  }),
  cuttingMaster: z.string().min(2, {
    message: "Cutting master name is required.",
  }),
  silaiKariger: z.string().min(2, {
    message: "Silai kariger name is required.",
  }),
  lastDate: z.date().nullable().optional(),
  maalAaya: z.boolean().default(false),
  pressDate: z.date().nullable().optional(),
  pressKariger: z.string().optional(),
});

type ProductionFormValues = z.infer<typeof productionFormSchema>;

interface ProductionEntryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductionFormValues) => void;
  selectedDate?: Date;
}

export const ProductionEntryForm = ({ isOpen, onClose, onSave, selectedDate }: ProductionEntryFormProps) => {
  // Available sizes
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  
  // Initialize the form with default values
  const form = useForm<ProductionFormValues>({
    resolver: zodResolver(productionFormSchema),
    defaultValues: {
      lotNo: "",
      size: "",
      cuttingMaster: "",
      silaiKariger: "",
      lastDate: null,
      maalAaya: false,
      pressDate: null,
      pressKariger: "",
    },
  });

  const handleSubmit = (values: ProductionFormValues) => {
    onSave(values);
    form.reset();
  };

  const maalAayaValue = form.watch("maalAaya");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Production Entry</DialogTitle>
          <DialogDescription>
            Enter the details of the production lot.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="lotNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lot Number</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <Input placeholder="Enter lot number" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="cuttingMaster"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cutting Master</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter cutting master name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="silaiKariger"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Silai Kariger</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter silai kariger name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="lastDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Last Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select last date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The final delivery date for this production lot.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maalAaya"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Maal Aaya</FormLabel>
                    <FormDescription>
                      Check if material has been received for this lot.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {maalAayaValue && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="pressDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Press Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select press date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pressKariger"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Press Kariger</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter press kariger name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
