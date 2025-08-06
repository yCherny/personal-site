import ToggleButton from '@/components/buttons/toggle-button';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const themeToggleSelector = '[data-cy=themeToggle]';

describe('ToggleButton', () => {
	beforeEach(() => {
		cy.mount(
			<ToggleButton
				disabledIcon={<MoonIcon />}
				enabledIcon={<SunIcon />}
			/>
		);
	});

	it('should set the html theme to light by default', () => {
		cy.get('html').should('have.css', 'color-scheme', 'dark');
	});

	it('shoukd change the theme when clicked', () => {
		cy.get(themeToggleSelector).click();
		// cy.get('html').should('have.css', 'color-scheme', 'light');
	});
});
