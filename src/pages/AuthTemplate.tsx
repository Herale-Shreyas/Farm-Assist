import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface AuthTemplateProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthTemplate = ({ children }: AuthTemplateProps) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="mid-content auth">
      <div className="auth-page-content"></div>
      {children}
    </div>
  );
};

export default AuthTemplate;
