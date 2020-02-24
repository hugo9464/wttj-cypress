
describe('WTTJ Technical Test', function() {

  beforeEach(function () {
    cy.setCookie('wk_session', '265476fc986790661f985714463dc165')
    cy.visit('https://www.welcomekit.co/dashboard/o/dkxzma3/jobs/2XMOI_yq66e6b/new-candidate/392777')
  })

  it('Creates a new candidates', function() {
    cy.get('[name=firstname]').type('Prénom')
    cy.get('[name=lastname]').type(userID_Alpha())
    cy.get('[name=email]').type('prenom.nom@email.com')

    cy.contains('Enregistrer').click()
  })
})

function userID_Alpha() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}