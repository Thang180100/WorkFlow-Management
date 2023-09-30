import React, { useEffect, useState } from 'react';


function TaskForm(props) {
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (props.task) {
            setID(props.task.id)
            setName(props.task.name)
            setStatus(props.task.status)
        }
    },[props.task])

 
    const onCloseForm = () => {
        props.onCloseForm();
    }
    const onSubmit = (event) => {
        event.preventDefault();
        props.onSubmit({ id, name, status });
        onClear();
        onCloseForm();
    }
    const onClear = () => {
        setName('')
        setStatus(false)
        onCloseForm();
    }

    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                    {id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
                    <span
                        className="fa-solid fa-times-circle text-right"
                        onClick={onCloseForm}
                    ></span>
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control"
                        name="status"
                        value={status}
                        onChange={e => {
                           
                            return setStatus(e.target.value === 'true' ? true : false);
                        }}
                    >
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br />
                    <div className="text-center">
                        <button type="submit"
                            className="btn btn-warning"
                        >
                            {id ? 'Cập nhật' : 'Thêm'}
                        </button>&nbsp;
                        <button type="submit"
                            className="btn btn-danger"
                            onClick={onClear}
                        >Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
