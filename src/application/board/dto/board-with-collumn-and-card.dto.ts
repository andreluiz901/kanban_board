export interface BoardWithColumnsAndCardsDTO {
  id: string
  name: string
  description: string
  userId: string
  collumns: {
    id: string
    name: string
    boardId: string
    order: number
    cards: {
      id: string
      name: string
      description: string
      order: number
      isComplete: boolean
      collumnId: string
    }[]
  }[]
}
