import sudokukit from '../middleware/sudokukit';

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

//
const renderSudoku = (level, keyrefer) => {
    keyrefer = keyrefer || 1;
    return(
        <div>
            <div className='sudokucontainer' key={keyrefer}>

                { getSudokuData(level).map(sg => 
                    <div  className='sudokugroup' key={sg.index}> 
                        {sg.data.map(sd => 

                            {
                                if(sd.display > 0){
                                    return <div className='sudokudisplay' key={sd.index}>{sd.display}</div>
                                }
                                else{
                                    return <div className='sudokudisplay' key={sd.index}>
                                                <input className='sudokuanswer' autoComplete='off' type='text' maxLength='1'/>
                                            </div>
                                }
                            }

                        )}
                    </div>) }

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
                    margin:10px;
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
                .sudokudisplay{
                    width:36px;
                    height:36px;
                    display:flex;
                    justify-content:center;
                    background:#E3EDCD;
                    color:#000
                }
                .sudokuanswer{
                    background:#E3EDCD;
                    color: purple;
                    width:26px;
                    height:34px;
                    margin-left:8px;
                    border:0;
                    font-size:32px;
                    font-family: "黑体","宋体",'Arial',sans-serif;
                }
                .sudokuhint{
                    width:36px;
                    height:36px;
                    display:flex;
                    justify-content:center;
                    background:#E3EDCD;
                    color: gray;
                }
            `}</style>
        </div>)
};


const SudokuComponent = (props) => {
    let sudosuks = []
    let count = (props.count||1);
    
    for(let sindex = 0; sindex < count; sindex++)
        sudosuks.push(<div key={sindex}>{renderSudoku(props.level, sindex)}</div>);

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
};

export default SudokuComponent;