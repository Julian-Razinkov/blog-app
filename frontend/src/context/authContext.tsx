import React, { useContext, createContext, ReactNode, useEffect, useState } from "react";
import { gql } from "../__generated__";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Loading } from "../components/loading";


type AuthContext = {
  id: string;
  email: string;
  name: string;
}

const context = createContext<AuthContext | null>(null)

export function AuthContext({ children }: { children: ReactNode }) {
  const { data, loading } = useQuery(userQuery);
  const [userState, setUserState] = useState<AuthContext | null>(null)
  const location = useLocation()

  useEffect(() => {
    if (data?.userOne != null) {
      setUserState(data.userOne)
    }
  }, [data]);


  if (loading) return <Loading></Loading>
  if (data == null && !location.pathname.includes('/login')) return <Navigate to="/login" replace />

  return <context.Provider value={userState}>{children}</context.Provider>
}

export function useAuth() {
  const authContext = useContext(context);

  if (!authContext) throw new Error('AuthContext should be used inside of Auth provider')

  return authContext
}

const userQuery = gql(`
  query AuthUser{
    userOne{
      id
      name
      email
    }
  }
`)