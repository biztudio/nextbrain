import mathkit from './mathkit';
import * as math from 'mathjs';

const EXPECT_RESULT = 24;

const expandSolution = (stepIndex, stepStack) =>{
    
    let step = stepStack[stepIndex];
      
    let opString = step.op == 1? '+' : (step.op == 2? '-': (step.op == 3? 'x':'÷'));
    let stepString = '';           
    if(step.digit1.iscalculated && step.digit2.iscalculated){
        stepString = expandSolution( stepIndex + 2,stepStack) + ` ${opString} ` + expandSolution(stepIndex + 1,stepStack);
    }
    else if(step.digit1.iscalculated && !step.digit2.iscalculated){
        stepString = expandSolution(stepIndex + 1,stepStack)  + ' ' + step.stepString;
    }
    else if(step.digit2.iscalculated && !step.digit1.iscalculated){
        stepString = step.stepString + ' ' + expandSolution(stepIndex + 1,stepStack);
    }
    else if(!step.digit1.iscalculated && !step.digit2.iscalculated){
        stepString = step.stepString;
    }

    if(step.op < 3 && stepIndex > 0) stepString = '(' + stepString + ')';

    return stepString;
};

const recursive2Parts = (digits, targetNumber, steps_stack) => {
        
    let checkResult = false;
    let currentSolution = {};
    if(digits.length == 1){
        checkResult = digits[0].value == targetNumber;
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

                let opFlag = 1;
                let opString = '';
                let exp1 = curDigit1.iscalculated?'':curDigit1.value;
                let exp2 = curDigit2.iscalculated?'':curDigit2.value;
                if(!checkResult){
                    restDigits.push({iscalculated:true, value:(curDigit1.value + curDigit2.value)});
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    if(checkResult){
                        opString = '+';
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(curDigit1.iscalculated || curDigit2.iscalculated),
                            stepString: `${exp1} ${opString} ${exp2}`
                        });
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }
        
                if(!checkResult){
                    restDigits.push({iscalculated:true, value:(curDigit1.value * curDigit2.value)});
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    opFlag = 3;
                    if(checkResult){
                        opString = 'x';
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(curDigit1.iscalculated || curDigit2.iscalculated),
                            stepString: `${exp1} ${opString} ${exp2}`
                        });
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }
        
                if(!checkResult){
                    restDigits.push({iscalculated:true, value:(curDigit1.value - curDigit2.value)});
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    opFlag = 2;
                    if(checkResult){
                        opString = '-';
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(curDigit1.iscalculated || curDigit2.iscalculated),
                            stepString: `${exp1} ${opString} ${exp2}`
                        });
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }
        
                if(!checkResult){
                    restDigits.push({iscalculated:true, value:(curDigit2.value - curDigit1.value)});
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    opFlag = 2;
                    if(checkResult){
                        opString = '-';
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(curDigit1.iscalculated || curDigit2.iscalculated),
                            stepString: `${exp2} ${opString} ${exp1}`
                        });
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }
        
                if(!checkResult && curDigit2.value != 0){
                    restDigits.push({iscalculated:true, value:math.fraction(curDigit1.value / curDigit2.value)});
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    opFlag = 4;
                    if(checkResult){
                        opString = '÷';
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(curDigit1.iscalculated || curDigit2.iscalculated),
                            stepString: `${exp1} ${opString} ${exp2}`
                        });
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }
        
                if(!checkResult && curDigit1.value != 0){
                    restDigits.push({iscalculated:true, value:math.fraction(curDigit2.value / curDigit1.value)});
                    checkResult = checkResult || recursive2Parts(restDigits.slice(0), targetNumber, steps_stack).valid;
                    opFlag = 4;
                    if(checkResult){
                        opString = '÷';
                        currentSolution = ({digit1:curDigit1, digit2:curDigit2, op: opFlag, containCalculatedDigit:(curDigit1.iscalculated || curDigit2.iscalculated),
                            stepString: `${exp2} ${opString} ${exp1}`
                        });
                        steps_stack.push(currentSolution);
                    }
                    restDigits.pop();
                }

            }
        }
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
        if(!digits || digits.length > 4) return { valid: false, solution: ''};

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
        let validation = recursive2Parts(digits.map(d => {return {iscalculated:false, value:d};}), EXPECT_RESULT, steps_stack);
        
        return {
            valid: validation.valid,
            solution: (validation.valid)?expandSolution(0, steps_stack):''
        };
    }
};

//Refer 
//https://blog.csdn.net/qq_40938169/article/details/82453743