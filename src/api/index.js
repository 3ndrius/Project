export const addTodoApi = async (todo) => {
  try {
    const request = await fetch("https://jsonplaceholder.typicode.com/todos/", {
      method: "POST",
      body: JSON.stringify({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
  const response = await request.json();
    return response;
  } catch (e) {
    console.log("Error", e);
  }
};

export const completeTodoApi = async (task) => {
  try {
    
    const request = await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          completed: !task.completed
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
    const data = await request.json();
    return data;
  } catch (e) {
    console.log("Error", e);
  }
};

export const deleteTodoApi = async (id) => {
  try {
    const request = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "DELETE"
      }
    );
    const data = await request.json();
    return data;
  } catch (e) {
    console.log("Error", e);
  }
};

export const fetchTodoApi = async () =>{
  try{
    const request = await fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10');;
    const response = await request.json();
    return response
  }catch(e){
    console.log("Error", e)
  }
}