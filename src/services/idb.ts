import { IDBPDatabase, openDB, DBSchema } from 'idb/with-async-ittr.js';
import { Bot} from "@/types/common";

interface BotDB extends DBSchema {
    bots: {
        value: {
            id: number;
            name: string;
            description: string;
            image?: string;
            date: Date;
        } ;
        key: number;
    };
}

export class BotService {
    private static db: IDBPDatabase<BotDB>;
    private static initialized: boolean = false;

    static async init(){
        if(BotService.initialized)
            return

        await BotService.createObjectStore()
        BotService.initialized = true;
    };


    static async createObjectStore() {
       try {
           BotService.db = await openDB<BotDB>('bots-db', 1, {
               upgrade(db) {
                   db.createObjectStore('bots', {autoIncrement: true, keyPath:'id'});
               },
           })
       } catch (error) {
           return false;
       }
    };

    static async saveBot(bot: Bot): Promise<number> {
        await BotService.init();
        const tx = BotService.db.transaction('bots', 'readwrite');
        const store = tx.objectStore('bots');
        const result = await store.put(bot);
        return result;
    };

    static async deleteBot(botId: number): Promise<void> {
        await BotService.init();
        const tx = BotService.db.transaction('bots', 'readwrite');
        const store = tx.objectStore('bots');
        await store.delete(botId);
    };

    static async getBots(): Promise<Bot[]> {
        await BotService.init();
        const tx = BotService.db.transaction('bots', 'readonly');
        const store = tx.objectStore('bots');
        const result = await store.getAll();
        return result;
    }

}




