import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/components/contexts/Auth";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import NPKAccordion from "./NPKAccordion";
import ATMAccordion from "./ATMAccordion";

const AlertDestructive = () => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Authentication Required</AlertTitle>
      <AlertDescription>
        Please{" "}
        <Link
          to={"/auth.register?redirectTo=/crop.adviser.ai"}
          className="underline"
        >
          Sign up
        </Link>{" "}
        or{" "}
        <Link
          to={"/auth.login?redirectTo=/crop.adviser.ai"}
          className="underline"
        >
          Login
        </Link>{" "}
        to use Crop Assist AI.
      </AlertDescription>
    </Alert>
  );
};

const CropAdviser = () => {
  const { USER } = useAuth();
  const [AI_Loading, set_AI_Loading] = useState(false);
  const [AI_Results, set_AI_Results] = useState<any>(null);
  const [inputs, setInputs] = useState<{
    N?: number;
    P?: number;
    K?: number;
    T?: number;
    H?: number;
    pH?: number;
    R?: number;
  }>({});
  const inputsList = [
    { title: "Nitrogen", id: "N", units: "kg/ha", ex: "90.005" },
    { title: "Phosphorus", id: "P", units: "kg/ha", ex: "42.5" },
    { title: "Potassium", id: "K", units: "kg/ha", ex: "43.00" },
    { title: "Temperature", id: "T", units: "celsius", ex: "29.072" },
    { title: "Humidity", id: "H", units: "percentage", ex: "82.1674" },
    { title: "pH", id: "pH", units: "0 to 14", ex: "6.9567" },
    { title: "Rainfall", id: "R", units: "mm", ex: "202.93" },
  ];
  const inputsOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  const formOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    set_AI_Loading(true);
    await new Promise((res) => setTimeout(res, 5000));
    set_AI_Results(JSON.stringify(inputs));
    set_AI_Loading(false);
  };
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Crop Adviser AI</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <HashLink className="hover:bg-accent p-1.5" smooth to={"#AI"}>
            AI
          </HashLink>
          <HashLink className="hover:bg-accent p-1.5" smooth to={"#NPK"}>
            NPK Values of Soil
          </HashLink>
          <HashLink className="hover:bg-accent p-1.5" smooth to={"#ATM"}>
            Atmospheric Factors
          </HashLink>
        </nav>
        <div className="grid gap-6">
          <div className="grid gap-1">
            <span id="AI" className="dummy-navigator relative -top-20"></span>
            {!USER && <AlertDestructive />}
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>
                  Find out the most suitable crop to grow in your area
                </CardTitle>
                <CardDescription>
                  Fill in the information about the soil and atmospheric
                  conditions of the your land.
                </CardDescription>
              </CardHeader>
              <form onSubmit={formOnSubmit}>
                <CardContent>
                  <div className="flex flex-wrap gap-5">
                    {inputsList.map(({ id, title, units, ex }) => (
                      <div
                        className="grid min-w-64 items-center gap-2"
                        key={id}
                      >
                        <Label htmlFor={id}>{`${title} (${units})`}</Label>
                        {USER && (
                          <Input
                            type="number"
                            step={"any"}
                            id={id}
                            placeholder={`Example: ${ex}`}
                            min={0}
                            onChange={inputsOnChange}
                          />
                        )}
                        {!USER && <Input id={id} disabled />}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  {USER && <Button>Find Crop</Button>}
                  {!USER && <Button disabled>Find Crop</Button>}
                </CardFooter>
              </form>
            </Card>
            {(AI_Results || AI_Loading) && (
              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                  <CardDescription>
                    {AI_Loading && (
                      <div className="w-full flex justify-center">
                        <Loader2 className="h-10 w-10 animate-spin" />
                      </div>
                    )}
                    {!AI_Loading && AI_Results}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
          <div>
            <span id="NPK" className="dummy-navigator relative -top-20"></span>
            <NPKAccordion />
          </div>
          <div>
            <span id="ATM" className="dummy-navigator relative -top-20"></span>
            <ATMAccordion />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CropAdviser;
