describe('API Test Suite', () => {
  let baseUrl;
  let deleteUser;
  let token;

  beforeEach(() => {
      cy.fixture('config').then((config) => {
        baseUrl = config.baseUrl;
        token = config.token
      });
      cy.fixture('users/users').then((users) => {
        deleteUser = users[0];
      });
  });

    it('Delete User Data', () => {
      const userId = deleteUser.id;
      const endpoint = `public/v2/users/${userId}`;
      const url = baseUrl + endpoint;

      cy.log(url);
      
      cy.request({
        method: 'DELETE', 
        url : url, 
        headers: {
          'Authorization': `Bearer ${token}` // Add the 'Authorization' header with the token
        },
      }).then((response) => {
          expect(response.status).to.equal(204);
          
          //remove from users file
          cy.fixture('users/users').then((users) => {
            const updatedUsers = users.filter((user) => user.id !== userId);

            cy.writeFile('cypress/fixtures/users/users.json', updatedUsers);
          });
      });
    });
  });