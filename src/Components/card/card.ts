export enum Attribute {
	'image' = 'image',
	'name' = 'name',
	'uid' = 'uid',
	'age' = 'age',
	'gender' = 'gender',
	'area' = 'area',
	'position' = 'position',
	'timeInCompany' = 'timeInCompany',
	'experience' = 'experience',
}

class Card extends HTMLElement {
	image?: string;
	name?: string;
	uid?: number;
	age?: number;
	gender?: string;
	area?: string;
	position?: string;
	timeInCompany?: number;
	experience?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			image: null,
			name: null,
			uid: null,
			age: null,
			gender: null,
			area: null,
			position: null,
			timeInCompany: null,
			experience: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;

			case Attribute.age:
				this.age = newValue ? Number(newValue) : undefined;
				break;

			case Attribute.timeInCompany:
				this.timeInCompany = newValue ? Number(newValue) : undefined;
				break;

			case Attribute.experience:
				this.experience = newValue ? Number(newValue) : undefined;
				break;

			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
    <section>
    <img src="${this.image}"></img>
    <h1>${this.name}</h1>
    <p>${this.uid}</p>
    <p>${this.age}</p>
    <p>${this.gender}</p>
    <p>${this.area}</p>
    <p>${this.position}</p>
    <p>${this.timeInCompany}</p>
    <p>${this.experience}</p>
    </section>
    `;
		}
	}
}

export default Card;
customElements.define('user-card', Card);
