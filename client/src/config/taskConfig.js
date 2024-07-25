export const TaskStatus = {
    TODO: 'todo',
    IN_PROGRESS: 'inProgress',
    DONE: 'done'
  };
  
export const getColumnTitle = (status) => {
    switch (status) {
        case TaskStatus.TODO:
        return 'Todo';
        case TaskStatus.IN_PROGRESS:
        return 'In Progress';
        case TaskStatus.DONE:
        return 'Done';
        default:
        return '';
    }
};
