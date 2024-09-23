import { Card } from 'src/domain/entities/card'

export class dataToUpdateCardOrder {
  cardId: string
  oldCardOrder: number
  newCardOrder: number
  oldCollumnId: string
  newCollumnId: string
}

export abstract class CardsRepository {
  abstract create(card: Card): Promise<void>
  abstract findById(cardId: string): Promise<Card | null>
  abstract delete(cardId: string): Promise<void>
  abstract update(card: Card): Promise<void>
  abstract toogleComplete(cardId: string): Promise<Card>
  abstract findLastCardByCollumnId(collumnId: string): Promise<Card | null>
  abstract updateCardOrder({
    cardId,
    oldCardOrder,
    newCardOrder,
    oldCollumnId,
    newCollumnId,
  }: dataToUpdateCardOrder): Promise<void>
}
