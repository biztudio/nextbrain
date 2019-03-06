import Layout from '../components/Layout';
import SudokuComponent from '../components/Sudoku';


const Sudoku = (props) => (
    
    <Layout title="Nextbrain - 数独">

        <div className='settingbar'>
            <label htmlFor = 'level'>难度:  </label>
            <select name='level' defaultValue='3'>
                <option value="2">入门秒杀</option>
                <option value="3">日常玩玩</option>
                <option value="4">刻意训练</option>
                <option value="5">琢磨片刻</option>
                <option value="6">偶然挑战</option>
            </select>
            <label >组数</label>
        </div>

        <SudokuComponent level='3' count='1'/>

        <style jsx>{`
            .settingbar{
                display:flex;
                justify-content:center;
            }
        `}</style>

    </Layout>
    
)


// getInitialProps works ONLY on page
/*

Sudoku.getInitialProps = async function() {
    
    let sudukuPuzzle = [1,2,3,4,5,6,7,8,9];
    return {
        sudoku:sudukuPuzzle
    }
}
*/

export default Sudoku;