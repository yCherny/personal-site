import React from "react";
import AboutCard from "../../components/content/about-card";
import SectionContent from "@/interfaces/about";

describe("<AboutCard />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    let section: SectionContent = {
      page: "portfolio",
      title: "Rally",
      content: "Rally iOS App",
    } as SectionContent;

    cy.mount(<AboutCard section={section} path={"portfolio"} />);
  });
});
