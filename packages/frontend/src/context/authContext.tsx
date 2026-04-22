import React, { useContext, createContext, ReactNode, useEffect, useState } from "react";
import { gql } from "../__generated__";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Loading } from "../components/loading";
import { publicRoutes } from "../constants/publicRoutes";
import { ApolloError } from "@apollo/client";



type AuthContext = {
  data: {
    id: string;
    email: string;
    name: string;
  } | undefined
  loading: boolean
  error: ApolloError | undefined
}

const context = createContext<AuthContext | null>(null)

export function AuthContext({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('token');
  const localtion = useLocation();

  if ((!token || token === '') && !publicRoutes.includes(localtion.pathname)) return <Navigate to="/" replace />
  const { data, loading, error, refetch } = useQuery(userQuery);

  // May not be the best approach to do it like so
  useEffect(() => {
    refetch()
  }, [token])

  return <context.Provider value={{ data: data?.userOne, error, loading }}>{children}</context.Provider>
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
