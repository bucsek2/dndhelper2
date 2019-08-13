export class Dice {
    static d100(): number {
        return Dice.getRndInteger(1, 100);
    }

    static d20(): number {
        return Dice.getRndInteger(1, 20);
    }

    static d12(): number {
        return Dice.getRndInteger(1, 12);
    }

    static d10(): number {
        return Dice.getRndInteger(1, 10);
    }

    static d8(): number {
        return Dice.getRndInteger(1, 8);
    }

    static d6(): number {
        return Dice.getRndInteger(1, 6);
    }

    static d4(): number {
        return Dice.getRndInteger(1, 4);
    }

    static d2(): number {
        return Dice.getRndInteger(1, 2);
    }

    private static getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
