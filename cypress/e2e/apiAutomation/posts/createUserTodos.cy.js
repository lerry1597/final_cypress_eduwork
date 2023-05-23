describe('API Test Suite', () => {

    let baseUrl;
    let user;
    let userTodos;
    let token;

    beforeEach(() => {
        cy.fixture('config').then((config) => {
          baseUrl = config.baseUrl;
          token = config.token
        });
        cy.fixture('users/users').then((users) => {
           user = users[0];
        });
        cy.fixture('users/user_todos').then((user_todos) => {
            userTodos = user_todos;
         });
    });

    it('Create User Todos', () => {
      const endpoint = `public/v2/users/${user.id}/todos`;
      const url = baseUrl + endpoint;
      const requestBody = {
        "title" : userTodos.title,
        "status" : userTodos.status,
      }

      cy.request({
        method: 'POST', 
        url : url, 
        headers: {
          'Authorization': `Bearer ${token}` // Add the 'Authorization' header with the token
        },
        body: requestBody
      }).then((response) => {
          expect(response.status).to.equal(201);
          expect(response.body.title).to.equal(requestBody.title);
          expect(response.body.status).to.equal(requestBody.status);

          // Write the response into file posts.json
          const postData = {
            id: response.body.id,
            user_id: response.body.user_id,
            title: response.body.title,
            due_on: response.body.due_on,
            status: response.body.status,
          };
          
          cy.fixture('users/todos').then((todos) => {
            const updatedTodos = [...todos, postData];
            cy.writeFile('cypress/fixtures/users/todos.json', updatedTodos);
          });
      });

    });
  });