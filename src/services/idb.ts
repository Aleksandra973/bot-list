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
           console.log(BotService.db)
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









/*async function demo() {
    const db = await openDB<BotDB>('bots-db', 1, {
        upgrade(db) {
            db.createObjectStore('favourite-number');

            const productStore = db.createObjectStore('products', {
                keyPath: 'productCode',
            });
            productStore.createIndex('by-price', 'price');
        },
    });

    // This works
    await db.put('favourite-number', 7, 'Jen');
    // This fails at compile time, as the 'favourite-number' store expects a number.
    await db.put('favourite-number', 'Twelve', 'Jake');
}


class IndexedDb {
    private database: string;
    private db: any;
    constructor(database: string) {
        this.database = database;
    }

    public async createObjectStore(tableNames: string[]) {
        try {
            this.db = await openDB(this.database, 1, {
                upgrade(db: IDBPDatabase) {
                    for (const tableName of tableNames) {
                        if (db.objectStoreNames.contains(tableName)) {
                            continue;
                        }
                        db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
                    }
                },
            });
        } catch (error) {
            return false;
        }
    }

    public async getValue(tableName: string, id: number) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        console.log('Get Data ', JSON.stringify(result));
        return result;
    }

    public async getAllValue(tableName: string) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.getAll();
        console.log('Get All Data', JSON.stringify(result));
        return result;
    }

    public async putValue(tableName: string, value: object) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.put(value);
        console.log('Put Data ', JSON.stringify(result));
        return result;
    }

    public async putBulkValue(tableName: string, values: object[]) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        for (const value of values) {
            const result = await store.put(value);
            console.log('Put Bulk Data ', JSON.stringify(result));
        }
        return this.getAllValue(tableName);
    }

    public async deleteValue(tableName: string, id: number) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        if (!result) {
            console.log('Id not found', id);
            return result;
        }
        await store.delete(id);
        console.log('Deleted Data', id);
        return id;
    }
}

export default IndexedDb;
*/

/*

const DB_NAME: string = 'botdb'
const STORAGE_NAME: string = 'bots'
const DB_VERSION: number = 1
let DB
export default {
    async getDb () {
        return new Promise((resolve, reject) => {
            if (DB) {
                return resolve(DB)
            }
            const request = window.indexedDB.open(DB_NAME, DB_VERSION)
            request.onerror = e => {
                console.log('Error opening db', e)
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('Error')
            }
            request.onsuccess = e => {
                DB = e.target.result
                resolve(DB)
            }
            request.onupgradeneeded = e => {
                let db = e.target.result
                db.createObjectStore(STORAGE_NAME, { autoIncrement: true, keyPath: 'id' })
            }
        })
    },
    async deleteBot (book) {
        const db = await this.getDb()
        return new Promise(resolve => {
            const trans = db.transaction([STORAGE_NAME], 'readwrite')
            trans.oncomplete = () => {
                resolve()
            }
            const store = trans.objectStore(STORAGE_NAME)
            store.delete(book.id)
        })
    },
    async getBooks () {
        let db = await this.getDb()
        return new Promise(resolve => {
            let trans = db.transaction([STORAGE_NAME], 'readonly')
            trans.oncomplete = () => {
                resolve(books)
            }
            const store = trans.objectStore(STORAGE_NAME)
            const books = []
            store.openCursor().onsuccess = e => {
                const cursor = e.target.result
                if (cursor) {
                    books.push(cursor.value)
                    cursor.continue()
                }
            }
        })
    },
    async saveBot (book) {
        let db = await this.getDb()
        return new Promise(resolve => {
            let trans = db.transaction([STORAGE_NAME], 'readwrite')
            trans.oncomplete = () => {
                resolve()
            }
            let store = trans.objectStore(STORAGE_NAME)
            store.put(book)
        })
    }
}*/
