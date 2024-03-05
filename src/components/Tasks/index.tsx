import { tasks, TaskItemType } from "../../mocks";

function Tasks() {
  return (
    <>
      <h1>Tasks</h1>
      <table>
        <tbody>
          <tr>
            <th>Task Title</th>
            <th>Task Status</th>
            <th>Assigned To</th>
            <th>Due Date</th>
          </tr>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td> {task.title}</td>
              <td>{task.status}</td>
              <td>{task.assigned_to}</td>
              <td>{task.due_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Tasks;
