import { Bot} from "@/types/common";

export interface BotsState {
    bots: Bot[]
}
export function state(): BotsState  {
    return  {
        bots: []
    }
}



export default state;