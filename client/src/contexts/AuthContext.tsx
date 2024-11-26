import { createContext, useState, ReactNode } from "react";
import {
  LoginResponse,
  useLogoutMutation,
  UserDetails,
} from "../types/graphql-types";
import { useLoginLazyQuery } from "../types/graphql-types";

interface AuthContextType {
  user: UserDetails | null;
  handleLogin: (email: string, password: string) => LoginResponse;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetails | null>(null);

  const [login] = useLoginLazyQuery({ fetchPolicy: "no-cache" });
  const [logout] = useLogoutMutation({ fetchPolicy: "no-cache" });
  // const [login, loading, error] = useLoginLazyQuery();

  const handleLogin = async (email: string, password: string) => {
    const response = await login({
      variables: { email, password },
    });
    if (response.data) {
      const { success, userDetails } = response.data.login;
      if (success) {
        setUser(userDetails as UserDetails);
        return { success, userDetails };
      } else {
        return { success };
      }
    }
  };

  const handleLogout = async () => {
    const response = await logout();

    if (response.data?.logout) {
      setUser(null);
    }

    return response.data?.logout ? true : false;
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
