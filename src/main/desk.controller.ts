import fs from 'node:fs'
import { Desk } from '@shared/types/Desk'
import { LineItem } from '@shared/types/LineItem'

const HISTORY_PATH = `db/history.json`
const DESKS_PATH = `db/desks.json`

async function getHistory(): Promise<Desk[] | undefined>{
    let history: Desk[] = []
    try {
        history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf-8'))
        if(!!!history?.length) throw new Error('No history found')
    }catch(error) {
        console.error('Error getting history. ', error)
    }

    return history
}

async function updateHistory(updatedDesk: Desk): Promise<void>{
    let history = await getHistory()
    if(!!!history?.length) return

    let updatedHistory = history?.filter(desk => desk.id !== updatedDesk.id)
    updatedHistory?.push(updatedDesk)
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(updatedHistory))
}

async function removeFromHistory(deletedDesk: Desk): Promise<void>{
    let history = await getHistory()
    if(!!!history?.length) return

    let updatedHistory = history?.filter(desk => desk.id !== deletedDesk.id)
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(updatedHistory))
}

async function getDesks(): Promise<Desk[] | undefined>{
    let desks: Desk[] = []
    try {
        desks = JSON.parse(fs.readFileSync(DESKS_PATH, 'utf-8'))
        if(!!!desks?.length) throw new Error('No desks found')
    }catch(error) {
        console.error('Error getting desks. ', error)
    }

    return desks
}

async function createDesk(newDesk: Desk): Promise<void>{
    let desks = await getDesks()
    if(!!!desks?.length) return

    desks.push(newDesk)
    fs.writeFileSync(DESKS_PATH, JSON.stringify(desks))
}

async function updateDesk(stringDesk: string): Promise<Desk[] | undefined>{
    let updatedDesk = JSON.parse(stringDesk)
    if(!!updatedDesk.lineItems) {
        updatedDesk.totalAmount = updatedDesk.lineItems.reduce((acc: number, item: LineItem) => acc + (item.quantity * item.product.price), 0)
    }

    let desks = await getDesks()
    if(!!!desks?.length) return

    let updatedDesks = desks?.map(desk => {
        if(desk.id !== updatedDesk.id) return desk
        
        return { ...desk, ...updatedDesk }
    })
    
    try{
        fs.writeFileSync(DESKS_PATH, JSON.stringify(updatedDesks))
    }catch(error) {
        console.error('Error updating desk. ', error)
    }

    return updatedDesks
}

async function removeDesk(deletedDesk: Desk): Promise<void>{
    let desks = await getDesks()
    if(!!!desks?.length) return

    let updatedDesks = desks?.filter(desk => desk.id !== deletedDesk.id)
    fs.writeFileSync(DESKS_PATH, JSON.stringify(updatedDesks))
}

export const deskController = { getHistory, updateHistory, removeFromHistory, getDesks, createDesk, updateDesk, removeDesk }