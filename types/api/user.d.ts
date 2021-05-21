import type { User } from '..'

export namespace Get {
  export interface O extends User {}
}

export namespace GetAll {
  export interface O {
    users: User[]
  }
}

export namespace Delete {
  export interface I {
    username: User['username']
  }
}
