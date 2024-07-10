import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ATMAccordion = () => {
  return (
    <Card x-chunk="dashboard-04-chunk-2">
      <CardHeader>
        <CardTitle>Atmospheric Factors</CardTitle>
        <CardDescription>
          Atmospheric factors such as temperature, humidity, pH, and rainfall
          directly influence plant growth and health by affecting metabolic
          processes, water availability, nutrient uptake, and overall resilience
          to environmental stress. Understanding and managing these factors are
          crucial for optimizing agricultural productivity and ecosystem
          stability.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Temperature</AccordionTrigger>
            <AccordionContent>
              Temperature affects plant growth in several ways. Different plants
              have optimal temperature ranges for growth, and extremes can cause
              stress or damage. Temperature influences metabolic rates,
              flowering times, and the ability to photosynthesize.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Humidity</AccordionTrigger>
            <AccordionContent>
              Humidity refers to the amount of moisture in the air. High
              humidity can affect transpiration rates (the loss of water vapor
              from leaves) and may promote certain diseases. Low humidity can
              lead to increased water loss from plants.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>pH</AccordionTrigger>
            <AccordionContent>
              pH measures the acidity or alkalinity of the soil. It affects
              nutrient availability to plants; different plants have different
              pH preferences. For example, acidic soils (low pH) may limit the
              availability of nutrients like phosphorus, while alkaline soils
              (high pH) may limit the availability of micronutrients.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Rainfall</AccordionTrigger>
            <AccordionContent>
              Rainfall provides plants with water, which is essential for
              photosynthesis, nutrient transport, and cell turgidity. Different
              plants have different water requirements, and rainfall patterns
              can affect plant distribution and growth. Too much or too little
              rainfall can stress plants and affect crop yields.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ATMAccordion;
