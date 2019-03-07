import sudokukit from '../middleware/sudokukit';
import React, { Component } from 'react';

export default class SudokuComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            answerMode:false,
            sudokuGroups:[]
        };
        this.numeric_only = this.numeric_only.bind(this);
        this.changeAnswerModeHandle = this.changeAnswerModeHandle.bind(this);
    }

    componentWillMount () { 
        console.log('componentWillMount@SudokuComponent')
        this.setState({sudokuGroups:this.getSudokuData(this.props.level)})
    }

    //https://infoq.cn/article/2016/07/react-shouldComponentUpdate
    /* 
    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    */

    numeric_only(e){
        console.log(e.charCode)
        if(e.charCode >= 49 && e.charCode <= 57){
            
        }
        else{
            alert('请输入1到9之间的数字')
        }
    }

    changeAnswerModeHandle(e){
        this.setState({answerMode:e.target.checked});
    }

    getSudokuData(level){
    
        let puzzle = sudokukit.getSudokuPuzzle(level).SudokuPuzzle//level is between 2 and 6
        let sudokuGroups = [];
       
        let cellsInGroup = [];
        let groupIndex = 0;
        
        let startIndes = sudokukit.getStartIndesInGrids()
        for(let gi_index of startIndes){
            let sindes = sudokukit.getIndexListInGrid(gi_index, startIndes)
            for(let sindex of sindes){
                cellsInGroup.push(puzzle[sindex]);
            }
            sudokuGroups.push({data:cellsInGroup.slice(0), index:groupIndex});
            cellsInGroup = [];
            groupIndex++;
        }
    
        return sudokuGroups;
    }

    renderSudoku () {
        
        return(
            <div>
                <div className='sudokucontainer' >
    
                    { 
                        this.state.sudokuGroups .map(sg => 
                        <div  className='sudokugroup' key={sg.index}> 
                            {sg.data.map(sd => 
    
                                {
                                    if(sd.display > 0){
                                        return <div className='sudokucell sudokudisplay' key={sd.index}>{sd.display}</div>
                                    }
                                    else{
                                        if(!this.state.answerMode){
                                            return <div className='sudokucell sudokudisplay' key={sd.index}>
                                                        <input type="text" onKeyPress={this.numeric_only} className='sudokuanswer' autoComplete='off' maxLength='1'/>
                                                    </div>
                                        }
                                        else{
                                            return <div className='sudokucell sudokuhint' key={sd.index}>{sd.value}</div>
                                        }
                                    }
                                }
    
                            )}
                        </div>) 
                    }
                    <div className='settingbar'>
                        <label className='settinglabel' htmlFor = 'showAnswer'>显示解答:</label>
                        <input type='checkbox' className='settinginput' name='showAnswer' defaultChecked={this.state.answerMode} onChange={this.changeAnswerModeHandle} ></input>
                    </div>   
                </div>       
                <style jsx>{`
                    .sudokucontainer{
                        display:flex;
                        flex-direction:row;
                        flex-wrap: wrap;
                        justify-content:space-around;
                        background:#000;
                        width:348px;
                        height:345px;
                        margin:20px;
                    }
                    .sudokugroup{
                        display:flex;
                        flex-direction:row;
                        flex-wrap: wrap;
                        justify-content:space-around;
                        background:#000;
                        font-size:32px;
                        width: 111px;
                        height: 111px;
                        margin-top:3px;
                    }
                    .sudokucell{
                        width:36px;
                        height:36px;
                        display:flex;
                        justify-content:center;
                        background:#E3EDCD;
                    }
                    .sudokudisplay{
                        color:#000
                    }
                    .sudokuhint{
                        color: gray;
                    }
                    .sudokuanswer{
                        width:26px;
                        height:34px;
                        background:#E3EDCD;
                        color: purple;
                        margin-left:8px;
                        border:0;
                        font-size:32px;
                        font-family: "黑体","宋体",'Arial',sans-serif;
                    }
                    .settingbar{
                        display:flex;
                        justify-content:center;
                        margin-top:10px;
                        
                    }
                    .settinglabel{
                        margin-right:20px;
                    }
                    .settinginput{
                        margin-right:50px;
                    }
                `}</style>
            </div>)
    }

    render () {
        let sudosuks = []
        console.log('render@SudokuComponent')
        
        return (
            <div>
                { this.renderSudoku() }
            </div>
        )
    }
};
