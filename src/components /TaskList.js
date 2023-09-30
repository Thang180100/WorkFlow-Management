import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList(props) {
  const [filterName, setFilterName] = useState(props.filterName);
  const [filterStatus, setFilterStatus] = useState(props.filterStatus);

  const onChange = (e) => {
    const status =
      e.target.name === 'filterStatus' ? e.target.value : filterStatus;
    setFilterStatus(status);
    const name = e.target.name === 'filterName' ? e.target.value : filterName;
    setFilterName(name);
    props.onFilter(name, status);
  };

  var elmTasks = props.tasks.map((task, index) => {
    return (
      <TaskItem
        key={task.id}
        index={index}
        task={task}
        onUpdateStatus={props.onUpdateStatus}
        onDelete={props.onDelete}
        onUpdate={props.onUpdate}
      />
    );
  });
  return (
    <div className="row mt-15">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="filterName"
                  value={filterName}
                  onChange={onChange}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  name="filterStatus"
                  value={filterStatus}
                  onChange={onChange}
                >
                  <option value={-1}>Tất Cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích Hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmTasks}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
