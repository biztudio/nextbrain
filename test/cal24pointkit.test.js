import checker4Digits from '../middleware/cal24pointkit';

describe('Test verification fucntion', () => {
    test('[1,3,4,6] => true: 6 / (1 - 3/4) = 24', () => {
        let digits =  [1,3,4,6];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

    return;
    
    test('[4, 1, 8, 7] => true: (8-4) * (7-1) = 24', () => {
        let digits =  [4, 1, 8, 7];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

    test('[1, 4, 7, 8] => true: (8-4) * (7-1) = 24', () => {
        let digits =  [1, 4, 7, 8];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

    test('[1, 5, 7, 9] => true: (9-5) * (7-1) = 24', () => {
        let digits =  [1, 5, 7, 9];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

    test('[1, 4, 5, 9] => true: (4-1) * 5 + 9 = 24', () => {
        let digits =  [1, 4, 5, 9];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

    test('[1, 2, 1, 2] => false', () => {
        let digits =  [1, 2, 1, 2];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeFalsy();
    })

    test('[1,2,3,4] => true: 1*2*3*4 = 24', () => {
        let digits =  [1,2,3,4];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

    test('[1,9,1,2] => true: (9-1) * (1+2) = 24', () => {
        let digits =  [1,9,1,2];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

    test('[3,3,8,8] => true: 8/(3-(8/3)) = 24', () => {
        let digits =  [3,3,8,8];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

    test('[3,8] => true: 3 * 8 = 24', () => {
        let digits =  [3,8];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

    test('[1,2,3,4,4] => true: (4+4)*3*(2-1) = 24', () => {
        let digits =  [1,2,3,4,4];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

});


describe('Test generator fucntion', () => {

    test('[1,2,3,4,4] => true: (4+4)*3*(2-1) = 24', () => {
        let digits =  [1,2,3,4,4];
        let result = checker4Digits.determine4DigitsMeet24Point(digits);
        expect(result).toBeTruthy();
    })

});