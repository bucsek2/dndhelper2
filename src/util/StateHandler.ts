import * as Cookies from 'es-cookie';
import { SurvivalHelperState } from './../component/survivalHelper/SurvivalHelper';

const PREFIX = '5e-helper-';

export class StateHandler {
    private constructor(){}

    public static saveState<T>(key: string, state: T): void {
        let jsonString = JSON.stringify(state);

        Cookies.set(PREFIX + key, jsonString, {expires: 14});
    }

    public static saveSurvivalState(state: SurvivalHelperState): void {
        this.saveState("survival-state", state);
    }

    public static getSurvivalState(): SurvivalHelperState | undefined {
        return this.getState("survival-state");
    }

    public static getState<T>(key: string): T | undefined {
        let jsonString = Cookies.get(PREFIX + key);

        if(!jsonString){
            return undefined;
        }

        let obj: T = JSON.parse(jsonString)
        return obj;
    }
}
