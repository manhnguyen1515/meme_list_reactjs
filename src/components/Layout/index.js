import {useState, useEffect} from 'react';
import './Layout.scss';
import { Button } from 'antd';
import Gallery from "../Gallery";

function Layout() {
    const [contents, setContents] = useState();
    const [memes, setMemes] = useState([]);

    useEffect(() =>{
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then((content) => {
                setContents(content);
                setMemes(content.data.memes);
            })
    }, []);


    const handleClick = () => {
        setMemes(shuffleMemes());
    }

    const shuffleMemes = () => {
        const result = [];
        if(contents && contents.success === true) {
            const memes = contents.data.memes;
            memes.forEach(mem => {
                const randomIndex = Math.floor(Math.random() * memes.length);
                if(!result.includes(memes[randomIndex])) {
                    result.push(memes[randomIndex]);
                }
            });
        }
        return result;
    }

    return(
        <div className='container'>
            <Button type="primary" size="large" className="btn btn-primary btn-load-meme" onClick={handleClick}>Load Meme</Button>
            <Gallery contents={memes}/>
        </div>
    )
}

export default Layout;