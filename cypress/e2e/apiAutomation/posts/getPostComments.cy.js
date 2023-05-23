describe('API Test Suite', () => {
    let baseUrl;
    let post;
    let token;
  
    beforeEach(() => {
        cy.fixture('config').then((config) => {
          baseUrl = config.baseUrl;
          token = config.token
        });
        cy.fixture('posts/posts').then((posts) => {
          post = posts[0];
        });
    });
  
      it('Get Post Comments', () => {
        const endpoint = `public/v2/posts/${post.id}/comments`;
        const url = baseUrl + endpoint;
  
        cy.request({
          method: 'GET', 
          url : url, 
          headers: {
            'Authorization': `Bearer ${token}` // Add the 'Authorization' header with the token
          },
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length.greaterThan(1);
            
        });
      });
    });