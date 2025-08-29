import { AuthContext } from "@contexts";
import { Layout } from "@components";
import { useContext, useEffect } from "react";


export default function Home(prop: any) {

 const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
     <Layout />
    </>
  )
}