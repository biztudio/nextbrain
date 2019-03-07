import Layout from '../components/Layout';
import SudokuComponent from '../components/Sudoku';
import React, { Component } from 'react';

export default class Sudoku extends Component{ 
    constructor(props) {
        super(props);
        this.state = {
            level:3,
            count:1,
            sudokuList:[]
        };
        this.levelChangeHandleEvent = this.levelChangeHandleEvent.bind(this);
        this.countChangeHandleEvent = this.countChangeHandleEvent.bind(this);
        this.refreshHandleEvent = this.refreshHandleEvent.bind(this);
    }

    getSudokuList(){
        console.log('getSudokuList@SudokuPage')
        this.setState({sudokuList:[]}, ()=>{
            let sudokuList = [];
            for(let sindex = 0; sindex < this.state.count; sindex++){
                sudokuList.push(<SudokuComponent level={this.state.level} key={sindex}/>)
            }
            this.setState({sudokuList:sudokuList});
        });
    }

    levelChangeHandleEvent(event){
        this.setState({level:event.target.value}, this.getSudokuList());//NOTE: this is an async way. 
    }

    countChangeHandleEvent(event){
        this.setState({count:event.target.value}, this.getSudokuList());//NOTE: this is an async way.
    }

    refreshHandleEvent(event){
        this.setState({level:this.state.level}, this.getSudokuList());
    }

    componentWillMount () { 
        this.getSudokuList()
    }
    
    render(){
        let groupList = [];
        for(let index = 1; index <= 12; index++){
            groupList.push(<option value={index} key={index}>{index} 组</option>);
        }
        console.log('render@SudokuPage')

        return ( <Layout title="Nextbrain - 数独">

                    <div className='settingbar'>
                        <label className='settinglabel' htmlFor = 'level'>难度:</label>
                        <select className='settinginput' name='level' value={this.state.level} onChange={this.levelChangeHandleEvent}>
                            <option value="2">入门秒杀</option>
                            <option value="3">日常玩玩</option>
                            <option value="4">刻意训练</option>
                            <option value="5">琢磨片刻</option>
                            <option value="6">壮胆挑战</option>
                        </select>
                        <label className='settinglabel' htmlFor = 'sudokucount'>组数:</label>
                        <select className='settinginput' name='sudokucount' value={this.state.count} onChange={this.countChangeHandleEvent}>
                            { groupList }
                        </select>
                        <button onClick={this.refreshHandleEvent}>再来一组</button>
                    </div>
                    <div className='sudokupage'>
                        {this.state.sudokuList}
                    </div>
                    <style jsx>{`
                        .sudokupage{
                            display:flex;
                            flex-direction:row;
                            flex-wrap: wrap;
                            justify-content:space-around;
                            width:95%;
                            
                        }
                        .settingbar{
                            display:flex;
                            justify-content:center;

                        }
                        .settinglabel{
                            margin-right:20px;
                        }
                        .settinginput{
                            margin-right:50px;
                        }
                    `}</style>

                </Layout>);
    
    }
}


// getInitialProps works ONLY on page
/*

Sudoku.getInitialProps = async function() {
    
    let sudukuPuzzle = [1,2,3,4,5,6,7,8,9];
    return {
        sudoku:sudukuPuzzle
    }
}
*/

//export default Sudoku;