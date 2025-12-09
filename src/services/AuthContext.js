import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export function useAuth () {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                //If the user is logged out
                setUser(null);
                setRole(null);
                setLoading(false);
                return;
            }

            //if the user is logged in
            setUser(firebaseUser);

            try {
                const ref = doc(db, "users", firebaseUser.uid);
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    const data = snap.data();
                    setRole(data.role || "user");
                }
                else {
                    setRole(null);
                }
            }
            catch (error) {
                console.error (`Error at loading user role: ${error}`)
                setRole(null);
            }
            finally {
                    setLoading(false);
            }
        });

        return () => unsub();
    }, []);

    const value = {
        user,
        role,
        loading,
    };

    if (loading) {
        return <p>Loading auth...</p>
    }
    
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;