import { publish } from 'gh-pages';

publish(
  'build', // path to public directory
  {
    branch: 'gh-pages',
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