export class GroupMessage{
  idCustomer: string
  nameCustomer: string
  messengers: Message[]
}
export class Message{
    idMessage: string
    senderName: string
    sendDate: number
    content: string
    senderId: string
    receiverId: string = null
}
