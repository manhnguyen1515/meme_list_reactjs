import './Gallery.scss';
import '../MemeBox';
import MemeBox from '../MemeBox';

function Gallery(props) {
    const memes = props.contents;

    return (
        <div className='gallery-container'>
            {memes.map((content) => (
                <MemeBox key={content.id} content={content}/>
            ))}
        </div>
    );
}

export default Gallery;