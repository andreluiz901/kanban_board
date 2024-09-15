import { Card } from 'src/domain/entities/card'

export abstract class CardsRepository {
  abstract create(card: Card): Promise<void>
  abstract findById(cardId: string): Promise<Card | null>
  abstract delete(cardId: string): Promise<void>
  abstract update(card: Card): Promise<void>
}
