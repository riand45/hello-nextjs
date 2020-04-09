import Link from 'next/link';
import Header from '../components/Header';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Markdown from 'react-markdown';
import useSWR from 'swr';
import { useRouter } from 'next/router';

// const PostLink = props => (
//     <li>
//         <Link href="/p/[id]" as={`/p/${props.id}`} >
//             <a>{props.id}</a>
//         </Link>
//     </li>
// )

const Index = props => (
    <Layout >
        <h1>Blog</h1>
        <div className="markdown">
            <Markdown
                source = {
                    `
This is our blog post. Yes. We can have a [About](/about). And we can have a title as well.
### This is a title
And here's the content.
                    `
                }
            />
        </div>
        <ul>
            {props.shows.map(show => (
                <li key={show.id}>
                    <Link href="/p/[id]" as={`/p/${show.id}`}>
                        <a>{show.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
        <style jsx global>
        {`
            h1, a {
                font-family: 'Arial';
                font-size: 20px;
                color: red;
            }
            ul {
                padding: 0;
            }
            li {
                list-style: none;
                margin: 5px 0;
            }
            a {
                text-decoration: none;
                color: blue;
            }
            a:hover {
                opacity: 0.6;
            }

        `}
        </style>
    </Layout>
)

Index.getInitialProps = async function(){
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();

    // console.log(`Show data fetched. Count : ${data.length}`);

    return {
        shows: data.map(entry => entry.show)
    };
};

// function fetcher(url) {
//     return fetch(url).then(r => r.json());
// }

// export default function Index() {
    
//     const { query } = useRouter();
//     const { data, error } = useSWR(
//         `/api/randomQuote${query.author ? '?author=' + query.author : ''}`, 
//         fetcher
//     );
    
//     const author = data?.author;
//     let quote = data?.quote;

//     if (!data) quote = 'Loading...';
//     if (error) quote = 'Failed to fetch the quote';

//     return (
//         <main className="center">
//             <div className="quote">{quote}</div>
//             {author && <span className="author"> - { author }</span>}

//             < style jsx > {
//                 `
//                     main {
//                     width: 90%;
//                     max-width: 900px;
//                     margin: 300px auto;
//                     text-align: center;
//                     }
//                     .quote {
//                     font-family: cursive;
//                     color: #e243de;
//                     font-size: 24px;
//                     padding-bottom: 10px;
//                     }
//                     .author {
//                     font-family: sans-serif;
//                     color: #559834;
//                     font-size: 20px;
//                     }
//                 `
//             } </style>
//         </main>
//     )
// }

export default Index;