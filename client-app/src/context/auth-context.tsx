import * as React from "react"

interface User {
  name: string | null
  id: string | null
  accesToken: string | null
}

const AuthContext = React.createContext<User | null | undefined>(null)
AuthContext.displayName = "AuthContext"

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`)
  }
  return context
}

export { useAuth }
