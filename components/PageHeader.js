import Link from 'next/link'
import GlobalStyle from '../components/GlobalStyle';

const PageHeader = () => (
    <div>
        <Link href="/">
          <a className="navigationlink">Home</a>
        </Link>
        <Link href="/about">
          <a className="navigationlink">About</a>
        </Link>

        <GlobalStyle />
    </div>
)

export default PageHeader