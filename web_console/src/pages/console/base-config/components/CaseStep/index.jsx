import { useEffect, useState,useRef } from "react";
import { Input, Tabs, Divider } from "antd";
import StepItems from '../StepItems'
import './index.css'

const {TabPane} = Tabs;

const CaseStep = (props) => {

    const [stepData, setStepData] = useState([]);
    const [activeKey,setActiveKey] = useState(null);
    const [triggerDataChangeSource,setTriggerDataChangeSource] = useState('parent');
    const stepIndex = useRef(1);

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        if(triggerDataChangeSource === 'parent') {
            // console.log('props.data...')
            stepIndex.current = 1;
            if(props.data && props.data.length > 0) {
                setStepData(props.data.map(step => ({...step,indexValue: '' + stepIndex.current ++})));
                setActiveKey('1');
            } else {
                setStepData([]);
            }
        } 

        if(triggerDataChangeSource === 'self') {
            setTriggerDataChangeSource('parent');
        }
    }, [props.data]);

    
    useEffect(() => {
        setTriggerDataChangeSource('self');
        props.onChange(stepData);
    }, [stepData]);

    const onChangeStep = (key) => {
        setActiveKey(key);
    };

    const onEditStep = (targetKey,action) => {
        if(action === 'add') {
            addStep();
        }
        if(action === 'remove') {
            removeStep(targetKey);
        }
    }

    const addStep = () => {
        const newStep = {
            indexValue: '' + stepIndex.current++,
            orderValue: 100,
            name: '办案环节',
            caseTypeStepItems: []
        }
        setStepData([...stepData,newStep])
        setActiveKey(newStep.indexValue)
    }

    const removeStep = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        stepData.forEach((pane, i) => {
          if (pane.indexValue === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newPanes = stepData.filter((pane) => pane.indexValue !== targetKey);
    
        if (newPanes.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newPanes[lastIndex].indexValue;
          } else {
            newActiveKey = newPanes[0].indexValue;
          }
        }
    
        setStepData(newPanes);
        setActiveKey(newActiveKey);
      };

      const changeItems = (newItems) => {
        setStepData(stepData.map((step) => (
            step.indexValue === activeKey ? 
            {
            ...step, caseTypeStepItems: newItems
            } : step
        )));
      }

      const onStepNameChange = (e) => {
        let stepName = e.target.value;
        if(stepData && stepData.length > 0) {
            setStepData(stepData.map((step) => (
                step.indexValue === activeKey ? {
                    ...step, name: stepName
                } : step
            )));
        }
      }

      const onOrderValueChange = (e) => {
        let orderValue = e.target.value;
        if(stepData && stepData.length > 0) {
            setStepData(stepData.map((step) => (
                step.indexValue === activeKey ? {
                    ...step, orderValue: orderValue
                } : step
            )));
        }
      }

      const handlePanelNameFocus = (e) => {
        e.target.select();
      }

      const handleOrderValueFocus = (e) => {
        e.target.select();
      }

    return (
        <div className="case-definition-step-wrapper">
            <Tabs activeKey={activeKey} type="editable-card" tabPosition="left" size="small" onChange={onChangeStep} onEdit={onEditStep}>
                {
                    stepData.map((panel) => (
                        <TabPane tab={panel.name} key={panel.indexValue}>
                            <div className="case-definition-step-panel">
                                <Input addonBefore="环节名称" defaultValue={panel.name} size="medium" onChange={onStepNameChange} onFocus={handlePanelNameFocus} onPressEnter={(e) => {e.preventDefault()}}/>
                                <Input addonBefore="排序值" defaultValue={panel.orderValue} size="medium" onChange={onOrderValueChange} onFocus={handleOrderValueFocus} onPressEnter={(e) => {e.preventDefault()}}/>
                                <Divider ></Divider>
                                <StepItems items={panel.caseTypeStepItems} onChange={changeItems}></StepItems>
                            </div>
                        </TabPane>
                    ))
                }
            </Tabs>
        </div>
    );
}

export default CaseStep;