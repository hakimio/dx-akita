import {CardComponent} from './card.component';
import {Shallow} from 'shallow-render';
import {CardModule} from './card.module';
import {Rendering} from 'shallow-render/dist/lib/models/rendering';

describe('CardComponent', () => {
    let shallow: Shallow<CardComponent>;
    let component: CardComponent;
    let rendering: Rendering<CardComponent, never>;

    beforeEach(async () => {
        shallow = new Shallow<CardComponent>(CardComponent, CardModule);
        rendering = await shallow.render(`
            <dxa-card><p>Hello World!</p></dxa-card>
        `);
        component = rendering.instance;
    });

    it('should create a component', async () => {
        expect(component).toBeTruthy();
    });

    it('should correctly set card content', () => {
        const contentDivEl = <HTMLDivElement>rendering
            .find('div.dx-card')
            .nativeElement;

        expect(contentDivEl.innerHTML).toBe('<p>Hello World!</p>');
    });

});
