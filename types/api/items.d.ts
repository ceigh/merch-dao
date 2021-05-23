import type { Item } from '..'

type ItemWithoutId = Omit<Item, 'id'>

export namespace GetAll {
  export interface O {
    items: Item[]
  }
}

export namespace Get {
  export interface I {
    id: Item['id']
  }
  export interface O extends Item {}
}

export namespace Add {
  export interface I extends ItemWithoutId {}
}

export namespace Update {
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
