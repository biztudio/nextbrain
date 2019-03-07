import Layout from '../components/Layout';
import SudokuComponent from '../components/Sudoku';
import React, { Component } from 'react';

export default class Sudoku extends Component{ 
    constructor(props) {
        super(props);
        this.state = {
            level:3,
            count:1
        };
        this.levelChangeHandleEvent = this.levelChangeHandleEvent.bind(this);
        this.countChangeHandleEvent = this.countChangeHandleEvent.bind(this);
        this.refreshHandleEvent = this.refreshHandleEvent.bind(this);
    }

    levelChangeHandleEvent(event){
        this.setState({level:event.target.value});//NOTE: this is an async way. We can verify it in following consoles
        //console.log(event.target.value)
        //console.log(this.state.level);
    }

    countChangeHandleEvent(event){
        this.setState({count:event.target.value});//NOTE: this is an async way.
    }

    refreshHandleEvent(event){
        this.setState({showAnswer:false});
        this.setState({level:this.state.level});
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

                    <SudokuComponent level={this.state.level} count={this.state.count} />

                    <style jsx>{`
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