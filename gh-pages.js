import { publish } from 'gh-pages';

publish(
  'docs', // path to public directory
  {
    branch: 'devlop',
    repo: '49602385+ptsgrn@users.noreply.github.com',
    user: {
      name: 'ptsgrn',
      email: '49602385+ptsgrn@users.noreply.github.com'
    },
    dotfiles: true
  },
  () => {
    console.log('Deploy Complete!');
  }
);