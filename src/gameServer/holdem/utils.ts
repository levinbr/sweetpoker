/**
 * Функция вычисляет позицию следующего игрока
 * @param {number} position - текущее место игрока
 * @param {number} positions - все занятые места за столом
 * @returns {number} место следующего игрока
 */
export const getNextPosition = (position: number, positions: number[]) => {
    if(position === positions[positions.length - 1]) return positions[0];

    return positions[positions.indexOf(position) + 1];
}