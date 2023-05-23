describe('API Test Suite', () => {

    let baseUrl;
    let user;
    let createPost;
    let token;

    beforeEach(() => {
        cy.fixture('config').then((config) => {
          baseUrl = config.baseUrl;
          token = config.token
        });
        cy.fixture('users/users').then((users) => {
           user = users[0];
        });
        cy.fixture('posts/create_post').then((create_post) => {
          createPost = create_post;
       });
    });

    it('Create new Post', () => {
      const endpoint = `public/v2/users/${user.id}/posts`;
      const url = baseUrl + endpoint;
      const requestBody = {
        "user" : user.name,
        "title" : createPost.title,
        "body" : createPost.body
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
          expect(response.body.title).to.equal(requestBody.title);
          expect(response.body.body).to.equal(requestBody.body);

          // Write the response into file posts.json
          const postData = {
            id: response.body.id,
            user_id: response.body.user_id,
            title: response.body.title,
            body: response.body.body,
          };
          
          cy.fixture('posts/posts').then((posts) => {
            const updatedPosts = [...posts, postData];
            cy.writeFile('cypress/fixtures/posts/posts.json', updatedPosts);
          });
      });

    });
  });