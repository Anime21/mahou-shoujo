import { EnumTarget } from "./enums/enum-target.enum";

export class TargetUtils {

    static isFemaleTargeted(target: EnumTarget): boolean {
        let result = false;

        switch (target) {
            case EnumTarget.FemaleChild:
            case EnumTarget.FemaleTeen:
            case EnumTarget.FemaleYoungAdult:
            case EnumTarget.FemaleAdult:
                result = true;
                break;
            default:
        }

        return result;
    }

    static isMaleTargeted(target: EnumTarget): boolean {
        let result = false;

        switch (target) {
            case EnumTarget.MaleChild:
            case EnumTarget.MaleTeen:
            case EnumTarget.MaleYoungAdult:
            case EnumTarget.MaleAdult:
                result = true;
                break;
            default:
        }

        return result;
    }

    static isFemaleOrFamily(target: EnumTarget): boolean {
        return target == EnumTarget.Family || this.isFemaleTargeted(target);
    }

    static isMaleOrFamily(target: EnumTarget): boolean {
        return target == EnumTarget.Family || this.isMaleTargeted(target);
    }

    static isChildTargeted(target: EnumTarget): boolean {
        let result = false;

        switch (target) {
            case EnumTarget.FemaleChild:
            case EnumTarget.MaleChild:
            case EnumTarget.Child:
                result = true;
                break;
            default:
        }

        return result;
    }

    static isTeenTargeted(target: EnumTarget): boolean {
        let result = false;

        switch (target) {
            case EnumTarget.FemaleTeen:
            case EnumTarget.MaleTeen:
            case EnumTarget.Teen:
                result = true;
                break;
            default:
        }

        return result;
    }

    static isYoungAdultTargeted(target: EnumTarget): boolean {
        let result = false;

        switch (target) {
            case EnumTarget.FemaleYoungAdult:
            case EnumTarget.MaleYoungAdult:
            case EnumTarget.YoungAdult:
                result = true;
                break;
            default:
        }

        return result;
    }

    static isAdultTargeted(target: EnumTarget): boolean {
        let result = false;

        switch (target) {
            case EnumTarget.FemaleAdult:
            case EnumTarget.MaleAdult:
            case EnumTarget.Adult:
                result = true;
                break;
            default:
        }

        return result;
    }

    static isChildOrFamily(target: EnumTarget): boolean {
        return target == EnumTarget.Family || this.isChildTargeted(target);
    }

    static isTeenOrFamily(target: EnumTarget): boolean {
        return target == EnumTarget.Family || this.isTeenTargeted(target);
    }

    static isYoungAdultOrFamily(target: EnumTarget): boolean {
        return target == EnumTarget.Family || this.isYoungAdultTargeted(target);
    }

    static isAdultOrFamily(target: EnumTarget): boolean {
        return target == EnumTarget.Family || this.isAdultTargeted(target);
    }

    static isChildFriendly(target: EnumTarget): boolean {
        return this.isChildOrFamily(target);
    }

    static isTeenFriendly(target: EnumTarget): boolean {
        return this.isChildFriendly(target) || this.isTeenTargeted(target);
    }

    static isYoungAdultFriendly(target: EnumTarget): boolean {
        return this.isTeenFriendly(target) || this.isYoungAdultTargeted(target);
    }

    static isAdultFriendly(target: EnumTarget): boolean {
        return true;
    }

    static isFamilyFriendly(target: EnumTarget): boolean {
        return this.isChildFriendly(target);
    }
}
