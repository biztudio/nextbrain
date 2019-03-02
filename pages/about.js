import Markdown from 'react-markdown';
import Layout from '../components/Layout'

export default () => (
    
    <Layout>

        <div className="markdown">
            <Markdown source={`
### This is Nextbrain

*良好的专注力与思维来自于科学的训练.*
            `}/>           
        </div>

    </Layout>
    
)