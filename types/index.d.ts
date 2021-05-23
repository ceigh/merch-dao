export interface User {
  username: string
  isAdmin: boolean
}

export interface Item {
  id: string
  name: string
  description: string
  images: string[]
  // natural number, -1 for unlimited
  quantity: number
}

export interface Options {
  scope: string
  currentItem: Item['id']
}
