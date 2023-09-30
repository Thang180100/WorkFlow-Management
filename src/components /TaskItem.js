import React from 'react';

function TaskItem(props) {
  const onUpdateStatus = () => {
    props.onUpdateStatus(props.task.id);
  };
  const onDelete = () => {
    props.onDelete(props.task.id);
  };
  const onUpdate = () => {
    props.onUpdate(props.task.id);
  };

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{props.task.name}</td>
      <td className="text-center">
        <span
          className={
            props.task.status === true
              ? 'label label-danger'
              : 'label label-success'
          }
          onClick={onUpdateStatus}
        >
          {props.task.status === true ? 'Kích hoạt' : 'Ẩn'}
        </span>
      </td>
      <td className="text-center">
        <button type="button" className="btn btn-warning" onClick={onUpdate}>
          <span className="fa-sharp fa-solid fa-pen-to-square mr-5"></span>Sửa
        </button>
        &nbsp;
        <button type="button" className="btn btn-danger" onClick={onDelete}>
          <span className="fa fa-trash mr-5"></span>Xóa
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
