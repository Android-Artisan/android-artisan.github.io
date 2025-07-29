const GITHUB_USERNAMES = ['Android-Artisan', 'ArtisanROM']; // add second username here
const container = document.getElementById('repo-container');

async function fetchRepos() {
  container.innerHTML = ''; // clear container before loading
  try {
    for (const username of GITHUB_USERNAMES) {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const repos = await res.json();

      repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description ? repo.description : 'No description available.'}</p>
          <small>Owner: ${username}</small>
        `;
        card.onclick = () => {
          window.open(repo.html_url, '_blank');
        };
        container.appendChild(card);
      });
    }
  } catch (err) {
    container.innerHTML = '<p>Failed to load repositories.</p>';
    console.error(err);
  }
}

fetchRepos();
