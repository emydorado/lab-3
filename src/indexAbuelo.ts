import { data } from './data/data';
import './Components/indexPadre';
import UserCard, { Attribute } from './Components/card/card';

class AppContainer extends HTMLElement {
	cards: UserCard[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.filterAndRender();
	}

	filterAndRender() {
		const filteredData = data.filter((perfil) => perfil.id % 2 === 0);
		filteredData.forEach((perfil) => {
			const perfilCard = this.ownerDocument.createElement('user-card') as UserCard;
			perfilCard.setAttribute(Attribute.image, perfil.image);
			perfilCard.setAttribute(Attribute.name, perfil.name);
			perfilCard.setAttribute(Attribute.uid, String(perfil.id));
			perfilCard.setAttribute(Attribute.age, String(perfil.age));
			perfilCard.setAttribute(Attribute.gender, perfil.gender);
			//perfilCard.setAttribute(Attribute.area, perfil.jobDetails.area);//
			perfilCard.setAttribute(
				Attribute.area,
				Array.isArray(perfil.jobDetails) ? perfil.jobDetails[0].area : perfil.jobDetails.area
			);
			perfilCard.setAttribute(
				Attribute.position,
				Array.isArray(perfil.jobDetails) ? perfil.jobDetails[0].position : perfil.jobDetails.position
			);
			perfilCard.setAttribute(
				Attribute.timeInCompany,
				Array.isArray(perfil.jobDetails)
					? String(perfil.jobDetails[0].timeInCompany)
					: String(perfil.jobDetails.timeInCompany)
			);
			perfilCard.setAttribute(
				Attribute.experience,
				Array.isArray(perfil.jobDetails)
					? String(perfil.jobDetails[0].experience)
					: String(perfil.jobDetails.experience)
			);
			this.cards.push(perfilCard);
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.cards.forEach((profile) => {
				this.shadowRoot?.appendChild(profile);
			});
		}
	}
}

customElements.define('app-container', AppContainer);
