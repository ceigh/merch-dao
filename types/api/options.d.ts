import { Options } from '..'

export namespace Create {
  export interface I extends Options {}
}

export namespace Get {
  export interface I {
    scope: Options['scope']
  }
  export interface O extends Options {}
}

export namespace Update {
  export interface I {
    scope: Options['scope']
    options: Partial<Omit<Options, 'scope'>>
  }
}
