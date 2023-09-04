import {fetchIdentities, FetchIdentitiesGenerator} from "./index";

let gen: FetchIdentitiesGenerator
beforeAll(() => {
    gen = fetchIdentities()
});

describe('Sagas', () => {
    it('should set action for pending fetch identity', () => {
        console.log(gen.next().value)
    })
})