import axios, { AxiosResponse } from 'axios';

interface ICommitSha {
  sha: string
}

interface IIssue {
  pull_request: string
  number: number
}

export async function fetchClosedPRsWithCommits(
  repository: string,
  label: string,
  token: string
): Promise<{ prNumber: number; commitSHAs: string[] }[]> {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    localStorage.setItem('token_github', token)

    // 1. Buscar PRs fechados com a label específica
    const url = `https://api.github.com/repos/onidata/${repository}/issues?state=closed&labels=${label}&per_page=100`;
    const response: AxiosResponse = await axios.get(url, { headers });

    // Filtrar apenas PRs (não issues normais)
    const pullRequests: IIssue[] = response.data.filter((issue: IIssue) => issue.pull_request);

    const results: { prNumber: number; commitSHAs: string[] }[] = [];

    // 2. Iterar sobre cada PR para buscar os commits associados
    for (const pr of pullRequests) {
      const prNumber = pr.number; // Número do PR
      const commitsUrl = `https://api.github.com/repos/onidata/${repository}/pulls/${prNumber}/commits`;

      const commitsResponse: AxiosResponse = await axios.get(commitsUrl, { headers });

      // Extrair os SHAs dos commits
      const commitSHAs: string[] = commitsResponse.data.map((commit: ICommitSha) => commit.sha);

      // Adicionar o PR e seus SHAs ao resultado
      results.push({ prNumber, commitSHAs });
    }

    return results;
  } catch (error: any) {
    console.error('Erro ao buscar PRs e commits:', error.message || error);
    return [];
  }
}
