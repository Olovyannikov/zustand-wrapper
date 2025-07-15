import { changeByAmount, getCounter } from '../model';

export const addTen = () => {
    const counter = getCounter();

    if (counter < 0) {
        changeByAmount(-10);
        return;
    }

    changeByAmount(10);
};
