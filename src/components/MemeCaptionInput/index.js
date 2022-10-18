import './MemeCaptionInput.scss';
import { Input} from 'antd';

function MemeCaptionInput(props) {
    return ((() => {
        let inputs = [];
        for(let i = 0; i < props.boxCount; i++) {
            inputs.push(<Input key={i} className='meme-modal-input' onChange={props.onChange} size='medium' placeholder={`text ${i}`}/>)
        }
        return inputs;
    })())
}

export default MemeCaptionInput;