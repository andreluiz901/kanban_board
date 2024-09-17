import { Card } from 'src/domain/entities/card'

export class CardPresenter {
  static toHTTP(card: Card) {
    return {
      id: card.id.toValue(),
      name: card.name,
      description: card.description,
      is_complete: card.isComplete,
      order: card.order,
      collumn_id: card.collumnId.toValue(),
    }
  }
}
