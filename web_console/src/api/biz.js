import { serviceJson } from "./axios";

export const caseTypeList = (data) => {
    return serviceJson({
        url: '/case-type/list',
        data,
        method: 'post',
    });
}

export const saveCaseType = (data) => {
    return serviceJson({
        url: '/case-type/save',
        data,
        method: 'post',
    });
}

export const removeCaseType = (data) => {
    return serviceJson({
        url: '/case-type/remove',
        data,
        method: 'post',
    });
}

export const caseTypeDefinitionList = (data) => {
    return serviceJson({
        url: '/case-type-definition/list',
        data,
        method: 'post',
    }); 
}

export const createCaseExecution = (data) => {
    return serviceJson({
        url: '/case-execution/create',
        data,
        method: 'post',
    });
}

export const caseExecutionList = (data) => {
    return serviceJson({
        url: '/case-execution/list',
        data,
        method: 'post',
    });
}

export const caseExecutionExcel = (data) => {
    return serviceJson({
        url: '/case-execution/export',
        data,
        method: 'post',
        responseType: 'blob'
    });
}

export const completeCaseExecution = (data) => {
    return serviceJson({
        url: '/case-execution/complete',
        data,
        method: 'post',
    });
}

export const handleCaseExecution = (data) => {
    return serviceJson({
        url: '/case-execution/handle',
        data,
        method: 'post',
    });
}

export const subjectTreeData = () => {
    return serviceJson({
        url: '/subject/tree',
        method: 'get',
    });
}

export const saveSubject = (data) => {
    return serviceJson({
        url: '/subject/save',
        data,
        method: 'post',
    });
}

export const removeSubject = (data) => {
    return serviceJson({
        url: '/subject/remove',
        data,
        method: 'post',
    });
}

export const subjectItemList = (data) => {
    return serviceJson({
        url: '/subject/item-list',
        data,
        method: 'post',
    });
}

export const saveSubjectItem = (data) => {
    return serviceJson({
        url: '/subject/save-item',
        data,
        method: 'post',
    });
}

export const removeSubjectItem = (data) => {
    return serviceJson({
        url: '/subject/remove-item',
        data,
        method: 'post',
    });
}

export const lawArticleList = (data) => {
    return serviceJson({
        url: '/law-article/list',
        data,
        method: 'post',
    });
}

export const saveLawArticle = (data) => {
    return serviceJson({
        url: '/law-article/save',
        data,
        method: 'post',
    });
}

export const removeLawArticle = (data) => {
    return serviceJson({
        url: '/law-article/remove',
        data,
        method: 'post',
    });
}


export const serviceReminderList = (data) => {
    return serviceJson({
        url: '/service-reminder/list',
        data,
        method: 'post',
    });
}

export const saveServiceReminder = (data) => {
    return serviceJson({
        url: '/service-reminder/save',
        data,
        method: 'post',
    });
}

export const removeServiceReminder = (data) => {
    return serviceJson({
        url: '/service-reminder/remove',
        data,
        method: 'post',
    });
}