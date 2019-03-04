import sudokukit from '../middleware/sudokukit';

const groupsize = 9;
const getSudoku = level => {
    
    let puzzle = sudokukit.getSudokuPuzzle(level).SudokuPuzzle//level is between 2 and 6
    let groupCount = puzzle.length / groupsize;
    let sudokuGroups = [];
   
    for(let p of puzzle){
        let cellsInGroup = [];
        //TODO:
        sudokuGroups.push(cellsInGroup.slice(0));
    }
    
    return (
        <div>
            <div className='sudokucontainer'>
                {puzzle.map(s => <div key={s.index}>{s.display}</div>)}          
            </div>
            <style jsx>{`
                .sudokucontainer{
                    display:flex;
                    flex-direction:row;
                    flex-wrap: wrap;
                }
                .sudokugroup{
                    flex-wrap: wrap;
                }
                .sudokuanswer{
                    color: purple;
                }
                .sudokuhint{
                    color: gray;
                }
            `}</style>
        </div>
    );
}

const SudokuComponent = (props) => {
    
    return (
        <div>
            Hello, this is Sudoku!
            {getSudoku(props.level)}
           
        </div>
    )
};

export default SudokuComponent;