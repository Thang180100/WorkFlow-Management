import React, { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './components /TaskForm';
import Control from './components /control';
import TaskList from './components /TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [taskEditing, setTaskEditing] = useState();
  const [sortBy, setSortBy] = useState('');
  const [sortValue, setSortValue] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState(-1);

  useEffect(() => {
    if (localStorage && localStorage.getItem('tasks')) {
      setTasks(JSON.parse(localStorage.getItem('tasks')));
    }
  }, []);

  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  const generateID = () => {
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4()
    );
  };
  const onToggleForm = () => {
    if (displayForm && taskEditing !== null) {
      setDisplayForm(true);
      setTaskEditing(null);
    } else {
      setDisplayForm(!displayForm);
      setTaskEditing(null);
    }
  };
  const onCloseForm = () => {
    setDisplayForm(false);
  };

  const onShowForm = () => {
    setDisplayForm(true);
  };

  const onSubmit = (data) => {
    if (data.id === '') {
      data.id = generateID();
      tasks.push(data);
    } else {
      var index = findIndex(data.id);
      tasks[index] = data;
    }
    setTaskEditing(null);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const onUpdateStatus = (id) => {
    const newTasks = [...tasks];
    var index = findIndex(id);
    if (index !== -1) {
      newTasks[index].status = !newTasks[index].status;
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
  };

  const findIndex = (id) => {
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  const onDelete = (id) => {
    const newTasks = [...tasks];
    var index = findIndex(id);
    if (index !== -1) {
      newTasks.splice(index, 1);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      onCloseForm();
    }
  };

  const onUpdate = (id) => {
    var index = findIndex(id);
    var taskEditing = tasks[index];
    setTaskEditing(taskEditing);
    onShowForm();
  };

  const onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    filterName = filterName.toLowerCase();
    setFilterName(filterName);
    setFilterStatus(filterStatus);
    const data = JSON.parse(localStorage.getItem('tasks'));
    if (filterName === '') {
      const taskData = data.filter((task) => {
        if (filterStatus === -1) {
          return task;
        } else {
          return task.status === (filterStatus === 1 ? true : false);
        }
      });
      setTasks(taskData.length > 0 ? taskData : data);
    } else if (filterName !== '') {
      const taskFilterStatus = data.filter((task) => {
        if (filterStatus === -1) {
          return task;
        } else {
          return task.status === (filterStatus === 1 ? true : false);
        }
      });
      const taskData = taskFilterStatus.filter((task) => {
        return task.name.toLowerCase().indexOf(filterName) !== -1;
      });
      setTasks(taskData.length > 0 ? taskData : data);
    }
  };

  const onSearch = (keyword) => {
    const lowerKey = keyword.toLowerCase();
    if (lowerKey !== '') {
      const filteredData = tasks.filter((task) => {
        return task.name.toLowerCase().includes(lowerKey);
      });
      setTasks(filteredData);
    } else {
      setTasks(JSON.parse(localStorage.getItem('tasks')));
    }
  };
  const onSort = (sortBy, sortValue) => {
    setSortBy(sortBy);
    setSortValue(sortValue);
    if (sortBy === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return sortValue;
        else if (a.status < b.status) return -sortValue;
        else return 0;
      });
    }
  };

  var elmTaskForm = displayForm ? (
    <TaskForm
      onSubmit={onSubmit}
      onCloseForm={onCloseForm}
      task={taskEditing}
    />
  ) : (
    ''
  );
  return (
    <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
        <div
          className={displayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}
        >
          {elmTaskForm}
        </div>
        <div
          className={
            displayForm
              ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
              : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
          }
        >
          <button
            
            type="button"
            className="btn btn-primary mb-5"
            onClick={onToggleForm}
          >
            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
          </button>
          <Control
            onSearch={onSearch}
            onSort={onSort}
            sortBy={sortBy}
            sortValue={sortValue}
          />
          <TaskList
            tasks={tasks}
            filterName={filterName}
            filterStatus={filterStatus}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onFilter={onFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
