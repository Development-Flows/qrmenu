export interface IProduct {
  badge: IBadge
  _id: string
  name: string
  description: string
  stock: number
  unit: string
  image: string
  priceSale: number
  isActive: boolean
  menuIds: string[]
  sort: number
  brand: string
  recordTime: number
}

export interface IBadge {
  icon: string
  text: string
}

export interface IGetProducts {
  status: Boolean
  error: string | null
  data: IProduct[]
}

export interface IRemoveProductRes{
    status:Boolean,
    error:null | string
}