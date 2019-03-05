import sudokukit from '../middleware/sudokukit';

const groupsize = 9;
const getSudokuData = level => {
    
    let puzzle = sudokukit.getSudokuPuzzle(level).SudokuPuzzle//level is between 2 and 6
    let groupCount = puzzle.length / groupsize;
    let sudokuGroups = [];
   
    let cellsInGroup = [];
    let groupIndex = 0;
    for(let p of puzzle){
       
        cellsInGroup.push(p);
        if(p.index % groupsize == groupsize - 1){
            
            sudokuGroups.push({data:cellsInGroup.slice(0), index:groupIndex});
            cellsInGroup = [];
            groupIndex++;
        }

    }

    return sudokuGroups;
}

//
const renderSudoku = (level) => {

    return(
        <div>
            <div className='sudokucontainer'>

                { getSudokuData(level).map(sg => 
                    <div  className='sudokugroup' key={sg.index}> 
                        {sg.data.map(sd => <div className='sudokudisplay' key={sd.index}>{sd.display}</div>)}
                    </div>) }

            </div>       
            <style jsx>{`
                .sudokucontainer{
                    display:flex;
                    flex-direction:row;
                    flex-wrap: wrap;
                    justify-content:space-around;
                    background:#FFF2E2;
                    width:342px;
                    height:342px;
                    margin:30px;
                }
                .sudokugroup{
                    display:flex;
                    flex-direction:row;
                    flex-wrap: wrap;
                    justify-content:space-around;
                    
                    background:#FFF2E2;
                    font-size:32px;
                    width: 111px;
                    height: 111px;
                    margin-top:2px;
                }
                .sudokudisplay{
                    width:36px;
                    height:36px;
                    display:flex;
                    justify-content:center;
                    background:#000;
                }
                .sudokuanswer{
                    color: purple;
                }
                .sudokuhint{
                    color: gray;
                }
            `}</style>
        </div>)
};


const SudokuComponent = (props) => {
    let sudosuks = []
    for(let sindex = 0; sindex < props.count; sindex++)
        sudosuks.push(renderSudoku(props.level));
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
                width:90%;
                
            }
        `}</style>
        </div>
    )
};

export default SudokuComponent;