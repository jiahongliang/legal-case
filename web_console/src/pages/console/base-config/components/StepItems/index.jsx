import { useEffect, useState } from "react";
import { Input, Tag, Button } from "antd";

const StepItems = (props) => {

    const [data,setData] = useState(props.items)
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        props.onChange(data);
    },[data]);

    const onAddItem = () => {
        setInputValue(inputValue.replace(',','，'));
        if(inputValue && inputValue.length > 0 && data.indexOf(inputValue) === -1) {
            setData([...data,inputValue]);
            setInputValue('');
        }
    }

    const onRemoveItem = (v) => {
        let newData = data.filter(i => i !== v);
        setData(newData);
    }

    const onInputValueChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleItemInputPressEnter = (event) => {
        event.preventDefault();
        onAddItem();
    }

    return (
        <>
            <Input.Group compact>
                <Input
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
                <Button size="small" onClick={onAddItem}>添加</Button>
            </Input.Group>
            <div style={{padding:'10px'}}>
            {
                data.map((item,index) => (
                <Tag key={item} onClose={() => onRemoveItem(`${item}`)} closable>{item}</Tag>
                ))  
            }
            </div>
        </>
    );
}

export default StepItems;