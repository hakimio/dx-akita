import {ValueTransformer} from 'typeorm';
import * as sanitizeHtml from 'sanitize-html';

export class SanitizeHtmlTransformer implements ValueTransformer {

    from(value: string): string {
        return value;
    }

    to(value: string): string {
        if (!value) {
            return value;
        }

        return sanitizeHtml(value, {
            allowedTags: ['p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'br', 'span', 'u'],
            allowedAttributes: {
                a: ['href', 'target', 'rel'],
                span: ['class', 'spellcheck', 'data-marker', 'data-mention-value', 'data-id', 'contenteditable']
            },
            allowedSchemes: ['http', 'https'],
            allowProtocolRelative: false
        });
    }

}
