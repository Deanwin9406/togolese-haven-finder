
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PropertyMap from "@/components/map/PropertyMap";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PropertyProps } from "@/components/PropertyCard";

// Mock data for preview
const propertyPreview: PropertyProps = {
  id: "preview",
  title: "Your Property Title",
  location: "Your Property Location",
  price: 0,
  imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2065",
  propertyType: "House",
  bedrooms: 3,
  bathrooms: 2,
  area: 150,
  isForSale: true,
};

const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().min(1, "Price is required"),
  location: z.string().min(1, "Location is required"),
  propertyType: z.string().min(1, "Property type is required"),
  bedrooms: z.coerce.number().min(0, "Cannot be negative"),
  bathrooms: z.coerce.number().min(0, "Cannot be negative"),
  area: z.coerce.number().min(1, "Area is required"),
  isForSale: z.boolean(),
  // In a real app, you would include images and more fields
});

type PropertyFormValues = z.infer<typeof propertySchema>;

const steps = [
  { id: 1, name: "Basics" },
  { id: 2, name: "Details" },
  { id: 3, name: "Location" },
  { id: 4, name: "Images" },
  { id: 5, name: "Preview" },
];

const PropertyListingWizard = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [preview, setPreview] = useState<PropertyProps>(propertyPreview);

  // Set up form with default values
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      propertyType: "House",
      price: 0,
      location: "Lomé, Togo",
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      isForSale: true,
    },
  });

  // Update preview whenever form values change
  React.useEffect(() => {
    const values = form.getValues();
    setPreview({
      ...preview,
      title: values.title || "Your Property Title",
      location: values.location || "Lomé, Togo",
      price: values.price || 0,
      propertyType: values.propertyType || "House",
      bedrooms: values.bedrooms || 0,
      bathrooms: values.bathrooms || 0,
      area: values.area || 0,
      isForSale: values.isForSale,
    });
  }, [form.watch()]);

  // Handle form submission
  const onSubmit = async (values: PropertyFormValues) => {
    try {
      // In a real app, you would save this data to your backend
      console.log("Submitting property:", values);
      toast.success("Property listing submitted successfully!");
      navigate("/properties");
    } catch (error) {
      console.error("Error submitting property:", error);
      toast.error("Failed to submit property listing. Please try again.");
    }
  };

  // Animation variants for page transitions
  const variants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -100,
    },
  };

  // Function to handle step navigation
  const handleStepChange = (newStep: number) => {
    const currentValues = form.getValues();
    
    // Perform validation before proceeding to next step
    if (newStep > currentStep) {
      switch (currentStep) {
        case 1:
          if (!currentValues.title || !currentValues.price) {
            toast.error("Please fill in all required fields");
            return;
          }
          break;
        case 2:
          if (!currentValues.propertyType || currentValues.area <= 0) {
            toast.error("Please fill in all required fields");
            return;
          }
          break;
        case 3:
          if (!currentValues.location) {
            toast.error("Please provide a location");
            return;
          }
          break;
        // For step 4 (images), we'd check if at least one image is uploaded in a real app
      }
    }
    
    setCurrentStep(newStep);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
          <p className="text-muted-foreground">
            Fill out the form below to list your property for sale or rent
          </p>
        </div>
        
        {/* Steps indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="flex flex-col items-center"
                onClick={() => handleStepChange(step.id)}
              >
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${currentStep >= step.id 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-background text-muted-foreground border-muted-foreground/30'} 
                  mb-2 cursor-pointer transition-all`}
                >
                  {step.id}
                </div>
                <span 
                  className={`text-sm ${currentStep >= step.id 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground'}`}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-muted-foreground/30 w-full rounded"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-primary rounded transition-all duration-500"
              style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Title</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Modern Villa with Ocean View" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your property in detail..." 
                                  rows={5}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price (XOF)</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="isForSale"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-6">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    {field.value ? "For Sale" : "For Rent"}
                                  </FormLabel>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="propertyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select property type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="House">House</SelectItem>
                                  <SelectItem value="Apartment">Apartment</SelectItem>
                                  <SelectItem value="Villa">Villa</SelectItem>
                                  <SelectItem value="Land">Land</SelectItem>
                                  <SelectItem value="Commercial">Commercial</SelectItem>
                                  <SelectItem value="Office">Office</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="bedrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bedrooms</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="bathrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bathrooms</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Area (m²)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="1" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* Additional property features could be added here in a real app */}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Location</h2>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 123 Main Street, Lomé" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            You can also pin the exact location on the map:
                          </p>
                          <div className="h-64 md:h-96 rounded-md overflow-hidden">
                            <PropertyMap properties={[preview]} height="100%" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Property Images</h2>
                      
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-lg font-medium">Drop your images here or click to browse</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Upload up to 10 high-quality images (PNG, JPG, WEBP)
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          {/* Preview images would be displayed here in a real app */}
                          <div className="relative aspect-square rounded-md bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">No images yet</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Preview & Submit</h2>
                      
                      <div className="space-y-6">
                        <div className="bg-muted p-4 rounded-lg">
                          <h3 className="font-semibold text-lg">{preview.title}</h3>
                          <p className="text-muted-foreground truncate mt-1">{preview.location}</p>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant={preview.isForSale ? "default" : "secondary"} className="bg-togo-green hover:bg-togo-green/90">
                                {preview.isForSale ? "À vendre" : "À louer"}
                              </Badge>
                              <Badge variant="outline">{preview.propertyType}</Badge>
                            </div>
                            <p className="font-bold text-primary">
                              {new Intl.NumberFormat('fr-TG', {
                                style: 'currency',
                                currency: 'XOF',
                                maximumFractionDigits: 0,
                              }).format(preview.price)}
                              {!preview.isForSale && ' /mois'}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="bg-background p-2 rounded text-center">
                              <p className="text-sm text-muted-foreground">Bedrooms</p>
                              <p className="font-semibold">{preview.bedrooms}</p>
                            </div>
                            <div className="bg-background p-2 rounded text-center">
                              <p className="text-sm text-muted-foreground">Bathrooms</p>
                              <p className="font-semibold">{preview.bathrooms}</p>
                            </div>
                            <div className="bg-background p-2 rounded text-center">
                              <p className="text-sm text-muted-foreground">Area</p>
                              <p className="font-semibold">{preview.area} m²</p>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mt-4">
                            {form.getValues().description || "No description provided."}
                          </p>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <p className="font-medium">Before submitting, please check that:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>All the information is accurate and complete</li>
                            <li>You have provided high-quality images (in a real app)</li>
                            <li>The property location is correct on the map</li>
                            <li>You have specified the correct price and listing type (sale/rent)</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleStepChange(currentStep - 1)}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={() => handleStepChange(currentStep + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-togo-green hover:bg-togo-green/90"
                >
                  Submit Listing
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyListingWizard;
