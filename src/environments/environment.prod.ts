export const environment = {
  production: true
};

const searchLink = document.createElement('link');
searchLink.type = 'application/opensearchdescription+xml';
searchLink.rel = 'search';
searchLink.href = 'search.xml';
searchLink.title = 'Amolecoin Explorer';
document.head.appendChild(searchLink);
