import React from 'react'
import AboutCard from '../../components/content/about-card'

describe('<AboutCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AboutCard props={}/>)
  })
})