import { useState } from "react"
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  const { loading, data, error } = useTypedSelector((state) => state.repositories);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchRepositories(term);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={e => setTerm(e.target.value)}/>
        <button type="submit">Search</button>
      </form>

      {error && <h3>{error}</h3>}
      {loading && <h3>loading</h3>}
      {!loading && !error
        && (
        <ul>
          {data && data.length > 0
            && data.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
    </div>
  )
}

export default RepositoriesList