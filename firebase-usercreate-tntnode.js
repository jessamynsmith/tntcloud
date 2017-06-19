var firebase = require('firebase');
var admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert({
      project_id: "tnt-dispatch",
      client_email: "firebase-adminsdk-wdp26@tnt-dispatch.iam.gserviceaccount.com",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHZBreC9IimUSy\nLW7qmivwBjr5rhHUl/RLteKw0GNH784f0Gf23C4xnLTpT6v9YoktpNS1T0WZpYAV\n+ru+eqzoXgGay85Ib6Q2KJEh1a6A//1ddU+RM2lE3TJavtlr0nGvQE9jDT++svdD\n4pL8RBgkmGz343MVZzlTZQcqkpykJKRhVp4+A/nijQ9Ef1P4X6DVcHCPF6x01C/e\nN+Yfo5OOk7MuJdWWuEFPjPFoYiM0lPikhm6W9QfvHSZHItXFVr/WAjs/WJJGxaoq\nx6rb/zcoM4G4f1ESH9cTm1gbphGesGOf+M6tEUItwDymBoNzi+UtwxsfgyiQB958\ndbwNunDtAgMBAAECggEABHB/VV85GM4c/tAO4YVtEHg9OY1jRMo6EODAT6Rs4Xgn\nT+wGnUphLUkQNEztAVAWyf/VEgtKb7KzjRsvPPF61+ZcSvfC5H3OZwGR29rn16nP\n0s4+2431ZRE3X+Q7Y/Zejc502PPU1rEh8kLnGrjLOqMuLZFQbJA1iHPmw2aI0n2m\n1EHv0Vw0hEx1yAXWR7VWekZfz6Tp9UJFqRHaXQHTjIu8+4kzcw65bWVfN5fpKE5d\nMIjmetYm1/FRcbBJ4EuBFEvhH88KMp+wzQ/AjwCBc4og405zq80RQciI3J80PjLI\nC/Y5YtwGFdqsxY/UIUJe9vJEL8C6cARGnm8I2FhnvQKBgQDxa1F4jyC1LByDbhjz\nHtJFIrXtWNNZbhatVnJ70BxEA/b8Fe4UWM0UKYnzjp/2de7Z8K0X9U50bL7SLp5a\nZokf/lc+kPm6zI0I94f7V7BlrpIR/s7/N6c3LxCAiaf7hqsvjvZB0+RR3PTZG7Nm\nkjRcbfN6ZFkIP7dalvL3LaUoTwKBgQDTbvjF++LkKepmVgc8fFk4OztFX7QFtNU1\nY1lQzPOOSLEV1RZkSusryaMwZkvHr0czAfPDe5jJ2PGtwsIGvk3KPQg3QNnG1nFh\nzEOAFE01JkIhBQlqayj225l7W06nPYdKIyT8t5ACN01L7QpTut1K29M5mbfZVjvs\nzBnOeU+IAwKBgQC4tWFqGifuNcfDDxNrv+MlHj+PTuy1ebND/+YrsLhPmbD4glbb\nnm2ZxYZUoITm7qhGewwUTo0uKp189koV5Gl53wElT4qiTyqA99JEjXza70u3FPuO\n7Se04v9/ONMbcJe9FWZ4SwRfVezHx5flHGuPZFhrBifQVd+VIfTXBUddpQKBgHzG\nfKG6aMflxKLoGhUj/TMmIXBrbj3/3eNH4inBCerqEzejLTe6ztZkhJ3HgOkzE32S\npVyz0BMuqFG3IfIA1L+JDRQufVbOrtLcTOmFEZtQHK6H3mqjGuWz6vvVgrFHqlOi\nMe3CFoZ4RHGOTg3jtTy8Rgc0JD9qmKrCOGiVRs4pAoGAA2cmEZkMzKqzbJ1oLMy+\nHDNqJe5BUcmZEmA3S6NMkSUBx/kkJYFItuv9rKfbOYk/bNdt9kfSC4JHfmfB3Ioq\nVz7Hl+BW5sovsDX8b3/Z8vYh7S2Xvsh64PQX10B/BFEzDvdacYXLYgNv+NDeRw9d\nKYP4HEP3c/D2n0qNdOSvt2I=\n-----END PRIVATE KEY-----\n"
    }),
    databaseURL: "https://tnt-dispatch.firebaseio.com"
});

admin.auth().createUser({
  email: "tntexpress@example.com",
  emailVerified: false,
  password: "secretPassword",
  disabled: false
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });
