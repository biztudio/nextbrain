import Layout from '../components/Layout';
import SudokuComponent from '../components/Sudoku';


const Sudoku = (props) => (
    
    <Layout   title="Nextbrain - 数独">

        <SudokuComponent level='2' />

    </Layout>
    
)


// getInitialProps works ONLY on page
/*

Sudoku.getInitialProps = async function() {
    

    //let temp_pool = [11,12,13,14,15,16,17,18];
    //let index = mathkit.get_random_number_index(temp_pool.length);
    //console.log(temp_pool[index]);

    //const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    //const data = await res.json()
    //console.log(`Show data fetched. Count: ${data.length}`)

    let sudukuPuzzle = [1,2,3,4,5,6,7,8,9];
    return {
        sudoku:sudukuPuzzle
    }
}
*/

export default Sudoku;