## Entities:

Desk: {
  _id: ObjectId,
  number: number,
  client: string,
  items: LineItem[],
  totalPrice: number,
  state: 'not-paid' | 'paid' | 'closed',
  date: Date,
  paymentMethod: PaymentMethod[],
  discountedPrice: number
}

LineItem: {
  _id: ObjectId,
  item: Item
  quantity: number,
  finalPrice: number
}

Item: {
  _id: ObjectId,
  name: string,
  price: number,
  icon: image
}

MonthlyBalance: {
  _id: ObjectId,
  month: string,
  year: number,
  desks: Desk[],
  bestItem: Item[],
  bestPaymentMethod: PaymentMethod[],
  totalCash: number
}

PaymentMethod: {
  _id: ObjectId,
  name: string,
  discount: number
}

Menu: {
  lastUpdate: Date,
  sections: MenuSection[]
}

MenuSections: {
  _id: ObjectId,
  name: string,
  items: Items[]
}