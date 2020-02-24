
describe('Candidate creation tests', function() {

  beforeEach(function () {
    cy.wrap(userID_Alpha()).as('firstname')
    cy.wrap(userID_Alpha()).as('lastname')

    cy.setCookie('wk_session', '265476fc986790661f985714463dc165')
    cy.visit('https://www.welcomekit.co/dashboard/o/dkxzma3/jobs/2XMOI_yq66e6b/new-candidate/392777')
  })

  it('Creates a new candidates and check created data', function() {

    // Candidate creation
    cy.get('[name=firstname]').type(this.firstname)
    cy.get('[name=lastname]').type(this.lastname)
    cy.get('[name=email]').type('prenom.nom@email.com')

    cy.contains('Enregistrer').click()

    // Assertions on candidate card view
    cy.contains(this.firstname).click()

    cy.get('.card-header-name')
        .contains(this.firstname)
        .contains(this.lastname)
  })
})

function userID_Alpha() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}