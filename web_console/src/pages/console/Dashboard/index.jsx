import React, { useEffect } from "react";
import { Card , Row, Col} from 'antd';
import { useNavigate } from 'react-router';
import lawJpg from '../../../assets/images/law.jpg';
import subjectJpg from '../../../assets/images/subject.jpg';
import police01Jpg from '../../../assets/images/police01.jpg';
import police02Jpg from '../../../assets/images/police02.jpg';

const { Meta } = Card;

const  Dashboard = () => {
    let navigate = useNavigate();

    return (
        <>
            <Row gutter={16} style={{height: '50%'}} align="middle" justify="center">
                <Col style={{width: '50%',height: '100%', lineHeight: '100%'}}>
                    <Card onClick={() => {navigate('/console/biz-handle/new-instance');}}
                        hoverable
                        style={{ width: 250,  margin: 'auto auto'  }}
                        cover={<img alt="example" src={police01Jpg} />}
                    >
                        <Meta title="案件新增" description="创建要办理的案件" />
                    </Card>
                </Col>
                <Col style={{width: '50%',height: '100%'}}>
                    <Card onClick={() => {navigate('/console/biz-handle/instance-list');}}
                        hoverable
                        style={{ width: 250, margin: 'auto auto' }}
                        cover={<img alt="example" src={police02Jpg} />}
                    >
                        <Meta title="已办案件" description="已经办理的案件" />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{height: '50%'}}  align="middle">
                <Col style={{width: '50%',height: '100%'}}>
                    <Card onClick={() => {navigate('/console/subject-data/subject-item');}}
                        hoverable
                        style={{ width: 250, margin: 'auto auto' }}
                        cover={<img alt="example" src={subjectJpg} />}
                    >
                        <Meta title="专项执法" description="专项执法信息查询" />
                    </Card>
                </Col>
                <Col style={{width: '50%',height: '100%'}}>
                    <Card onClick={() => {navigate('/console/subject-data/law-article');}}
                        hoverable
                        style={{ width: 250, margin: 'auto auto' }}
                        cover={<img alt="example" src={lawJpg} />}
                    >
                        <Meta title="执法依据" description="相关法律法规库查询" />
                    </Card>
                </Col>
            </Row>
        </>
    );
}
export default Dashboard;