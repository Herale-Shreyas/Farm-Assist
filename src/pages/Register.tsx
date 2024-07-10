import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import Google from "../assets/google-icon.png";
import { useAuth } from "@/components/contexts/Auth";

const Register = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo") || "/";

  const { toast } = useToast();
  const navigate = useNavigate();
  const { signInWithGoogle, signUpWithEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [invalidInput, setInvalidInput] = useState<{
    name?: string;
    desc?: string;
  }>({});
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    pass: "",
    pass2: "",
  });

  const setInputsHelper = (event: ChangeEvent<HTMLInputElement>) =>
    setInputs(() => ({ ...inputs, [event.target.id]: event.target.value }));

  const InputStyles = (name: string) =>
    `${invalidInput?.name == name ? "border-red-500 border-2" : ""}`;

  const validateInputs = () => {
    const { name, pass, email, pass2 } = inputs;
    const namePattern: RegExp = /^[a-zA-Z]{3,}$/;
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passPattern: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!namePattern.test(name)) {
      setInvalidInput({
        name: "name",
        desc: "Enter at least 3 alphabetic characters with no spaces.",
      });
      return false;
    }
    if (!emailPattern.test(email)) {
      setInvalidInput({
        name: "email",
        desc: "Example: abc@example.com",
      });
      return false;
    }
    if (!passPattern.test(pass)) {
      setInvalidInput({
        name: "pass",
        desc: "Enter at least 8 characters with uppercase, lowercase, digit, and special character.",
      });
      return false;
    }
    if (pass != pass2) {
      setInvalidInput({
        name: "pass2",
        desc: "Please enter the same password in both fields.",
      });
      return false;
    }
    return true;
  };

  const navigateAfterAuth = ({ status, errorMsg }: any) => {
    if (status) {
      console.log("here");
      toast({ description: "Account Created Successfully" });
      navigate(redirectTo);
    } else {
      setInvalidInput({ desc: errorMsg });
    }
  };

  const signUpWithEmailHelper = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setInvalidInput({});
    if (validateInputs()) {
      const { name, pass, email } = inputs;
      navigateAfterAuth(await signUpWithEmail(name, email, pass));
    }
    setLoading(false);
  };

  const signInWithGoogleHelper = async () => {
    if (loading) return;
    setLoading(true);
    setInvalidInput({});
    navigateAfterAuth(await signInWithGoogle());
    setLoading(false);
  };

  return (
    <div className="w-[100%] flex justify-center pt-10 pb-10">
      <Card className="w-[95%] max-w-[400px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription className="font-light">
            Enter your details below to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* "-webkit-text-security" */}
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">
                  Name
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Full Name"
                  onChange={setInputsHelper}
                  disabled={loading}
                  className={InputStyles("name")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">
                  Email
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="abc@example.com"
                  onChange={setInputsHelper}
                  disabled={loading}
                  className={InputStyles("email")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pass">
                  Password
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="password"
                  id="pass"
                  placeholder="Create Password"
                  onChange={setInputsHelper}
                  disabled={loading}
                  className={InputStyles("pass")}
                />
                <Input
                  type="password"
                  id="pass2"
                  placeholder="Confirm Password"
                  onChange={setInputsHelper}
                  disabled={loading}
                  className={InputStyles("pass2")}
                />
              </div>
              <small className="text-red-500">{invalidInput.desc}</small>

              <div className="flex flex-col space-y-1.5">
                <Button
                  className="w-[100%]"
                  disabled={loading}
                  onClick={signUpWithEmailHelper}
                >
                  {!loading && "Create Account"}
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                </Button>
                <span className="text-sm">
                  Already have an account?{" "}
                  <Link
                    to={`/auth.login?redirectTo=${redirectTo}`}
                    className="hover:underline "
                  >
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </CardContent>
        <CardContent className="flex gap-1 items-center">
          <hr className="flex-1 bg-slate-200 h-[1.5px]" />
          <small className="font-medium text-slate-500">OR CONTINUE WITH</small>
          <hr className="flex-1 bg-slate-200 h-[1.5px]" />
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          <Button
            variant={"secondary"}
            className="w-[100%]"
            disabled={loading}
            onClick={signInWithGoogleHelper}
          >
            {!loading && <img src={Google} className="w-6" />}
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
          <CardContent>
            <small className="text-justify">
              By clicking continue, you agree to our{" "}
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy Policy</span>.
            </small>
          </CardContent>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
