export interface IUser {
  email: string
  username: string
  password: string
  password2: string
  date: Date
}

export interface IUserInputDTO {
  email: string
  username: string
  password: string
  password2?: string
  date?: Date
}

export interface userUniqueSearchInput {
  email: string
}
export interface Board {
  _id: any
  title: string
  contents: string
  date: Date
}

export interface BoardInputDTO {
  _id: any
  title: string
  contents?: string
  date?: Date
}
