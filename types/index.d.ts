import { orderStatuses} from '../helpers/const'

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

export interface Order {
  id: string
  status: keyof typeof orderStatuses
  item: Item['id']
  quantity: number
  recipient: {
    name: {
      firstName: string
      patronymic?: string
      lastName: string
    }
    email?: string
    phone: string
  }
  address: {
    zip: string
    country: string
    region: string
    city: string
    street: string
    building: string
    apartment: string
  }
}

export interface Options {
  scope: string
  currentItem: Item['id']
}
