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
                setStepData(props.data.map(step => ({...step,orderValue: '' + stepIndex.current ++})));
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
            orderValue: '' + stepIndex.current++,
            name: '办案环节',
            caseTypeStepItems: []
        }
        setStepData([...stepData,newStep])
        setActiveKey(newStep.orderValue)
    }

    const removeStep = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        stepData.forEach((pane, i) => {
          if (pane.orderValue === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newPanes = stepData.filter((pane) => pane.orderValue !== targetKey);//.map((panel,i) => ({orderValue:i + '', name: panel.name}));
    
        if (newPanes.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newPanes[lastIndex].orderValue;
          } else {
            newActiveKey = newPanes[0].orderValue;
          }
        }
    
        setStepData(newPanes);
        setActiveKey(newActiveKey);
      };

      const changeItems = (newItems) => {
        setStepData(stepData.map((step) => (
            step.orderValue === activeKey ? 
            {
            ...step, caseTypeStepItems: newItems
            } : step
        )));
      }

      const onStepNameChange = (e) => {
        let stepName = e.target.value;
        if(stepData && stepData.length > 0) {
            setStepData(stepData.map((step) => (
                step.orderValue === activeKey ? {
                    ...step, name: stepName
                } : step
            )));
        }
      }

      const handlePanelNameFocus = (e) => {
        e.target.select();
      }

    return (
        <div className="case-definition-step-wrapper">
            <Tabs activeKey={activeKey} type="editable-card" tabPosition="left" size="small" onChange={onChangeStep} onEdit={onEditStep}>
                {
                    stepData.map((panel) => (
                        <TabPane tab={panel.name} key={panel.orderValue}>
                            <div className="case-definition-step-panel">
                                <Input addonBefore="环节名称" defaultValue={panel.name} size="medium" onChange={onStepNameChange} onFocus={handlePanelNameFocus} onPressEnter={(e) => {e.preventDefault()}}/>
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