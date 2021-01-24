import React, {Component} from "react";
import WorkflowService from "../services/WorkflowService";
import $ from 'jquery';
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
class WorkflowComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            messageList: [],
            customer: 0,
            response: '',
            msg:''
        }

        this.viewWorkflow = this.viewWorkflow.bind(this)
        this.startWorkflow = this.startWorkflow.bind(this)
        this.saveResponseMessage = this.saveResponseMessage.bind(this)
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleResponseChange = this.handleResponseChange.bind(this);
        this.findResponseHistory = this.findResponseHistory.bind(this);
    }

    startWorkflow(id) {
        WorkflowService.startWorkflow(id).then((res) => {
            this.setState({workflow: res.data});
        });
    }

    viewWorkflow(id) {
        WorkflowService.viewWorkflow(id).then((res) => {
            this.setState({messageList: res.data});
        });
    }
    saveResponseMessage(id) {
        WorkflowService.saveResponseMessage(id).then((res) => {
            this.setState({messageList: res.data});
        });
    }

    componentDidMount() {
        WorkflowService.getCustomerList().then((res) => {
            this.setState({customers: res.data});
        });
    }

    handleCustomerChange(event) {
        this.setState({
            customer: event.target.value
        });
        this.findResponseHistory(this.state.customer);
    }

    handleResponseChange(event) {
        this.setState({
            response: event.target.value
        });
    }
    submitResponse(){
        console.warn(this.state.customer)
        console.warn(this.state.response)
        WorkflowService.saveResponseMessage(this.state.customer,this.state.response).then((res) => {
            this.setState({msg: res.data});
            console.warn(this.state.msg);
            this.state.response = this.state.msg;
        });
    }

    findResponseHistory(){
        console.warn(this.state.customer)
        WorkflowService.findResponseHistory(this.state.customer).then((res) => {
            this.setState({msg: res.data});
            console.warn(this.state.msg);
            this.state.response = this.state.msg;
            $("response").val(this.state.msg);
        });
    }

    handleBlur() {
        console.log('You finished typing:', this.state.response)
    }
    render() {

        return (

            <div className="form-group right-arrow navbar-right">
                <h4>
                </h4>
                <h2 className="text-center">Workflow Form </h2> <br/>
                <h3 className="text-center">Customer List</h3>
                <div className="row">
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th> Serial</th>
                            <th> Customer ID</th>
                            <th> Customer Name</th>
                            <th> Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.customers.map(
                                (customer, index) =>
                                    <tr key={index}>
                                        <td> {index + 1} </td>
                                        <td> {customer.id} </td>
                                        <td> {customer.name} </td>
                                        <td>
                                            <button onClick={() => this.startWorkflow(customer.id)}
                                                    className="btn btn-info">Start Workflow
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.viewWorkflow(customer.id)}
                                                    className="btn btn-info">View
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

                <br/>
                <br/>

                <div className="row">
                    <h2 className="text-center">Customer Wise Workflow Message </h2>
                    <table className="table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th> Serial</th>
                            <th> Customer Name</th>
                            <th> Message</th>
                            <th> Stage</th>
                            <th> Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.messageList.map(
                                (message, index) =>
                                    <tr key={index}>
                                        <td> {index + 1} </td>
                                        <td> {message.customer.name} </td>
                                        <td> {message.message.message.replace("$", message.customer.name)} </td>
                                        <td> {message.stage} </td>
                                        <td> {message.createDate} </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

                <br/>
                <br/>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="response"> Customer Response To The Sales
                            Man: &nbsp;&nbsp;&nbsp; </label>
                        <textarea rows="2" name="response" id="response" cols="30" className="form-control"
                                  autoFocus="autofocus" placeholder="Customer response showing here."
                                  onChange={this.handleResponseChange}>
                            </textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="customer"> Customer</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <select className="form-control" id="customer" name="customer"
                                onChange={this.handleCustomerChange}>
                            <option value="">Select Customer</option>
                            {
                                this.state.customers.map(
                                    customer =>
                                        <option value={customer.id}>{customer.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <br/>

                    <div className="form-group col-md-2">
                        <label htmlFor="customer"> &nbsp;&nbsp;&nbsp; </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => this.submitResponse()}
                                className="btn btn-info">Submit Response
                        </button>
                    </div>
                    <br/>

                </div>
                <div className="row">
                    <div id="responseHistoryDiv" className="form-group col-md-6">
                        <label htmlFor="responseHistory"> Customer Response History To The Sales
                            Man: &nbsp;&nbsp;&nbsp; </label>
                        <textarea readOnly rows="4" name="responseHistory" id="responseHistory" cols="30"
                                  className="form-control" value={this.state.response}
                                  autoFocus="autofocus" placeholder="Please enter your response here.">
                            </textarea>
                    </div>
                </div>
            </div>
        )
    }
}

export default WorkflowComponent
