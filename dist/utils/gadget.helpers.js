"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSuccessProbability = exports.generateCodename = void 0;
const generateCodename = () => {
    const names = ["The Nightingale", "The Kraken", "Shadow Hawk", "Ghost Fang", "Red Viper"];
    return names[Math.floor(Math.random() * names.length)];
};
exports.generateCodename = generateCodename;
const generateSuccessProbability = () => {
    const percent = Math.floor(Math.random() * 41) + 60;
    return `${percent}% success probability`;
};
exports.generateSuccessProbability = generateSuccessProbability;
