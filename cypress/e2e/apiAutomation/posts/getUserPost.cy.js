describe('API Test Suite', () => {
    let baseUrl;
    let getUser;
    let token;
  
    beforeEach(() => {
        cy.fixture('config').then((config) => {
          baseUrl = config.baseUrl;
          token = config.token
        });
        cy.fixture('users/users').then((users) => {
          getUser = users[0];
        });
    });
  
      it('Get User Post', () => {
        const user = getUser;
        const endpoint = `public/v2/users/${getUser.id}/posts`;
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