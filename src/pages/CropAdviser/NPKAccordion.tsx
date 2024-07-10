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

const NPKAccordion = () => {
  return (
    <Card x-chunk="dashboard-04-chunk-2">
      <CardHeader>
        <CardTitle>NPK Values of Soil</CardTitle>
        <CardDescription>
          NPK refers to the three essential nutrients that are crucial for plant
          growth. NPK values in soil indicate the amount of nitrogen (N),
          phosphorus (P), and potassium (K) present, essential for plant growth
          and often displayed on fertilizer labels to guide nutrient management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Nitrogen (N)</AccordionTrigger>
            <AccordionContent>
              Nitrogen is essential for the formation of proteins, chlorophyll,
              and other cell components. It promotes healthy leaf and stem
              growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Phosphorus (P)</AccordionTrigger>
            <AccordionContent>
              Phosphorus is important for root development, flowering, and
              fruiting. It also plays a role in energy transfer within the
              plant.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Potassium (K)</AccordionTrigger>
            <AccordionContent>
              Potassium is involved in photosynthesis and regulates water uptake
              and retention. It contributes to overall plant vigor and disease
              resistance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default NPKAccordion;
