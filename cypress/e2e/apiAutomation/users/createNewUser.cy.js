describe('API Test Suite', () => {

    let baseUrl;
    let userCreate;
    let token;

    beforeEach(() => {
        cy.fixture('config').then((config) => {
          baseUrl = config.baseUrl;
          token = config.token
        });
        cy.fixture('users/user').then((user) => {
           userCreate = user;
        });
    });

    it('Create new User', () => {
      const endpoint = 'public/v2/users';
      const url = baseUrl + endpoint;
      const requestBody = userCreate;

      cy.request({
        method: 'POST', 
        url : url, 
        headers: {
          'Authorization': `Bearer ${token}` // Add the 'Authorization' header with the token
        },
        body: requestBody
      }).then((response) => {
          expect(response.status).to.equal(201);
          expect(response.body.name).to.equal(requestBody.name);
          expect(response.body.email).to.equal(requestBody.email);
          expect(response.body.gender).to.equal(requestBody.gender);
          expect(response.body.status).to.equal(requestBody.status);

          // Write the response into file users.json
          const userData = {
            id: response.body.id,
            name: response.body.name,
            email: response.body.email,
            gender: response.body.gender,
            status: response.body.status
          };
          
          cy.fixture('users/users').then((users) => {
            const updatedUsers = [...users, userData];
            cy.writeFile('cypress/fixtures/users/users.json', updatedUsers);
          });
      });

    });
  });