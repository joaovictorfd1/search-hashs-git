import { useCallback, useState } from 'react';
import './App.css';
import Input from './components/Input';
import Select from './components/Select';
import Form from './components/Form';
import Button from './components/Button';
import axios, { AxiosResponse } from 'axios';
import OrderedList from './components/List';

// Adicionando o OrderedList importado

const options = [
  {
    value: 'ui-creditor',
    label: 'Creditor',
  },
  {
    value: 'ui-consignadoprivado',
    label: 'Consignado Privado',
  },
];

interface ICommits {
  sha: string;
  url: string;
}

function App() {
  const [commits, setCommits] = useState<ICommits[]>([]);

  const onSearchHashs = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    const { input_hashs, select_repository } = formValues;

    const token = import.meta.env.VITE_GITHUB_TOKEN;

    try {
      const url = `https://api.github.com/repos/onidata/${select_repository}/pulls/${input_hashs}/commits`;
      const response: AxiosResponse = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (response.data.length > 1) {
        setCommits(response.data);
        return;
      }
      setCommits(response.data);
    } catch (error: unknown) {
      setCommits([]);
    }
  }, []);

  return (
    <>
      <Form onSubmit={onSearchHashs}>
        <span>Buscador de SHA</span>
        <span>Digite o hash ou a lista de hashs separados por espaço</span>
        <Input placeholder="Digite aqui" />
        <span>Escolha qual o repositorio</span>
        <Select options={options} />
        <Button type="submit" label="Pesquisar" />
      </Form>

      {commits.length > 0 ? (
        <OrderedList items={commits.map(commit => `git cherry-pick ${commit.sha}`)} />
      ) : (
        <span>Sua consulta não obteve resultados</span>
      )}
    </>
  );
}

export default App;
