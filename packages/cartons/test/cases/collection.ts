
import assert from 'assert';

import {
  Model,
  Collection
} from '../../src/index';


class InitialAttributesModel extends Model {
  static initialAttributes = () => ({
    count: 1
  })
}

class TestCollection extends Collection {
  static Model = InitialAttributesModel;
}

describe('Collection', function () {
  it ('should addChild success', () => {
    let testCollection = new TestCollection();
    assert.strictEqual(0, testCollection.length);
    testCollection.addChild({ text: 'abc' });
    assert.strictEqual(1, testCollection.length);
    assert.strictEqual(true, testCollection.children[0] instanceof InitialAttributesModel);
    let testModel = testCollection.children[0];
    assert.strictEqual(1, testModel.get('count'));
    assert.strictEqual('abc', testModel.get('text'));
  })

  it ('should removeChild success', () => {
    let testCollection = new TestCollection();
    assert.strictEqual(0, testCollection.length);
    testCollection.addChild({ text: 'abc' });
    assert.strictEqual(1, testCollection.length);
    let testModel = testCollection.children[0];
    testCollection.removeChild(testModel.key);
    assert.strictEqual(0, testCollection.length);
  })
})
