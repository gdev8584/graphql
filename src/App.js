import { gql, useQuery } from "@apollo/client"; 

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
    }
  }
`
function App() {
  const {data, loading} = useQuery(query)
  console.log(data)
  if(loading) return <h1>Loading . . .</h1>
  return (
    <>
      <table border="1px">
        <thead>
          <tr>
            <th>Title</th>
            <th>ID</th>
            <th>completed</th>
          </tr>
        </thead>
        <tbody>
          {
            data.getTodos.map(todo => <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.id}</td>
              <td>{todo.completed}</td>
            </tr>)
          }
        </tbody>
      </table>
    </>
  );
}

export default App;
