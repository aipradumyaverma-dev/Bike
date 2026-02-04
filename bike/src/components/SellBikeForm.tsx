 import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import bikeApi from '@/api/sellBike';
import sellBikeApi from '@/api/sellBike';

const sellBikeSchema = z.object({
  bikeName: z.string().min(2, 'Bike name must be at least 2 characters').max(100),
  brand: z.string().min(2, 'Brand is required').max(50),
  model: z.string().min(1, 'Model is required').max(50),
  year: z.string().min(4, 'Year is required'),
  price: z.string().min(1, 'Price is required'),
  mileage: z.string().min(1, 'Mileage is required'),
  condition: z.string().min(1, 'Condition is required'),
  engineCC: z.string().min(1, 'Engine CC is required'),
  fuelType: z.string().min(1, 'Fuel type is required'),
  color: z.string().min(1, 'Color is required').max(30),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  contactNumber: z.string().min(10, 'Contact number must be at least 10 digits').max(15),
  location: z.string().min(2, 'Location is required').max(100),
  images: z.array(z.instanceof(File)).max(5, 'Maximum 5 images allowed').optional(),
});

type SellBikeFormData = z.infer<typeof sellBikeSchema>;

interface SellBikeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const {addBike} = sellBikeApi();

const SellBikeForm = ({ open, onOpenChange }: SellBikeFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<SellBikeFormData>({
    resolver: zodResolver(sellBikeSchema),
    defaultValues: {
      bikeName: '',
      brand: '',
      model: '',
      year: '',
      price: '',
      mileage: '',
      condition: '',
      engineCC: '',
      fuelType: '',
      color: '',
      description: '',
      contactNumber: '',
      location: '',
      images: [],
    },
  });

  // Clean up object URLs when component unmounts or previews change
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

const onSubmit = async (data: SellBikeFormData) => {
  try {
    setIsSubmitting(true);

    // 1. Create FormData
    const formData = new FormData();

    // 2. Add all text fields
    formData.append('bikeName', data.bikeName);
    formData.append('brand', data.brand);
    formData.append('model', data.model);
    formData.append('year', data.year);
    formData.append('price', data.price);
    formData.append('mileage', data.mileage);
    formData.append('condition', data.condition);
    formData.append('engineCC', data.engineCC);
    formData.append('fuelType', data.fuelType);
    formData.append('color', data.color);
    formData.append('description', data.description);
    formData.append('contactNumber', data.contactNumber);
    formData.append('location', data.location);

    // 3. Add images (multiple)
    if (data.images?.length) {
      data.images.forEach((file) => {
        formData.append('images', file);   // ← same field name "images" for each file
      });
    }

    // 4. Send to backend
    const response = await addBike(formData);

    toast({
      title: "Success",
      description: "Your bike has been listed successfully!",
    });

    form.reset();
    setImagePreviews([]);
    onOpenChange(false);

  } catch (err: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: err.message || "Failed to list your bike. Please try again.",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">Sell Your Bike</DialogTitle>
          <DialogDescription>
            Fill in the details below to list your bike for sale.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bikeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bike Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Classic 350" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Royal Enfield" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Classic" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2023" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 185000" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mileage (km)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5000" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="engineCC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engine (CC)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 350" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Black" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 9876543210" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mumbai, Maharashtra" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Upload Field */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Bike Images (up to 5)</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length > 5) {
                            toast({
                              title: 'Too many images',
                              description: 'You can upload a maximum of 5 images.',
                              variant: 'destructive',
                            });
                            return;
                          }

                          field.onChange(files.length > 0 ? files : undefined);

                          // Revoke old previews
                          imagePreviews.forEach((url) => URL.revokeObjectURL(url));
                          // Create new previews
                          const previews = files.map((file) => URL.createObjectURL(file));
                          setImagePreviews(previews);
                        }}
                        className="bg-background"
                      />

                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={preview}
                                alt={`Bike preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-border"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  // Remove preview
                                  const newPreviews = imagePreviews.filter((_, i) => i !== index);
                                  setImagePreviews(newPreviews);

                                  // Remove file from form value
                                  const currentFiles = field.value || [];
                                  const newFiles = currentFiles.filter((file: File, i: number) => i !== index);
                                  field.onChange(newFiles.length > 0 ? newFiles : undefined);
                                }}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your bike's condition, features, history, and any modifications..."
                      className="bg-background min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                  setImagePreviews([]);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? 'Listing...' : 'List Bike'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SellBikeForm;