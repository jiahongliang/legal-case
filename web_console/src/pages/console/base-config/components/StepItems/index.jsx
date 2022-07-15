import { useEffect, useState, createRef } from "react";
import { Input, Tag, Button, Tooltip } from "antd";
import moment from "moment";
import './index.css'

const StepItems = (props) => {

    const [data,setData] = useState(props.items)
    const [inputValue, setInputValue] = useState('');
    const [lawTitle, setLawTitle] = useState('');
    const [stepItemId, setStepItemId] = useState(null);

    const inputValueRef = createRef(); 
    const lawTitleRef = createRef(); 

    useEffect(() => {
        inputValueRef.current.focus();
    },[]);

    useEffect(() => {
        // console.log('data changed:',data)
        props.onChange(data);
    },[data]);

    const onAddItem = () => {
        if(inputValue && inputValue.length > 0 && !data.find(dataItem => dataItem.name === inputValue)) {
            if(stepItemId != null) {
                setData(
                    data.map(dataItem => dataItem.id === stepItemId ? {
                        id: dataItem.id,
                        name: inputValue,
                        lawTitle: lawTitle
                    } : dataItem));
            } else {
                setData([...data,{
                    id: moment().format('X') + '' + data.length,
                    name: inputValue,
                    lawTitle: lawTitle
                }]);
            }
            
            setStepItemId(null);
            setInputValue('');
            setLawTitle('');
        }
    }

    const onRemoveItem = (v) => {
        let newData = data.filter(i => i.name !== v);
        setData(newData);
    }

    const onInputValueChange = (event) => {
        setInputValue(event.target.value);
    }
    const onLawTitleChange = (event) => {
        setLawTitle(event.target.value);
    }

    const handleItemInputPressEnter = (event) => {
        event.preventDefault();
        lawTitleRef.current.focus();
    }

    const handleLawTitlePressEnter = (event) => {
        event.preventDefault();
        onAddItem();
        inputValueRef.current.focus();
    }

    const handleClickStepItem = (id ,name, lawTitle) => {
        setStepItemId(id);
        setInputValue(name);
        setLawTitle(lawTitle);
        inputValueRef.current.focus();
    }

    return (
        <>
            <Input.Group compact>
                <Input
                    ref={inputValueRef} 
                    placeholder="事项名称"
                    allowClear
                    size="small"
                    onChange={onInputValueChange}
                    value={inputValue}
                    style={{
                        width: '200px',
                      }}
                    onPressEnter={handleItemInputPressEnter}
                />
                <Input
                    ref={lawTitleRef} 
                    placeholder="法律条文"
                    allowClear
                    size="small"
                    onChange={onLawTitleChange}
                    value={lawTitle}
                    style={{
                        width: '300px',
                      }}
                    onPressEnter={handleLawTitlePressEnter}
                />
                <Button size="small" onClick={onAddItem}>保存</Button>
            </Input.Group>
            <div style={{padding:'10px'}}>
            {
                data.map((item,index) => (
                    <Tooltip key={item.id}  placement="topLeft" title={item.lawTitle} color="gold" arrowPointAtCenter>
                        <Tag onClose={() => onRemoveItem(`${item.name}`)} onClick={() => handleClickStepItem(item.id, item.name, item.lawTitle)} closable>{item.name}</Tag>
                    </Tooltip>
                ))  
            }
            </div>
        </>
    );
}

export default StepItems;