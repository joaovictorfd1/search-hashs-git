import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Form from './components/Form';
import Button from './components/Button';
import OrderedList from './components/List';
import { fetchClosedPRsWithCommits } from './api/api';

// Adicionando o OrderedList importado

interface ICommits {
  commitSHAs: string[];
  prNumber: number;
}

function App() {
  const [commits, setCommits] = useState<ICommits[]>([]);

  const onSearchHashs = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    const { token_github, repositorio_github, label_github } = formValues;

    const response = await fetchClosedPRsWithCommits(repositorio_github, label_github, token_github);

    if (response.length > 0) {
      setCommits(response);
    } else {
      setCommits([]);
    }

  };

  return (
    <>
      <Form onSubmit={onSearchHashs}>
        <span>Buscador de SHA</span>
        <span>Digite o seu token de autenticação</span>
        <Input type='text' id='token_github' name='token_github' placeholder="Digite aqui" />
        <span>Cole o nome do repositorio</span>
        <Input type='text' id='repositorio_github' name='repositorio_github' placeholder="Digite aqui" />
        <span>Digite o nome da label que deseja buscar os hashs</span>
        <Input type='text' id='label_github' name='label_github' placeholder="Digite aqui" />
        <Button type="submit" label="Pesquisar" />
      </Form>

      {commits.length > 0 ? (
        <OrderedList items={commits.flatMap((commit) =>
          commit.commitSHAs.map((commitSHA) => `git cherry-pick ${commitSHA}`))} />
      ) : (
        <span>Sua consulta não obteve resultados</span>
      )}
    </>
  );
}

export default App;
