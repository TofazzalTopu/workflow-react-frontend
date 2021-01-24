import axios from 'axios';

const WORKFLOW_API_BASE_URL = "http://localhost:8080/workflow";
const CUSTOMER_API_BASE_URL = "http://localhost:8080/customer";

class WorkflowService {

    getCustomerList() {
        return axios.get(CUSTOMER_API_BASE_URL + '/customerListForReact');
    }

    startWorkflow(customerId) {
        if (customerId === 10) {
            return axios.get(WORKFLOW_API_BASE_URL + '/startWorkflowForCustomerOne?customerId=' + customerId);
        }
        if (customerId === 11) {
            return axios.get(WORKFLOW_API_BASE_URL + '/startWorkflowForCustomerTwo?customerId=' + customerId);
        }
        if (customerId === 12) {
            return axios.get(WORKFLOW_API_BASE_URL + '/startWorkflowForCustomerThree?customerId=' + customerId);
        }
    }

    viewWorkflow(customerId) {
        return axios.get(CUSTOMER_API_BASE_URL + '/viewMessageListByCustomerId/' + customerId);
    }
    saveResponseMessage(customerId, response) {
        return axios.get(WORKFLOW_API_BASE_URL + '/saveResponse?customerId=' + customerId+'&response='+response);
    }
    findResponseHistory(customerId) {
        return axios.get(CUSTOMER_API_BASE_URL + '/findResponseHistory?customerId=' + customerId);
    }
}

export default new WorkflowService()
