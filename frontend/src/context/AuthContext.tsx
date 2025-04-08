// import React, { createContext, useState, useContext, ReactNode } from 'react';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (token: string, companyId: number) => void;
//   logout: () => void;
//   token: string | null;
//   companyId: number | null;  // Usamos companyId en lugar de company
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
//   const [companyId, setCompanyId] = useState<number | null>(() => {
//     const stored = localStorage.getItem('company_id');
//     return stored ? JSON.parse(stored) : null;
//   });

//   const isAuthenticated = !!token;

//   const login = (newToken: string, newCompanyId: number) => {
//     setToken(newToken);
//     setCompanyId(newCompanyId);
//     localStorage.setItem('token', newToken);
//     localStorage.setItem('company_id', JSON.stringify(newCompanyId));  // Guardamos solo el company_id
//   };

//   const logout = () => {
//     setToken(null);
//     setCompanyId(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('company_id');  // Eliminamos solo el company_id
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, token, companyId }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };




import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  
  const isAuthenticated = !!token;

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
