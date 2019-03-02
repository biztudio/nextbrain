import Link from 'next/link'

const PageHeader = () => (
    <div>
        <Link href="/">
          <a className="navigationlink">首页</a>
        </Link>
        <Link href="/sudoku">
          <a className="navigationlink">数独</a>
        </Link>
        <Link href="/about">
          <a className="navigationlink">关于</a>
        </Link>

        <style jsx>{`
          div{
            margin-bottom:20px;
          }

          .navigationlink{
                margin-right: 15px;
                text-decoration: none;
                color: orange;
          }
        `}
        </style>
    </div>
)

export default PageHeader