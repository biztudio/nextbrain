import Markdown from 'react-markdown';
import Layout from '../components/Layout'

//如果要让某个样式的优先级变高，可以使用!important来指定
export default () => (
    
    <Layout title="关于 Nextbrain">

        <div className='logobox'>
            <div>
                <img src='../static/logo_work002.png' />
            </div>
            <div>
                基于敏捷的学习与实践工坊
            </div>
        </div>
        
        <div className="markdown aboutbox">
            <Markdown source={`

### This is Nextbrain

* 良好的专注力与思维来自于科学的刻意训练;
* 学奥数，不如玩数独，无计算门槛的逻辑推理游戏；

            `}/>           
        </div>

        <style jsx global>{`
            body{
                background:#2CA3E7 !important;
            }

            .logobox{
                width:100%;
                display:flex;
                flex-direction:column;
                align-items: flex-end;
            }

            .aboutbox{
                display: flex;
                flex-direction:column;
                justify-content:flex-start;
                margin-top:35px;
            }
        `}</style>

    </Layout>
    
)