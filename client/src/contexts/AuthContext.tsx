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
  handleLogin: (email: string, password: string) => AuthResponse;
  handleLogout: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  handleLogin: () => {
    return { success: false };
  },
  handleLogout: () => false,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetails | null>(null);

  const [login] = useLoginLazyQuery({ fetchPolicy: "no-cache" });
  const [logout] = useLogoutMutation({ fetchPolicy: "no-cache" });
  const { data } = useUserDataQuery({ fetchPolicy: "no-cache" });
  // this state is used to better control re-render cycle for protected routes
  const [loading, setLoading] = useState<boolean>(true);

  // This part is responsible for login persistence after hard refresh
  // TODO : understand cycle here
  useEffect(() => {
    if (data?.userData.userDetails) {
      setUser(data.userData.userDetails as UserDetails);
      setLoading(false);
    } else if (data?.userData.success === false){
      setLoading(false);
    }
  }, [data]);

  const handleLogin = async (email: string, password: string)=> {
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
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
