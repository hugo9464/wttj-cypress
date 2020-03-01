
describe('Candidate creation tests', function() {

  beforeEach(function () {
    cy.wrap(generateName()).as('firstname')
    cy.wrap(generateName()).as('lastname')

    cy.setCookie('wk_session', '265476fc986790661f985714463dc165')
    cy.visit('https://www.welcomekit.co/dashboard/o/dkxzma3/jobs/2XMOI_yq66e6b/new-candidate/392777')
  })

  it('Creates a new candidate and check created data', function() {

    // Fill general information
    cy.get('[name=firstname]').should('have.attr', 'placeholder', 'Prénom')
        .type(this.firstname)
    cy.get('[name=lastname]').should('have.attr', 'placeholder', 'NOM')
        .type(this.lastname)
    cy.get('[name=subtitle]').should('have.attr', 'placeholder', 'Ex: CEO @WTTJ, Dev full stack, etc.')
        .type('QA Engineer')
    cy.get('[name=email]').type('prenom.nom@email.com')
    cy.get('[name=phone]').type('0123456789')
    cy.get('[name=address]').type('51 rue Raspail')
    cy.get('[name=city]').type('Alfortville')
    cy.get('[name=zip_code]').type('94140')

    // Fill web information
    cy.get('[name=media_website]').should('have.attr', 'placeholder', 'http://www.moi.com')
        .type("www.siteweb.com")
    cy.get('[name=media_linkedin]').should('have.attr', 'placeholder', 'https://fr.linkedin.com/pub/moi/')
        .type("www.linkedin.com")
    cy.get('[name=media_twitter]').should('have.attr', 'placeholder', 'https://twitter.com/moi')
        .type("www.twitter.com")

    // Fill appliance
    cy.get('[name=cover_letter]').type('Exemple de lettre de motivation')
    cy.get('[name="answers[0].answer"]').type('Réponse à la première question')
    cy.get('[name="answers[1].answer"]').type('Réponse à la deuxième question')
    cy.get('[name=referrer]').should('have.attr', 'placeholder', 'Ex: twitter.com, welcometothejungle.co, mail, etc.')
        .type('welcometothejungle.co')

    // Candidate creation
    cy.contains('Enregistrer').click()

    // Assertions on candidate card view
    cy.contains(this.firstname).click()

    cy.get('.card-header-name')
        .contains(this.firstname)
        .contains(this.lastname)
    cy.get('.card-header-subtitle > span')
        .contains('QA Engineer')
    cy.get('.candidate-infos-phone > a')
        .contains('0123456789')
    cy.get('.candidate-infos-address').should('have.attr', 'data-hint', '51 rue Raspail, 94140, Alfortville')
        .contains('Alfortville')
    cy.get('.candidate-infos-medium-referrer').within(() => {
      cy.get('a').eq(0).should('have.attr', 'href', 'http://www.siteweb.com')
      cy.get('a').eq(1).should('have.attr', 'href', 'http://www.linkedin.com')
      cy.get('a').eq(2).should('have.attr', 'href', 'http://www.twitter.com')
      cy.get('span').contains('welcometothejungle.co')
    })
    cy.get('.card-block-cover-letter').within(() => {
      cy.get('span').contains('Lettre de motivation')
    })
    cy.get('.card-block-questions-answer').eq(0).within(() => {
      cy.get('p').contains('Réponse à la première question')
    })
    cy.get('.card-block-questions-answer').eq(1).within(() => {
      cy.get('p').contains('Réponse à la deuxième question')
    })
  })
})

function generateName() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}