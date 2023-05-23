describe('API Test Suite', () => {

    let baseUrl;
    let user;
    let post;
    let createComment;
    let token;

    beforeEach(() => {
        cy.fixture('config').then((config) => {
          baseUrl = config.baseUrl;
          token = config.token
        });
        cy.fixture('users/users').then((users) => {
           user = users[0];
        });
        cy.fixture('posts/posts').then((posts) => {
            post = posts[0];
         });
        cy.fixture('posts/create_comment').then((create_comment) => {
          createComment = create_comment;
       });
    });

    it('Create new Post Comment', () => {
      const endpoint = `public/v2/posts/${post.id}/comments`;
      const url = baseUrl + endpoint;
      const requestBody = {
        "name" : user.name,
        "email" : user.email,
        "body" : createComment.body
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
          expect(response.body.name).to.equal(requestBody.name);
          expect(response.body.email).to.equal(requestBody.email);
          expect(response.body.body).to.equal(requestBody.body);

          // Write the response into file posts.json
          const postData = {
            id: response.body.id,
            post_id: response.body.post_id,
            name: response.body.name,
            email: response.body.email,
            body: response.body.body,
          };
          
          cy.fixture('posts/comments').then((comments) => {
            const updatedComments = [...comments, postData];
            cy.writeFile('cypress/fixtures/posts/comments.json', updatedComments);
          });
      });

    });
  });