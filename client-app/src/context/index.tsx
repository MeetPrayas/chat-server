import React from "react"
import { ConnectionProvider } from "./connection-conext"

interface Props {
  children: JSX.Element
}

const AppProvider = (props: Props) => {
  const { children } = { ...props }
  return <ConnectionProvider>{children}</ConnectionProvider>
}

export default AppProvider
