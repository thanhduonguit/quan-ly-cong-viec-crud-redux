import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name : '',
            status: false

        };
    }

    componentWillMount(){
        if(this.props.itemEditing){    //ton tai
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        }else{
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){    //ton tai
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            });
        }else if(!nextProps.itemEditing){
            this.setState({
                id: '',
                name : '',
                status: true
            });
        }
    }

    onExitForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status') {
            value = target.value;
        }
        this.setState({
            [name] : value
        });
    }

    onSave = (event) => {
        event.preventDefault();    // ngăn load lai trang
        this.props.onSaveTask(this.state);
        // Cancel && Close form
        this.onClear();
        this.onExitForm();
    }

    onClear = () => {
        this.setState({
            //id :'',   không xét id, nếu id = '' thì trùng với trường hợp thêm
            name: '',
            status: false
        });
    }

    render() {
        var { id } = this.state;
        if( this.props.isDisplayForm === false ) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        { id !== '' ? 'Cập nhật công việc' : 'Thêm công việc' }
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={ this.onExitForm }
                        ></span>
                    </h4>
                </div>
                <div className="panel-body">
                    
                    <form onSubmit={ this.onSave }>                          
                        <div className="form-group">
                            <label >Tên: </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name = "name"
                                value={ this.state.name }
                                onChange={ this.onChange }
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            name="status"
                            value={ this.state.status }
                            onChange={ this.onChange }
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại
                            </button>&nbsp;
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={ this.onClear }
                            >
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>                  
                    </form>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
