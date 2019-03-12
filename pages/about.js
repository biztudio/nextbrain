import Markdown from 'react-markdown';
import Layout from '../components/Layout'

//如果要让某个样式的优先级变高，可以使用!important来指定
export default () => (
    
    <Layout title="关于 Nextbrain">

        <div className="markdown aboutbox">
            <Markdown source={`
![logo of biztudio](../static/logo_work002.png)


### This is Nextbrain

*良好的专注力与思维来自于科学的训练.*
            `}/>           
        </div>

        <style jsx global>{`
            body{
                background:#2CA3E7 !important;
            }

            .aboutbox{
                display: flex;
                flex-direction:column;
                justify-content:flex-start;
            }
        `}</style>

    </Layout>
    
)