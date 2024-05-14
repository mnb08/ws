import { WebSocketServer } from "ws";
import {v4 as uuid} from 'uuid'

const wss = new WebSocketServer({noServer: true})
const clients = {}
const messages = []

wss.on('connection', (ws) => {
    const id = uuid()
    clients[id] = ws

    ws.on('message', (rawMessage) => {
        console.log(rawMessage.toString())

        messages.push(rawMessage.toString())


        for( let id in clients){
            clients[id].send(JSON.stringify(messages))
        }
    })
})