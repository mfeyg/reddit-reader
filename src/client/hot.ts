import {Post} from "../types"
import * as t from 'io-ts';
import {PathReporter} from 'io-ts/lib/PathReporter';

type Response = t.TypeOf<typeof Response>

const Response = t.type({
    data: t.type({
        children: t.array(t.type({
            data: t.intersection([t.type({
                name: t.string,
                title: t.string,
                permalink: t.string,
            }), t.partial({
                preview: t.type({
                    images: t.array(t.type({
                        source: t.type({
                            url: t.string,
                            width: t.Integer,
                            height: t.Integer
                        }),
                        resolutions: t.array(t.type({
                            url: t.string,
                            width: t.Integer,
                            height: t.Integer
                        }))
                    }))
                })
            })])}))
        })
    })

const parseResponse = (response: Response): Post[] =>
    response.data.children.map(item => ({
        name: item.data.name,
        title: item.data.title,
        previewUrl: item.data.preview && item.data.preview.images[0].source.url,
        link: item.data.permalink,
    }))

export default (after?: string) => (respond: (posts: Post[]) => void) => {
    fetch('https://www.reddit.com/hot.json?raw_json=1' + (after ? `&after=${after}` : ''))
        .then(response => response.json())
        .then(data => {
            const result = Response.decode(data);
            if (result.isRight()) {
                respond && respond(parseResponse(result.value))
            } else {
                console.error(PathReporter.report(result))
            }
        })
}