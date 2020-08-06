import {StringUtils} from './string-utils';

export class PredictableRandomizer {
    private static readonly WORDS = ('Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh ' +
        'euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud ' +
        'exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum ' +
        'iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla ' +
        'facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit ' +
        'augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil ' +
        'imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus ' +
        'legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii ' +
        'legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum ' +
        'est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis ' +
        'per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant ' +
        'sollemnes in futurum.')
        .replace(/[,.]/g, '').split(' ');

    private static readonly MODULUS = 0x80000000;
    private static readonly MULTIPLIER = 1664525;
    private static readonly INCREMENT = 1013904223;
    private static readonly INITIAL_SEED = 1103515245;

    private static readonly MAX_DATE = +new Date();

    private static seed = PredictableRandomizer.INITIAL_SEED;

    // our own "getRandom()" method because we need consistency for testing
    static getRandom(min: number, max: number): number {
        this.seed = (this.MULTIPLIER * this.seed + this.INCREMENT) % this.MODULUS;
        const x = this.seed / (this.MODULUS - 1);

        return Math.floor(x * (max - min + 1) + min);
    }

    static getWord(): string {
        return this.WORDS[this.getRandom(0, this.WORDS.length - 1)];
    }

    static getSentence(min?: number, max?: number): string {
        min = min !== undefined ? min : 10;
        max = max || 30;

        let length = this.getRandom(min, max),
            description = StringUtils.capitalize(this.getWord());

        while (length--) {
            description += ' ';
            description += this.getWord();
        }
        description += '.';

        return description;
    }

    static getParagraph(count?: number): string {
        let length = count || this.getRandom(2, 5),
            result = '';

        while (length--) {
            if (result) {
                result += ' ';
            }
            result += this.getSentence();
        }

        return result;
    }

    static getEssay(count?: number): string[] {
        let length = count || this.getRandom(1, 4);
        const result = [];

        while (length--) {
            result.push(this.getParagraph());
        }

        return result;
    }

    static getNextDate(date: Date, scale?: number): Date {
        scale = scale || (2 / 3);

        const time = date.getTime(),
            remaining = this.MAX_DATE - time;

        return new Date(time + 1000 * this.getRandom(1, remaining * scale / 1000));
    }

}
