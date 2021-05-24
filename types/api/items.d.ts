import type { Item } from '..'

type ItemWithoutId = Omit<Item, 'id'>

export namespace GetAll {
  export interface O {
    items: Item[]
  }
}

export namespace Create {
  export interface I extends ItemWithoutId {}
}

export namespace Get {
  export interface I extends Pick<Item, 'id'> {}
  export interface O extends Item {}
}

export namespace Update {
  export interface I extends Pick<Item, 'id'> {
    item: Partial<ItemWithoutId>
  }
}

export namespace Delete {
  export interface I extends Pick<Item, 'id'> {}
}
