import mathkit from './mathkit';
import * as math from 'mathjs';

const patterns = [
    'heart',//红桃
    'spade',//黑桃
    'club', //梅花
    'diamond'//方片
];

const EXPECT_RESULT = 24;

const recursive2Parts = (digits, targetNumber) => {
        
    let checkResult = false;
    if(digits.length == 1){
        checkResult = digits[0] == targetNumber;
    }
    else{
        
        for(let index1 = 0; index1 < digits.length - 1; index1++){
            for(let index2 = index1 + 1; index2 < digits.length; index2++){

                let curDigit1 = digits[index1];
                let curDigit2 = digits[index2];

                let restDigits = [];
                for(let di = 0; di < digits.length; di++){
                    if(di != index1 && di != index2) {
                        restDigits.push(digits[di]);
                    }
                }

                if(!checkResult){
                    restDigits.push((curDigit1 + curDigit2));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber);
                    restDigits.pop();
                }
        
                if(!checkResult){
                    restDigits.push((curDigit1 * curDigit2));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber);
                    restDigits.pop();
                }
        
                if(!checkResult){
                    restDigits.push((curDigit1 - curDigit2));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber);
                    restDigits.pop();
                }
        
                if(!checkResult){
                    restDigits.push((curDigit2 - curDigit1));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber);
                    restDigits.pop();
                }
        
                if(!checkResult && curDigit2 != 0){
                    restDigits.push(math.fraction(curDigit1 / curDigit2));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber);
                    restDigits.pop();
                }
        
                if(!checkResult && curDigit1 != 0){
                    restDigits.push(math.fraction(curDigit2 / curDigit1));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber);
                    restDigits.pop();
                }

            }
        }
    }
    
    return checkResult;
};

export default{
    getPuzzle(level){//level between 2 and 5
        let puzzle = {puzzleNumbers:[]};
        for(let i = 0; i < level; i++){
            
        }
        return puzzle;
    },

    determine4DigitsMeet24Point(digits){
        if(!digits || digits.length < 1) return false;

        let calresult = 0;
        calresult = digits.reduce((total, n) => total+n);
        if(EXPECT_RESULT == calresult) return true;

        calresult = 0;
        calresult = digits.reduce((total, n) => total*n);
        if(EXPECT_RESULT == calresult) return true;

        calresult = 0;
        let checkFlag = false;
        checkFlag = checkFlag || recursive2Parts(digits, EXPECT_RESULT);

        return checkFlag;
    }
}

//Refer 
//https://blog.csdn.net/qq_40938169/article/details/82453743