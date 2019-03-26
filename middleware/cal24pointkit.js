import mathkit from './mathkit';
import * as math from 'mathjs';

const patterns = [
    'heart',//红桃
    'spade',//黑桃
    'club', //梅花
    'diamond'//方片
];

const EXPECT_RESULT = 24;

const recursive2Parts = (digits, targetNumber, steps_stack) => {
        
    let checkResult = false;
    let currentSolution = {};
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

                if(restDigits.length == 1) console.log(`restDigits: ${restDigits}`)

                let calculatedIndex = -1;
                let opFlag = 1;
                if(!checkResult){
                    restDigits.push((curDigit1 + curDigit2));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    if(checkResult){
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(index2 == digits.length - 1)});
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }
        
                if(!checkResult){
                    restDigits.push((curDigit1 * curDigit2));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    opFlag = 3;
                    if(checkResult){
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(index2 == digits.length - 1)});
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }
        
                if(!checkResult){
                    restDigits.push((curDigit1 - curDigit2));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    opFlag = 2;
                    if(checkResult){
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(index2 == digits.length - 1)});
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }
        
                if(!checkResult){
                    restDigits.push((curDigit2 - curDigit1));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    opFlag = 2;
                    if(checkResult){
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(index2 == digits.length - 1)});
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }
        
                if(!checkResult && curDigit2 != 0){
                    restDigits.push(math.fraction(curDigit1 / curDigit2));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    opFlag = 4;
                    if(checkResult){
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(index2 == digits.length - 1)});
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }
        
                if(!checkResult && curDigit1 != 0){
                    restDigits.push(math.fraction(curDigit2 / curDigit1));
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    opFlag = 4;
                    if(checkResult){
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(index2 == digits.length - 1)});
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }

            }
        }

        //if(checkResult) console.log(currentSolution);

    }
    
    return {
        valid: checkResult,
        solution: currentSolution
    };
};

export default{
    getPuzzle(level){//level between 2 and 5?
        let puzzle = {puzzleNumbers:[]};
        for(let i = 0; i < level; i++){
            
        }
        return puzzle;
    },

    determine4DigitsMeet24Point(digits){
        if(!digits || digits.length < 1) return false;

        let calresult = 0;
        calresult = digits.reduce((total, n) => total+n);
        if(EXPECT_RESULT == calresult) return {
            valid: true,
            solution: digits.reduce((totalCal, n) => totalCal + ' + ' + n)
        };

        calresult = 0;
        calresult = digits.reduce((total, n) => total*n);
        if(EXPECT_RESULT == calresult) return {
            valid: true,
            solution: digits.reduce((totalCal, n) => totalCal + ' x ' + n)
        };

        calresult = 0;
        let checkFlag = false;
        let steps_stack = [];
        let validation = recursive2Parts(digits, EXPECT_RESULT, steps_stack);
        
        let solution = '';
        if(validation.valid && steps_stack){
            
            for(let stepIndex = steps_stack.length - 1; stepIndex >= 0; stepIndex--){
                
                let step = steps_stack[stepIndex];
                let opString = step.op == 1? '+' : (step.op == 2? '-': (step.op == 3? 'x':'/'))
                if(!step.containCalculatedDigit){
                    solution += `${step.digit1} ${opString} ${step.digit2}`; 
                }
                else{
                    solution = `${step.digit1} ${opString} ${solution}`;
                }

                if(step.op < 3 && stepIndex > 0){
                    solution = `(${solution})`;
                }

            }
        }

        console.log(steps_stack)

        return {
            valid: validation.valid,
            solution: solution
        };
    }
}

//Refer 
//https://blog.csdn.net/qq_40938169/article/details/82453743