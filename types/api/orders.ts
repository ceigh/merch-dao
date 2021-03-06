import type { Order } from '..'

export namespace GetAll {
  export interface O {
    orders: Order[]
  }
}

export namespace Create {
  export interface I extends Omit<Order, 'id' | 'status'> {}
  export interface O extends Pick<Order, 'id'> {}
}

export namespace Get {
  export interface I extends Pick<Order, 'id'> {}
  export interface O extends Order {}
}

export namespace UpdateStatus {
  export interface I extends Pick<Order, 'id'> {
    status: Order['status']
  }
}
