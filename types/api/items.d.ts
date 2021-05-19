import type { Item } from '..'

type ItemWithoutId = Omit<Item, 'id'>

export namespace Add {
  export interface I {
    items: ItemWithoutId[]
  }
}

export namespace Edit {
  export interface I {
    id: Item['id']
    item: Partial<ItemWithoutId>
  }
}

export namespace Delete {
  export interface I {
    id: Item['id']
  }
}
