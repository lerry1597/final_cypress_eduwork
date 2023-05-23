describe('API Test Suite', () => {
  let baseUrl;
  let updateUser;
  let token;

  beforeEach(() => {
      cy.fixture('config').then((config) => {
        baseUrl = config.baseUrl;
        token = config.token
      });
      cy.fixture('users/update_user').then((update_user) => {
        updateUser = update_user;
     });
  });

    it('Update User Data', () => {
      const userId = updateUser.id;
      const endpoint = `public/v2/users/${userId}`;
      const url = baseUrl + endpoint;
      const updatedData = updateUser

        cy.request({
          method: 'PUT', 
          url : url, 
          headers: {
            'Authorization': `Bearer ${token}` // Add the 'Authorization' header with the token
          },
          body: updatedData
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(userId);
            expect(response.body.name).to.equal(updatedData.name);
            expect(response.body.email).to.equal(updatedData.email);
            expect(response.body.gender).to.equal(updatedData.gender);
            expect(response.body.status).to.equal(updatedData.status);


            // Read the existing users data from the fixture file
            cy.fixture('users/users').then((users) => {
              // Find the user with the matching ID and update the data
              const updatedUsers = users.map((user) => {
                if (user.id === userId) {
                  return {
                    ...user,
                    name: updatedData.name,
                    email: updatedData.email,
                    gender: updatedData.gender,
                    status: updatedData.status
                  };
                }
                return user;
              });

              // Write the updated users data back to the fixture file
              cy.writeFile('cypress/fixtures/users/users.json', updatedUsers);
            });
        });
    });
  });