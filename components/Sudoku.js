import sudokukit from '../middleware/sudokukit';
import React, { Component } from 'react';

const getSudokuData = level => {
    
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

export default class SudokuComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            answerMode:false
        };
        this.numeric_only = this.numeric_only.bind(this);
        this.changeAnswerModeHandle = this.changeAnswerModeHandle.bind(this);
    }

    componentWillMount () { 
        //this.setState({answerMode:false});
        console.log('componentWillMount@SudokuComponent')
    }

    numeric_only(e){
        console.log(e)
    }

    changeAnswerModeHandle(e){
        this.setState({answerMode:!this.state.answerMode});
    }

    renderSudoku (level, keyrefer) {
        keyrefer = keyrefer || 1;
    
        //defaultChecked={this.state.showAnswer} onChange={this.showAnserChangeHandleEvent}
        return(
            <div>
                <div className='sudokucontainer' key={keyrefer}>
    
                    { 
                        getSudokuData(level).map(sg => 
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
                        width:342px;
                        height:342px;
                        margin:20px;
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
                    .sudokugroup{
                        display:flex;
                        flex-direction:row;
                        flex-wrap: wrap;
                        justify-content:space-around;
                        background:#000;
                        font-size:32px;
                        width: 111px;
                        height: 111px;
                        margin-top:2px;
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
                `}</style>
            </div>)
    }

    render () {
        let sudosuks = []
        let count = (this.props.count||1);
        console.log('render@SudokuComponent')

        for(let sindex = 0; sindex < count; sindex++)
            sudosuks.push(<div key={sindex}>{this.renderSudoku(this.props.level, sindex)}</div>);

        return (
            <div>
                <div className='sudokupage'>
                    { sudosuks }
                </div>
            <style jsx>{`
                .sudokupage{
                    display:flex;
                    flex-direction:row;
                    flex-wrap: wrap;
                    justify-content:space-around;
                    width:95%;
                    
                }
            `}</style>
            </div>
        )
    }
};

//export default SudokuComponent;