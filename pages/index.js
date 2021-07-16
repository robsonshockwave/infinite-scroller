import React from 'react';

export default function Home() {
  const [followers, setFollowers] = React.useState([{ login: 'omariosouto' }, { login: 'juunegreiros' }]);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const PER_PAGE = 10;
    const URL_CONFIG = `?per_page=${PER_PAGE}&page=${currentPage}&order=desc`;
    const URL = 'https://api.github.com/users/omariosouto/followers' + URL_CONFIG;

    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((newFollowers) => setFollowers((prevFollowers) => [...prevFollowers, ...newFollowers]));
  }, [currentPage]);

  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        console.log('Sentinela appears!', currentPage + 1);
        setCurrentPage((currentPageInState) => currentPageInState + 1);
      }
    });
    intersectionObserver.observe(document.querySelector('#sentinela'));
    return () => intersectionObserver.disconnect();
  }, [])

  return (
    <main style={{ textAlign: 'center',  background: '#BA68C8'}}>
      <h1>GitHub API: Infinite Scroller</h1>
      <h2>Página atual: {currentPage}</h2>

      <ul style={{ 
        height: '75vh', 
        overflowY: 'scroll',
        listStyle: 'none',
        width: '300px',
        margin: '0 auto',
        background: '#AB47BC' }}>
        {followers.map((follower, index) => (
          <li key={follower.login + index} style={{ margin: '30px' }}>
            <div>
              <img src={`https://github.com/${follower.login}.png`} width="150" />
              <p>
                github.com/<strong>{follower.login}</strong>
              </p>
            </div>
          </li>
        ))}
        <li id="sentinela" style={{ height: '30px', backgroundColor: 'red' }}/>
      </ul>
    </main>
  )
}