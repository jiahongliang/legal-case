import { service, serviceJson } from "./axios";

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