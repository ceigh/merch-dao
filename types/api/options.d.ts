import { Options } from '..'

export namespace Create {
  export interface I extends Options {}
}

export namespace Get {
  export interface I extends Pick<Options, 'scope'> {}
  export interface O extends Options {}
}

export namespace Update {
  export interface I extends Pick<Options, 'scope'> {
    options: Partial<Omit<Options, 'scope'>>
  }
}
