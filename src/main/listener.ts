import { deskController } from "./desk.controller"
import { Desk } from "@shared/types/Desk"
import { productController } from "./product.controller"

const { ipcMain } = require('electron')

function listen() {
    ipcMain.handle('getHistory', (_) => deskController.getHistory())
    ipcMain.handle('updateHistory', (_, updatedDesk: Desk) => deskController.updateHistory(updatedDesk))
    ipcMain.handle('removeFromHistory', (_, removeDesk: Desk) => deskController.removeFromHistory(removeDesk))
    
    ipcMain.handle('getDesks', (_) => deskController.getDesks())
    ipcMain.handle('createDesk', (_, newDesk: Desk) => deskController.createDesk(newDesk))
    ipcMain.handle('updateDesk', (_, updatedDesk: string) => deskController.updateDesk(updatedDesk))
    ipcMain.handle('removeDesk', (_, removedDesk: Desk) => deskController.removeDesk(removedDesk))

    ipcMain.handle('getProducts', (_) => productController.getProducts())
}

export const listener = { listen }