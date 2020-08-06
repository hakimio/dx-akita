import {diff} from 'deep-object-diff';
import {isObject} from 'devextreme/core/utils/type';

export class GeneralUtils {

    public static diff(originalObj: object, updatedObj: object): object {
        const changes = diff(originalObj, updatedObj);

        this.fixIdsAndArrayProperties(originalObj, updatedObj, changes);

        return changes;
    }

    private static fixIdsAndArrayProperties(originalObj: object, updatedObj: object, changes: object) {
        const changedKeys = Object.keys(changes);

        for (const key of changedKeys) {
            if (isObject(changes[key]) && isObject(originalObj[key])) {
                if (originalObj[key].id && !changes[key].id) {
                    changes[key].id = originalObj[key].id;
                }

                this.fixIdsAndArrayProperties(originalObj[key], updatedObj[key], changes[key]);
            } else if (Array.isArray(updatedObj[key])) {
                changes[key] = updatedObj[key];
            }
        }
    }

    public static deepCopy(obj: object) {
        return JSON.parse(JSON.stringify(obj));
    }

}
