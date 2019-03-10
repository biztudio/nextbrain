//import React, { Component } from 'react';
import cal24pointkit from '../middleware/cal24pointkit';

/**/
test('test level 2 puzzle length', () =>{
    let result1 = cal24pointkit.getPuzzle(2).puzzleNumbers.length;
    expect(result1).toBe(2);
   
});


test('test verification', ()=>{
    let result1 = 1;
    let result2 = 1;
    expect(result1).toBe(result2);
});
