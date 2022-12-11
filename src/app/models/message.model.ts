export class GroupMessage{
  idCustomer: string
  nameCustomer: string
  isSeen: boolean
  totalNew: number
  date: number
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
