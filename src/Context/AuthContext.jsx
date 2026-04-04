// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(user));
//   }, [user]);

//   const signup = (name, email, password) => {
//     const newUser = { name, email, password };
//     localStorage.setItem("registeredUser", JSON.stringify(newUser));
//     setUser(newUser); 
//   };

//   const login = (email, password) => {
//     const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

//     if (
//       savedUser &&
//       savedUser.email === email &&
//       savedUser.password === password
//     ) {
//       setUser(savedUser);
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
    

//       <AuthContext.Provider value={{ user, setUser, logout }}></AuthContext.Provider>
     
//   );
// }

// export default AuthProvider;






// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(user));
//   }, [user]);

//   const signup = (name, email, password) => {
//     const newUser = { name, email, password };
//     localStorage.setItem("registeredUser", JSON.stringify(newUser));
//     setUser(newUser);
//   };

//   const login = (email, password) => {
//     const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

//     if (
//       savedUser &&
//       savedUser.email === email &&
//       savedUser.password === password
//     ) {
//       setUser(savedUser);
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default AuthProvider;




import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      localStorage.removeItem("user");
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const signup = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email, password) => {
    try {
      const raw = localStorage.getItem("registeredUser");
      if (!raw) return false;

      const savedUser = JSON.parse(raw);

      if (
        savedUser &&
        savedUser.email === email &&
        savedUser.password === password
      ) {
        setUser(savedUser);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;