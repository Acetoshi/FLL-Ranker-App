import { createContext, useState, ReactNode, useEffect } from "react";
import {
  AuthResponse,
  useLogoutMutation,
  UserDetails,
  useUserDataQuery,
} from "../types/graphql-types";
import { useLoginLazyQuery } from "../types/graphql-types";

interface AuthContextType {
  user: UserDetails | null;
  loading: boolean;
  handleLogin: (email: string, password: string) => Promise<AuthResponse>;
  handleLogout: () => Promise<boolean>;
}

const authContextInitialValue = {
  user: null,
  loading: true,
  handleLogin: async () => {
    return { success: false };
  },
  handleLogout: async () => false,
};

const AuthContext = createContext<AuthContextType>(authContextInitialValue);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetails | null>(null);

  const [login] = useLoginLazyQuery({ fetchPolicy: "no-cache" });
  const [logout] = useLogoutMutation({ fetchPolicy: "no-cache" });
  const { data } = useUserDataQuery({ fetchPolicy: "no-cache" });
  // this state is used to better control re-render cycle for protected routes
  const [loading, setLoading] = useState<boolean>(true);

  // This part is responsible for login persistence after hard refresh
  useEffect(() => {
    if (data?.userData.userDetails) {
      setUser(data.userData.userDetails as UserDetails);
      setLoading(false);
    } else if (data?.userData.success === false) {
      setLoading(false);
    }
  }, [data]);

  const handleLogin = async (email: string, password: string) => {
    const response = await login({
      variables: { email, password },
    });

    const returnValue: AuthResponse = { success: false, userDetails: null };

    if (response.data) {
      const { success, userDetails } = response.data.login;

      returnValue.success = success;
      returnValue.userDetails = userDetails;

      if (success) setUser(userDetails as UserDetails);
    }

    return returnValue;
  };

  const handleLogout = async () => {
    const response = await logout();

    if (response.data?.logout) {
      setUser(null);
    }

    return response.data?.logout ? true : false;
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
