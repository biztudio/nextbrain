import sudokukit from '../middleware/sudokukit';
import React, { Component } from 'react';

export default class SudokuComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            answerMode:false,
            sudokuGroups:[],
            sudokuAnswer:[],
            checkResult:{}
        };
        this.numeric_only = this.numeric_only.bind(this);
        this.changeAnswerModeHandle = this.changeAnswerModeHandle.bind(this);
        this.checkHandleEvent = this.checkHandleEvent.bind(this);
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
        
        this.setState({checkResult:{message:'', result:false}})
        let sudokugroupindex = e.target.getAttribute('data-sudokugroupindex');
        let sudokuindex = e.target.getAttribute('data-sudokuindex');
        let valueAnswer = 0;
        if(e.charCode < 49 || e.charCode > 57){
            alert('请输入1到9之间的数字');
        }
        else{
            valueAnswer = e.charCode - 48;
        }

        for(let gcindex = 0; gcindex < this.state.sudokuAnswer[sudokugroupindex].answer.length; gcindex++){
                
            if(this.state.sudokuAnswer[sudokugroupindex].answer[gcindex].index == sudokuindex){

                this.state.sudokuAnswer[sudokugroupindex].answer[gcindex].answer=valueAnswer
                this.setState({sudokuAnswer:this.state.sudokuAnswer}, ()=>{

                });
                break;
            }
        }
    }

    changeAnswerModeHandle(e){
        this.setState({answerMode:e.target.checked});
        this.setState({checkResult:{message:'', result:false}})
    }

    getSudokuData(level){
        this.setState({checkResult:{message:'', result:false}})
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
        
        this.setState({sudokuAnswer:sudokuGroups.map(g => {
            return { 
                answer:g.data.slice(0).map(d => { return {index:d.index, answer:d.display, refer: d.value};}), 
                index:g.index};})
            });
       
        return sudokuGroups;
    }

    checkHandleEvent(event){
        
        let sudokuResult = []
        let sudokuSize = 81;
        for(let index = 0; index < sudokuSize; index++) sudokuResult.push(0);
        for(let groupIndex = 0; groupIndex < this.state.sudokuAnswer.length; groupIndex++){ 
            for(let giIndex = 0; giIndex < this.state.sudokuAnswer[groupIndex].answer.length; giIndex++){
                sudokuResult[this.state.sudokuAnswer[groupIndex].answer[giIndex].index] = this.state.sudokuAnswer[groupIndex].answer[giIndex].answer;
            }
        }
       
        //console.log(sudokuResult)
        let result = sudokukit.checkSudoku(sudokuResult)
        let errorMessage = ''
        //console.log(result)
        if(!result.validation){
            if(result.check == 1){
                errorMessage = `拜托再检查一下第 ${result.refindex  + 1} 分组块`;
            }
            else if(result.check == 2){
                let lineIndex = sudokukit.getLineIndex(result.refindex)
                errorMessage = `拜托再检查一下第 ${lineIndex  + 1} 行`;
            }
            else if(result.check == 3){
                let colIndex = sudokukit.getColumnIndex(result.refindex)
                errorMessage = `拜托再检查一下第 ${colIndex  + 1} 列`;
            }
        }

        this.setState({checkResult:{message:(result.validation?'回答正确:)':errorMessage), result:result.validation}})
    }

    renderSudoku () {
        
        return(
            <div className='container'>
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
                                                        <input type="text" onKeyPress={this.numeric_only} key={sd.index} data-sudokugroupindex={sg.index} data-sudokuindex={sd.index} className='sudokuanswer' autoComplete='off' maxLength='1'/>
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

                    <div className='sudokuOpBar'>
                        <div className='sudokusettingbar'>
                            <button  className='sudokusettinginput' onClick={this.checkHandleEvent} disabled={this.state.answerMode}>检查我的答案</button>
                            <label className='sudokusettinglabel' htmlFor = 'showAnswer'>显示参考答案:</label>
                            <input type='checkbox' className='sudokusettinginput' name='showAnswer' defaultChecked={this.state.answerMode} onChange={this.changeAnswerModeHandle} ></input>
                           
                        </div> 
                        <div>
                            <label className='sudokuresutlmessage' >{this.state.checkResult.message}</label>
                        </div>
                    </div>

                </div>       
                <style jsx>{`
                    .container{
                        margin-bottom:50px;
                    }
                    .sudokucontainer{
                        display:flex;
                        flex-direction:row;
                        flex-wrap: wrap;
                        justify-content:space-around;
                        background:#000;
                        width:348px;
                        height:345px;
                        margin:20px;
                        
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
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
                        margin-left:6px;
                        border:0;
                        font-size:32px;
                        font-family: "黑体","宋体",'Arial',sans-serif;
                    }
                    .sudokuOpBar{
                        display:flex;
                        flex-direction:column;
                        justify-content:flex-start;
                        margin-top:10px;
                    }
                    .sudokusettingbar{
                        display:flex;
                        justify-content:flex-start;
                        margin-top:3px;
                    }
                    .sudokusettinglabel{
                        margin-right:5px;
                    }
                    .sudokusettinginput{
                        margin-right:50px;
                    }
                    .sudokuresutlmessage{
                        display:flex;
                        justify-content:center;
                        margin-top:3px;
                    }

                    @media print {
                        .sudokuOpBar {
                            display: none;
                        }
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
