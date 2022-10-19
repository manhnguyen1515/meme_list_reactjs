import { useState } from 'react';
import './MemeBox.scss';
import { Modal, Button} from 'antd';
import MemeCaptionInput from '../MemeCaptionInput';

function MemeBox (props) {
    const content = props.content;
    const [visible, setVisible] = useState();
    const [texts, setTexts] = useState([]);
    const [currentEventInput, setCurrentEventInput] = useState();
    const [newMemeUrl, setNewMemeUrl] = useState(content.url);
        
    const showModal = () => {
        setVisible(true);
    }

    const handleOk = (e) => {
        setVisible(false);
    }

    const handleCancel = (e) => {
        setVisible(false);
    }

    const handleInputChange = (e) => {
        let newTexts = texts;
        if(currentEventInput !== e.target) {
            setCurrentEventInput(e.target);
            newTexts.push(
                {
                    text: e.target.value,
                    x: 10,
                    y: 10,
                    width: 548,
                    height: 100,
                    color: "#ffffff",
                    outline_color: "#000000"
                }
            );
        }
        else {
            const length = newTexts.length;
            if(length > 0) {
                newTexts = [...newTexts.slice(0, length - 1),
                    {
                        ...newTexts[length - 1],
                        text: e.target.value
                    }
                ]
            }
        }
        setTexts(newTexts);
    }

    const objectToQueryParam = (obj) => {
        const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
        return params.join("&");
    };

    // Thêm boxes vào params dựa trên boxCount
    const generateParamsTextBoxes = (boxCount, id, username, password) => {
        let params = {
        template_id: id,
        username: username,
        password: password,
        };
        for (let i = 0; i < boxCount; i++) {
            params[`boxes[${i}][text]`] = texts[i].text;
        }
        return params;
    };

    const handleUpdateMeme = () => {
        const formBody = generateParamsTextBoxes(content.box_count, content.id, "eddle", "ducmanh1515");
        const params = objectToQueryParam(formBody);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            mode: 'cors',
            body: params
        };

        fetch('https://api.imgflip.com/caption_image', requestOptions)
            .then(response => response.json())
            .then(res => {
                if(res.success === true) {
                    setNewMemeUrl(res.data.url);
                }
            });
    }

    const height = Math.floor(((230 * content.height) / content.width) / 10) + 3;
    const styles = {
        gridRowEnd: 'span ' + height
    }

    return (
        <div className='meme-box' style={{...styles}}>

            <button className='meme-box-btn' onClick={showModal}>
                <img className='meme-box-img' src={content.url} alt={content.name}/>
            </button>
            <Modal
            title={content.name}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            >
                <div className='meme-modal-container'>
                    <img className='meme-modal-img' src={newMemeUrl} alt={content.name}/>
                    <div className='meme-modal-wrapper'>
                    <MemeCaptionInput boxCount={content.box_count} onChange={(e) => handleInputChange(e)}/>
                    <Button className='meme-modal-btn-preview' onClick={handleUpdateMeme} type='primary' size='Medium'>
                        Generate Meme
                    </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MemeBox;