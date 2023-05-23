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

    it('Get User Detail', () => {
      const user = getUser;
      const endpoint = `public/v2/users/${user.id}`;
      const url = baseUrl + endpoint;

      cy.request({
        method: 'GET', 
        url : url, 
        headers: {
          'Authorization': `Bearer ${token}` // Add the 'Authorization' header with the token
        },
      }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.id).to.equal(user.id);
          expect(response.body.name).to.equal(user.name);
          expect(response.body.email).to.equal(user.email);
          expect(response.body.gender).to.equal(user.gender);
          expect(response.body.status).to.equal(user.status);
      });
    });
  });