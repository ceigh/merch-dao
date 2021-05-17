export namespace AddAdmin {
  export interface I {
    username: string
    password: string
  }
}

export namespace SignIn {
  export interface I {
    username: string
    password: string
  }
  export interface O {
    secret: string
  }
}

export namespace SignOut {
  export interface I {
    allTokens?: boolean
  }
}

export namespace UpdatePassword {
  export interface I {
    oldPassword: string
    newPassword: string
    signOut?: boolean
  }
}
