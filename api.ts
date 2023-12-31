import { ITask } from "./types/task";

const baseUrl = "http://localhost:9000";

export const getAllTasks = async (status?: string): Promise<ITask[]> => {
  let url = `${baseUrl}/tasks`;

  // if (status === "todo") {
  //   url += "?is_done=false";
  // } else if (status === "done") {
  //   url += "?is_done=true";
  // } else if (status === "deleted") {
  //   url += "?is_deleted=true"
  // }

  const res = await fetch(url, { cache: "no-store" });
  const todos = await res.json();
  return todos;
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};

export const deleteTodo = async (todo: ITask): Promise<void> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};
// export const deleteTodo = async (id: number): Promise<void> => {
//   await fetch(`${baseUrl}/tasks/${id}`, { method: "DELETE" });
// };
